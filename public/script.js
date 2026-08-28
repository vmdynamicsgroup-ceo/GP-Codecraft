let currentLang = 'en';
let currentLevel = 1;
let unlockedLevel = 1;
let userData = null;

// 👉 তোর দেওয়া জেমিনি এআই এপিআই কি
const GEMINI_API_KEY = "AQ.Ab8RN6K6HVR6EsOGSLujIZR2sWlMc7RTIgpklcxft13GwcqN-g"; 

// Multi-Language Dictionary (সব টেক্সট এখানে বাংলা, ইংরেজি ও হিন্দিতে কন্ট্রোল হবে)
const i18n = {
    en: {
        powered: "Powered by VM Dynamics",
        enterBtn: "🎵 Enter Arena & Play BGM",
        regTitle: "🚀 Student Registration",
        namePlaceholder: "Full Name (e.g. Jimy Squat)",
        phonePlaceholder: "Phone Number with Country Code (e.g. +91...)",
        emailPlaceholder: "Email Account",
        subReg: "Start Journey ⚡",
        privLink: "Privacy & Terms",
        contLink: "Contact Us",
        levelText: "Level",
        roadmapTitle: "🗺️ Mission Roadmap",
        startJourneyBtn: "🚀 Let's Start Journey",
        codeTitle: "💻 Code Sandbox Terminal",
        runBtn: "▶ RUN CODE",
        termTitle: "CONSOLE OUTPUT:",
        hintPlaceholder: "AI Mentor Hint Box (Ask anything below)",
        aiWelcome: "Hey friend! I am your live Gemini AI mentor. Ask me anything or write code, I will guide you!",
        sendBtn: "Ask",
        fightBtn: "⚔️ FIGHT & WIN!",
        bossTag: "BOSS BATTLE",
        bossTitle: "Cyber Boss Challenge #",
        bossDesc: "Fix the security breach logic before time runs out!",
        missionTag: "MISSION #",
        missionTitle: "Dynamic Problem Solving - Level ",
        missionDesc: "Write a JavaScript function for level logic to pass this stage.",
        journeyStarted: "🚀 Your coding journey has officially started!",
        emptyCodeAlert: "⚠ Please write some code before running!",
        timeUpAlert: "Time's up! Boss defeated you. Try again."
    },
    bn: {
        powered: "ভিএম ডায়নামিকস দ্বারা পরিচালিত",
        enterBtn: "🎵 এরেণায় প্রবেশ করুন ও মিউজিক চালু করুন",
        regTitle: "🚀 স্টুডেন্ট রেজিস্ট্রেশন",
        namePlaceholder: "পুরো নাম (যেমন: অনুপ প্রধান)",
        phonePlaceholder: "ফোন নম্বর (যেমন: +91...)",
        emailPlaceholder: "ইমেইল অ্যাকাউন্ট",
        subReg: "যাত্রা শুরু করুন ⚡",
        privLink: "প্রাইভেসি এবং শর্তাবলী",
        contLink: "যোগাযোগ করুন",
        levelText: "লেভেল",
        roadmapTitle: "🗺️ মিশন রোডম্যাপ",
        startJourneyBtn: "🚀 লেটস স্টার্ট জার্নি",
        codeTitle: "💻 কোড স্যান্ডবক্স টার্মিনাল",
        runBtn: "▶ কোড রান করুন",
        termTitle: "কনসোল আউটপুট:",
        hintPlaceholder: "এআই মেন্টর হিন্ট বক্স (এখানে যেকোনো প্রশ্ন করুন)",
        aiWelcome: "আরে দোস্ত! আমি তোর লাইভ জেমিনি এআই মেন্টর। কোড কর বা কিছু জিজ্ঞেস কর, একদম ফ্রেন্ডলি স্টাইলে বুঝিয়ে দেব!",
        sendBtn: "জিজ্ঞেস",
        fightBtn: "⚔️ যুদ্ধ করে জয়ী হও!",
        bossTag: "বস যুদ্ধ",
        bossTitle: "সাইবার বস চ্যালেঞ্জ #",
        bossDesc: "টাইমার শেষ হওয়ার আগে সিকিউরিটি ব্রিচ লজিক ঠিক কর!",
        missionTag: "মিশন #",
        missionTitle: "ডায়নামিক প্রবলেম সলভিং - লেভেল ",
        missionDesc: "এই ধাপ পার করতে লেভেলের লজিক অনুযায়ী একটি জাভাস্ক্রিপ্ট ফাংশন লিখ।",
        journeyStarted: "🚀 আপনার কোডিং যাত্রা শুরু হয়ে গেছে! লেভেল কমপ্লিট করতে থাকুন।",
        emptyCodeAlert: "⚠ কোড রান করার আগে কিছু কোড লিখুন!",
        timeUpAlert: "সময় শেষ! বস আপনাকে হারিয়ে দিয়েছে। আবার চেষ্টা করুন।"
    },
    hi: {
        powered: "वीएम डायनामिक्स द्वारा संचालित",
        enterBtn: "🎵 एरेना में प्रवेश करें और BGM चलाएं",
        regTitle: "🚀 छात्र पंजीकरण",
        namePlaceholder: "पूरा नाम (जैसे: अनुज प्रधान)",
        phonePlaceholder: "फ़ोन नंबर (जैसे: +91...)",
        emailPlaceholder: "ईमेल खाता",
        subReg: "यात्रा शुरू करें ⚡",
        privLink: "गोपनीयता और शर्तें",
        contLink: "संपर्क करें",
        levelText: "स्तर",
        roadmapTitle: "🗺️ मिशन रोडमैप",
        startJourneyBtn: "🚀 यात्रा शुरू करें",
        codeTitle: "💻 कोड सैंडबॉक्स",
        runBtn: "▶ रन करें",
        termTitle: "कंसोल आउटपुट:",
        hintPlaceholder: "एआई मेंटर हिंट बॉक्स",
        aiWelcome: "नमस्ते दोस्त! मैं आपका लाइव जेमिनी एआई मेंटर हूँ। पूछिए क्या पूछना है!",
        sendBtn: "पूछें",
        fightBtn: "⚔️ युद्ध करें!",
        bossTag: "बॉस बैटल",
        bossTitle: "साइबर बॉस चैलेंज #",
        bossDesc: "समय समाप्त होने से पहले सुरक्षा कोड ठीक करें!",
        missionTag: "मिशन #",
        missionTitle: "डायनामिक प्रोब्लम सॉल्विंग - स्तर ",
        missionDesc: "इस चरण को पार करने के लिए जावास्क्रिप्ट कोड लिखें।",
        journeyStarted: "🚀 आपकी कोडिंग यात्रा शुरू हो गई है!",
        emptyCodeAlert: "⚠ कृपया रन करने से पहले कुछ कोड लिखें!",
        timeUpAlert: "समय समाप्त! बॉस ने आपको हरा दिया। पुनः प्रयास करें।"
    }
};

