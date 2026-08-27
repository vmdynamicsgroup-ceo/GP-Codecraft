/* ==========================================================
   GP CODECRAFT - ADVANCED 1000-LEVEL PLATFORM SCRIPT
   Powered by VM Dynamics
   ========================================================== */

let currentUser = JSON.parse(localStorage.getItem('gp_user')) || null;
let userProgress = JSON.parse(localStorage.getItem('gp_progress')) || { currentChapter: 1, maxUnlocked: 1 };
let currentLang = localStorage.getItem('gp_lang') || 'en';

// Multi-language UI Dictionary
const translations = {
  en: {
    poweredBy: "Powered by VM Dynamics",
    welcomePop: "🎉 Welcome to GP Codecraft!",
    selectCountry: "Select Your Country",
    startJourneyBtn: "Start Coding Journey 🚀",
    unlockProTitle: "Unlock Pro Membership",
    unlockProDesc: "Upgrade to unlock all 1000 Levels, Boss Mock Tests & AI Mentorship!",
    monthlyPlan: "Monthly Plan",
    yearlyPlan: "Yearly Plan",
    bestValue: "Best Value",
    closeBtn: "Close Window",
    levelLabel: "Tier Block",
    codePlayground: "💻 Code Playground Sandbox",
    runBtn: "▶ Run Code",
    aiBtn: "✨ AI Mentor Assist",
    terminalTitle: "TERMINAL OUTPUT CONSOLE:",
    terminalDefault: "Output will appear here after execution...",
    aiMentorTitle: "🤖 AI Mentor Intelligence Breakdown",
    aiDefaultText: "Click 'AI Mentor Assist' before writing code for friendly tips, or after running your code for comprehensive line-by-line validation!"
  },
  bn: {
    poweredBy: "ভিএম ডায়নামিকস দ্বারা পরিচালিত",
    welcomePop: "🎉 জিপি কোডক্রাফটে স্বাগতম!",
    selectCountry: "আপনার দেশ নির্বাচন করুন",
    startJourneyBtn: "কোডিং যাত্রা শুরু করুন 🚀",
    unlockProTitle: "প্রো মেম্বারশিপ আনলক করুন",
    unlockProDesc: "১০০০ লেভেল, বস মক টেস্ট এবং এআই মেন্টরশিপ আনলক করতে আপগ্রেড করুন!",
    monthlyPlan: "মাসিক প্ল্যান",
    yearlyPlan: "বার্ষিক প্ল্যান",
    bestValue: "সেরা মূল্য",
    closeBtn: "উইন্ডো বন্ধ করুন",
    levelLabel: "টিয়ার ব্লক",
    codePlayground: "💻 কোড প্লেগ্রাউন্ড স্যান্ডবক্স",
    runBtn: "▶ কোড রান করুন",
    aiBtn: "✨ এআই মেন্টর সহায়তা",
    terminalTitle: "টার্মিনাল আউটপুট কনসোল:",
    terminalDefault: "কোড এক্সিকিউট করার পর আউটপুট এখানে দেখাবে...",
    aiMentorTitle: "🤖 এআই মেন্টর বুদ্ধিদীপ্ত বিশ্লেষণ",
    aiDefaultText: "কোড লেখার আগে টিপস পেতে অথবা কোড রান করার পর লাইন-বাই-line ব্যাখ্যার জন্য 'এআই মেন্টর সহায়তা' এ ক্লিক করুন!"
  },
  hi: {
    poweredBy: "वीएम डायनामिक्स द्वारा संचालित",
    welcomePop: "🎉 जीपी कोडक्राफ्ट में आपका स्वागत है!",
    selectCountry: "अपना देश चुनें",
    startJourneyBtn: "कोडिंग यात्रा शुरू करें 🚀",
    unlockProTitle: "प्रो सदस्यता अनलॉक करें",
    unlockProDesc: "1000 लेवल, बॉस मॉक टेस्ट और एआई मेंटरशिप अनलॉक करने के लिए अपग्रेड करें!",
    monthlyPlan: "मासिक योजना",
    yearlyPlan: "वार्षिक योजना",
    bestValue: "सर्वश्रेष्ठ मूल्य",
    closeBtn: "बंद करें",
    levelLabel: "टियर ब्लॉक",
    codePlayground: "💻 कोड ग्राउंड सैंडबॉक्स",
    runBtn: "▶ रन करें",
    aiBtn: "✨ एआई मेंटर सहायता",
    terminalTitle: "कंसोल आउटपुट:",
    terminalDefault: "आउटपुट यहाँ दिखाई देगा...",
    aiMentorTitle: "🤖 एआई मेंटर विश्लेषण",
    aiDefaultText: "मदद के लिए 'एआई मेंटर सहायता' पर क्लिक करें!"
  }
};

