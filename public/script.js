// State Management
let currentLevel = 1;
let currentChapter = 1;
let userProgress = JSON.parse(localStorage.getItem('gp_progress')) || { unlockedLevel: 1, unlockedChapter: 1 };
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || null;

// Mock Chapter Database Generator (Since backend fetch is static on GH Pages/Render static)
function getChapterData(chapterNumber) {
    const levelNumber = Math.ceil(chapterNumber / 10);
    const isBossBattle = chapterNumber % 10 === 0;

    return {
        id: chapterNumber,
        level: levelNumber,
        title: isBossBattle 
            ? `Level ${levelNumber} Final Challenge: Enterprise Developer Assessment` 
            : `Level ${levelNumber} - Chapter ${chapterNumber}: Software Engineering Core`,
        content: isBossBattle 
            ? `Welcome to the Boss Battle for Level ${levelNumber}!\n\nTo clear this stage, you must master all previous 9 chapters. Solve real-world architectural design, algorithms, and code optimization tasks.` 
            : `Welcome to Chapter ${chapterNumber} of GP Codecraft (by VM Dynamics).\n\nKey Focus Areas:\n- Fundamental Programming Concepts\n- Data Structure Optimization\n- Industry Standard Clean Code Practices for Level ${levelNumber}`,
        challengePrompt: isBossBattle ? `Write a clean function to optimize memory allocation in a distributed system.` : null
    };
}

// --- 1. Client-side Security & Anti-Cheat Logic ---
function initAntiCheat() {
    // Disable Right-Click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (
            (e.ctrlKey && ['c', 'v', 'x', 'u', 'C', 'V', 'X', 'U'].includes(e.key)) ||
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
    const onboardingModal = document.getElementById('userModal') || document.getElementById('onboarding-modal');
    if (!currentUser) {
        if (onboardingModal) onboardingModal.style.display = 'flex';
    } else {
        if (onboardingModal) onboardingModal.style.display = 'none';
        updateUserUI();
    }
}

function handleUserRegister(event) {
    event.preventDefault();
    const name = document.getElementById('uName')?.value || 'Developer';
    const email = document.getElementById('uEmail')?.value || '';
    const phone = document.getElementById('uPhone')?.value || '';
    const country = document.getElementById('uCountry')?.value || '';

    const userData = { name, email, phone, country, isPro: false, joinedAt: new Date().toISOString() };

    localStorage.setItem('gp_user', JSON.stringify(userData));
    currentUser = userData;

    const onboardingModal = document.getElementById('userModal') || document.getElementById('onboarding-modal');
    if (onboardingModal) onboardingModal.style.display = 'none';

    updateUserUI();
    loadChapterContent(1);
}

function updateUserUI() {
    const userNameEl = document.getElementById('displayUserName');
    if (userNameEl && currentUser) {
        userNameEl.innerText = currentUser.name;
    }
}

// --- 3. Sidebar Level & Chapter Rendering ---
function initLevelDropdown() {
    const levelSelect = document.getElementById('levelSelect');
    if (!levelSelect) return;

    levelSelect.innerHTML = '';
    for (let l = 1; l <= 100; l++) {
        const option = document.createElement('option');
        option.value = l;
        option.innerText = `Level ${l} ${l > userProgress.unlockedLevel ? '🔒' : '✅'}`;
        levelSelect.appendChild(option);
    }
    levelSelect.value = currentLevel;
    renderChapterList(currentLevel);
}

function onLevelChange(levelNum) {
    currentLevel = parseInt(levelNum);
    renderChapterList(currentLevel);
}

function renderChapterList(levelNum) {
    const chapterListEl = document.getElementById('chapterList');
    if (!chapterListEl) return;

    chapterListEl.innerHTML = '';
    const startChapter = (levelNum - 1) * 10 + 1;
    const endChapter = levelNum * 10;

    for (let c = startChapter; c <= endChapter; c++) {
        const isBoss = c % 10 === 0;
        const item = document.createElement('div');
        item.className = `chapter-item ${c === currentChapter ? 'active' : ''}`;
        item.innerText = `${isBoss ? '🔥 Boss' : 'Ch'} ${c}`;
        item.onclick = () => loadChapterContent(c);
        chapterListEl.appendChild(item);
    }
}

// --- 4. Chapter Loading & Pro Paywall Gate ---
function loadChapterContent(chapterNumber) {
    chapterNumber = parseInt(chapterNumber);
    if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 1000) return;

    currentChapter = chapterNumber;
    currentLevel = Math.ceil(chapterNumber / 10);

    // Update Dropdown Selection
    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) {
        levelSelect.value = currentLevel;
        renderChapterList(currentLevel);
    }

    // Paywall Gate: Free for first 50 chapters (Levels 1-5)
    if (chapterNumber > 50 && (!currentUser || !currentUser.isPro)) {
        const paywallModal = document.getElementById('paywallModal');
        if (paywallModal) {
            paywallModal.style.display = 'flex';
        } else {
            alert('🔒 Pro Feature Locked! Upgrade to unlock Chapters 51-1000.');
        }
        return;
    }

    const data = getChapterData(chapterNumber);
    const isBossBattle = chapterNumber % 10 === 0;

    const titleEl = document.getElementById('chapter-title');
    const contentEl = document.getElementById('chapter-content');
    const levelInfoEl = document.getElementById('level-info');

    if (titleEl) titleEl.innerText = `${isBossBattle ? '🔥 ' : ''}${data.title}`;
    if (contentEl) {
        contentEl.innerText = `${data.content}\n\n${isBossBattle ? '🎯 Boss Challenge: ' + data.challengePrompt : ''}`;
    }
    if (levelInfoEl) levelInfoEl.innerText = `Level ${currentLevel} - Chapter ${currentChapter}`;

    // Update Chapter Input Box Value
    const chapterInput = document.getElementById('chapterInput');
    if (chapterInput) chapterInput.value = currentChapter;
}

// Navigation Controls
function handleJump() {
    const inputField = document.getElementById('chapterInput');
    if (inputField) {
        loadChapterContent(inputField.value);
    }
}

function nextChapter() {
    loadChapterContent(currentChapter + 1);
}

function prevChapter() {
    if (currentChapter > 1) {
        loadChapterContent(currentChapter - 1);
    }
}

function triggerProPayment() {
    alert('Redirecting to VM Dynamics Payment Gateway...');
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initAntiCheat();
    checkOnboarding();
    initLevelDropdown();
    loadChapterContent(1);
});
