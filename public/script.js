// --- 1. LOCAL STORAGE & INITIALIZATION ---
let currentLang = localStorage.getItem('gp_currentLang') || 'bn';
let currentLevel = localStorage.getItem('gp_currentLevel') ? parseInt(localStorage.getItem('gp_currentLevel')) : 1;
let unlockedLevel = localStorage.getItem('gp_unlockedLevel') ? parseInt(localStorage.getItem('gp_unlockedLevel')) : 1;

let savedUserData = localStorage.getItem('gp_userData');
let userData = savedUserData ? JSON.parse(savedUserData) : null;

let isBgmPlaying = false;

// 🔑 এখানে তোর আসল জেমিনি এপিআই কি বসিয়ে দিবি (যেমন: "AIzaSy...")
const GEMINI_API_KEY = "AQ.Ab8RN6LLZJVSz8FIdPB_bI_XHBKprEeccV7JQHFD7FFU-lfhFg"; 

const missionDatabase = {
    1: {
        title: "Variables & Output (চলক ও আউটপুট)",
        desc: "JavaScript-এ একটি ভেরিয়েবল ডিক্লেয়ার করো এবং কনসোলে প্রিন্ট করো।",
        example: "let name = 'Anup'; return name;"
    },
    2: {
        title: "Basic Arithmetic (গণিত অপারেশন)",
        desc: "দুটি সংখ্যা যোগ করে তার ফলাফল রিটার্ন করো।",
        example: "let a = 10; let b = 20; return a + b;"
    },
    3: {
        title: "Conditionals (শর্ত বা if-else)",
        desc: "একটি সংখ্যা ১০ এর বেশি কি না তা চেক করে মেসেজ রিটার্ন করো।",
        example: "let x = 15; if(x > 10) { return 'Greater than 10'; } else { return 'Smaller'; }"
    },
    4: {
        title: "Functions (ফাংশন তৈরি)",
        desc: "একটি ফাংশন লিখো যা দুটি সংখ্যা গুণ করে ফলাফল দেবে।",
        example: "function multiply(a, b) { return a * b; } return multiply(5, 4);"
    },
    5: {
        title: "Arrays (অ্যারে বা তালিকা)",
        desc: "একটি অ্যারে তৈরি করে তার প্রথম উপাদানটি রিটার্ন করো।",
        example: "let fruits = ['Apple', 'Banana', 'Mango']; return fruits[0];"
    }
};

const i18n = {
    en: {
        powered: "Powered by VM Dynamics",
        enterBtn: "🎵 Enter Arena & Play BGM",
        regTitle: "🚀 Student Registration",
        namePlaceholder: "Full Name (e.g. Anup Pradhan)",
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
        journeyStarted: "🚀 आपकी कोडिंग यात्रा शुरू हो गई है!",
        emptyCodeAlert: "⚠ कृपया रन करने से पहले कुछ कोड लिखें!",
        timeUpAlert: "समय समाप्त! बॉस ने आपको हरा दिया। पुनः प्रयास करें।"
    }
};

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gp_currentLang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });

    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNum');
    const emailInput = document.getElementById('emailAcc');
    if(nameInput) nameInput.placeholder = i18n[lang].namePlaceholder;
    if(phoneInput) phoneInput.placeholder = i18n[lang].phonePlaceholder;
    if(emailInput) emailInput.placeholder = i18n[lang].emailPlaceholder;

    loadMissionContent();
    renderRoadmap();
}

function startExperience() {
    const bgm = document.getElementById('bgmAudio');
    if (bgm) {
        bgm.play().then(() => {
            isBgmPlaying = true;
            const btn = document.getElementById('bgmToggleButton');
            if(btn) btn.textContent = "🔊 BGM On";
        }).catch(e => console.log("Audio autoplay restricted"));
    }
    
    const sfx = document.getElementById('sfxClick');
    if(sfx) sfx.play();

    const introScreen = document.getElementById('introScreen');
    if(introScreen) introScreen.style.display = 'none';

    if (userData && userData.name) {
        const nameDisplay = document.getElementById('displayUserName');
        if(nameDisplay) nameDisplay.textContent = userData.name;
        renderRoadmap();
        loadMissionContent();
    } else {
        const regModal = document.getElementById('regModal');
        if(regModal) regModal.classList.remove('hidden');
    }
}

