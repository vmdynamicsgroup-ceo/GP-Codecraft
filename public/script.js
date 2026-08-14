// State Management
let currentLevel = 1;
let currentChapter = 1;
let userProgress = JSON.parse(localStorage.getItem('gp_progress')) || { unlockedLevel: 1, unlockedChapter: 1 };
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || null;

// DOM Elements
const levelListEl = document.getElementById('level-list');
const chapterContentEl = document.getElementById('chapter-content');
const aiChatBox = document.getElementById('ai-chat-box');
const aiInput = document.getElementById('ai-input');
const onboardingModal = document.getElementById('onboarding-modal');

// --- 1. Client-side Security & Anti-Cheat Logic ---
function initAntiCheat() {
    // Disable Right-Click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable Keyboard Shortcuts (Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+U, F12)
    document.addEventListener('keydown', (e) => {
        if (
            e.ctrlKey && ['c', 'v', 'x', 'u', 'C', 'V', 'X', 'U'].includes(e.key) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            alert('Security Notice: Copying, inspecting, or shortcut actions are disabled on GP Codecraft.');
        }
    });

    // Prevent text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
}

// --- 2. Onboarding Modal & Lead Collection ---
function checkOnboarding() {
    if (!currentUser) {
        if (onboardingModal) onboardingModal.style.display = 'flex';
    } else {
        if (onboardingModal) onboardingModal.style.display = 'none';
    }
}

async function handleOnboardingSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    const country = document.getElementById('user-country').value;

    const userData = { name, email, phone, country, joinedAt: new Date().toISOString() };

    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (res.ok) {
            localStorage.setItem('gp_user', JSON.stringify(userData));
            currentUser = userData;
            if (onboardingModal) onboardingModal.style.display = 'none';
            loadDashboard();
        } else {
            alert('Failed to save user info. Please try again.');
        }
    } catch (err) {
        console.error('Error saving user:', err);
    }
}

// --- 3. Dynamic Roadmap & Level Logic ---
function renderRoadmap() {
    if (!levelListEl) return;
    levelListEl.innerHTML = '';

    const TOTAL_LEVELS = 100;

    for (let l = 1; l <= TOTAL_LEVELS; l++) {
        const levelBtn = document.createElement('div');
        levelBtn.className = `level-card ${l <= userProgress.unlockedLevel ? 'unlocked' : 'locked'}`;
        levelBtn.innerHTML = `<h3>Level ${l}</h3><p>9 Chapters + 1 Boss Battle</p>`;
        
        levelBtn.onclick = () => {
            if (l <= userProgress.unlockedLevel) {
                loadLevelChapters(l);
            } else {
                alert('Unlock previous levels first!');
            }
        };

        levelListEl.appendChild(levelBtn);
    }
}

// --- 4. Chapter Loading & Pro Paywall Gate ---
async function loadChapterContent(chapterNumber) {
    // Paywall Gate: Free for first 50 chapters (Levels 1-5), Gated afterwards
    if (chapterNumber > 50 && (!currentUser || !currentUser.isPro)) {
        chapterContentEl.innerHTML = `
            <div class="pro-paywall-box">
                <h2>🔒 Pro Feature Locked</h2>
                <p>You have completed all 50 free chapters! Upgrade to <strong>GP Codecraft Pro</strong> to unlock Levels 6–100, advanced Boss Battles, and AI Code Reviews.</p>
                <button class="btn-upgrade" onclick="triggerProPayment()">Upgrade to Pro</button>
            </div>
        `;
        return;
    }

    try {
        const res = await fetch(`/api/chapters/${chapterNumber}`);
        const data = await res.json();

        const isBossBattle = chapterNumber % 10 === 0;

        chapterContentEl.innerHTML = `
            <div class="chapter-header">
                <h2>${isBossBattle ? '🔥 BOSS BATTLE: ' : ''}${data.title}</h2>
                <span class="badge">${isBossBattle ? 'Boss Level' : 'Standard Chapter'}</span>
            </div>
            <div class="chapter-body">
                <p>${data.content}</p>
                ${isBossBattle ? `<div class="boss-challenge"><h4>Challenge:</h4><p>${data.challengePrompt}</p></div>` : ''}
            </div>
            <button class="btn-complete" onclick="completeChapter(${chapterNumber})">
                ${isBossBattle ? 'Defeat Boss & Next Level' : 'Complete Chapter'}
            </button>
        `;
    } catch (err) {
        chapterContentEl.innerHTML = `<p>Error loading chapter content.</p>`;
    }
}

function completeChapter(chapterNum) {
    if (chapterNum >= userProgress.unlockedChapter) {
        userProgress.unlockedChapter = chapterNum + 1;
        userProgress.unlockedLevel = Math.ceil((chapterNum + 1) / 10);
        localStorage.setItem('gp_progress', JSON.stringify(userProgress));
    }
    alert('Great job! Moving to next stage.');
    loadChapterContent(chapterNum + 1);
}

// --- 5. Gemini AI Mentor Integration ---
async function sendAIMessage() {
    const message = aiInput.value.trim();
    if (!message) return;

    appendChatMessage('User', message);
    aiInput.value = '';

    try {
        const res = await fetch('/api/ai-mentor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });
        const data = await res.json();

        appendChatMessage('AI Mentor', data.reply || 'No response received.');
    } catch (err) {
        appendChatMessage('AI Mentor', 'Sorry, I am having trouble connecting to the AI server.');
    }
}

function appendChatMessage(sender, text) {
    if (!aiChatBox) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender.toLowerCase()}`;
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    aiChatBox.appendChild(msgDiv);
    aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

function triggerProPayment() {
    alert('Redirecting to VM Dynamics Payment Gateway...');
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initAntiCheat();
    checkOnboarding();
    renderRoadmap();
});
// Go বাটনে ক্লিক করলে এই ফাংশনটি চলবে
function handleJump() {
    const inputField = document.getElementById('chapterInput');
    if (inputField) {
        const chapterId = inputField.value;
        loadChapter(chapterId); // আমরা আগে যে loadChapter বানিয়েছিলাম সেটাকে কল করবে
    }
}