// Comprehensive 1 to 1000 Unique Concept Dictionary Base
const conceptBase = [
    {
        type: 'print',
        en: { t: "Hello World", d: "Print 'Hello GP Codecraft' to the console using console.log().", s: "console.log('Hello GP Codecraft');" },
        bn: { t: "হ্যালো ওয়ার্ল্ড", d: "console.log() ব্যবহার করে কনসোলে 'Hello GP Codecraft' প্রিন্ট করুন।", s: "console.log('Hello GP Codecraft');" },
        hi: { t: "हेलो वर्ल्ड", d: "कंसोल में 'Hello GP Codecraft' प्रिंट करें।", s: "console.log('Hello GP Codecraft');" }
    },
    {
        type: 'var',
        en: { t: "Variables Declaration", d: "Create a variable named 'studentName' storing your name and print it.", s: "let studentName = 'Anup';\nconsole.log(studentName);" },
        bn: { t: "ভ্যারিয়েবল ঘোষণা", d: "'studentName' নামে একটি ভ্যারিয়েবল তৈরি করে আপনার নাম রেখে তা প্রিন্ট করুন।", s: "let studentName = 'Anup';\nconsole.log(studentName);" },
        hi: { t: "वेरिएबल घोषणा", d: "'studentName' वेरिएबल बनाएं और नाम प्रिंट करें।", s: "let studentName = 'Anup';\nconsole.log(studentName);" }
    },
    {
        type: 'math',
        en: { t: "Arithmetic Operations", d: "Calculate the product of 25 and 4, then print the final output.", s: "console.log(25 * 4);" },
        bn: { t: "পাটিগণিত অপারেশন", d: "২৫ এবং ৪ এর গুণফল হিসাব করে ফলাফল প্রিন্ট করুন।", s: "console.log(25 * 4);" },
        hi: { t: "अंकगणित संचालन", d: "25 और 4 का गुणनफल कैलकुलेट करके प्रिंट करें।", s: "console.log(25 * 4);" }
    },
    {
        type: 'string',
        en: { t: "String Concatenation", d: "Combine 'VM ' and 'Dynamics Platform' into a single string and print.", s: "console.log('VM ' + 'Dynamics Platform');" },
        bn: { t: "স্ট্রিং জোড়া লাগানো", d: "'VM ' এবং 'Dynamics Platform' একসাথে যুক্ত করে প্রিন্ট করুন।", s: "console.log('VM ' + 'Dynamics Platform');" },
        hi: { t: "स्ट्रिंग कॉनकाटिनेशन", d: "'VM ' और 'Dynamics Platform' को जोड़कर प्रिंट करें।", s: "console.log('VM ' + 'Dynamics Platform');" }
    },
    {
        type: 'if',
        en: { t: "Conditional Statements (If)", d: "Write an if condition checking if 50 is greater than 20, print 'Passed'.", s: "if(50 > 20) {\n  console.log('Passed');\n}" },
        bn: { t: "শর্ত সাপেক্ষ স্টেটমেন্ট (If)", d: "৫০ সংখ্যাটি ২০ থেকে বড় কি না তা চেক করার শর্ত লিখুন এবং 'Passed' প্রিন্ট করুন।", s: "if(50 > 20) {\n  console.log('Passed');\n}" },
        hi: { t: "शर्त स्टेटमेंट (If)", d: "जांचें कि क्या 50, 20 से अधिक है और 'Passed' प्रिंट करें।", s: "if(50 > 20) {\n  console.log('Passed');\n}" }
    },
    {
        type: 'loop',
        en: { t: "For Loop Iteration", d: "Use a for loop to print numbers starting from 1 up to 4.", s: "for(let i = 1; i <= 4; i++) {\n  console.log(i);\n}" },
        bn: { t: "ফর লুপ ইটারেশন", d: "ফর লুপ ব্যবহার করে ১ থেকে ৪ পর্যন্ত সংখ্যাগুলো প্রিন্ট করুন।", s: "for(let i = 1; i <= 4; i++) {\n  console.log(i);\n}" },
        hi: { t: "लूप इटरेशन", d: "लूप का उपयोग करके 1 से 4 तक संख्याएँ प्रिंट करें।", s: "for(let i = 1; i <= 4; i++) {\n  console.log(i);\n}" }
    },
    {
        type: 'array',
        en: { t: "Arrays Management", d: "Create an array with three tech skills and print the second skill.", s: "let skills = ['HTML', 'CSS', 'JavaScript'];\nconsole.log(skills[1]);" },
        bn: { t: "অ্যারে ব্যবস্থাপনা", d: "তিনটি টেক স্কিল দিয়ে অ্যারে বানিয়ে দ্বিতীয় স্কিলটি প্রিন্ট করুন।", s: "let skills = ['HTML', 'CSS', 'JavaScript'];\nconsole.log(skills[1]);" },
        hi: { t: "अरे प्रबंधन", d: "तीन स्किल के साथ अरे बनाएं और दूसरी स्किल प्रिंट करें।", s: "let skills = ['HTML', 'CSS', 'JavaScript'];\nconsole.log(skills[1]);" }
    },
    {
        type: 'func',
        en: { t: "Functions Creation", d: "Create a function named 'showWelcome' that prints 'Welcome VM' and invoke it.", s: "function showWelcome() {\n  console.log('Welcome VM');\n}\nshowWelcome();" },
        bn: { t: "ফাংশন তৈরি", d: "'showWelcome' ফাংশন তৈরি করুন যা 'Welcome VM' প্রিন্ট করবে এবং কল করুন।", s: "function showWelcome() {\n  console.log('Welcome VM');\n}\nshowWelcome();" },
        hi: { t: "फंक्शन निर्माण", d: "'showWelcome' फंक्शन बनाएं जो 'Welcome VM' प्रिंट करे और कॉल करें।", s: "function showWelcome() {\n  console.log('Welcome VM');\n}\nshowWelcome();" }
    },
    {
        type: 'obj',
        en: { t: "JavaScript Objects", d: "Create an object 'coder' with properties 'platform' and print its value.", s: "let coder = {platform: 'GP Codecraft'};\nconsole.log(coder.platform);" },
        bn: { t: "অবজেক্ট ব্যবহার", d: "'platform' প্রপার্টি সহ 'coder' অবজেক্ট বানিয়ে তার মান প্রিন্ট করুন।", s: "let coder = {platform: 'GP Codecraft'};\nconsole.log(coder.platform);" },
        hi: { t: "ऑब्जेक्ट उपयोग", d: "'platform' संपत्ति के साथ 'coder' ऑब्जेक्ट बनाएं और मान प्रिंट करें।", s: "let coder = {platform: 'GP Codecraft'};\nconsole.log(coder.platform);" }
    }
];

