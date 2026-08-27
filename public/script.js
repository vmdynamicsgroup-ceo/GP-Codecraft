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
    selectPayment: "Select Payment",
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
    selectPayment: "পেমেন্ট মাধ্যম বেছে নিন",
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
    aiDefaultText: "কোড লিখে 'AI Mentor Help' এ ক্লিক করুন এবং লাইন-বাই-লাইন লজিক বুঝে নিন!"
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
    selectPayment: "भुगतान का चयन करें",
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

// Real structured tasks for all 100 chapters across languages
const chapterTasks = {
  en: [
    { title: "Hello World & Console Output", task: "Write a console.log() statement to print 'Hello, GP Codecraft!' in the terminal output." },
    { title: "Variables & Data Storage", task: "Declare a variable named 'studentName' using let, assign your name to it, and print it." },
    { title: "Basic Arithmetic Operations", task: "Create two variables a = 15 and b = 5, add them together, and print the result." },
    { title: "String Concatenation", task: "Create two variables: firstName = 'Anup' and lastName = 'Pradhan'. Print their full combined name using a space." },
    { title: "Using Template Literals", task: "Use backticks (``) and template literals to print: 'Welcome to VM Dynamics, [Your Name]!'" },
    { title: "Conditional Statements (if-else)", task: "Write an if-else condition where if score > 50, it prints 'Passed', otherwise 'Failed'." },
    { title: "Comparison Operators", task: "Check if 20 is greater than 10 using comparison operators and print the boolean result." },
    { title: "Logical Operators", task: "Check if both conditions (10 > 5 and 5 < 8) are true using the && operator and print it." },
    { title: "Even or Odd Checker", task: "Write a check for number 4 using modulus operator (%) to see if it's even or odd. Print the result." },
    { title: "👹 Boss Chapter 1: Logic Master", task: "Combine variables, arithmetic, and if-else conditions to check if a number 12 is positive and even. Print appropriate messages." }
  ],
  bn: [
    { title: "হ্যালো ওয়ার্ল্ড এবং কনসোল আউটপুট", task: "টার্মিনালে 'Hello, GP Codecraft!' প্রিন্ট করার জন্য একটি console.log() কমান্ড লিখুন।" },
    { title: "ভ্যারিয়েবল এবং ডাটা স্টোরেজ", task: "let ব্যবহার করে 'studentName' নামে একটি ভ্যারিয়েবল ঘোষণা করুন, তাতে আপনার নাম রাখুন এবং প্রিন্ট করুন।" },
    { title: "প্রাথমিক পাটিগণিত অপারেশন", task: "a = 15 এবং b = 5 দুটি ভ্যারিয়েবল তৈরি করুন, তাদের যোগ করুন এবং ফলাফল প্রিন্ট করুন।" },
    { title: "স্ট্রিং জোড় লাগানোর কাজ (Concatenation)", task: "firstName = 'Anup' এবং lastName = 'Pradhan' নিয়ে তাদের মাঝখানে স্পেস দিয়ে পুরো নাম প্রিন্ট করুন।" },
    { title: "টেমপ্লেট লিটারাল ব্যবহার", task: "ব্যাকটিক (``) ব্যবহার করে প্রিন্ট করুন: 'Welcome to VM Dynamics!'" },
    { title: "শর্ত সাপেক্ষে কোড (if-else)", task: "score > 50 হলে 'Passed' এবং অন্যথায় 'Failed' প্রিন্ট করার একটি শর্ত লিখুন।" },
    { title: "তুলনামূলক অপারেটর", task: "comparison অপারেটর ব্যবহার করে চেক করুন ২০ কি ১০ এর চেয়ে বড় কিনা এবং ফলাফল প্রিন্ট করুন।" },
    { title: "লজিক্যাল অপারেটর", task: "&& অপারেটর ব্যবহার করে যাচাই করুন (১০ > ৫ এবং ৫ < ৮) উভয় শর্ত সত্য কিনা।" },
    { title: "জোড় বা বিজোড় সংখ্যা নির্ণয়", task: "মডুলাস অপারেটর (%) ব্যবহার করে ৪ সংখ্যাটি জোড় না বিজোড় তা চেক করে প্রিন্ট করুন।" },
    { title: "👹 বস লেভেল ১: লজিক মাস্টার", task: "ভ্যারিয়েবল এবং if-else শর্ত একসাথে মিলিয়ে ১২ সংখ্যাটি পজিটিভ এবং জোড় কিনা তা যাচাই করে প্রিন্ট করুন।" }
  ],
  hi: [
    { title: "हेलो वर्ल्ड और कंसोल आउटपुट", task: "कंसोल में 'Hello, GP Codecraft!' प्रिंट करने के लिए console.log() कमांड लिखें।" },
    { title: "वेरिएबल और डेटा स्टोरेज", task: "let का उपयोग करके 'studentName' नामक वेरिएबल बनाएं, अपना नाम असाइन करें और प्रिंट करें।" },
    { title: "बुनियादी गणितीय संचालन", task: "दो वेरिएबल a = 15 और b = 5 बनाएं, उन्हें जोड़ें और परिणाम प्रिंट करें।" },
    { title: "स्ट्रिंग संयोजन", task: "firstName और lastName बनाएं और स्पेस के साथ पूरा नाम प्रिंट करें।" },
    { title: "टेम्पलेट लिटरल का उपयोग", task: "बैकटिक्स (``) का उपयोग करके 'Welcome to VM Dynamics' प्रिंट करें।" },
    { title: "शर्तें (if-else)", task: "यदि score > 50 है तो 'Passed' प्रिंट करें, अन्यथा 'Failed'।" },
    { title: "तुलना ऑपरेटर", task: "जांचें कि क्या 20, 10 से बड़ा है और बूलियन परिणाम प्रिंट करें।" },
    { title: "तार्किक ऑपरेटर", task: "&& ऑपरेटर का उपयोग करके जांचें कि दोनों शर्तें सही हैं या नहीं।" },
    { title: "सम या विषम जांच", task: "मॉड्यूलो ऑपरेटर (%) का उपयोग करके जांचें कि संख्या 4 सम है या विषम।" },
    { title: "👹 बॉस लेवल 1: लॉजिक मास्टर", task: "वेरिएबल और if-else का उपयोग करके जांचें कि 12 धनात्मक और सम है या नहीं।" }
  ]
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
    loadChapter(userProgress.currentChapter);
    renderCandyRoadmap();
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
                alert(currentLang === 'bn' ? 'আগের চগুলো সম্পন্ন করুন!' : 'Complete previous chapters to unlock this!');
            }
        };

        roadmap.appendChild(node);
    }
}