// ভাষা পরিবর্তনের ফাংশন যা পুরো ওয়েবসাইট রিয়েল-টাইমে আপডেট করবে
function switchLanguage(lang) {
    currentLang = lang;
    
    // সমস্ত data-i18n ট্যাগ আপডেট করা
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });

    // ইনপুট প্লেসহোল্ডারগুলো ডাইনামিকালি আপডেট করা
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNum');
    const emailInput = document.getElementById('emailAcc');
    if(nameInput) nameInput.placeholder = i18n[lang].namePlaceholder;
    if(phoneInput) phoneInput.placeholder = i18n[lang].phonePlaceholder;
    if(emailInput) emailInput.placeholder = i18n[lang].emailPlaceholder;

    // কারেন্ট লেভেলের মিশন টেক্সট রি-রেন্ডার করা যাতে ভাষা চেঞ্জ সাথে সাথে কাজ করে
    loadMissionContent();
    renderRoadmap();
}

// Start BGM and remove Intro Screen
function startExperience() {
    const bgm = document.getElementById('bgmAudio');
    bgm.play().catch(e => console.log("Audio autoplay restricted"));
    document.getElementById('sfxClick').play();
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('regModal').classList.remove('hidden');
}

function openModal(modalId) { document.getElementById(modalId).classList.remove('hidden'); }
function closeModal(modalId) { document.getElementById(modalId).classList.add('hidden'); }

// Registration Handler
function saveUserRegistration(e) {
    e.preventDefault();
    userData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phoneNum').value,
        email: document.getElementById('emailAcc').value
    };
    document.getElementById('displayUserName').textContent = userData.name;
    document.getElementById('regModal').classList.add('hidden');
    renderRoadmap();
    loadMissionContent();
}

// Roadmap Generator with Locked Levels
function renderRoadmap() {
    const container = document.getElementById('roadmapNodes');
    container.innerHTML = '';
    
    for (let i = 1; i <= 100; i++) {
        const node = document.createElement('div');
        
        if (i <= unlockedLevel) {
            node.className = `node-item ${i === currentLevel ? 'active' : 'unlocked'}`;
            node.onclick = () => selectLevel(i);
        } else {
            node.className = `node-item locked`;
            node.title = currentLang === 'bn' ? "আগের লেভেল কমপ্লিট করুন!" : "Complete previous level to unlock!";
        }
        
        let bossText = currentLang === 'bn' ? "👹 বস লেভেল" : (currentLang === 'hi' ? "👹 बॉस स्तर" : "👹 Boss Level");
        let levelText = currentLang === 'bn' ? "লেভেল" : (currentLang === 'hi' ? "स्तर" : "Level");
        
        node.textContent = i % 10 === 0 ? `${bossText} ${i}` : `${levelText} ${i} ${i > unlockedLevel ? '🔒' : ''}`;
        container.appendChild(node);
    }
}

function selectLevel(levelNum) {
    if (levelNum <= unlockedLevel) {
        currentLevel = levelNum;
        loadMissionContent();
        document.getElementById('codeEditor').value = '';
    }
}

function triggerJourneyStart() {
    document.getElementById('sfxClick').play();
    alert(i18n[currentLang].journeyStarted);
}