function toggleBGM() {
    const bgm = document.getElementById('bgmAudio');
    const btn = document.getElementById('bgmToggleButton');
    if (!bgm) return;
    if (isBgmPlaying) {
        bgm.pause();
        isBgmPlaying = false;
        btn.textContent = "🔇 BGM Off";
    } else {
        bgm.play();
        isBgmPlaying = true;
        btn.textContent = "🔊 BGM On";
    }
}

function openModal(modalId) { document.getElementById(modalId).classList.remove('hidden'); }
function closeModal(modalId) { document.getElementById(modalId).classList.add('hidden'); }

function saveUserRegistration(e) {
    e.preventDefault();
    userData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phoneNum').value,
        email: document.getElementById('emailAcc').value
    };
    localStorage.setItem('gp_userData', JSON.stringify(userData));

    const nameDisplay = document.getElementById('displayUserName');
    if(nameDisplay) nameDisplay.textContent = userData.name;

    document.getElementById('regModal').classList.add('hidden');
    renderRoadmap();
    loadMissionContent();
}

function renderRoadmap() {
    const container = document.getElementById('roadmapNodes');
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 1; i <= 1000; i++) {
        const node = document.createElement('div');
        if (i <= unlockedLevel) {
            node.className = `node-item ${i === currentLevel ? 'active' : 'unlocked'}`;
            node.onclick = () => selectLevel(i);
        } else {
            node.className = `node-item locked`;
        }
        let bossText = currentLang === 'bn' ? "👹 বস লেভেল" : "👹 Boss Level";
        let levelText = currentLang === 'bn' ? "লেভেল" : "Level";
        node.textContent = i % 10 === 0 ? `${bossText} ${i}` : `${levelText} ${i} ${i > unlockedLevel ? '🔒' : ''}`;
        container.appendChild(node);
    }
}

function selectLevel(levelNum) {
    if (levelNum <= unlockedLevel) {
        currentLevel = levelNum;
        localStorage.setItem('gp_currentLevel', currentLevel);
        loadMissionContent();
        renderRoadmap();
        const editor = document.getElementById('codeEditor');
        if(editor) editor.value = '';
    }
}

function triggerJourneyStart() {
    const sfx = document.getElementById('sfxClick');
    if(sfx) sfx.play();
    alert(i18n[currentLang].journeyStarted);
}

// --- Secure Gemini API Call ---
async function callGeminiAI(promptText) {
    let langName = currentLang === 'bn' ? 'Bengali' : (currentLang === 'hi' ? 'Hindi' : 'English');
    const studentName = (userData && userData.name) ? userData.name : 'Student';
    const systemPrompt = `You are a friendly AI coding mentor for a 15-year-old student named ${studentName}. Speak like a close friend in ${langName}. Keep explanations short and encouraging.`;

    const payload = {
        contents: [
            { role: "user", parts: [{ text: systemPrompt + "\n\nUser Question/Code: " + promptText }] }
        ]
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data && data.candidates && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else if (data && data.error) {
            console.error("API Error Details:", data.error);
            return currentLang === 'bn' ? `এপিআই এরর: ${data.error.message}` : `API Error: ${data.error.message}`;
        } else {
            return currentLang === 'bn' ? "আরে দোস্ত, সার্ভার থেকে ঠিকমতো ডেটা আসছে না। আবার ট্রাই কর!" : "Received empty response from AI.";
        }
    } catch (error) {
        console.error("Network Error:", error);
        return currentLang === 'bn' ? "নেটওয়ার্কে সমস্যা হচ্ছে, ইন্টারনেট কানেকশন চেক কর!" : "Network connection error.";
    }
}

