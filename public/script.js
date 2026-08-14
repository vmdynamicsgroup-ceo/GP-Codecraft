// ==========================================
// 1. GLOBAL STATE & PROGRESS LOCK SYSTEM
// ==========================================
let currentLevel = 1;
let currentChapter = 1;
let currentLang = 'bn'; // bn, en, hi

let completedChapters = JSON.parse(localStorage.getItem('gp_completed_chapters')) || [1];
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || { isPro: false };

document.addEventListener('DOMContentLoaded', () => {
    initLevelDropdown();
    addLanguageSwitcherUI();
    disableCopyPasteSystem();
    loadChapter(getMaxUnlockedChapter());
});

function getMaxUnlockedChapter() {
    return Math.max(...completedChapters, 1);
}

function isChapterUnlocked(chapterId) {
    if (chapterId === 1) return true;
    return completedChapters.includes(chapterId) || completedChapters.includes(chapterId - 1);
}

function markChapterComplete(chapterId) {
    if (!completedChapters.includes(chapterId)) {
        completedChapters.push(chapterId);
        localStorage.setItem('gp_completed_chapters', JSON.stringify(completedChapters));
    }
    renderSidebarChapters(currentLevel);
}


// ==========================================
// 2. MULTI-LANGUAGE UI STRINGS
// ==========================================
const uiText = {
    inst: { bn: "📌 নির্দেশ:", en: "📌 Instruction:", hi: "📌 निर्देश:" },
    sample: { bn: "💡 নমুনা সলিউশন:", en: "💡 Sample Solution:", hi: "💡 नमूना समाधान:" },
    bossTitle: { bn: "🔥 বস চ্যালেঞ্জ", en: "🔥 Boss Challenge", hi: "🔥 बॉस चैलेंज" },
    bossTask: { bn: "🎯 বস চ্যালেঞ্জ (নিজের বুদ্ধিতে লেখো):", en: "🎯 Boss Challenge (Use your own logic):", hi: "🎯 बॉस चैलेंज (अपना लॉजिक लिखें):" },
    typeHere: { bn: "// দেখে দেখে টাইপ করো...", en: "// Type code here...", hi: "// यहाँ टाइप करें..." },
    runMsg: { bn: "কোড টাইপ করে 'Run Code' বাটনে ক্লিক করো।", en: "Type code and click 'Run Code'.", hi: "कोड टाइप करें और 'Run Code' पर क्लिक करें।" }
};


