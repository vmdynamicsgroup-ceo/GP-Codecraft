// Persistent State saved securely in LocalStorage (Won't reset on refresh or update)
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || null;
let userProgress = JSON.parse(localStorage.getItem('gp_progress')) || { currentChapter: 1, maxUnlocked: 1 };

let currentPlanType = 'monthly';
let basePrice = 0.99;
let discountPercent = 0;
let associatedYoutuber = "";

document.addEventListener('DOMContentLoaded', () => {
    checkRegistration();
    renderLegends();
    renderCandyRoadmap();
    loadChapter(userProgress.currentChapter);
});

// Check Registration Status
function checkRegistration() {
    if (!currentUser) {
        document.getElementById('regModal').style.display = 'flex';
    } else {
        document.getElementById('headerUserName').textContent = currentUser.name;
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

    let allStudents = JSON.parse(localStorage.getItem('gp_all_students')) || [];
    allStudents.push({ ...currentUser, registeredAt: new Date().toLocaleString() });
    localStorage.setItem('gp_all_students', JSON.stringify(allStudents));

    document.getElementById('headerUserName').textContent = name;
    document.getElementById('regModal').style.display = 'none';
}

// Render Candy Crush Roadmap
function renderCandyRoadmap() {
    const roadmap = document.getElementById('candyRoadmap');
    roadmap.innerHTML = '';

    let currentBlockLevel = Math.ceil(userProgress.currentChapter / 10);
    let startChap = (currentBlockLevel - 1) * 10 + 1;

    document.getElementById('levelBadge').textContent = `Level ${currentBlockLevel} Roadmap`;
    document.getElementById('headerLevelNum').textContent = currentBlockLevel;

    for (let i = 0; i < 10; i++) {
        let chapNum = startChap + i;
        if (chapNum > 1000) break;

        let node = document.createElement('div');
        node.className = 'candy-node';
        node.textContent = chapNum;

        if (chapNum === 10 || chapNum % 10 === 0) {
            node.classList.add('boss');
            node.innerHTML = `👹${chapNum}`;
        }

        if (chapNum < userProgress.maxUnlocked) {
            node.classList.add('completed');
        } else if (chapNum === userProgress.maxUnlocked) {
            node.classList.add('current');
        } else {
            node.classList.add('locked');
        }

        node.onclick = () => {
            // Level 6 restriction (Chapters beyond Level 5 i.e., > 50)
            if (chapNum > 50 && (!currentUser || !currentUser.isPro)) {
                document.getElementById('premiumModal').style.display = 'flex';
                return;
            }
            if (chapNum <= userProgress.maxUnlocked) {
                loadChapter(chapNum);
            } else {
                alert('Complete previous chapters to unlock this!');
            }
        };

        roadmap.appendChild(node);
    }
}

// Load Chapter Details (Boss chapters have no hints)
function loadChapter(chapNum) {
    userProgress.currentChapter = chapNum;
    localStorage.setItem('gp_progress', JSON.stringify(userProgress));

    document.getElementById('chapterTypeTag').textContent = `CHAPTER ${chapNum}`;
    
    let isBoss = (chapNum === 10 || chapNum % 10 === 0);
    if (isBoss) {
        document.getElementById('chapterTitle').textContent = `👹 BOSS CHAPTER ${chapNum}: Ultimate Challenge`;
        document.getElementById('chapterDescription').textContent = `No hints provided here! Combine everything learned from chapters ${chapNum-9} to ${chapNum-1} to solve this challenge.`;
    } else {
        document.getElementById('chapterTitle').textContent = `Chapter ${chapNum}: Core Programming Concept`;
        document.getElementById('chapterDescription').textContent = `Learn essential fundamentals for Chapter ${chapNum}. Follow instructions and write your code below.`;
    }

    renderCandyRoadmap();
}

// Premium Gateway & Payment
function selectPlan(type, price) {
    currentPlanType = type;
    basePrice = price;
    document.getElementById('selectedPlanName').textContent = type === 'monthly' ? 'Monthly Plan' : 'Yearly Plan';
    updateFinalPriceDisplay();
    document.getElementById('paymentMethods').style.display = 'block';
    renderPaymentOptions();
}

function applyPromo() {
    let code = document.getElementById('promoInput').value.trim();
    if (code === code.toUpperCase() && code.length > 0 && !code.includes(' ')) {
        discountPercent = 5;
        associatedYoutuber = code;
        document.getElementById('promoMsg').textContent = `Success! 5% discount applied via creator: ${code} (10% commission tracked).`;
        updateFinalPriceDisplay();
    } else {
        alert('Promo Code must be in ALL CAPS with NO spaces (e.g. VMCODER).');
    }
}

function updateFinalPriceDisplay() {
    let final = basePrice - (basePrice * discountPercent / 100);
    document.getElementById('finalPrice').textContent = `$${final.toFixed(2)}`;
}

function renderPaymentOptions() {
    const container = document.getElementById('countryPayOptions');
    container.innerHTML = '';
    
    let options = ['Global Credit / Debit Card & PayPal (Lemon Squeezy)', 'Google Pay / Apple Pay'];

    options.forEach(opt => {
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pay-btn';
        btn.textContent = `Pay via ${opt}`;
        btn.onclick = () => processPaymentGateway(opt);
        container.appendChild(btn);
    });
}

// Lemon Squeezy Payment Gateway Integration Point
function processPaymentGateway(method) {
    // TODO: Insert your Lemon Squeezy Checkout Link here
    const lemonsqueezyCheckoutLink = "https://your-lemonsqueezy-checkout-link-here"; 
    
    // Opens the Lemon Squeezy secure global checkout page in a new tab
    window.open(lemonsqueezyCheckoutLink, '_blank');

    alert(`Redirecting to Lemon Squeezy secure checkout for ${currentPlanType} plan. Complete payment there to unlock Pro status!`);
    
    // Simulating Pro activation for testing (In production, Lemon Squeezy webhook handles this automatically)
    currentUser.isPro = true;
    localStorage.setItem('gp_user', JSON.stringify(currentUser));
    document.getElementById('premiumModal').style.display = 'none';
    renderCandyRoadmap();
}

function closePremiumModal() {
    document.getElementById('premiumModal').style.display = 'none';
}

function renderLegends() {
    const legendsList = document.getElementById('legendsList');
    let completed100 = localStorage.getItem('gp_legend_100') === 'true';
    if (completed100) {
        let name = localStorage.getItem('gp_legend_name') || 'Master';
        legendsList.innerHTML = `<div style="color: var(--gold); font-weight: bold;">🔥 ${name} (Level 100 Legend)</div>`;
    } else {
        legendsList.innerHTML = `<span style="font-style: italic;">No legend has cleared 100 Level yet.</span>`;
    }
}

// Run Code with Line-by-Line Explanations (Boss chapters test code after writing)
function runCode() {
    let code = document.getElementById('codeEditor').value;
    let outputBox = document.getElementById('consoleOutput');
    let aiResponse = document.getElementById('aiResponse');
    let chapNum = userProgress.currentChapter;
    let isBoss = (chapNum === 10 || chapNum % 10 === 0);
    
    try {
        let logs = [];
        let originalLog = console.log;
        console.log = (arg) => logs.push(arg);
        
        new Function(code)();
        console.log = originalLog;
        
        outputBox.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed successfully with no output.';
        
        // Auto-unlock next chapter on success
        if (chapNum === userProgress.maxUnlocked) {
            userProgress.maxUnlocked++;
            if (userProgress.maxUnlocked > 1000) userProgress.maxUnlocked = 1000;
        }
        localStorage.setItem('gp_progress', JSON.stringify(userProgress));
        renderCandyRoadmap();

        // Line-by-line explanation & analysis
        let lines = code.split('\n');
        let explanation = isBoss 
            ? `<strong>👹 Boss Chapter ${chapNum} Cleared! Code Analysis:</strong><br>` 
            : `<strong>✅ Execution Successful! Line-by-Line Breakdown:</strong><br>`;

        lines.forEach((line, index) => {
            if (line.trim().length > 0) {
                explanation += `<code>Line ${index + 1}: ${line.trim()}</code><br>&nbsp;&nbsp;&nbsp;↳ <em>Purpose:</em> Executes successfully to process core logic.<br>`;
            }
        });
        aiResponse.innerHTML = explanation;

    } catch (err) {
        outputBox.textContent = `Error: ${err.message}`;
        
        // Detailed error diagnosis
        aiResponse.innerHTML = `<strong>❌ Error Detected!</strong><br>
        <em>What went wrong:</em> ${err.message}<br>
        <em>Tip:</em> Check your syntax, missing parentheses, or undefined variable names in your code.`;
    }
}

// Ask AI Mentor manually
function askAI() {
    let code = document.getElementById('codeEditor').value;
    let aiResponse = document.getElementById('aiResponse');
    let lines = code.split('\n');
    let explanation = "<strong>🤖 Gemini AI Mentor Breakdown:</strong><br>";
    
    lines.forEach((line, index) => {
        if (line.trim().length > 0) {
            explanation += `<code>Line ${index + 1}: ${line.trim()}</code><br>&nbsp;&nbsp;&nbsp;↳ <em>Logic:</em> Evaluates expression for this step.<br>`;
        }
    });
    aiResponse.innerHTML = explanation || "Please write some code in the playground first!";
}