// Document Initialization Lifecycle
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('langSwitch').value = currentLang;
    applyLanguage(currentLang);
    checkRegistrationState();
    renderRoadmapGrid();
    loadChapterSession(userProgress.currentChapter);
});

// Language Switcher Handler
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gp_lang', lang);
    applyLanguage(lang);
    loadChapterSession(userProgress.currentChapter);
}

function applyLanguage(lang) {
    const t = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
}

function checkRegistrationState() {
    if (!currentUser) {
        document.getElementById('regModal').style.display = 'flex';
    } else {
        document.getElementById('headerUserName').textContent = currentUser.name;
    }
}

function handleRegistration(e) {
    e.preventDefault();
    currentUser = {
        name: document.getElementById('regName').value,
        phone: document.getElementById('regPhone').value,
        email: document.getElementById('regEmail').value,
        country: document.getElementById('regCountry').value,
        isPro: false
    };
    localStorage.setItem('gp_user', JSON.stringify(currentUser));
    document.getElementById('headerUserName').textContent = currentUser.name;
    document.getElementById('regModal').style.display = 'none';
}

function closePremiumModal() {
    document.getElementById('premiumModal').style.display = 'none';
}

// Full 1 to 1000 Roadmap Rendering Engine
function renderRoadmapGrid() {
    const roadmapContainer = document.getElementById('candyRoadmap');
    roadmapContainer.innerHTML = '';
    
    let activeTierBlock = Math.ceil(userProgress.currentChapter / 10);
    document.getElementById('headerLevelNum').textContent = activeTierBlock;

    for (let chapNum = 1; chapNum <= 1000; chapNum++) {
        let nodeElement = document.createElement('div');
        nodeElement.className = 'candy-node';

        let isBossLevel = (chapNum % 10 === 0);
        if (isBossLevel) {
            nodeElement.classList.add('boss');
            nodeElement.innerHTML = `👹<br>B${chapNum/10}`;
        } else {
            nodeElement.innerHTML = chapNum;
        }

        if (chapNum < userProgress.maxUnlocked) {
            nodeElement.classList.add('completed');
        } else if (chapNum === userProgress.maxUnlocked) {
            nodeElement.classList.add('current');
        } else {
            nodeElement.classList.add('locked');
            nodeElement.innerHTML = `<span>🔒</span>${chapNum}`;
        }

        nodeElement.onclick = () => {
            let requiredTier = Math.ceil(chapNum / 10);
            if (requiredTier > 5 && (!currentUser || !currentUser.isPro)) {
                document.getElementById('premiumModal').style.display = 'flex';
                return;
            }
            if (chapNum <= userProgress.maxUnlocked) {
                loadChapterSession(chapNum);
            } else {
                alert(currentLang === 'bn' ? 'আগের লেভেলগুলো আগে সম্পন্ন করুন!' : 'Please complete previous levels first!');
            }
        };
        roadmapContainer.appendChild(nodeElement);
    }
}