// ==========================================
// 3. COMPLETE LEVEL-WISE CURRICULUM (Level 1 to 10+)
// ==========================================
function getChapterDetails(chapterNum) {
    const levelNum = Math.ceil(chapterNum / 10);
    const chapterInLevel = chapterNum % 10 === 0 ? 10 : chapterNum % 10;
    const isBoss = chapterInLevel === 10;

    let topicTitle = { bn: "", en: "", hi: "" };
    let topicCode = "";

    // ----------------------------------------
    // LEVEL 1: Basics
    // ----------------------------------------
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
    // ----------------------------------------
    // LEVEL 2: DOM & Events
    // ----------------------------------------
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
            `let title = document.getElementById("title");\nconsole.log(title);`,
            `let heading = "Updated Title";\nconsole.log(heading);`,
            `let color = "red";\nconsole.log("Color: " + color);`,
            `function onClick() {\n  console.log("Clicked!");\n}\nonClick();`,
            `let inputVal = "Anup";\nconsole.log(inputVal);`,
            `let activeClass = "active";\nconsole.log(activeClass);`,
            `let btn = "button";\nconsole.log(btn);`,
            `console.log("Element Appended");`,
            `console.log("Attribute Set");`,
            `let isClicked = true;\nfunction handleDOM() {\n  if (isClicked) console.log("DOM Boss Defeated!");\n}\nhandleDOM();`
        ];
        topicTitle = titles[chapterInLevel - 1];
        topicCode = codes[chapterInLevel - 1];
    }
    // ----------------------------------------
    // LEVEL 3: ES6 & Modern JS
    // ----------------------------------------
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
            `const pi = 3.14;\nlet r = 5;\nconsole.log(pi * r);`,
            `const add = (a, b) => a + b;\nconsole.log(add(5, 2));`,
            `let user = "Anup";\nconsole.log(\`Hi \${user}\`);`,
            `let obj = {id: 1, name: "A"};\nlet {id, name} = obj;\nconsole.log(name);`,
            `let arr1 = [1,2];\nlet arr2 = [...arr1, 3];\nconsole.log(arr2);`,
            `let nums = [1,2];\nconsole.log(nums.map(n => n*2));`,
            `let nums = [1,2,3];\nconsole.log(nums.filter(n => n%2===0));`,
            `let obj = {a: 1, b: 2};\nconsole.log(Object.keys(obj));`,
            `let age = 20;\nconsole.log(age >= 18 ? "Yes" : "No");`,
            `const boss3 = () => {\n  console.log("Level 3 Defeated!");\n};\nboss3();`
        ];
        topicTitle = titles[chapterInLevel - 1];
        topicCode = codes[chapterInLevel - 1];
    }
    // ----------------------------------------
    // LEVEL 4: Async JS & API
    // ----------------------------------------
    else if (levelNum === 4) {
        const titles = [
            { bn: "SetTimeout", en: "SetTimeout", hi: "SetTimeout" },
            { bn: "SetInterval", en: "SetInterval", hi: "SetInterval" },
            { bn: "Callbacks", en: "Callbacks", hi: "कॉलबैक" },
            { bn: "Promise Basics", en: "Promise Basics", hi: "प्रॉमिस बेसिक" },
            { bn: "Promise Then/Catch", en: "Promise Then/Catch", hi: "प्रॉमिस Then/Catch" },
            { bn: "Async & Await", en: "Async & Await", hi: "Async और Await" },
            { bn: "JSON Parse", en: "JSON Parse", hi: "JSON पार्स" },
            { bn: "JSON Stringify", en: "JSON Stringify", hi: "JSON स्ट्रिंगिफ़ाई" },
            { bn: "Fetch API", en: "Fetch API", hi: "फ़ैच एपीआई" },
            { bn: "লেভেল ৪ বস ব্যাটল", en: "Level 4 Boss Battle", hi: "लेवल 4 बॉस बैटल" }
        ];
        const codes = [
            `setTimeout(() => {\n  console.log("Timer Done");\n}, 1000);`,
            `console.log("Interval Setup");`,
            `function process(cb) { cb(); }\nprocess(() => console.log("Done"));`,
            `let p = new Promise(res => res("Success"));\np.then(console.log);`,
            `let p2 = new Promise((_, rej) => rej("Error"));\np2.catch(console.log);`,
            `async function run() {\n  let val = await "Hello";\n  console.log(val);\n}\nrun();`,
            `let obj = JSON.parse('{"x":10}');\nconsole.log(obj.x);`,
            `let str = JSON.stringify({a: 1});\nconsole.log(str);`,
            `console.log("API Fetch Simulated");`,
            `async function boss4() {\n  console.log("Level 4 Defeated!");\n}\nboss4();`
        ];
        topicTitle = titles[chapterInLevel - 1];
        topicCode = codes[chapterInLevel - 1];
    }
    // ----------------------------------------
    // LEVEL 5: Advanced Logic & Closures
    // ----------------------------------------
    else if (levelNum === 5) {
        const titles = [
            { bn: "Closures (ক্লোজার)", en: "Closures", hi: "क्लोजर" },
            { bn: "Scope & Hoisting", en: "Scope & Hoisting", hi: "स्कोप और होस्टिंग" },
            { bn: "Call, Apply, Bind", en: "Call, Apply, Bind", hi: "Call, Apply, Bind" },
            { bn: "Prototypes", en: "Prototypes", hi: "प्रोटोटाइप्स" },
            { bn: "Classes & Objects", en: "Classes & Objects", hi: "क्लासेस और ऑब्जेक्ट्स" },
            { bn: "Error Handling (Try-Catch)", en: "Error Handling", hi: "एरर हैंडलिंग" },
            { bn: "LocalStorage", en: "LocalStorage", hi: "लोकल स्टोरेज" },
            { bn: "Array Reduce", en: "Array Reduce", hi: "एरे रिड्यूस" },
            { bn: "Recursion (রিকাসার্ন)", en: "Recursion", hi: "रिकरशन" },
            { bn: "লেভেল ৫ বস ব্যাটল", en: "Level 5 Boss Battle", hi: "लेवल 5 बॉस बैटल" }
        ];
        const codes = [
            `function outer() {\n  let count = 0;\n  return () => console.log(++count);\n}\nlet inner = outer();\ninner();`,
            `console.log(a);\nvar a = 5;`,
            `const obj = {name: "Anup"};\nfunction show() { console.log(this.name); }\nshow.call(obj);`,
            `let proto = {x: 10};\nlet obj = Object.create(proto);\nconsole.log(obj.x);`,
            `class User {\n  constructor(n) { this.n = n; }\n}\nconsole.log(new User("Anup").n);`,
            `try {\n  throw new Error("Custom Error");\n} catch(e) {\n  console.log(e.message);\n}`,
            `localStorage.setItem("test", "123");\nconsole.log(localStorage.getItem("test"));`,
            `let nums = [1, 2, 3, 4];\nlet sum = nums.reduce((acc, curr) => acc + curr, 0);\nconsole.log(sum);`,
            `function fact(n) {\n  return n === 1 ? 1 : n * fact(n - 1);\n}\nconsole.log(fact(3));`,
            `function boss5() {\n  console.log("Level 5 Defeated!");\n}\nboss5();`
        ];
        topicTitle = titles[chapterInLevel - 1];
        topicCode = codes[chapterInLevel - 1];
    }
    // ----------------------------------------
    // LEVEL 6 TO 10: Dynamic Smart Generator for Remaining Levels
    // ----------------------------------------
    else {
        const categories = ["Algorithms", "Data Structures", "Design Patterns", "Performance", "Security", "Architecture", "Testing", "DevOps", "Expert JS"];
        const catName = categories[(levelNum - 6) % categories.length];
        
        topicTitle = {
            bn: isBoss ? `লেভেল ${levelNum} মাস্টার বস` : `লেভেল ${levelNum}: ${catName} Part ${chapterInLevel}`,
            en: isBoss ? `Level ${levelNum} Master Boss` : `Level ${levelNum}: ${catName} Part ${chapterInLevel}`,
            hi: isBoss ? `लेवल ${levelNum} मास्टर बॉस` : `लेवल ${levelNum}: ${catName} Part ${chapterInLevel}`
        };
        topicCode = isBoss 
            ? `function boss${levelNum}() {\n  console.log("Level ${levelNum} Master Cleared!");\n}\nboss${levelNum}();` 
            : `console.log("Level ${levelNum} (${catName}) - Task ${chapterInLevel} Executed");`;
    }

    const finalTitle = isBoss ? `${uiText.bossTitle[currentLang]}` : `Chapter ${chapterNum}: ${topicTitle[currentLang]}`;
    const finalInstruction = isBoss 
        ? `${uiText.bossTask[currentLang]}\n\n(Level ${levelNum} Final Challenge)`
        : `${uiText.inst[currentLang]} ${topicTitle[currentLang]}\n\n${uiText.sample[currentLang]}\n\`\`\`javascript\n${topicCode}\n\`\`\``;

    return {
        title: finalTitle,
        instruction: finalInstruction,
        sampleCode: topicCode,
        placeholder: uiText.typeHere[currentLang]
    };
}