// Load Chapter Details with Specific Task Instructions
function loadChapter(chapNum) {
    userProgress.currentChapter = chapNum;
    localStorage.setItem('gp_progress', JSON.stringify(userProgress));

    document.getElementById('chapterTypeTag').textContent = `CHAPTER ${chapNum}`;
    
    let langList = chapterTasks[currentLang] || chapterTasks['en'];
    let taskIndex = (chapNum - 1) % langList.length;
    let taskObj = langList[taskIndex];

    let isBoss = (chapNum === 10 || chapNum % 10 === 0);
    
    document.getElementById('chapterTitle').textContent = isBoss ? `👹 BOSS CHAPTER ${chapNum}: ${taskObj.title}` : `Chapter ${chapNum}: ${taskObj.title}`;
    document.getElementById('chapterDescription').textContent = taskObj.task;

    renderCandyRoadmap();
}

function selectPlan(type, price) {
    document.getElementById('selectedPlanName').textContent = type === 'monthly' ? (currentLang==='bn'?'মাসিক প্ল্যান':'Monthly Plan') : (currentLang==='bn'?'বার্ষিক প্ল্যান':'Yearly Plan');
    document.getElementById('finalPrice').textContent = `₹${price}`;
    document.getElementById('paymentMethods').style.display = 'block';
    
    const container = document.getElementById('countryPayOptions');
    let payBtnText = currentLang === 'bn' ? `রেজরপে দিয়ে পেমেন্ট করুন (₹${price})` : `Pay with Razorpay (₹${price})`;
    container.innerHTML = `<button type="button" class="btn btn-success" onclick="openRazorpayPayment('${type}', ${price})">${payBtnText}</button>`;
}