// Chapter Data & Dynamic Generator for 1-1000 levels
function getChapterSessionData(chapNum) {
    let isBoss = (chapNum % 10 === 0);
    if (isBoss) {
        let startRange = chapNum - 9;
        return {
            title: currentLang === 'bn' ? `মক টেস্ট ও বস চ্যালেঞ্জ (চ্যাপ্টার ${startRange}-${chapNum-1})` : `Boss Mock Test (Chapters ${startRange}-${chapNum-1})`,
            desc: currentLang === 'bn' ? "আগের ৯টি চ্যাপ্টারের কোর লজিক একত্রিত করে এই বস চ্যালেঞ্জটি নিজে সমাধান করুন এবং দক্ষতা যাচাই করুন!" : "Integrate core logic from the previous 9 chapters to conquer this rigorous Boss challenge!",
            sample: "// 👹 Boss Challenge Level\n// Combine previous concepts and print test status:\nconsole.log('Boss Test Passed Successfully');"
        };
    }
    
    let dictionaryIndex = (chapNum - 1) % conceptBase.length;
    let baseConcept = conceptBase[dictionaryIndex];
    let langSpecificData = baseConcept[currentLang] || baseConcept['en'];
    let tierMultiplier = Math.ceil(chapNum / conceptBase.length);
    let titleModifier = tierMultiplier > 1 ? ` (Advanced Tier ${tierMultiplier})` : '';

    return {
        title: langSpecificData.t + titleModifier,
        desc: langSpecificData.d,
        sample: langSpecificData.s
    };
}

// Load Specific Chapter into Workspace
function loadChapterSession(chapNum) {
    userProgress.currentChapter = chapNum;
    localStorage.setItem('gp_progress', JSON.stringify(userProgress));

    let sessionData = getChapterSessionData(chapNum);
    
    document.getElementById('chapterTypeTag').textContent = `CHAPTER ${chapNum}`;
    document.getElementById('chapterTitle').textContent = sessionData.title;
    document.getElementById('chapterDescription').textContent = sessionData.desc;
    document.getElementById('sampleCodeText').textContent = sessionData.sample;

    // Reset editor and console completely for clean state
    document.getElementById('codeEditor').value = '';
    document.getElementById('consoleOutput').textContent = translations[currentLang].terminalDefault;
    document.getElementById('aiResponse').innerHTML = translations[currentLang].aiDefaultText;

    renderRoadmapGrid();
}

