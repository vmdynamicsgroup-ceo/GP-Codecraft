// ==========================================
// 1. GLOBAL STATE & APP INITIALIZATION
// ==========================================
let currentLevel = 1;
let currentChapter = 1;
let currentLang = 'bn'; // Default Language (bn, en, hi)
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || { isPro: false };

document.addEventListener('DOMContentLoaded', () => {
    initLevelDropdown();
    addLanguageSwitcherUI();
    disableCopyPasteSystem();
    loadChapter(1);
});


// ==========================================
// 2. MULTI-LANGUAGE DICTIONARY & CONTENT
// ==========================================
const uiText = {
    inst: { bn: "📌 নির্দেশ:", en: "📌 Instruction:", hi: "📌 निर्देश:" },
    sample: { bn: "💡 নমুনা সলিউশন:", en: "💡 Sample Solution:", hi: "💡 नमूना समाधान:" },
    bossTitle: { bn: "🔥 বস চ্যালেঞ্জ", en: "🔥 Boss Challenge", hi: "🔥 बॉस चैलेंज" },
    bossTask: { bn: "🎯 বস চ্যালেঞ্জ (তৈরি সলিউশন নেই, নিজের বুদ্ধিতে লেখো):", en: "🎯 Boss Challenge (No ready solution, use your logic):", hi: "🎯 बॉस चैलेंज (कोई समाधान नहीं, अपना लॉजिक लिखें):" },
    typeHere: { bn: "// দেখে টাইপ করো...", en: "// Type here...", hi: "// यहाँ टाइप करें..." },
    runMsg: { bn: "কোড টাইপ করে 'Run Code' বাটনে ক্লিক করো।", en: "Type code and click 'Run Code'.", hi: "कोड टाइप करें और 'Run Code' पर क्लिक करें।" }
};