// --- Mission Content & Validator ---
function loadMissionContent() {
    localStorage.setItem('gp_currentLevel', currentLevel);
    localStorage.setItem('gp_unlockedLevel', unlockedLevel);

    const levelDisplay = document.getElementById('currentLevelDisplay');
    if(levelDisplay) levelDisplay.textContent = currentLevel;

    const tag = document.getElementById('taskTag');
    const title = document.getElementById('taskTitle');
    const desc = document.getElementById('taskDescription');
    const exampleBox = document.getElementById('taskExampleBox');

    if (!tag || !title || !desc || !exampleBox) return;

    if (currentLevel % 10 === 0) {
        tag.textContent = i18n[currentLang].bossTag;
        title.textContent = i18n[currentLang].bossTitle + currentLevel;
        desc.textContent = i18n[currentLang].bossDesc;
        exampleBox.innerHTML = "// Boss challenge: Fix code before timer runs out!";
        const bossModal = document.getElementById('bossModal');
        if(bossModal) bossModal.classList.remove('hidden');
        startBossTimer();
    } else {
        let taskTitle = `JavaScript Mission #${currentLevel}`;
        let taskDesc = `Write a JavaScript function or logic for Level ${currentLevel}.`;
        let exampleCode = "";

        if (currentLevel === 1) {
            taskTitle = "Variables & Output (চলক)";
            taskDesc = "একটি ভেরিয়েবল ডিক্লেয়ার করো যেখানে তোমার নাম থাকবে এবং সেটি রিটার্ন করো।";
            exampleCode = "let name = 'Anup'; return name;";
        } else if (currentLevel === 2) {
            taskTitle = "Basic Arithmetic (গণিত)";
            taskDesc = "১৫ এবং ২৫ এর গুণফল বের করে রিটার্ন করো।";
            exampleCode = "return 15 * 25;";
        } else if (currentLevel === 3) {
            taskTitle = "Conditionals (শর্ত)";
            taskDesc = "একটি সংখ্যা যদি ৫০ এর বেশি হয় তবে 'High' রিটার্ন করো, না হলে 'Low' রিটার্ন করো।";
            exampleCode = "let score = 60; if(score > 50) { return 'High'; } else { return 'Low'; }";
        } else {
            let targetNum = currentLevel * 5;
            taskDesc = `Create a logic where you multiply ${currentLevel} with 5 and return the result. (Expected result: ${targetNum})`;
            exampleCode = `let level = ${currentLevel}; return level * 5;`;
        }

        tag.textContent = `MISSION #${currentLevel}`;
        title.textContent = taskTitle;
        desc.textContent = taskDesc;
        exampleBox.innerHTML = `💡 <b>Example to try:</b><br>${exampleCode}`;
    }
}

async function executeCode() {
    const codeEditor = document.getElementById('codeEditor');
    if(!codeEditor) return;
    const code = codeEditor.value;
    const output = document.getElementById('consoleOutput');
    
    if (!code.trim()) {
        if(output) output.textContent = i18n[currentLang].emptyCodeAlert;
        return;
    }

    try {
        let res = eval(code);
        
        let isCorrect = true;
        let validationMsg = "";

        if (currentLevel === 2 && res !== 375) {
            isCorrect = false;
            validationMsg = "তোর গুণফল ভুল হয়েছে! ১৫ এবং ২৫ এর গুণফল বের করতে বলা হয়েছে। আবার চেষ্টা কর।";
        } else if (currentLevel === 3 && res !== 'High') {
            isCorrect = false;
            validationMsg = "শর্তের লজিক মেলেনি! সঠিক শর্ত বসিয়ে 'High' রিটার্ন করাও।";
        }

        if (!isCorrect) {
            if(output) output.textContent = "❌ Logic Error: " + validationMsg;
            const aiHint = await callGeminiAI(`My code was: "${code}". The logic gave wrong output for level ${currentLevel}. Guide me nicely to fix it.`);
            appendAIMessage(aiHint);
            updateHintBox(aiHint);
            return;
        }

        if (res === undefined) res = currentLang === 'bn' ? "সফলভাবে রান হয়েছে।" : "Executed successfully.";
        if(output) output.textContent = "✔ Success:\n" + res;
        
        const aiMsg = await callGeminiAI(`My code ran successfully for level ${currentLevel}: "${code}". Give a short, cool appreciation.`);
        appendAIMessage(aiMsg);
        updateHintBox(aiMsg);
        
        currentLevel++;
        if (currentLevel > unlockedLevel) {
            unlockedLevel = currentLevel;
        }

        localStorage.setItem('gp_currentLevel', currentLevel);
        localStorage.setItem('gp_unlockedLevel', unlockedLevel);

        setTimeout(() => {
            codeEditor.value = ''; 
            loadMissionContent();
            renderRoadmap();
        }, 1500);

    } catch (err) {
        if(output) output.textContent = "❌ Syntax Error: " + err.message;
        const aiErrorMsg = await callGeminiAI(`My code failed with error: "${err.message}". Code: "${code}". Explain what is wrong in a friendly tone.`);
        appendAIMessage(aiErrorMsg);
        updateHintBox(aiErrorMsg);
    }
}

