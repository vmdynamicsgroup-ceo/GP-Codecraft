// State Management
let currentLevel = 1;
let currentChapter = 1;
let currentLang = 'bn'; // Default Bangla
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || { isPro: false };

// 1 to 9 Diverse Topics + Boss Challenge Logic Generator
function getChapterDetails(chapterNum) {
    const levelNum = Math.ceil(chapterNum / 10);
    const chapterInLevel = chapterNum % 10 === 0 ? 10 : chapterNum % 10;

    // Diverse Curriculum Topics for Chapters 1-9
    const topics = {
        1: {
            title: `চ্যাপ্টার ${chapterNum}: কন্সোল ও প্রথম কোড`,
            instruction: `📌 **কাজ / নির্দেশ:**\nJavaScript-এ কন্সোলে কোনো লেখা আউটপুট হিসেবে দেখাতে \`console.log()\` ব্যবহার করা হয়। নিচের নমুনা সলিউশনটি দেখে কোড এডিটরে টাইপ করো।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nconsole.log("Hello GP Codecraft!");\n\`\`\``,
            sampleCode: `console.log("Hello GP Codecraft!");`,
            placeholder: `// দেখে টাইপ করো: console.log("Hello GP Codecraft!");`
        },
        2: {
            title: `চ্যাপ্টার ${chapterNum}: ভেরিয়েবল (Variables)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nতথ্য জমা রাখার জন্য \`let\` ব্যবহার করে ভেরিয়েবল তৈরি করা হয়। \`name\` নামে একটি ভেরিয়েবল তৈরি করে কন্সোলে প্রিন্ট করো।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nlet name = "Anup";\nconsole.log(name);\n\`\`\``,
            sampleCode: `let name = "Anup";\nconsole.log(name);`,
            placeholder: `// দেখে টাইপ করো: let name = "Anup"; console.log(name);`
        },
        3: {
            title: `চ্যাপ্টার ${chapterNum}: সংখ্যা ও গণিত (Numbers & Math)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nজাভাস্ক্রিপ্ট দিয়ে সংখ্যা যোগ-বিয়োগ করা যায়। দুটি সংখ্যা যোগ করে আউটপুট দেখো।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nlet a = 10;\nlet b = 20;\nconsole.log(a + b);\n\`\`\``,
            sampleCode: `let a = 10;\nlet b = 20;\nconsole.log(a + b);`,
            placeholder: `// দেখে টাইপ করো: let a = 10; let b = 20; console.log(a + b);`
        },
        4: {
            title: `চ্যাপ্টার ${chapterNum}: কন্ডিশন (If-Else Logic)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nকোনো শর্ত যাচাই করতে \`if-else\` ব্যবহার করা হয়। বয়স ১৮-এর বেশি কি না তা যাচাই করো।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nlet age = 20;\nif (age >= 18) {\n  console.log("সবুজ সংকেত: এক্সেস মিলবে");\n}\`\`\``,
            sampleCode: `let age = 20;\nif (age >= 18) {\n  console.log("সবুজ সংকেত: এক্সেস মিলবে");\n}`,
            placeholder: `// দেখে টাইপ করো: if (age >= 18) { ... }`
        },
        5: {
            title: `চ্যাপ্টার ${chapterNum}: ফাংশন (Functions)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nপুনরায় ব্যবহারযোগ্য কোড ব্লককে ফাংশন বলে। একটি শুভকামনা জানানোর ফাংশন বানাও।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nfunction greet() {\n  console.log("স্বাগতম কোডার!");\n}\ngreet();\n\`\`\``,
            sampleCode: `function greet() {\n  console.log("স্বাগতম কোডার!");\n}\ngreet();`,
            placeholder: `// দেখে টাইপ করো: function greet() { ... } greet();`
        },
        6: {
            title: `চ্যাপ্টার ${chapterNum}: অ্যারে বা লিস্ট (Arrays)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nএকাধিক ডাটা একসাথে সাজিয়ে রাখতে অ্যারে \`[]\` ব্যবহার করা হয়। পছন্দের ভাষার লিস্ট তৈরি করো।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nlet skills = ["JS", "Python", "HTML"];\nconsole.log(skills[0]);\n\`\`\``,
            sampleCode: `let skills = ["JS", "Python", "HTML"];\nconsole.log(skills[0]);`,
            placeholder: `// দেখে টাইপ করো: let skills = ["JS", "Python", "HTML"];`
        },
        7: {
            title: `চ্যাপ্টার ${chapterNum}: লুপ (For Loops)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nএকই কাজ বারবার করতে \`for\` লুপ ব্যবহার করা হয়। ১ থেকে ৩ পর্যন্ত প্রিন্ট করো।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nfor (let i = 1; i <= 3; i++) {\n  console.log("কাউন্ট: " + i);\n}\`\`\``,
            sampleCode: `for (let i = 1; i <= 3; i++) {\n  console.log("কাউন্ট: " + i);\n}`,
            placeholder: `// দেখে টাইপ করো: for (let i = 1; i <= 3; i++) { ... }`
        },
        8: {
            title: `চ্যাপ্টার ${chapterNum}: অবজেক্ট (Objects)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nবাস্তব বস্তুর বিভিন্ন বৈশিষ্ট্য ধরে রাখতে অবজেক্ট \`{}\` ব্যবহার করা হয়।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nlet user = { name: "Anup", role: "Developer" };\nconsole.log(user.name);\n\`\`\``,
            sampleCode: `let user = { name: "Anup", role: "Developer" };\nconsole.log(user.name);`,
            placeholder: `// দেখে টাইপ করো: let user = { ... };`
        },
        9: {
            title: `চ্যাপ্টার ${chapterNum}: স্ট্রিং ম্যানিপুলেশন (Strings)`,
            instruction: `📌 **কাজ / নির্দেশ:**\nটেক্সট বড় হাতের (Uppercase) করতে \`.toUpperCase()\` ব্যবহার করা হয়।\n\n💡 **নমুনা সলিউশন (দেখে টাইপ করো):**\n\`\`\`javascript\nlet text = "vmdynamics";\nconsole.log(text.toUpperCase());\n\`\`\``,
            sampleCode: `let text = "vmdynamics";\nconsole.log(text.toUpperCase());`,
            placeholder: `// দেখে টাইপ করো: console.log(text.toUpperCase());`
        },
        10: {
            // 🔥 REAL BOSS BATTLE: No ready-made answer provided!
            title: `🔥 লেভেল ${levelNum} বস ব্যাটল: অল-ইন-ওয়ান সিস্টেম টেস্ট`,
            instruction: `🎯 **বস চ্যালেঞ্জ (এখানে কোনো তৈরি উত্তর নেই! নিজের বুদ্ধিতে কোড লেখো):**\n\nতুমি ১ থেকে ৯ চ্যাপ্টারে যা যা শিখলে (ভেরিয়েবল, ফাংশন, কন্ডিশন), সব মিলিয়ে এই চ্যালেঞ্জটি পার করো:\n\n১. \`score\` নামে একটি ভেরিয়েবল নাও যার মান দাও \`80\`।\n২. \`checkBoss()\` নামে একটি ফাংশন তৈরি করো।\n৩. ফাংশনের ভেতরে \`if\` দিয়ে চেক করো: যদি \`score >= 50\` হয়, তবে কন্সোলে প্রিন্ট করবে: **"Boss Defeated!"**\n৪. ফাংশনটিকে কল করো।\n\n💡 **ইঙ্গিত (Hint):** আগের চ্যাপ্টারগুলোতে দেখা \`let\`, \`function\`, \`if\` এবং \`console.log()\` একত্রে ব্যবহার করো!`,
            sampleCode: `let score = 80;\nfunction checkBoss() {\n  if (score >= 50) {\n    console.log("Boss Defeated!");\n  }\n}\ncheckBoss();`,
            placeholder: `// বস চ্যালেঞ্জের উত্তর নিচে নিজে টাইপ করে তৈরি করো...`
        }
    };

    return topics[chapterInLevel] || topics[1];
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initLevelDropdown();
    addLanguageSwitcherUI();
    loadChapter(1);
});

