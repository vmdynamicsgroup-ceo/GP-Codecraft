// State Management
let currentLevel = 1;
let currentChapter = 1;
let currentLang = 'bn';
let currentUser = JSON.parse(localStorage.getItem('gp_user')) || { isPro: false };

// Dynamic Level-Based Curriculum Generator
function getChapterDetails(chapterNum) {
    const levelNum = Math.ceil(chapterNum / 10);
    const chapterInLevel = chapterNum % 10 === 0 ? 10 : chapterNum % 10;

    // LEVEL 1: Basic JavaScript
    if (levelNum === 1) {
        const lvl1Topics = {
            1: {
                title: `চ্যাপ্টার ${chapterNum}: কন্সোল ও আউটপুট`,
                instruction: `📌 **নির্দেশ:** JavaScript-এ কন্সোলে কোনো লেখা দেখাতে \`console.log()\` ব্যবহার করা হয়। দেখে দেখে টাইপ করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nconsole.log("Hello GP Codecraft!");\n\`\`\``,
                sampleCode: `console.log("Hello GP Codecraft!");`,
                placeholder: `// দেখে টাইপ করো: console.log("Hello GP Codecraft!");`
            },
            2: {
                title: `চ্যাপ্টার ${chapterNum}: ভেরিয়েবল (Variables)`,
                instruction: `📌 **নির্দেশ:** তথ্য জমা রাখতে \`let\` ব্যবহার করা হয়।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet name = "Anup";\nconsole.log(name);\n\`\`\``,
                sampleCode: `let name = "Anup";\nconsole.log(name);`,
                placeholder: `// দেখে টাইপ করো: let name = "Anup"; console.log(name);`
            },
            3: {
                title: `চ্যাপ্টার ${chapterNum}: যোগ-বিয়োগ (Math)`,
                instruction: `📌 **নির্দেশ:** দুটি সংখ্যা যোগ করার নিয়ম নিচে দেওয়া হলো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet a = 10;\nlet b = 20;\nconsole.log(a + b);\n\`\`\``,
                sampleCode: `let a = 10;\nlet b = 20;\nconsole.log(a + b);`,
                placeholder: `// দেখে টাইপ করো: let a = 10; let b = 20; console.log(a + b);`
            },
            4: {
                title: `চ্যাপ্টার ${chapterNum}: কন্ডিশন (If-Else)`,
                instruction: `📌 **নির্দেশ:** শর্ত যাচাই করতে \`if\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet age = 20;\nif (age >= 18) {\n  console.log("Access Granted");\n}\`\`\``,
                sampleCode: `let age = 20;\nif (age >= 18) {\n  console.log("Access Granted");\n}`,
                placeholder: `// দেখে টাইপ করো...`
            },
            5: {
                title: `চ্যাপ্টার ${chapterNum}: ফাংশন (Functions)`,
                instruction: `📌 **নির্দেশ:** রি-ইউজেবল কোড তৈরি করতে \`function\` লেখো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nfunction greet() {\n  console.log("Welcome!");\n}\ngreet();\n\`\`\``,
                sampleCode: `function greet() {\n  console.log("Welcome!");\n}\ngreet();`,
                placeholder: `// দেখে টাইপ করো...`
            },
            6: {
                title: `চ্যাপ্টার ${chapterNum}: অ্যারে (Arrays)`,
                instruction: `📌 **নির্দেশ:** একাধিক ডাটা একসাথে রাখতে \`[]\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet skills = ["JS", "HTML"];\nconsole.log(skills[0]);\n\`\`\``,
                sampleCode: `let skills = ["JS", "HTML"];\nconsole.log(skills[0]);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            7: {
                title: `চ্যাপ্টার ${chapterNum}: লুপ (For Loop)`,
                instruction: `📌 **নির্দেশ:** বারবার কাজ করার জন্য \`for\` লুপ লেখো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}\`\`\``,
                sampleCode: `for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}`,
                placeholder: `// দেখে টাইপ করো...`
            },
            8: {
                title: `চ্যাপ্টার ${chapterNum}: অবজেক্ট (Objects)`,
                instruction: `📌 **নির্দেশ:** কি-ভ্যালু পেয়ার দিয়ে \`{}\` অবজেক্ট বানাও।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet user = { name: "Anup" };\nconsole.log(user.name);\n\`\`\``,
                sampleCode: `let user = { name: "Anup" };\nconsole.log(user.name);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            9: {
                title: `চ্যাপ্টার ${chapterNum}: স্ট্রিং মেথড`,
                instruction: `📌 **নির্দেশ:** টেক্সট বড় হাতের করতে \`.toUpperCase()\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet text = "hello";\nconsole.log(text.toUpperCase());\n\`\`\``,
                sampleCode: `let text = "hello";\nconsole.log(text.toUpperCase());`,
                placeholder: `// দেখে টাইপ করো...`
            },
            10: {
                title: `🔥 লেভেল ১ বস ব্যাটল: বেসিক লজিক চ্যালেঞ্জ`,
                instruction: `🎯 **বস চ্যালেঞ্জ (এখানে কোনো সলিউশন দেওয়া নেই, নিজের বুদ্ধিতে লেখো!):**\n\n১. \`score\` নামের ভেরিয়েবলে মান দাও \`100\`।\n২. \`checkLevel()\` নামের ফাংশনে চেক করো \`score >= 50\` হলে কন্সোলে প্রিন্ট হবে **"Level 1 Clear!"**।\n৩. ফাংশনটি রান করো।`,
                sampleCode: `let score = 100;\nfunction checkLevel() {\n  if (score >= 50) {\n    console.log("Level 1 Clear!");\n  }\n}\ncheckLevel();`,
                placeholder: `// বস চ্যালেঞ্জের উত্তর টাইপ করো...`
            }
        };
        return lvl1Topics[chapterInLevel];
    }

    // LEVEL 2: DOM & Web Interactive JS
    else if (levelNum === 2) {
        const lvl2Topics = {
            1: {
                title: `চ্যাপ্টার ${chapterNum}: DOM Selection`,
                instruction: `📌 **নির্দেশ:** HTML এলিমেন্ট আইডি দিয়ে ধরতে \`document.getElementById()\` ব্যবহার করা হয়।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet title = document.getElementById("title");\nconsole.log(title);\n\`\`\``,
                sampleCode: `let title = document.getElementById("title");\nconsole.log(title);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            2: {
                title: `চ্যাপ্টার ${chapterNum}: Inner HTML পরিবর্তন`,
                instruction: `📌 **নির্দেশ:** কোনো লেখার ভেতরের টেক্সট পাল্টাতে \`.innerText\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet heading = "Updated Title";\nconsole.log(heading);\n\`\`\``,
                sampleCode: `let heading = "Updated Title";\nconsole.log(heading);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            3: {
                title: `চ্যাপ্টার ${chapterNum}: CSS Style Change`,
                instruction: `📌 **নির্দেশ:** কোড দিয়ে ওয়েবসাইটের রং বদলাতে \`.style.color\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet color = "red";\nconsole.log("Color set to: " + color);\n\`\`\``,
                sampleCode: `let color = "red";\nconsole.log("Color set to: " + color);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            4: {
                title: `চ্যাপ্টার ${chapterNum}: Event Listener (Click)`,
                instruction: `📌 **নির্দেশ:** বাটনে ক্লিক করলে কী হবে তা ঠিক করতে \`addEventListener("click", ...)\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nfunction onClick() {\n  console.log("Button Clicked!");\n}\nonClick();\n\`\`\``,
                sampleCode: `function onClick() {\n  console.log("Button Clicked!");\n}\nonClick();`,
                placeholder: `// দেখে টাইপ করো...`
            },
            5: {
                title: `চ্যাপ্টার ${chapterNum}: Input value সংগ্রহ`,
                instruction: `📌 **নির্দেশ:** ইনপুট বক্সের মান পেতে \`.value\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet inputVal = "Anup";\nconsole.log("User Input: " + inputVal);\n\`\`\``,
                sampleCode: `let inputVal = "Anup";\nconsole.log("User Input: " + inputVal);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            6: {
                title: `চ্যাপ্টার ${chapterNum}: Class List Add/Remove`,
                instruction: `📌 **নির্দেশ:** সিএসএস ক্লাস যুক্ত করতে \`.classList.add()\` ব্যবহার করা হয়।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet activeClass = "active";\nconsole.log("Class Added: " + activeClass);\n\`\`\``,
                sampleCode: `let activeClass = "active";\nconsole.log("Class Added: " + activeClass);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            7: {
                title: `চ্যাপ্টার ${chapterNum}: HTML Element তৈরি`,
                instruction: `📌 **নির্দেশ:** নতুন ট্যাগ বানাতে \`document.createElement()\` ব্যবহার করা হয়।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nlet btn = "button";\nconsole.log("Element Created: " + btn);\n\`\`\``,
                sampleCode: `let btn = "button";\nconsole.log("Element Created: " + btn);`,
                placeholder: `// দেখে টাইপ করো...`
            },
            8: {
                title: `চ্যাপ্টার ${chapterNum}: Append Child`,
                instruction: `📌 **নির্দেশ:** তৈরি করা এলিমেন্ট পেইজে যোগ করতে \`appendChild()\` ব্যবহার করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nconsole.log("Element Appended to DOM");\n\`\`\``,
                sampleCode: `console.log("Element Appended to DOM");`,
                placeholder: `// দেখে টাইপ করো...`
            },
            9: {
                title: `চ্যাপ্টার ${chapterNum}: SetAttribute`,
                instruction: `📌 **নির্দেশ:** ট্যাগের এট্রিবিউট সেট করতে \`setAttribute()\` ব্যবহার করা হয়।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nconsole.log("Attribute Set: disabled");\n\`\`\``,
                sampleCode: `console.log("Attribute Set: disabled");`,
                placeholder: `// দেখে টাইপ করো...`
            },
            10: {
                title: `🔥 লেভেল ২ বস ব্যাটল: DOM ও ইভেন্ট মাস্টারি`,
                instruction: `🎯 **বস চ্যালেঞ্জ (নিজের বুদ্ধিতে কোড লেখো):**\n\n১. \`isClicked\` নামে একটি ভেরিয়েবল নিয়ে \`true\` মান দাও।\n২. \`handleDOM()\` ফাংশনে চেক করো \`isClicked\` সত্য হলে কন্সোলে প্রিন্ট হবে: **"DOM Boss Defeated!"**।\n৩. ফাংশনটি কল করো।`,
                sampleCode: `let isClicked = true;\nfunction handleDOM() {\n  if (isClicked) {\n    console.log("DOM Boss Defeated!");\n  }\n}\nhandleDOM();`,
                placeholder: `// লেভেল ২ বস চ্যালেঞ্জের কোড লেখো...`
            }
        };
        return lvl2Topics[chapterInLevel];
    }

    // Default Fallback Generator for Higher Levels (Level 3 to 100)
    else {
        if (chapterInLevel === 10) {
            return {
                title: `🔥 লেভেল ${levelNum} বস ব্যাটল: অ্যাডভান্সড টেস্ট`,
                instruction: `🎯 **বস চ্যালেঞ্জ (লেভেল ${levelNum}):**\n\`bossLevel${levelNum}()\` নামের একটি ফাংশন তৈরি করো যা কন্সোলে **"Level ${levelNum} Defeated!"** প্রিন্ট করবে।`,
                sampleCode: `function bossLevel${levelNum}() {\n  console.log("Level ${levelNum} Defeated!");\n}\nbossLevel${levelNum}();`,
                placeholder: `// লেভেল ${levelNum} বস চ্যালেঞ্জ কোড করো...`
            };
        } else {
            return {
                title: `চ্যাপ্টার ${chapterNum}: লেভেল ${levelNum} কনসেপ্ট Part ${chapterInLevel}`,
                instruction: `📌 **নির্দেশ:** লেভেল ${levelNum}-এর অ্যাডভান্সড কোডিং প্র্যাকটিস। দেখে দেখে টাইপ করো।\n\n💡 **নমুনা সলিউশন:**\n\`\`\`javascript\nconsole.log("Level ${levelNum} - Chapter ${chapterInLevel} Completed!");\n\`\`\``,
                sampleCode: `console.log("Level ${levelNum} - Chapter ${chapterInLevel} Completed!");`,
                placeholder: `// দেখে টাইপ করো...`
            };
        }
    }
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    initLevelDropdown();
    addLanguageSwitcherUI();
    disableCopyPasteSystem();
    loadChapter(1);
});