async function askGeminiAIMentor() {
    const input = document.getElementById('aiUserQuery');
    if(!input) return;
    const text = input.value.trim();
    if (!text) return;

    const stream = document.getElementById('aiChatStream');
    if(!stream) return;

    stream.innerHTML += `<div class="user-bubble">${text}</div>`;
    input.value = '';

    const loadingId = "loading_" + Date.now();
    let thinkingText = currentLang === 'bn' ? "ভাবছি..." : "Thinking...";
    stream.innerHTML += `<div class="ai-bubble" id="${loadingId}">${thinkingText}</div>`;
    stream.scrollTop = stream.scrollHeight;

    const aiReply = await callGeminiAI(text);
    
    const loadingElem = document.getElementById(loadingId);
    if(loadingElem) loadingElem.remove();
    
    stream.innerHTML += `<div class="ai-bubble">${aiReply}</div>`;
    updateHintBox(aiReply);
    stream.scrollTop = stream.scrollHeight;
}

function handleAIEnter(e) { if (e.key === 'Enter') askGeminiAIMentor(); }

function appendAIMessage(msg) {
    const stream = document.getElementById('aiChatStream');
    if(!stream) return;
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
        if(timerEl) timerEl.textContent = timeLeftText;
        if (t <= 0) {
            clearInterval(interval);
            alert(i18n[currentLang].timeUpAlert);
            closeBossModal();
        }
    }, 1000);
}

function closeBossModal() { 
    const bossModal = document.getElementById('bossModal');
    if(bossModal) bossModal.classList.add('hidden'); 
}

// --- DOM CONTENT LOADED: ANTI-CHEAT, AUTO-LOGIN & INIT ---
window.addEventListener('DOMContentLoaded', () => {
    if (userData && userData.name) {
        const introScreen = document.getElementById('introScreen');
        if(introScreen) introScreen.style.display = 'none';
        
        const nameDisplay = document.getElementById('displayUserName');
        if(nameDisplay) nameDisplay.textContent = userData.name;
    }

    switchLanguage(currentLang);

    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
        codeEditor.addEventListener('paste', (e) => {
            e.preventDefault();
            alert("⚠️ বাইরের ক্লিপবোর্ড থেকে কোড পেস্ট করা নিষিদ্ধ! নিজে কোড লিখে প্র্যাকটিস করো।");
        });
        codeEditor.addEventListener('copy', (e) => { e.preventDefault(); });
        codeEditor.addEventListener('cut', (e) => { e.preventDefault(); });
        codeEditor.addEventListener('contextmenu', (e) => { e.preventDefault(); });
    }

    document.addEventListener('contextmenu', (e) => {
        if(e.target && e.target.id === 'codeEditor') {
            e.preventDefault();
        }
    });
});
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}
