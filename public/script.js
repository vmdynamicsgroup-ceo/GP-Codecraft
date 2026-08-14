// State Management
let currentLevel = 1;
let currentChapter = 1;
let currentLang = 'bn'; // Default Language: Bengali ('bn', 'en', 'hi')
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || { isPro: false };

// Dynamic Chapter Content & Explanations in 3 Languages
function getChapterDetails(chapterNum, lang) {
    const isBoss = chapterNum % 10 === 0;
    const levelNum = Math.ceil(chapterNum / 10);

    const content = {
        bn: {
            title: isBoss ? `🔥 BOSS BATTLE ${levelNum}: সিস্টেম লজিক টেস্ট` : `Chapter ${chapterNum}: বেসিক সিনট্যাক্স ও প্র্যাকটিস`,
            instruction: isBoss 
                ? `🎯 **বস চ্যালেঞ্জ:**\n\`bossChallenge()\` নামের একটি ফাংশন তৈরি করো যা কন্সোলে "Boss Defeated!" প্রিন্ট করবে।\n\n💡 **স্যাম্পল সলিউশন:**\n\`\`\`javascript\nfunction bossChallenge() {\n  console.log("Boss Defeated!");\n}\nbossChallenge();\n\`\`\``
                : `📌 **ইনস্ট্রাকশন / টাস্ক:**\nJavaScript-এ কন্সোলে কোনো লেখা আউটপুট দিতে \`console.log()\` ব্যবহার করা হয়। নিচের সলিউশনটি দেখে কোড এডিটরে টাইপ করো।\n\n💡 **স্যাম্পল সলিউশন:**\n\`\`\`javascript\nconsole.log("Welcome to Chapter ${chapterNum}!");\n\`\`\``,
            placeholder: `// এখানে কোড টাইপ করো...\n// উদাহরণ: console.log("Welcome to Chapter ${chapterNum}!");`,
            sampleCode: isBoss 
                ? `function bossChallenge() {\n  console.log("Boss Defeated!");\n}\nbossChallenge();`
                : `console.log("Welcome to Chapter ${chapterNum}!");`
        },
        en: {
            title: isBoss ? `🔥 BOSS BATTLE ${levelNum}: System Logic Test` : `Chapter ${chapterNum}: Basic Syntax & Practice`,
            instruction: isBoss 
                ? `🎯 **Boss Challenge:**\nCreate a function named \`bossChallenge()\` that prints "Boss Defeated!" to the console.\n\n💡 **Sample Solution:**\n\`\`\`javascript\nfunction bossChallenge() {\n  console.log("Boss Defeated!");\n}\nbossChallenge();\n\`\`\``
                : `📌 **Instruction / Task:**\nUse \`console.log()\` to print output in JavaScript. Type the sample solution below into the code editor.\n\n💡 **Sample Solution:**\n\`\`\`javascript\nconsole.log("Welcome to Chapter ${chapterNum}!");\n\`\`\``,
            placeholder: `// Type code here...\n// Example: console.log("Welcome to Chapter ${chapterNum}!");`,
            sampleCode: isBoss 
                ? `function bossChallenge() {\n  console.log("Boss Defeated!");\n}\nbossChallenge();`
                : `console.log("Welcome to Chapter ${chapterNum}!");`
        },
        hi: {
            title: isBoss ? `🔥 BOSS BATTLE ${levelNum}: सिस्टम लॉजिक टेस्ट` : `Chapter ${chapterNum}: बेसिक सिंटैक्स और प्रैक्टिस`,
            instruction: isBoss 
                ? `🎯 **बॉस चैलेंज:**\n\`bossChallenge()\` नाम का फ़ंक्शन बनाएं जो कंसोल में "Boss Defeated!" प्रिंट करे।\n\n💡 **सैंपल सॉल्यूशन:**\n\`\`\`javascript\nfunction bossChallenge() {\n  console.log("Boss Defeated!");\n}\nbossChallenge();\n\`\`\``
                : `📌 **निर्देश / टास्क:**\nJavaScript में आउटपुट प्रिंट करने के लिए \`console.log()\` का उपयोग करें। नीचे दिया गया कोड एडिटर में टाइप करें।\n\n💡 **सैंपल सॉल्यूशन:**\n\`\`\`javascript\nconsole.log("Welcome to Chapter ${chapterNum}!");\n\`\`\``,
            placeholder: `// यहाँ कोड टाइप करें...\n// उदाहरण: console.log("Welcome to Chapter ${chapterNum}!");`,
            sampleCode: isBoss 
                ? `function bossChallenge() {\n  console.log("Boss Defeated!");\n}\nbossChallenge();`
                : `console.log("Welcome to Chapter ${chapterNum}!");`
        }
    };

    return content[lang] || content['bn'];
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initLevelDropdown();
    addLanguageSwitcherUI();
    loadChapter(1);
});