function getChapterDetails(chapterNum) {
    const levelNum = Math.ceil(chapterNum / 10);
    const chapterInLevel = chapterNum % 10 === 0 ? 10 : chapterNum % 10;
    const isBoss = chapterInLevel === 10;

    let topicTitle = {};
    let topicCode = "";

    // LEVEL 1: Basics
    if (levelNum === 1) {
        const titles = [
            { bn: "কন্সোল ও আউটপুট", en: "Console & Output", hi: "कंसोल और आउटपुट" },
            { bn: "ভেরিয়েবল (Variables)", en: "Variables", hi: "चर (Variables)" },
            { bn: "যোগ-বিয়োগ (Math)", en: "Math Operations", hi: "गणित (Math)" },
            { bn: "কন্ডিশন (If-Else)", en: "Conditions (If-Else)", hi: "शर्तें (If-Else)" },
            { bn: "ফাংশন (Functions)", en: "Functions", hi: "कार्य (Functions)" },
            { bn: "অ্যারে (Arrays)", en: "Arrays", hi: "सरणी (Arrays)" },
            { bn: "লুপ (For Loop)", en: "Loops", hi: "लूप (Loops)" },
            { bn: "অবজেক্ট (Objects)", en: "Objects", hi: "वस्तु (Objects)" },
            { bn: "স্ট্রিং মেথড", en: "String Methods", hi: "स्ट्रिंग मेथड्स" },
            { bn: "লেভেল ১ বস ব্যাটল", en: "Level 1 Boss Battle", hi: "लेवल 1 बॉस बैटल" }
        ];
        const codes = [
            `console.log("Hello GP Codecraft!");`,
            `let name = "Anup";\nconsole.log(name);`,
            `let a = 10;\nlet b = 20;\nconsole.log(a + b);`,
            `let age = 20;\nif (age >= 18) {\n  console.log("Access Granted");\n}`,
            `function greet() {\n  console.log("Welcome!");\n}\ngreet();`,
            `let skills = ["JS", "HTML"];\nconsole.log(skills[0]);`,
            `for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}`,
            `let user = { name: "Anup" };\nconsole.log(user.name);`,
            `let text = "hello";\nconsole.log(text.toUpperCase());`,
            `let score = 100;\nfunction checkLevel() {\n  if (score >= 50) {\n    console.log("Level 1 Clear!");\n  }\n}\ncheckLevel();`
        ];
        topicTitle = titles[chapterInLevel - 1];
        topicCode = codes[chapterInLevel - 1];
    }
    // LEVEL 2: DOM & Events
    else if (levelNum === 2) {
        const titles = [
            { bn: "DOM Selection", en: "DOM Selection", hi: "DOM चयन" },
            { bn: "Inner HTML পরিবর্তন", en: "Change Inner HTML", hi: "Inner HTML बदलें" },
            { bn: "CSS Style Change", en: "CSS Style Change", hi: "CSS स्टाइल बदलें" },
            { bn: "Event Listener", en: "Event Listener", hi: "इवेंट लिसनर" },
            { bn: "Input Value", en: "Input Value", hi: "इनपुट वैल्यू" },
            { bn: "Class Add/Remove", en: "Class Add/Remove", hi: "क्लास जोड़ें/हटाएं" },
            { bn: "Element তৈরি", en: "Create Element", hi: "तत्व बनाएं" },
            { bn: "Append Child", en: "Append Child", hi: "चाइल्ड जोड़ें" },
            { bn: "Set Attribute", en: "Set Attribute", hi: "एट्रीब्यूट सेट करें" },
            { bn: "লেভেল ২ বস ব্যাটল", en: "Level 2 Boss Battle", hi: "लेवल 2 बॉस बैटल" }
        ];
        const codes = [
            `let title = document.getElementById("title");`,
            `let heading = "Updated Title";`,
            `let color = "red";`,
            `function onClick() { console.log("Clicked!"); }`,
            `let inputVal = "Anup";`,
            `let activeClass = "active";`,
            `let btn = "button";`,
            `console.log("Element Appended");`,
            `console.log("Attribute Set");`,
            `let isClicked = true;\nfunction handleDOM() {\n  if (isClicked) console.log("DOM Boss Defeated!");\n}\nhandleDOM();`
        ];
        topicTitle = titles[chapterInLevel - 1];
        topicCode = codes[chapterInLevel - 1];
    }
    // LEVEL 3: ES6 & Modern JavaScript
    else if (levelNum === 3) {
        const titles = [
            { bn: "Let ও Const", en: "Let & Const", hi: "Let और Const" },
            { bn: "Arrow Function", en: "Arrow Function", hi: "एरो फंक्शन" },
            { bn: "Template Literals", en: "Template Literals", hi: "टेम्पलेट लिटरल्स" },
            { bn: "Destructuring", en: "Destructuring", hi: "डिस्ट्रक्चरिंग" },
            { bn: "Spread Operator", en: "Spread Operator", hi: "स्प्रेड ऑपरेटर" },
            { bn: "Array Map", en: "Array Map", hi: "एरे मैप" },
            { bn: "Array Filter", en: "Array Filter", hi: "एरे फ़िल्टर" },
            { bn: "Object Keys", en: "Object Keys", hi: "ऑब्जेक्ट कीज" },
            { bn: "Ternary Operator", en: "Ternary Operator", hi: "टर्नरी ऑपरेटर" },
            { bn: "লেভেল ৩ বস ব্যাটল", en: "Level 3 Boss Battle", hi: "लेवल 3 बॉस बैटल" }
        ];
        const codes = [
            `const pi = 3.14;\nlet r = 5;`,
            `const add = (a, b) => a + b;\nconsole.log(add(5, 2));`,
            `let user = "Anup";\nconsole.log(\`Hi \${user}\`);`,
            `let obj = {id: 1, name: "A"};\nlet {id, name} = obj;`,
            `let arr1 = [1,2];\nlet arr2 = [...arr1, 3];`,
            `let nums = [1,2];\nconsole.log(nums.map(n => n*2));`,
            `let nums = [1,2,3];\nconsole.log(nums.filter(n => n%2===0));`,
            `let obj = {a: 1, b: 2};\nconsole.log(Object.keys(obj));`,
            `let age = 20;\nconsole.log(age >= 18 ? "Yes" : "No");`,
            `const boss3 = () => {\n  console.log("Level 3 Defeated!");\n};\nboss3();`
        ];
        topicTitle = titles[chapterInLevel - 1];
        topicCode = codes[chapterInLevel - 1];
    }
    // LEVEL 4 TO 100: Dynamic Fallback (Auto Generator)
    else {
        topicTitle = { 
            bn: isBoss ? `লেভেল ${levelNum} অ্যাডভান্সড বস` : `লেভেল ${levelNum} - টপিক ${chapterInLevel}`,
            en: isBoss ? `Level ${levelNum} Advanced Boss` : `Level ${levelNum} - Topic ${chapterInLevel}`,
            hi: isBoss ? `लेवल ${levelNum} एडवांस्ड बॉस` : `लेवल ${levelNum} - विषय ${chapterInLevel}`
        };
        topicCode = isBoss 
            ? `function boss${levelNum}() {\n  console.log("Level ${levelNum} Cleared!");\n}\nboss${levelNum}();` 
            : `console.log("Level ${levelNum} - Topic ${chapterInLevel} Practice");`;
    }

    // Combine strings based on selected language
    const finalTitle = isBoss ? `${uiText.bossTitle[currentLang]}` : `Chapter ${chapterNum}: ${topicTitle[currentLang]}`;
    const finalInstruction = isBoss 
        ? `${uiText.bossTask[currentLang]}\n\n(Level ${levelNum} System Test)`
        : `${uiText.inst[currentLang]} ${topicTitle[currentLang]} practice.\n\n${uiText.sample[currentLang]}\n\`\`\`javascript\n${topicCode}\n\`\`\``;

    return {
        title: finalTitle,
        instruction: finalInstruction,
        sampleCode: topicCode,
        placeholder: uiText.typeHere[currentLang]
    };
}


