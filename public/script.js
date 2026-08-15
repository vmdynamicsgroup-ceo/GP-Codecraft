// Global State
let currentLevel = 1;
let currentChapter = 1;
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || null;
let currentPlanType = 'monthly';
let basePrice = 0.99;
let discountPercent = 0;
let associatedYoutuber = "";

document.addEventListener('DOMContentLoaded', () => {
    checkRegistration();
    initLevelDropdown();
    loadLevelChapters(1);
    loadChapterData(1, 1);
});

// Check if user is registered
function checkRegistration() {
    if (!currentUser) {
        document.getElementById('regModal').style.display = 'flex';
    } else {
        document.getElementById('userNameDisplay').textContent = currentUser.name;
        document.getElementById('regModal').style.display = 'none';
    }
}

// Handle Registration Submit
function handleRegistration(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const country = document.getElementById('regCountry').value;

    currentUser = { name, phone, email, country, isPro: false };
    localStorage.setItem('gp_user', JSON.stringify(currentUser));
    
    // Save to all students list for admin review
    let allStudents = JSON.parse(localStorage.getItem('gp_all_students')) || [];
    allStudents.push({ ...currentUser, registeredAt: new Date().toLocaleString() });
    localStorage.setItem('gp_all_students', JSON.stringify(allStudents));

    document.getElementById('userNameDisplay').textContent = name;
    document.getElementById('regModal').style.display = 'none';
}

// Initialize Level Dropdown (1 to 100)
function initLevelDropdown() {
    const select = document.getElementById('levelSelect');
    select.innerHTML = '';
    for (let i = 1; i <= 100; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = `Level ${i}`;
        select.appendChild(option);
    }
}

// When Level Changes
function onLevelChange(levelVal) {
    levelVal = parseInt(levelVal);
    // Check if level > 5 and user is not Pro
    if (levelVal > 5 && (!currentUser || !currentUser.isPro)) {
        document.getElementById('levelSelect').value = currentLevel; // Revert selection
        document.getElementById('premiumModal').style.display = 'flex';
        return;
    }

    currentLevel = levelVal;
    document.getElementById('levelBadge').textContent = `Level ${currentLevel}`;
    document.getElementById('topicTag').textContent = `LEVEL ${currentLevel}`;
    loadLevelChapters(currentLevel);
}

// Load Chapters for Sidebar (10 Chapters per Level)
function loadLevelChapters(level) {
    const list = document.getElementById('chapterList');
    list.innerHTML = '';
    
    let startChapter = (level - 1) * 10 + 1;
    for (let i = 0; i < 10; i++) {
        let chapNum = startChapter + i;
        let div = document.createElement('div');
        div.className = `chapter-item ${chapNum === currentChapter ? 'active' : ''}`;
        div.textContent = `Chapter ${chapNum}: Core Concept ${chapNum}`;
        div.onclick = () => {
            if (chapNum > 50 && (!currentUser || !currentUser.isPro)) {
                document.getElementById('premiumModal').style.display = 'flex';
                return;
            }
            loadChapterData(level, chapNum);
        };
        list.appendChild(div);
    }
}