// Add Language Switcher Buttons dynamically
function addLanguageSwitcherUI() {
    const header = document.querySelector('.level-selector-wrap');
    if (!header || document.getElementById('langSwitcher')) return;

    const langContainer = document.createElement('div');
    langContainer.id = 'langSwitcher';
    langContainer.style.cssText = 'display: flex; gap: 5px; margin-left: 10px;';
    langContainer.innerHTML = `
        <button onclick="changeLang('bn')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='bn'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='bn'?'#000':'#fff'};">BN</button>
        <button onclick="changeLang('en')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='en'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='en'?'#000':'#fff'};">EN</button>
        <button onclick="changeLang('hi')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='hi'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='hi'?'#000':'#fff'};">HI</button>
    `;
    header.appendChild(langContainer);
}

function changeLang(lang) {
    currentLang = lang;
    addLanguageSwitcherUI(); // Refresh button active styling
    loadChapter(currentChapter);
}

// Setup Level Dropdown
function initLevelDropdown() {
    const levelSelect = document.getElementById('levelSelect');
    if (!levelSelect) return;

    levelSelect.innerHTML = '';
    for (let l = 1; l <= 100; l++) {
        const option = document.createElement('option');
        option.value = l;
        option.innerText = `Level ${l}`;
        levelSelect.appendChild(option);
    }
}

function onLevelChange(levelNum) {
    currentLevel = parseInt(levelNum);
    const startChapter = (currentLevel - 1) * 10 + 1;
    loadChapter(startChapter);
}

// Load Chapter & Paywall Check
function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) return;

    // 🔒 Paywall Check: Chapter 50 (Level 6) over limits for Free Users
    if (chapterId > 50 && (!currentUser || !currentUser.isPro)) {
        alert("🔒 Pro Level Locked!\n\nYou have unlocked all 50 Free Chapters! Upgrade to GP Codecraft Pro to access Levels 6 to 100.");
        
        const consoleOutput = document.getElementById('consoleOutput');
        if (consoleOutput) {
            consoleOutput.innerText = "🔒 PREMIUM LOCKED: Upgrade to Pro to unlock Chapter " + chapterId;
            consoleOutput.style.color = "#f87171";
        }
        return;
    }

    currentChapter = chapterId;
    currentLevel = Math.ceil(chapterId / 10);

    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) levelSelect.value = currentLevel;

    const levelBadge = document.getElementById('levelBadge');
    if (levelBadge) levelBadge.innerText = `Level ${currentLevel}`;

    const topicTag = document.getElementById('topicTag');
    if (topicTag) topicTag.innerText = `CHAPTER ${currentChapter}`;

    renderSidebarChapters(currentLevel);

    const details = getChapterDetails(chapterId, currentLang);

    const titleEl = document.getElementById('chapterTitle');
    const descEl = document.getElementById('chapterDescription');
    const codeEditor = document.getElementById('codeEditor');

    if (titleEl) titleEl.innerText = details.title;
    if (descEl) descEl.innerText = details.instruction;
    
    if (codeEditor) {
        codeEditor.value = '';
        codeEditor.placeholder = details.placeholder;
    }

    const consoleOutput = document.getElementById('consoleOutput');
    if (consoleOutput) {
        consoleOutput.innerText = currentLang === 'bn' ? "কোট টাইপ করে 'Run Code' বাটনে ক্লিক করো।" : (currentLang === 'hi' ? "कोड टाइप करें और 'Run Code' पर क्लिक करें।" : "Type code and click 'Run Code'.");
        consoleOutput.style.color = "#a3e635";
    }

    const chapterInput = document.getElementById('chapterInput');
    if (chapterInput) chapterInput.value = currentChapter;
}

// Render Left Sidebar List
function renderSidebarChapters(levelNum) {
    const chapterListEl = document.getElementById('chapterList');
    if (!chapterListEl) return;

    chapterListEl.innerHTML = '';
    const startChapter = (levelNum - 1) * 10 + 1;
    const endChapter = levelNum * 10;

    for (let c = startChapter; c <= endChapter; c++) {
        const isBoss = c % 10 === 0;
        const item = document.createElement('div');
        item.className = `chapter-item ${c === currentChapter ? 'active' : ''}`;
        item.onclick = () => loadChapter(c);

        item.innerHTML = `
            <div class="chapter-item-title">${isBoss ? '🔥 Boss Challenge' : 'Chapter ' + c}</div>
        `;
        chapterListEl.appendChild(item);
    }
}

function handleJump() {
    const inputField = document.getElementById('chapterInput');
    if (inputField) loadChapter(inputField.value);
}