// ==========================================
// 3. UI, LANGUAGE SWITCHER & NAVIGATION
// ==========================================
function addLanguageSwitcherUI() {
    let langContainer = document.getElementById('langSwitcher');
    
    // Create container if it doesn't exist
    if (!langContainer) {
        const header = document.querySelector('.level-selector-wrap') || document.body;
        langContainer = document.createElement('div');
        langContainer.id = 'langSwitcher';
        langContainer.style.cssText = 'display: flex; gap: 8px; margin-left: 15px; z-index: 9999;';
        if (document.querySelector('.level-selector-wrap')) {
            document.querySelector('.level-selector-wrap').appendChild(langContainer);
        }
    }

    // Attach changeLang to window so it always fires globally
    window.changeLang = function(lang) {
        currentLang = lang;
        addLanguageSwitcherUI(); // Refresh button active colors
        loadChapter(currentChapter); // Reload chapter with new language
    };

    // Render Buttons (BN, EN, HI)
    langContainer.innerHTML = `
        <button onclick="window.changeLang('bn')" style="padding: 5px 12px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid #444; background: ${currentLang==='bn'?'#3b82f6':'#1e293b'}; color: #fff;">বাংলা</button>
        <button onclick="window.changeLang('en')" style="padding: 5px 12px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid #444; background: ${currentLang==='en'?'#3b82f6':'#1e293b'}; color: #fff;">EN</button>
        <button onclick="window.changeLang('hi')" style="padding: 5px 12px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid #444; background: ${currentLang==='hi'?'#3b82f6':'#1e293b'}; color: #fff;">हिंदी</button>
    `;
}

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

function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) return;

    // 🔒 Paywall for chapters > 50
    if (chapterId > 50 && (!currentUser || !currentUser.isPro)) {
        alert("🔒 Premium Locked! Upgrade to Pro for Level 6 to 100.");
        return;
    }

    currentChapter = chapterId;
    currentLevel = Math.ceil(chapterId / 10);

    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) levelSelect.value = currentLevel;

    const levelBadge = document.getElementById('levelBadge');
    if (levelBadge) levelBadge.innerText = `Level ${currentLevel}`;

    const topicTag = document.getElementById('topicTag');
    if (topicTag) topicTag.innerText = chapterId % 10 === 0 ? "Boss Battle" : `Chapter ${currentChapter}`;

    renderSidebarChapters(currentLevel);

    const details = getChapterDetails(chapterId);

    const titleEl = document.getElementById('chapterTitle');
    const descEl = document.getElementById('chapterDescription');
    const codeEditor = document.getElementById('codeEditor');
    const consoleOutput = document.getElementById('consoleOutput');
    const aiResponse = document.getElementById('aiResponse');

    if (titleEl) titleEl.innerText = details.title;
    if (descEl) descEl.innerText = details.instruction;
    if (codeEditor) {
        codeEditor.value = '';
        codeEditor.placeholder = details.placeholder;
    }
    if (consoleOutput) {
        consoleOutput.innerText = uiText.runMsg[currentLang];
        consoleOutput.style.color = "#a3e635";
    }
    if (aiResponse) aiResponse.innerHTML = ""; // Reset AI text on chapter load

    const chapterInput = document.getElementById('chapterInput');
    if (chapterInput) chapterInput.value = currentChapter;
}

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
        
        let label = isBoss ? "🔥 Boss Challenge" : `Chapter ${c}`;
        item.innerHTML = `<div class="chapter-item-title">${label}</div>`;
        chapterListEl.appendChild(item);
    }
}