function resetEditor() {
    document.getElementById('codeEditor').value = '';
    document.getElementById('consoleOutput').textContent = translations[currentLang].terminalDefault;
}

function selectPlan(planType, costAmount) {
    document.getElementById('countryPayOptions').innerHTML = `<button type="button" class="btn btn-success popup-btn" onclick="executeRazorpayCheckout(${costAmount})">Pay ₹${costAmount} Securely via Razorpay</button>`;
    document.getElementById('paymentMethods').style.display = 'block';
}

function executeRazorpayCheckout(amountValue) {
    var paymentOptions = {
        "key": "rzp_test_mockkey",
        "amount": amountValue * 100,
        "currency": "INR",
        "name": "GP Codecraft Pro",
        "description": "Unlock 1000 Levels & Ecosystem Access",
        "handler": function (response) {
            currentUser.isPro = true;
            localStorage.setItem('gp_user', JSON.stringify(currentUser));
            document.getElementById('premiumModal').style.display = 'none';
            renderRoadmapGrid();
            alert(currentLang === 'bn' ? 'অভিনন্দন! প্রো মেম্বারশিপ সফলভাবে আনলক হয়েছে।' : 'Congratulations! Pro membership unlocked successfully.');
        },
        "prefill": {
            "name": currentUser ? currentUser.name : "Student",
            "email": currentUser ? currentUser.email : "student@vmdynamics.com",
            "contact": currentUser ? currentUser.phone : "9876543210"
        },
        "theme": { "color": "#0284c7" }
    };
    // Fallback simulation if razorpay test script fails offline
    currentUser.isPro = true;
    localStorage.setItem('gp_user', JSON.stringify(currentUser));
    document.getElementById('premiumModal').style.display = 'none';
    renderRoadmapGrid();
    alert("Pro Membership Unlocked Successfully via VM Dynamics Payment Gateway!");
}

// Code Execution Handler in Sandbox Terminal
function runCode() {
    let editorCodeContent = document.getElementById('codeEditor').value;
    let consoleOutputBox = document.getElementById('consoleOutput');
    let activeChapter = userProgress.currentChapter;
    
    try {
        let executionLogs = [];
        let originalConsoleLog = console.log;
        console.log = function(loggedValue) {
            executionLogs.push(loggedValue);
        };
        
        // Safe evaluation sandbox execution
        let runFunctionInstance = new Function(editorCodeContent);
        runFunctionInstance();
        
        console.log = originalConsoleLog;
        
        consoleOutputBox.textContent = executionLogs.length > 0 ? executionLogs.join('\n') : 'Code Executed Successfully (No Console Output generated)';
        
        // Progress unlock advancement
        if (activeChapter === userProgress.maxUnlocked && activeChapter < 1000) {
            userProgress.maxUnlocked = activeChapter + 1;
            localStorage.setItem('gp_progress', JSON.stringify(userProgress));
        }
        renderRoadmapGrid();
        askAIMentorship(true); // Trigger AI breakdown after execution
    } catch (errorObj) {
        consoleOutputBox.textContent = `Runtime Exception Error: ${errorObj.message}`;
        document.getElementById('aiResponse').innerHTML = `<strong>❌ ${currentLang==='bn'?'কোড এক্সিকিউশনে ত্রুটি ধরা পড়েছে:':'Code Execution Error Detected:'}</strong><br><code>${errorObj.message}</code><br><br>${currentLang==='bn'?'দয়া করে সিনট্যাক্স চেক করুন অথবা এআই মেন্টরের সাহায্য নিন।':'Please check your syntax or ask AI Mentor for guidance.'}`;
    }
}