// ==========================================
// 4. UI, LANGUAGE SWITCHER & NAVIGATION
// ==========================================
function addLanguageSwitcherUI() {
    let langContainer = document.getElementById('langSwitcher');
    
    if (!langContainer) {
        const header = document.querySelector('.level-selector-wrap') || document.body;
        langContainer = document.createElement('div');
        langContainer.id = 'langSwitcher';
        langContainer.style.cssText = 'display: flex; gap: 6px; margin-left: 15px; z-index: 9999;';
        if (document.querySelector('.level-selector-wrap')) {
            document.querySelector('.level-selector-wrap').appendChild(langContainer);
        }
    }

    window.changeLang = function(lang) {
        currentLang = lang;
        addLanguageSwitcherUI();
        loadChapter(currentChapter);
    };

    langContainer.innerHTML = `
        <button onclick="window.changeLang('bn')" style="padding: 4px 10px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid #444; background: ${currentLang==='bn'?'#3b82f6':'#1e293b'}; color: #fff;">বাংলা</button>
        <button onclick="window.changeLang('en')" style="padding: 4px 10px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid #444; background: ${currentLang==='en'?'#3b82f6':'#1e293b'}; color: #fff;">EN</button>
        <button onclick="window.changeLang('hi')" style="padding: 4px 10px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid #444; background: ${currentLang==='hi'?'#3b82f6':'#1e293b'}; color: #fff;">हिंदी</button>
    `;
}