// Load Chapter Details
function loadChapterData(level, chapterNum) {
    currentChapter = chapterNum;
    document.getElementById('chapterTitle').textContent = `Chapter ${chapterNum}: Programming Fundamentals`;
    document.getElementById('chapterDescription').textContent = `Learn and practice essential concepts for Level ${level}, Chapter ${chapterNum}.`;
    
    document.querySelectorAll('.chapter-item').forEach((item, index) => {
        if (index === (chapterNum - 1) % 10) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Handle Jump Chapter Input Box
function handleJump() {
    let inputVal = parseInt(document.getElementById('chapterInput').value);
    if (inputVal > 50 && (!currentUser || !currentUser.isPro)) {
        document.getElementById('premiumModal').style.display = 'flex';
        return;
    }
    if (inputVal >= 1 && inputVal <= 1000) {
        let targetLevel = Math.ceil(inputVal / 10);
        document.getElementById('levelSelect').value = targetLevel;
        onLevelChange(targetLevel);
        loadChapterData(targetLevel, inputVal);
    } else {
        alert('Please enter a chapter number between 1 and 1000.');
    }
}

// Select Plan in Premium Modal
function selectPlan(type, price) {
    currentPlanType = type;
    basePrice = price;
    document.getElementById('selectedPlanName').textContent = type === 'monthly' ? 'Monthly Plan' : 'Yearly Plan';
    updateFinalPriceDisplay();
    document.getElementById('paymentMethods').style.display = 'block';
    renderPaymentOptions();
}

// Apply Promo Code (Must be ALL CAPS, NO SPACES)
function applyPromo() {
    let code = document.getElementById('promoInput').value.trim();
    if (code === code.toUpperCase() && code.length > 0 && !code.includes(' ')) {
        discountPercent = 5;
        associatedYoutuber = code;
        document.getElementById('promoMsg').textContent = `Success! 5% discount applied via creator: ${code} (10% commission assigned).`;
        updateFinalPriceDisplay();
    } else {
        alert('Invalid Promo Code! It must be in ALL CAPS with NO spaces (e.g. VMCODER).');
    }
}

function updateFinalPriceDisplay() {
    let final = basePrice - (basePrice * discountPercent / 100);
    document.getElementById('finalPrice').textContent = `$${final.toFixed(2)}`;
}

// Render Payment Options based on User Country
function renderPaymentOptions() {
    const container = document.getElementById('countryPayOptions');
    container.innerHTML = '';
    let country = currentUser ? currentUser.country : 'India';

    let options = [];
    if (country === 'India') {
        options = ['Google Pay / PhonePe (UPI)', 'Paytm / NetBanking', 'Credit / Debit Card'];
    } else if (country === 'Bangladesh') {
        options = ['bKash', 'Nagad', 'Rocket', 'International Card'];
    } else {
        options = ['PayPal', 'Credit / Debit Card (Stripe)'];
    }

    options.forEach(opt => {
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pay-btn';
        btn.textContent = `Pay with ${opt}`;
        btn.onclick = () => processMockPayment(opt);
        container.appendChild(btn);
    });
}

function processMockPayment(method) {
    alert(`Redirecting to secure gateway via ${method}... Payment Successful! You are now a Pro Member.`);
    currentUser.isPro = true;
    localStorage.setItem('gp_user', JSON.stringify(currentUser));
    document.getElementById('premiumModal').style.display = 'none';
}

function closePremiumModal() {
    document.getElementById('premiumModal').style.display = 'none';
}

// Run Code
function runCode() {
    let code = document.getElementById('codeEditor').value;
    let outputBox = document.getElementById('consoleOutput');
    try {
        let logs = [];
        let originalLog = console.log;
        console.log = (arg) => logs.push(arg);
        new Function(code)();
        console.log = originalLog;
        outputBox.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed successfully with no output.';
    } catch (err) {
        outputBox.textContent = `Error: ${err.message}`;
    }
}

// AI Mentor with Line-by-Line Breakdown
function askAI() {
    let code = document.getElementById('codeEditor').value;
    let aiResponse = document.getElementById('aiResponse');
    
    let lines = code.split('\n');
    let explanationHTML = "<strong>🤖 Gemini AI Line-by-Line Breakdown:</strong><br>";
    
    lines.forEach((line, index) => {
        if (line.trim().length > 0) {
            explanationHTML += `<code>Line ${index + 1}: ${line.trim()}</code><br>&nbsp;&nbsp;&nbsp;↳ <em>Why:</em> Executes this specific expression to handle logic.<br>`;
        }
    });

    aiResponse.innerHTML = explanationHTML || "Please write some code in the playground first!";
}