// UI Language Switcher
function addLanguageSwitcherUI() {
    const header = document.querySelector('.level-selector-wrap');
    if (!header || document.getElementById('langSwitcher')) return;

    const langContainer = document.createElement('div');
    langContainer.id = 'langSwitcher';
    langContainer.style.cssText = 'display: flex; gap: 5px; margin-left: 10px;';
    langContainer.innerHTML = `
        <button onclick="changeLang('bn')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='bn'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='bn'?'#000':'#fff'};">বাংলা</button>
        <button onclick="changeLang('en')" class="btn-lang" style="padding: 3px 8px; font-weight: bold; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-color); background: ${currentLang==='en'?'var(--primary-blue)':'var(--bg-dark)'}; color: ${currentLang==='en'?'#000':'#fff'};">EN</button>
    `;
    header.appendChild(langContainer);
}

function changeLang(lang) {
    currentLang = lang;
    addLanguageSwitcherUI();
    loadChapter(currentChapter);
}

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

function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) return;

    // 🔒 Paywall Check: Over Level 5 (Chapter 50+) requires Pro
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
        consoleOutput.innerText = logs.length > 0 ? logs.join('\n') : '✅ কোড সফলভাবে রান হয়েছে।';
        consoleOutput.style.color = '#a3e635';
    } catch (err) {
        consoleOutput.innerText = `❌ কোডে ভুল আছে: ${err.message}`;
        consoleOutput.style.color = '#f87171';
    } finally {
        console.log = originalLog;
    }
}