function initLevelDropdown() {
    const levelSelect = document.getElementById('levelSelect');
    if (!levelSelect) return;
    levelSelect.innerHTML = '';
    for (let l = 1; l <= 100; l++) {
        const option = document.createElement('option');
        option.value = l;
        const startChapter = (l - 1) * 10 + 1;
        const isUnlocked = isChapterUnlocked(startChapter);
        option.innerText = `${isUnlocked ? '🔓' : '🔒'} Level ${l}`;
        levelSelect.appendChild(option);
    }
}

function onLevelChange(levelNum) {
    currentLevel = parseInt(levelNum);
    const startChapter = (currentLevel - 1) * 10 + 1;
    
    if (!isChapterUnlocked(startChapter)) {
        alert(`🔒 লেভেল ${currentLevel} লক করা আছে!\n\nআগের লেভেলের সমস্ত চ্যাপ্টার শেষ করো।`);
        const levelSelect = document.getElementById('levelSelect');
        if (levelSelect) levelSelect.value = Math.ceil(getMaxUnlockedChapter() / 10);
        return;
    }
    loadChapter(startChapter);
}

function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) return;

    if (!isChapterUnlocked(chapterId)) {
        alert(`🔒 চ্যাপ্টার ${chapterId} লক করা আছে! আগের চ্যাপ্টারটি আগে সম্পূর্ণ করো।`);
        return;
    }

    if (chapterId > 50 && (!currentUser || !currentUser.isPro)) {
        alert("🔒 প্রিমিয়াম লেভেল লক করা! লেভেল ৬ থেকে ১০০ খেলতে Pro প্যাক আনলক করুন।");
        return;
    }

    currentChapter = chapterId;
    currentLevel = Math.ceil(chapterId / 10);

    initLevelDropdown();

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
    if (aiResponse) aiResponse.innerHTML = "";

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
        const unlocked = isChapterUnlocked(c);
        const isDone = completedChapters.includes(c);

        const item = document.createElement('div');
        item.className = `chapter-item ${c === currentChapter ? 'active' : ''} ${!unlocked ? 'locked' : ''}`;
        
        if (!unlocked) {
            item.style.opacity = '0.5';
            item.style.cursor = 'not-allowed';
        } else {
            item.style.opacity = '1';
            item.style.cursor = 'pointer';
        }

        item.onclick = () => loadChapter(c);
        
        let statusIcon = isDone ? '✅ ' : (unlocked ? '🔓 ' : '🔒 ');
        let label = isBoss ? `${statusIcon}🔥 Boss Challenge` : `${statusIcon}Chapter ${c}`;
        
        item.innerHTML = `<div class="chapter-item-title">${label}</div>`;
        chapterListEl.appendChild(item);
    }
}