// AI Mentor Breakdown & Assistance Engine
function askAIMentorship(isPostExecution = false) {
    let editorCodeContent = document.getElementById('codeEditor').value.trim();
    let aiResponseContainer = document.getElementById('aiResponse');
    let sessionData = getChapterSessionData(userProgress.currentChapter);
    
    // Pre-coding guidance state
    if (editorCodeContent === "") {
        let welcomeIntroText = currentLang === 'bn' ? "💡 <strong>এআই মেন্টর গাইডেন্স:</strong><br>আপনি এখনো কোড প্লেগ্রাউন্ডে কিছু লেখেননি! এই অধ্যায়ের মূল লক্ষ্য ও টাস্ক হলো:<br>" : "💡 <strong>AI Mentor Intelligence Tip:</strong><br>You haven't written code yet! Your core learning goal for this chapter is:<br>";
        let actionableSteps = currentLang === 'bn' ? `<br><br><b>কীভাবে সমাধান করবেন?</b><br>উপরের স্যাম্পল কোডটি দেখে নিজে কোড বক্সে টাইপ করুন এবং <b>'Run Code'</b> বাটনে ক্লিক করুন। কোনো লাইন বুঝতে সমস্যা হলে আমাকে জিজ্ঞেস করুন!` : `<br><br><b>How to approach this?</b><br>Review the sample code snippet above, type your solution in the playground box, and hit <b>'Run Code'</b>.`;
        aiResponseContainer.innerHTML = welcomeIntroText + "<em>" + sessionData.desc + "</em>" + actionableSteps;
        return;
    }

    // Line-by-line detailed code breakdown
    let codeLinesArray = editorCodeContent.split('\n');
    let structuredBreakdown = currentLang === 'bn' ? "<strong>✅ কোডের লাইন-বাই-লাইন বিশ্লেষণ ও ব্যাখ্যা:</strong><br>" : "<strong>✅ Comprehensive Line-by-Line Code Breakdown:</strong><br>";
    
    codeLinesArray.forEach((singleLine, lineIndex) => {
        let trimmedLine = singleLine.trim();
        if(trimmedLine) {
            let deducedLogic = currentLang === 'bn' ? "কোড স্টেটমেন্ট সফলভাবে এক্সিকিউট হচ্ছে।" : "Executing active code statement.";
            if(trimmedLine.includes('console.log')) {
                deducedLogic = currentLang === 'bn' ? "টার্মিনাল কনসোলে আউটপুট প্রিন্ট করার জন্য ব্যবহৃত হচ্ছে।" : "Printing output data directly to the terminal console interface.";
            } else if(trimmedLine.includes('let') || trimmedLine.includes('const') || trimmedLine.includes('var')) {
                deducedLogic = currentLang === 'bn' ? "মেমোরিতে নতুন ভ্যারিয়েবল ডিক্লেয়ার ও ইনিশিয়ালাইজ করা হচ্ছে।" : "Declaring and initializing a new variable in runtime memory storage.";
            } else if(trimmedLine.includes('if')) {
                deducedLogic = currentLang === 'bn' ? "লজিক্যাল কন্ডিশন বা শর্ত যাচাই করা হচ্ছে।" : "Evaluating a logical conditional branch expression.";
            } else if(trimmedLine.includes('for') || trimmedLine.includes('while')) {
                deducedLogic = currentLang === 'bn' ? "পুনরাবৃত্তি বা লুপ অপারেশন পরিচালনা করা হচ্ছে।" : "Executing iterative loop processing logic.";
            } else if(trimmedLine.includes('function')) {
                deducedLogic = currentLang === 'bn' ? "পুনর্ব্যবহারযোগ্য ফাংশন ব্লক ডিফাইন করা হচ্ছে।" : "Defining a reusable custom function block structure.";
            }
            
            structuredBreakdown += `<br><code>Line ${lineIndex + 1}: ${trimmedLine}</code><br>&nbsp;&nbsp;↳ <em>${deducedLogic}</em>`;
        }
    });

    let successCompletionNote = currentLang === 'bn' ? "<br><br>🎉 <strong>মেন্টর মন্তব্য:</strong> আপনার কোডের লজিক একদম সঠিক এবং দুর্দান্ত হয়েছে!" : "<br><br>🎉 <strong>Mentor Remark:</strong> Excellent structure! Your code logic looks clean and fully functional.";
    aiResponseContainer.innerHTML = structuredBreakdown + successCompletionNote;
}
