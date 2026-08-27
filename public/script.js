// Persistent State saved securely in LocalStorage
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || null;
let userProgress = JSON.parse(localStorage.getItem('gp_progress')) || { currentChapter: 1, maxUnlocked: 1 };
let currentLang = localStorage.getItem('gp_lang') || 'en';

let translations = {
  en: {
    poweredBy: "Powered by VM Dynamics",
    welcomePop: "🎉 Welcome to GP Codecraft!",
    selectCountry: "Select Country",
    startJourneyBtn: "Start Journey 🚀",
    unlockProTitle: "Unlock Pro Membership",
    unlockProDesc: "You have completed Level 5 (50 Chapters)! Upgrade to unlock up to Level 100.",
    monthlyPlan: "Monthly Plan",
    yearlyPlan: "Yearly Plan",
    bestValue: "Best Value",
    closeBtn: "Close",
    contactUsTitle: "Contact Us",
    contactUsDesc: "For any queries, reach out to us at:",
    termsTitle: "Terms & Conditions",
    termsText: "By using GP Codecraft (powered by VM Dynamics), you agree to our policies. Once you reach Level 100, subscription charges stop permanently.",
    levelLabel: "Level",
    menuContact: "Contact Us",
    menuTerms: "Terms & Conditions",
    codePlayground: "💻 Code Playground",
    runBtn: "▶ Run & Submit Code",
    aiBtn: "✨ AI Mentor Help",
    terminalTitle: "TERMINAL OUTPUT & ERROR CHECKER:",
    terminalDefault: "Click 'Run & Submit Code' to test your logic.",
    aiMentorTitle: "🤖 Gemini AI Mentor & Explainer",
    aiDefaultText: "Write code and click 'AI Mentor Help' to understand line-by-line logic or fix errors!"
  },
  bn: {
    poweredBy: "ভিএম ডায়নামিকস দ্বারা পরিচালিত",
    welcomePop: "🎉 জিপি কোডক্রাফটে স্বাগতম!",
    selectCountry: "দেশ নির্বাচন করুন",
    startJourneyBtn: "যাত্রা শুরু করুন 🚀",
    unlockProTitle: "প্রো মেম্বারশিপ আনলক করুন",
    unlockProDesc: "আপনি লেভেল ৫ সম্পন্ন করেছেন! লেভেল ১০০ পর্যন্ত আনলক করতে আপগ্রেড করুন।",
    monthlyPlan: "মাসিক প্ল্যান",
    yearlyPlan: "বার্ষিক প্ল্যান",
    bestValue: "সেরা মূল্য",
    closeBtn: "বন্ধ করুন",
    contactUsTitle: "যোগাযোগ করুন",
    contactUsDesc: "যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন:",
    termsTitle: "শর্তাবলী",
    termsText: "১০০ লেভেল পার হয়ে গেলে আপনার সাবস্ক্রিপশন চার্জ চিরতরে বন্ধ হয়ে যাবে।",
    levelLabel: "লেভেল",
    menuContact: "যোগাযোগ করুন",
    menuTerms: "শর্তাবলী",
    codePlayground: "💻 কোড প্লেগ্রাউন্ড",
    runBtn: "▶ কোড রান ও সাবমিট করুন",
    aiBtn: "✨ এআই মেন্টর সাহায্য",
    terminalTitle: "টার্মিনাল আউটপুট এবং এরর চেকার:",
    terminalDefault: "'Run & Submit Code' এ ক্লিক করে আপনার লজিক টেস্ট করুন।",
    aiMentorTitle: "🤖 জেমিনি এআই মেন্টর ও ব্যাখ্যা",
    aiDefaultText: "কোড লিখে 'AI Mentor Help' এ ক্লিক করুন এবং লজিক বুঝে নিন!"
  },
  hi: {
    poweredBy: "वीएम डायनामिक्स द्वारा संचालित",
    welcomePop: "🎉 जीपी कोडक्राफ्ट में आपका स्वागत है!",
    selectCountry: "देश चुनें",
    startJourneyBtn: "यात्रा शुरू करें 🚀",
    unlockProTitle: "प्रो सदस्यता अनलॉक करें",
    unlockProDesc: "आपने लेवल 5 पूरा कर लिया है! लेवल 100 तक अनलॉक करें।",
    monthlyPlan: "मासिक योजना",
    yearlyPlan: "वार्षिक योजना",
    bestValue: "सर्वश्रेष्ठ मूल्य",
    closeBtn: "बंद करें",
    contactUsTitle: "संपर्क करें",
    contactUsDesc: "किसी भी प्रश्न के लिए संपर्क करें:",
    termsTitle: "नियम और शर्तें",
    termsText: "लेवल 100 पार होने पर सदस्यता शुल्क स्वचालित रूप से बंद हो जाएगा।",
    levelLabel: "स्तर",
    menuContact: "संपर्क करें",
    menuTerms: "नियम और शर्तें",
    codePlayground: "💻 कोड ग्राउंड",
    runBtn: "▶ कोड चलाएं",
    aiBtn: "✨ एआई मेंटर",
    terminalTitle: "आउटपुट:",
    terminalDefault: "लॉजिक टेस्ट करने के लिए रन करें।",
    aiMentorTitle: "🤖 एआई मेंटर",
    aiDefaultText: "कोड लिखें और मेंटर की मदद लें!"
  }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('langSwitch').value = currentLang;
    applyLanguage(currentLang);
    checkRegistration();
    renderCandyRoadmap();
    loadChapter(userProgress.currentChapter);
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gp_lang', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
}