// Dynamic Language Switcher UI
function addLanguageSwitcherUI() {
    const header = document.querySelector('.level-selector-wrap');
    if (!header || document.getElementById('langSwitcher')) return;

    const langContainer = document.createElement('div');
    langContainer.id = 'langSwitcher';
    langContainer.style.cssText = 'display: flex; gap: 5px; margin-left: 10px;';
    langContainer.innerHTML = `
        <button onclick="changeLang('bn')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='bn'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='bn'?'#000':'#fff'};">বাংলা</button>
        <button onclick="changeLang('en')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='en'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='en'?'#000':'#fff'};">EN</button>
        <button onclick="changeLang('hi')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='hi'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='hi'?'#000':'#fff'};">हिंदी</button>
    `;
    header.appendChild(langContainer);
}

function changeLang(lang) {
    currentLang = lang;
    addLanguageSwitcherUI();
    loadChapter(currentChapter);
}

// Setup Level Dropdown (1-100)
function initLevelDropdown() {
    const levelSelect = document.getElementById('levelSelect');
    if (!levelSelect) return;

    levelSelect.innerHTML = '';
    for (let l = 1; l <= 100; l++) {
        const option = document.createElement('option');
        option.value = l;
        option.innerText = `লেভেল ${l}`;
        levelSelect.appendChild(option);
    }
}