// Run Code Functionality
function runCode() {
    const code = document.getElementById('codeEditor').value.trim();
    const consoleOutput = document.getElementById('consoleOutput');
    if (!consoleOutput) return;

    if (!code) {
        consoleOutput.innerText = "⚠️ Please write some code before clicking Run!";
        consoleOutput.style.color = "#fbbf24";
        return;
    }

    consoleOutput.innerText = '';
    let logs = [];
    const originalLog = console.log;

    console.log = function(...args) {
        logs.push(args.join(' '));
        originalLog.apply(console, args);
    };

    try {
        new Function(code)();
        consoleOutput.innerText = logs.length > 0 ? logs.join('\n') : '✅ Code executed successfully.';
        consoleOutput.style.color = '#a3e635';
    } catch (err) {
        consoleOutput.innerText = `❌ Error: ${err.message}`;
        consoleOutput.style.color = '#f87171';
    } finally {
        console.log = originalLog;
    }
}

// AI Teacher Line-by-Line Detailed Explanation Logic
function askAI() {
    const aiResponse = document.getElementById('aiResponse');
    const userCode = document.getElementById('codeEditor').value.trim();
    const details = getChapterDetails(currentChapter, currentLang);

    if (!aiResponse) return;

    if (!userCode) {
        const msg = {
            bn: "🤖 **এআই টিচার:** তুমি এখনো কোনো কোড লেখোনি! ওপরের ইনস্ট্রাকশন দেখে কোড এডিটরে টাইপ করো, তারপর আমাকে জিজ্ঞেস করো।",
            en: "🤖 **AI Teacher:** You haven't typed any code yet! Check the instruction above, type it in the editor, and ask me again.",
            hi: "🤖 **एआई टीचर:** आपने अभी तक कोई कोड टाइप नहीं किया है! ऊपर दिए गए निर्देशों को देखें और कोड टाइप करें।"
        };
        aiResponse.innerHTML = msg[currentLang];
        return;
    }

    aiResponse.innerHTML = "🤖 <em>AI Teacher is analyzing your code line-by-line...</em>";

    setTimeout(() => {
        if (currentLang === 'bn') {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6;">
                    <h4 style="color: var(--primary-blue); margin-bottom: 8px;">👨‍🏫 এআই টিচার কোড অ্যানালাইসিস & ব্যাখ্যা:</h4>
                    <p><strong>১. \`console.log\` কী?</strong> এটি জাভাস্ক্রিপ্টের একটি ইনবিল্ট ফাংশন, যা ব্রাউজারের কন্সোলে ব্রাউজারকে মেসেজ প্রিন্ট করতে নির্দেশ দেয়।</p>
                    <p><strong>২. ডাবল কোটেশন (" "):</strong> ব্রাউজারকে বোঝায় যে ভেতরের লেখাটি একটি টেক্সট বা String, কোনো ভেরিয়েবল নয়।</p>
                    <p><strong>৩. সেমিকোলন (;):</strong> এটি জাভাস্ক্রিপ্ট স্টেটমেন্টের সমাপ্তি নির্দেশ করে।</p>
                    <br/>
                    <p style="color: var(--accent-green); font-weight: bold;">🎉 চমৎকার! এই কোডটি ম্যানুয়ালি টাইপ করার মাধ্যমে তোমার জাভাস্ক্রিপ্টের সিনট্যাক্স মেমোরি শক্ত হচ্ছে!</p>
                </div>
            `;
        } else if (currentLang === 'hi') {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6;">
                    <h4 style="color: var(--primary-blue); margin-bottom: 8px;">👨‍🏫 एआई टीचर कोड व्याख्या:</h4>
                    <p><strong>1. \`console.log\` क्या है?</strong> यह JavaScript का इनबिल्ट फ़ंक्शन है जो कंसोल में मैसेज प्रिंट करने का काम करता है।</p>
                    <p><strong>2. डबल कोट्स (" "):</strong> यह दर्शाता है कि अंदर का टेक्स्ट एक String है।</p>
                    <p><strong>3. सेमीकोलन (;):</strong> यह स्टेटमेंट की समाप्ति को दर्शाता है।</p>
                    <br/>
                    <p style="color: var(--accent-green); font-weight: bold;">🎉 बहुत बढ़िया! खुद टाइप करके कोड सीखने से आपकी कोडिंग लॉजिक मजबूत होगी!</p>
                </div>
            `;
        } else {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6;">
                    <h4 style="color: var(--primary-blue); margin-bottom: 8px;">👨‍🏫 AI Teacher Code Breakdown:</h4>
                    <p><strong>1. \`console.log\`:</strong> An inbuilt JavaScript function used to output messages to the console log.</p>
                    <p><strong>2. Double Quotes (" "):</strong> Tells the compiler that the text inside is a plain String.</p>
                    <p><strong>3. Semicolon (;):</strong> Marks the end of the JavaScript execution statement.</p>
                    <br/>
                    <p style="color: var(--accent-green); font-weight: bold;">🎉 Great job! Typing this manually helps build muscle memory for clean coding!</p>
                </div>
            `;
        }
    }, 600);
    }