function checkRegistration() {
    if (!currentUser) {
        document.getElementById('regModal').style.display = 'flex';
    } else {
        document.getElementById('headerUserName').textContent = currentUser.name;
        document.getElementById('regModal').style.display = 'none';
    }
}

function handleRegistration(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const country = document.getElementById('regCountry').value;

    currentUser = { name, phone, email, country, isPro: false, subscriptionActive: true };
    localStorage.setItem('gp_user', JSON.stringify(currentUser));

    document.getElementById('headerUserName').textContent = name;
    document.getElementById('regModal').style.display = 'none';
}

function toggleMenu() {
    let menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function openContactModal() {
    document.getElementById('contactModal').style.display = 'flex';
    document.getElementById('dropdownMenu').style.display = 'none';
}
function closeContactModal() { document.getElementById('contactModal').style.display = 'none'; }

function openTermsModal() {
    document.getElementById('termsModal').style.display = 'flex';
    document.getElementById('dropdownMenu').style.display = 'none';
}
function closeTermsModal() { document.getElementById('termsModal').style.display = 'none'; }
function closePremiumModal() { document.getElementById('premiumModal').style.display = 'none'; }

function renderCandyRoadmap() {
    const roadmap = document.getElementById('candyRoadmap');
    roadmap.innerHTML = '';

    let currentBlockLevel = Math.ceil(userProgress.currentChapter / 10);
    let startChap = (currentBlockLevel - 1) * 10 + 1;

    document.getElementById('levelBadge').textContent = `Level ${currentBlockLevel} Roadmap`;
    document.getElementById('headerLevelNum').textContent = currentBlockLevel;

    for (let i = 0; i < 10; i++) {
        let chapNum = startChap + i;
        if (chapNum > 100) break;

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
            let userLevel = Math.ceil(chapNum / 10);
            if (userLevel > 5 && currentUser && currentUser.subscriptionActive) {
                if (userProgress.maxUnlocked > 100) {
                    currentUser.subscriptionActive = false;
                    localStorage.setItem('gp_user', JSON.stringify(currentUser));
                }
            }

            if (userLevel > 5 && (!currentUser || !currentUser.isPro)) {
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

function loadChapter(chapNum) {
    userProgress.currentChapter = chapNum;
    localStorage.setItem('gp_progress', JSON.stringify(userProgress));

    document.getElementById('chapterTypeTag').textContent = `CHAPTER ${chapNum}`;
    
    let isBoss = (chapNum === 10 || chapNum % 10 === 0);
    if (isBoss) {
        document.getElementById('chapterTitle').textContent = `👹 BOSS CHAPTER ${chapNum}: Ultimate Challenge`;
        document.getElementById('chapterDescription').textContent = `No hints provided here! Combine everything learned from chapters ${chapNum-9} to ${chapNum-1} to solve this master challenge successfully.`;
    } else {
        let stepInBlock = ((chapNum - 1) % 10) + 1;
        document.getElementById('chapterTitle').textContent = `Chapter ${chapNum}: Fundamental Task #${stepInBlock}`;
        document.getElementById('chapterDescription').textContent = `Instructions for Chapter ${chapNum}: Write clean code to fulfill this step's logic based on core programming principles.`;
    }

    renderCandyRoadmap();
}

function selectPlan(type, price) {
    document.getElementById('selectedPlanName').textContent = type === 'monthly' ? 'Monthly Plan' : 'Yearly Plan';
    document.getElementById('finalPrice').textContent = `₹${price}`;
    document.getElementById('paymentMethods').style.display = 'block';
    
    const container = document.getElementById('countryPayOptions');
    container.innerHTML = `<button type="button" class="btn btn-success" onclick="openRazorpayPayment('${type}', ${price})">Pay with Razorpay (₹${price})</button>`;
}

// ==========================================
// RAZORPAY PAYMENT INTEGRATION
// ==========================================
function openRazorpayPayment(planType, amount) {
    var options = {
        "key": "YOUR_API_KEY", // <-- এখানে তোর Razorpay API Key বসাবি (যেমন: rzp_live_xxxxx বা rzp_test_xxxxx)
        "amount": amount * 100, // পয়সায় রূপান্তরিত (₹৯৯ হলে ৯৯০০ পয়সা)
        "currency": "INR",
        "name": "GP Codecraft",
        "description": "Pro Membership (" + planType + ")",
        "image": "https://via.placeholder.com/150",
        "handler": function (response){
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            
            // সাবস্ক্রিপশন ও প্রিমিয়াম স্ট্যাটাস আপডেট
            currentUser.isPro = true;
            currentUser.subscriptionActive = true;
            localStorage.setItem('gp_user', JSON.stringify(currentUser));
            
            document.getElementById('premiumModal').style.display = 'none';
            renderCandyRoadmap();
            alert("Pro membership unlocked successfully!");
        },
        "prefill": {
            "name": currentUser ? currentUser.name : "Student",
            "email": currentUser ? currentUser.email : "student@example.com",
            "contact": currentUser ? currentUser.phone : "9999999999"
        },
        "theme": {
            "color": "#0284c7"
        }
    };
    
    var rzp = new Razorpay(options);
    rzp.open();
}

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
        
        if (chapNum === userProgress.maxUnlocked) {
            userProgress.maxUnlocked++;
            
            // ১০০ লেভেল পার হয়ে গেলে সাবস্ক্রিপশন চার্জ বা বিলিং অটোমেটিক বন্ধ হয়ে যাওয়া
            if (userProgress.maxUnlocked > 100) {
                userProgress.maxUnlocked = 100;
                if (currentUser) {
                    currentUser.subscriptionActive = false; 
                    localStorage.setItem('gp_user', JSON.stringify(currentUser));
                }
                alert("🏆 Congratulations! You have completed all 100 levels. Your subscription billing is now permanently stopped.");
            }
        }
        
        localStorage.setItem('gp_progress', JSON.stringify(userProgress));
        renderCandyRoadmap();

        let lines = code.split('\n');
        let explanation = isBoss 
            ? `<strong>👹 Boss Chapter ${chapNum} Cleared Successfully! Code Analysis:</strong><br>` 
            : `<strong>✅ Execution Successful! Line-by-Line Breakdown:</strong><br>`;

        lines.forEach((line, index) => {
            if (line.trim().length > 0) {
                explanation += `<code>Line ${index + 1}: ${line.trim()}</code><br>&nbsp;&nbsp;&nbsp;↳ <em>Purpose:</em> Executes successfully to process core logic.<br>`;
            }
        });
        aiResponse.innerHTML = explanation;

    } catch (err) {
        outputBox.textContent = `Error: ${err.message}`;
        aiResponse.innerHTML = `<strong>❌ Error Detected!</strong><br><em>What went wrong:</em> ${err.message}<br><em>Tip:</em> Check your syntax or variable names.`;
    }
}

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