// Dynamic Missions with Language Translation
function loadMissionContent() {
    document.getElementById('currentLevelDisplay').textContent = currentLevel;
    const tag = document.getElementById('taskTag');
    const title = document.getElementById('taskTitle');
    const desc = document.getElementById('taskDescription');

    if (currentLevel % 10 === 0) {
        tag.textContent = i18n[currentLang].bossTag;
        title.textContent = i18n[currentLang].bossTitle + currentLevel;
        desc.textContent = i18n[currentLang].bossDesc;
        document.getElementById('bossModal').classList.remove('hidden');
        startBossTimer();
    } else {
        tag.textContent = i18n[currentLang].missionTag + currentLevel;
        title.textContent = i18n[currentLang].missionTitle + currentLevel;
        desc.textContent = i18n[currentLang].missionDesc;
    }
}

// Real Gemini AI Integration Function with Language Context
async function callGeminiAI(promptText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    let langName = currentLang === 'bn' ? 'Bengali' : (currentLang === 'hi' ? 'Hindi' : 'English');
    const systemPrompt = `You are a friendly AI coding mentor for a 15-year-old student named ${userData ? userData.name : 'Student'}. Speak naturally like a close friend. You MUST reply completely in ${langName}. Keep explanations simple and motivating.`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt + "\n\nUser Query/Code: " + promptText }] }]
            })
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return currentLang === 'bn' ? "এআই থেকে রেসপন্স পেতে সমস্যা হচ্ছে।" : "AI response error.";
        }
    } catch (error) {
        return currentLang === 'bn' ? "নেটওয়ার্কে সমস্যা হচ্ছে।" : "Network error.";
    }
}

// Code Execution & AI Analysis
async function executeCode() {
    const codeEditor = document.getElementById('codeEditor');
    const code = codeEditor.value;
    const output = document.getElementById('consoleOutput');
    
    if (!code.trim()) {
        output.textContent = i18n[currentLang].emptyCodeAlert;
        return;
    }

    try {
        let res = eval(code);
        if (res === undefined) res = currentLang === 'bn' ? "সফলভাবে রান হয়েছে (কোনো রিটার্ন ভ্যালু নেই)।" : "Executed successfully with no return value.";
        output.textContent = (currentLang === 'bn' ? "✔ সফল:\n" : "✔ Success:\n") + res;
        
        const aiMsg = await callGeminiAI(`My code ran successfully: "${code}". Give a short appreciation.`);
        appendAIMessage(aiMsg);
        updateHintBox(aiMsg);
        
        currentLevel++;
        if (currentLevel > unlockedLevel) {
            unlockedLevel = currentLevel;
        }

        setTimeout(() => {
            codeEditor.value = ''; 
            loadMissionContent();
            renderRoadmap();
        }, 1500);

    } catch (err) {
        output.textContent = "❌ Error: " + err.message;
        
        const aiErrorMsg = await callGeminiAI(`My code failed with error: "${err.message}". Code was: "${code}". Explain what is wrong and how to fix it.`);
        appendAIMessage(aiErrorMsg);
        updateHintBox(aiErrorMsg);
    }
}

// AI Chat Interaction
async function askGeminiAIMentor() {
    const input = document.getElementById('aiUserQuery');
    const text = input.value.trim();
    if (!text) return;

    const stream = document.getElementById('aiChatStream');
    stream.innerHTML += `<div class="user-bubble">${text}</div>`;
    input.value = '';

    const loadingId = "loading_" + Date.now();
    let thinkingText = currentLang === 'bn' ? "ভাবছি..." : (currentLang === 'hi' ? "सोच रहा हूँ..." : "Thinking...");
    stream.innerHTML += `<div class="ai-bubble" id="${loadingId}">${thinkingText}</div>`;
    stream.scrollTop = stream.scrollHeight;

    const aiReply = await callGeminiAI(text);
    
    document.getElementById(loadingId).remove();
    stream.innerHTML += `<div class="ai-bubble">${aiReply}</div>`;
    updateHintBox(aiReply);
    stream.scrollTop = stream.scrollHeight;
}

function handleAIEnter(e) { if (e.key === 'Enter') askGeminiAIMentor(); }

function appendAIMessage(msg) {
    const stream = document.getElementById('aiChatStream');
    stream.innerHTML += `<div class="ai-bubble">${msg}</div>`;
    stream.scrollTop = stream.scrollHeight;
}

function updateHintBox(text) {
    const hintBox = document.getElementById('hintBox');
    if (hintBox) {
        hintBox.innerHTML = `🤖 <b>Live AI Hint:</b> ${text.substring(0, 100)}...`;
    }
}

function startBossTimer() {
    let t = 45;
    const timerEl = document.getElementById('bossTimerDisplay');
    const interval = setInterval(() => {
        t--;
        let timeLeftText = currentLang === 'bn' ? `⏳ সময় বাকি: ${t} সেকেন্ড` : `⏳ Time Left: ${t}s`;
        timerEl.textContent = timeLeftText;
        if (t <= 0) {
            clearInterval(interval);
            alert(i18n[currentLang].timeUpAlert);
            closeBossModal();
        }
    }, 1000);
}
function closeBossModal() { document.getElementById('bossModal').classList.add('hidden'); }