// AI Feedback Logic
function askAI() {
    const aiResponse = document.getElementById('aiResponse');
    const userCode = document.getElementById('codeEditor').value.trim();
    const details = getChapterDetails(currentChapter);
    const isBoss = currentChapter % 10 === 0;

    if (!aiResponse) return;

    if (!userCode) {
        aiResponse.innerHTML = "🤖 **এআই টিচার:** তুমি এখনো কোনো কোড লেখোনি! নির্দেশ দেখে এডিটরে টাইপ করো।";
        return;
    }

    aiResponse.innerHTML = "🤖 <em>এআই টিচার তোমার কোড পর্যালোচনা করছে...</em>";

    setTimeout(() => {
        if (userCode.includes("consolelog")) {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6; color: #f87171;">
                    <h4>⚠️ এআই টিচার ভুল ধরেছে:</h4>
                    <p>তুমি লিখেছ <code>consolelog</code>। সঠিক ফর্ম্যাট: <code>console.log("...")</code> (মাঝখানে ডট আবশ্যক)।</p>
                </div>
            `;
            return;
        }

        if (isBoss) {
            if (userCode.includes("Defeated!") || userCode.includes("Clear!")) {
                aiResponse.innerHTML = `
                    <div style="line-height: 1.6;">
                        <h4 style="color: var(--accent-green); margin-bottom: 8px;">🏆 চমৎকার! তুমি বসকে পরাজিত করেছ!</h4>
                        <p>তুমি সফলভাবে এই লেভেলের সব কনসেপ্ট প্রয়োগ করতে পেরেছ।</p>
                    </div>
                `;
            } else {
                aiResponse.innerHTML = `
                    <div style="line-height: 1.6; color: #fbbf24;">
                        <h4>💡 এআই টিচারের ইঙ্গিত:</h4>
                        <p>তোমার বস চ্যালেঞ্জের উত্তরটি সম্পূর্ণ হয়নি। ইনস্ট্রাকশন দেখে সঠিক শর্ত ও কন্সোল মেসেজ যোগ করো।</p>
                    </div>
                `;
            }
            return;
        }

        if (userCode.replace(/\s/g, '').includes(details.sampleCode.replace(/\s/g, ''))) {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6;">
                    <h4 style="color: var(--accent-green); margin-bottom: 8px;">🎉 চমৎকার! একদম সঠিক কোড লিখেছ!</h4>
                    <p>ম্যানুয়ালি টাইপ করার জন্য ধন্যবাদ! এতে তোমার টাইপিং মেমোরি মজবুত হচ্ছে।</p>
                </div>
            `;
        } else {
            aiResponse.innerHTML = `
                <div style="line-height: 1.6; color: #fbbf24;">
                    <h4>💡 এআই টিচারের ইঙ্গিত:</h4>
                    <p>কোডে ছোট টাইপো আছে। নিচে দেওয়া সঠিক উত্তরটির সাথে মিলিয়ে দেখো:</p>
                    <pre style="background: #000; padding: 8px; border-radius: 4px; color: #a3e635;">${details.sampleCode}</pre>
                </div>
            `;
        }
    }, 500);
}

// Copy-Paste Security
function disableCopyPasteSystem() {
    const codeEditor = document.getElementById('codeEditor');
    const chapterDesc = document.getElementById('chapterDescription');

    if (codeEditor) {
        codeEditor.addEventListener('paste', (e) => {
            e.preventDefault();
            alert('🚫 কপি-পেস্ট বন্ধ করা আছে! হাত দিয়ে টাইপ করে কোড প্র্যাকটিস করো।');
        });
        codeEditor.addEventListener('copy', (e) => e.preventDefault());
        codeEditor.addEventListener('cut', (e) => e.preventDefault());
    }

    if (chapterDesc) {
        chapterDesc.addEventListener('copy', (e) => {
            e.preventDefault();
            alert('🚫 স্যাম্পল কোড কপি করা নিষেধ! দেখে দেখে টাইপ করো।');
        });
        chapterDesc.addEventListener('contextmenu', (e) => e.preventDefault());
    }
}