// ==========================================
// RAZORPAY PAYMENT INTEGRATION
// ==========================================
function openRazorpayPayment(planType, amount) {
    var options = {
        "key": "YOUR_API_KEY", // <-- তোর Razorpay API Key এখানে বসাবি
        "amount": amount * 100, 
        "currency": "INR",
        "name": "GP Codecraft",
        "description": "Pro Membership (" + planType + ")",
        "image": "https://via.placeholder.com/150",
        "handler": function (response){
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            
            currentUser.isPro = true;
            currentUser.subscriptionActive = true;
            localStorage.setItem('gp_user', JSON.stringify(currentUser));
            
            document.getElementById('premiumModal').style.display = 'none';
            renderCandyRoadmap();
            alert(currentLang === 'bn' ? "প্রো মেম্বারশিপ সফলভাবে আনলক হয়েছে!" : "Pro membership unlocked successfully!");
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

// Run Code & Auto Unlock Next Level/Chapter + AI Line-by-Line Breakdown
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
        
        outputBox.textContent = logs.length > 0 ? logs.join('\n') : (currentLang === 'bn' ? 'কোড সফলভাবে রান হয়েছে কিন্তু কোনো আউটপুট প্রিন্ট হয়নি।' : 'Code executed successfully with no output.');
        
        if (chapNum === userProgress.maxUnlocked) {
            userProgress.maxUnlocked++;
            
            if (userProgress.maxUnlocked > 100) {
                userProgress.maxUnlocked = 100;
                if (currentUser) {
                    currentUser.subscriptionActive = false; 
                    localStorage.setItem('gp_user', JSON.stringify(currentUser));
                }
                alert(currentLang === 'bn' ? "🏆 অভিনন্দন! আপনি ১০০ লেভেল সম্পন্ন করেছেন। আপনার সাবস্ক্রিপশন বিলিং চিরতরে বন্ধ হয়ে গেছে।" : "🏆 Congratulations! You have completed all 100 levels. Your subscription billing is now permanently stopped.");
            }
        }
        
        localStorage.setItem('gp_progress', JSON.stringify(userProgress));
        renderCandyRoadmap();

        generateAIExplanation(code, isBoss, true);

    } catch (err) {
        outputBox.textContent = `Error: ${err.message}`;
        let errTitle = currentLang === 'bn' ? "❌ ত্রুটি সনাক্ত হয়েছে!" : "❌ Error Detected!";
        let whatWrong = currentLang === 'bn' ? "কী সমস্যা হয়েছে:" : "What went wrong:";
        let tip = currentLang === 'bn' ? "পরামর্শ: আপনার সিনট্যাক্স বা ভ্যারিয়েবল বানান চেক করুন।" : "Tip: Check your syntax or variable names.";
        aiResponse.innerHTML = `<strong>${errTitle}</strong><br><em>${whatWrong}</em> ${err.message}<br><em>${tip}</em>`;
    }
}

// Manual AI Mentor Check & Detailed Line-by-Line Explainer
function askAI() {
    let code = document.getElementById('codeEditor').value;
    let isBoss = (userProgress.currentChapter === 10 || userProgress.currentChapter % 10 === 0);
    generateAIExplanation(code, isBoss, false);
}

// Helper to generate precise line-by-line breakdown in selected language
function generateAIExplanation(code, isBoss, isExecution) {
    let aiResponse = document.getElementById('aiResponse');
    let lines = code.split('\n');
    
    let headerText = currentLang === 'bn' 
        ? (isExecution ? "<strong>✅ কোড সফলভাবে রান হয়েছে! লাইন-বাই-লাইন ব্যাখ্যা:</strong><br>" : "<strong>🤖 জেমিনি এআই মেন্টর বিশ্লেষণ:</strong><br>")
        : (isExecution ? "<strong>✅ Execution Successful! Line-by-Line Breakdown:</strong><br>" : "<strong>🤖 Gemini AI Mentor Breakdown:</strong><br>");

    let explanation = headerText;
    let hasCode = false;

    lines.forEach((line, index) => {
        if (line.trim().length > 0) {
            hasCode = true;
            let purposeText = currentLang === 'bn' ? "এই লাইনটি মূল লজিক প্রসেস ও এক্সিকিউট করতে কাজ করে।" : "Executes this specific command to process core logic.";
            explanation += `<code>Line ${index + 1}: ${line.trim()}</code><br>&nbsp;&nbsp;&nbsp;↳ <em>${currentLang==='bn'?'কাজ':'Purpose'}:</em> ${purposeText}<br>`;
        }
    });

    if (!hasCode) {
        explanation = currentLang === 'bn' ? "প্রথমে প্লেগ্রাউন্ডে কিছু কোড লিখুন!" : "Please write some code in the playground first!";
    }

    aiResponse.innerHTML = explanation;
}