function onLevelChange(levelNum) {
    currentLevel = parseInt(levelNum);
    const startChapter = (currentLevel - 1) * 10 + 1;
    loadChapter(startChapter);
}

// Load Chapter & Handle Paywall Restriction
function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) return;

    // 🔒 Paywall Gate: Free for first 50 chapters (Levels 1-5)
    if (chapterId > 50 && (!currentUser || !currentUser.isPro)) {
        alert("🔒 প্রিমিয়াম লেভেল লক করা!\n\nতুমি ফ্রি ভার্সনের ৫০টি চ্যাপ্টার সম্পূর্ণ করেছ! লেভেল ৬ থেকে ১০০ পর্যন্ত আনলক করতে GP Codecraft Pro-তে আপগ্রেড করো।");
        
        const consoleOutput = document.getElementById('consoleOutput');
        if (consoleOutput) {
            consoleOutput.innerText = "🔒 প্রিমিয়াম লক: চ্যাপ্টার " + chapterId + " খেলতে প্রোপ্যাক আনলক করো।";
            consoleOutput.style.color = "#f87171";
        }
        return;
    }

    currentChapter = chapterId;
    currentLevel = Math.ceil(chapterId / 10);

    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) levelSelect.value = currentLevel;

    const levelBadge = document.getElementById('levelBadge');
    if (levelBadge) levelBadge.innerText = `লেভেল ${currentLevel}`;

    const topicTag = document.getElementById('topicTag');
    if (topicTag) topicTag.innerText = chapterId % 10 === 0 ? "বস চ্যালেঞ্জ" : `চ্যাপ্টার ${currentChapter}`;

    renderSidebarChapters(currentLevel);

    const details = getChapterDetails(chapterId);

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
        consoleOutput.innerText = "কোড টাইপ করে 'Run Code' বাটনে ক্লিক করো।";
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
            <div class="chapter-item-title">${isBoss ? '🔥 বস চ্যালেঞ্জ' : 'চ্যাপ্টার ' + c}</div>
        `;
        chapterListEl.appendChild(item);
    }
}

function handleJump() {
    const inputField = document.getElementById('chapterInput');
    if (inputField) loadChapter(inputField.value);
}

// Code Execution System
function runCode() {
    const code = document.getElementById('codeEditor').value.trim();
    const consoleOutput = document.getElementById('consoleOutput');
    if (!consoleOutput) return;

    if (!code) {
        consoleOutput.innerText = "⚠️ রান করার আগে এডিটরে কোড লিখুন!";
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
        consoleOutput.innerText = logs.length > 0 ? logs.join('\n') : '✅ কোড সফলভাবে রান হয়েছে (কন্সোলে কোনো প্রিন্ট নেই)।';
        consoleOutput.style.color = '#a3e635';
    } catch (err) {
        consoleOutput.innerText = `❌ কোডে ভুল আছে: ${err.message}`;
        consoleOutput.style.color = '#f87171';
    } finally {
        console.log = originalLog;
    }
}

// AI Teacher Feedback Logic
function askAI() {
    const aiResponse = document.getElementById('aiResponse');
    const userCode = document.getElementById('codeEditor').value.trim();
    const details = getChapterDetails(currentChapter);
    const isBoss = currentChapter % 10 === 0;

    if (!aiResponse) return;

    if (!userCode) {
        aiResponse.innerHTML = "🤖 **এআই টিচার:** তুমি এখনো কোনো কোড লেখোনি! ওপরের নির্দেশ দেখে কোড এডিটরে টাইপ করো।";
        return;
    }

    aiResponse.innerHTML = "🤖 <em>এআই টিচার তোমার কোড অ্যানালাইসিস করছে...</em>";

    setTimeout(() => {
        // Syntax Check 1: consolelog without dot
        if (userCode.includes("consolelog")) {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6; color: #f87171;">
                    <h4>⚠️ এআই টিচার ভুল ধরেছে:</h4>
                    <p>তুমি লিখেছ <code>consolelog</code>। কিন্তু জাভাস্ক্রিপ্টে <strong>console</strong> এবং <strong>log</strong>-এর মাঝখানে একটি ডট (<code>.</code>) দিতে হয়!</p>
                    <p>👉 সঠিক ফর্ম্যাট: <code>console.log("...")</code></p>
                </div>
            `;
            return;
        }

        // Boss Battle Evaluation
        if (isBoss) {
            if (userCode.includes("Boss Defeated!") && userCode.includes("function") && userCode.includes("if")) {
                aiResponse.innerHTML = `
                    <div style="line-height: 1.6;">
                        <h4 style="color: var(--accent-green); margin-bottom: 8px;">🏆 অসাম! তুমি বসকে পরাজিত করেছ!</h4>
                        <p>তুমি ১-৯ চ্যাপ্টারের সব লজিক (ভেরিয়েবল, ফাংশন, কন্ডিশন) একসাথে সঠিকভাবে প্রয়োগ করতে পেরেছ।</p>
                        <p style="color: var(--primary-blue); font-weight: bold;">🚀 পরবর্তী লেভেলে যাওয়ার জন্য প্রস্তুত!</p>
                    </div>
                `;
            } else {
                aiResponse.innerHTML = `
                    <div style="line-height: 1.6; color: #fbbf24;">
                        <h4>💡 এআই টিচারের ইঙ্গিত (Boss Battle):</h4>
                        <p>তোমার কোডটি এখনো সম্পূর্ণ হয়নি। নিশ্চিত করো যে—</p>
                        <ul>
                            <li>১. \`score\` ভেরিয়েবল বানিয়েছ।</li>
                            <li>২. \`function\` এবং \`if\` শর্ত যোগ করেছ।</li>
                            <li>৩. "Boss Defeated!" লেখাটি কন্সোলে প্রিন্ট করেছ।</li>
                        </ul>
                    </div>
                `;
            }
            return;
        }

        // Standard Chapter Evaluation
        if (userCode.replace(/\s/g, '').includes(details.sampleCode.replace(/\s/g, ''))) {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6;">
                    <h4 style="color: var(--accent-green); margin-bottom: 8px;">🎉 চমৎকার! একদম সঠিক কোড লিখেছ!</h4>
                    <p><strong>কোডের ব্যাখ্যা:</strong></p>
                    <p>• প্রতিটি কমান্ড সঠিকভাবে টাইপ করেছ। দেখে টাইপ করার ফলে তোমার জাভাস্ক্রিপ্ট সিনট্যাক্স মেমোরি মজবুত হচ্ছে!</p>
                </div>
            `;
        } else {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6; color: #fbbf24;">
                    <h4>💡 এআই টিচারের ইঙ্গিত:</h4>
                    <p>তোমার টাইপ করা কোডে কিছুটা অমিল আছে। টাইপো বা সেমিকোলন চেক করো।</p>
                    <p><strong>সঠিক সলিউশনটি খেয়াল করো:</strong></p>
                    <pre style="background: #000; padding: 8px; border-radius: 4px; color: #a3e635;">${details.sampleCode}</pre>
                </div>
            `;
        }
    }, 500);
            }
// Disable Copy, Paste, Cut & Context Menu for Learning Efficiency
document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('codeEditor');
    const chapterDesc = document.getElementById('chapterDescription');

    // 1. Disable Copy, Paste & Cut on Code Editor
    if (codeEditor) {
        codeEditor.addEventListener('paste', (e) => {
            e.preventDefault();
            alert('🚫 কপি-পেস্ট বন্ধ করা আছে! হাত দিয়ে টাইপ করে কোড প্র্যাকটিস করো, তাহলে দ্রুত শিখতে পারবে।');
        });
        codeEditor.addEventListener('copy', (e) => e.preventDefault());
        codeEditor.addEventListener('cut', (e) => e.preventDefault());
    }

    // 2. Disable Selecting & Copying Code from Instruction Box
    if (chapterDesc) {
        chapterDesc.addEventListener('copy', (e) => {
            e.preventDefault();
            alert('🚫 স্যাম্পল কোড কপি করা নিষেধ! দেখে দেখে টাইপ করো।');
        });
        chapterDesc.addEventListener('contextmenu', (e) => e.preventDefault()); // Disable Right Click
    }
})