function handleJump() {
    const inputField = document.getElementById('chapterInput');
    if (inputField) loadChapter(inputField.value);
}


// ==========================================
// 5. COMPILER & AI TEACHER LOGIC
// ==========================================
function runCode() {
    const code = document.getElementById('codeEditor').value.trim();
    const consoleOutput = document.getElementById('consoleOutput');
    if (!consoleOutput) return;

    if (!code) {
        consoleOutput.innerText = "⚠️ কোড এডিটর ফাঁকা!";
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
        consoleOutput.innerText = logs.length > 0 ? logs.join('\n') : '✅ কোড সফলভাবে রান হয়েছে।';
        consoleOutput.style.color = '#a3e635';

        markChapterComplete(currentChapter);

    } catch (err) {
        consoleOutput.innerText = `❌ ভুল কোড: ${err.message}`;
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
        aiResponse.innerHTML = `<div style="color: #fbbf24;">🤖 আগে কোড টাইপ করো!</div>`;
        return;
    }

    aiResponse.innerHTML = "🤖 <em>এআই কোড চেক করছে...</em>";

    setTimeout(() => {
        if (userCode.includes("consolelog")) {
            aiResponse.innerHTML = `<div style="color: #f87171;">⚠️ <code>console.log</code> এর মাঝে ডট (.) দাওনি!</div>`;
            return;
        }

        if (isBoss) {
            if (userCode.includes("Defeated!") || userCode.includes("Cleared!") || userCode.includes("Clear!")) {
                aiResponse.innerHTML = `<div style="color: #a3e635; font-weight: bold;">🏆 সাবাশ! বস পরাজিত হয়েছে! পরবর্তী চ্যাপ্টার আনলক হয়েছে।</div>`;
                markChapterComplete(currentChapter);
            } else {
                aiResponse.innerHTML = `<div style="color: #fbbf24;">💡 ইঙ্গিত: লজিক সম্পূর্ণ হয়নি।</div>`;
            }
            return;
        }

        if (userCode.replace(/\s/g, '').includes(details.sampleCode.replace(/\s/g, ''))) {
            aiResponse.innerHTML = `<div style="color: #a3e635; font-weight: bold;">🎉 সঠিক উত্তর! পরবর্তী চ্যাপ্টার আনলক হয়েছে।</div>`;
            markChapterComplete(currentChapter);
        } else {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6; color: #fbbf24;">
                    <h4>💡 টাইপো চেক করো:</h4>
                    <pre style="background: #000; padding: 8px; border-radius: 4px; color: #a3e635;">${details.sampleCode}</pre>
                </div>
            `;
        }
    }, 400);
}


// ==========================================
// 6. SECURITY (DISABLE COPY-PASTE)
// ==========================================
function disableCopyPasteSystem() {
    const codeEditor = document.getElementById('codeEditor');
    const chapterDesc = document.getElementById('chapterDescription');

    if (codeEditor) {
        codeEditor.addEventListener('paste', (e) => {
            e.preventDefault();
            alert('🚫 কপি-পেস্ট বন্ধ! দেখে দেখে হাত দিয়ে টাইপ করো।');
        });
        codeEditor.addEventListener('copy', (e) => e.preventDefault());
        codeEditor.addEventListener('cut', (e) => e.preventDefault());
    }

    if (chapterDesc) {
        chapterDesc.addEventListener('copy', (e) => {
            e.preventDefault();
            alert('🚫 স্যাম্পল কোড কপি করা নিষেধ!');
        });
        chapterDesc.addEventListener('contextmenu', (e) => e.preventDefault());
    }
}