function handleJump() {
    const inputField = document.getElementById('chapterInput');
    if (inputField) loadChapter(inputField.value);
}


// ==========================================
// 4. COMPILER & AI TEACHER LOGIC
// ==========================================
function runCode() {
    const code = document.getElementById('codeEditor').value.trim();
    const consoleOutput = document.getElementById('consoleOutput');
    if (!consoleOutput) return;

    if (!code) {
        consoleOutput.innerText = "⚠️ Code is empty!";
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
        consoleOutput.innerText = logs.length > 0 ? logs.join('\n') : '✅ Executed with no console output.';
        consoleOutput.style.color = '#a3e635';
    } catch (err) {
        consoleOutput.innerText = `❌ Error: ${err.message}`;
        consoleOutput.style.color = '#f87171';
    } finally {
        console.log = originalLog;
    }
}

function askAI() {
    const aiResponse = document.getElementById('aiResponse');
    const userCode = document.getElementById('codeEditor').value.trim();
    const details = getChapterDetails(currentChapter);
    const isBoss = currentChapter % 10 === 0;

    if (!aiResponse) return;

    if (!userCode) {
        const emptyMsgs = { bn: "🤖 আগে কোড টাইপ করো!", en: "🤖 Type code first!", hi: "🤖 पहले कोड टाइप करें!" };
        aiResponse.innerHTML = `<div style="color: #fbbf24;">${emptyMsgs[currentLang]}</div>`;
        return;
    }

    aiResponse.innerHTML = "🤖 <em>Analyzing...</em>";

    setTimeout(() => {
        if (userCode.includes("consolelog")) {
            const errMsgs = {
                bn: "⚠️ <code>console</code> এবং <code>log</code>-এর মাঝে ডট (.) নেই!",
                en: "⚠️ Missing dot (.) between <code>console</code> and <code>log</code>!",
                hi: "⚠️ <code>console</code> और <code>log</code> के बीच डॉट (.) गायब है!"
            };
            aiResponse.innerHTML = `<div style="color: #f87171;">${errMsgs[currentLang]}</div>`;
            return;
        }

        if (isBoss) {
            if (userCode.includes("Defeated!") || userCode.includes("Cleared!") || userCode.includes("Clear!")) {
                aiResponse.innerHTML = `<div style="color: #a3e635; font-weight: bold;">🏆 Boss Defeated! Excellent Logic!</div>`;
            } else {
                aiResponse.innerHTML = `<div style="color: #fbbf24;">💡 Hint: Your boss logic is incomplete. Check variables and conditions!</div>`;
            }
            return;
        }

        if (userCode.replace(/\s/g, '').includes(details.sampleCode.replace(/\s/g, ''))) {
            const successMsgs = {
                bn: "🎉 চমৎকার! একদম সঠিক কোড লিখেছ!",
                en: "🎉 Excellent! Perfectly correct code!",
                hi: "🎉 बहुत बढ़िया! बिल्कुल सही कोड!"
            };
            aiResponse.innerHTML = `<div style="color: #a3e635; font-weight: bold;">${successMsgs[currentLang]}</div>`;
        } else {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6; color: #fbbf24;">
                    <h4>💡 Check for typos:</h4>
                    <pre style="background: #000; padding: 8px; border-radius: 4px; color: #a3e635;">${details.sampleCode}</pre>
                </div>
            `;
        }
    }, 500);
}


// ==========================================
// 5. SECURITY (DISABLE COPY-PASTE)
// ==========================================
function disableCopyPasteSystem() {
    const codeEditor = document.getElementById('codeEditor');
    const chapterDesc = document.getElementById('chapterDescription');

    if (codeEditor) {
        codeEditor.addEventListener('paste', (e) => {
            e.preventDefault();
            alert('🚫 Copy-Paste blocked! Type manually to learn.');
        });
        codeEditor.addEventListener('copy', (e) => e.preventDefault());
        codeEditor.addEventListener('cut', (e) => e.preventDefault());
    }

    if (chapterDesc) {
        chapterDesc.addEventListener('copy', (e) => {
            e.preventDefault();
            alert('🚫 Code copying is disabled!');
        });
        chapterDesc.addEventListener('contextmenu', (e) => e.preventDefault());
    }
}
