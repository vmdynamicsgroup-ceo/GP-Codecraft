// State Management
let currentLevel = 1;
let currentChapter = 1;

// Initialize App on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initLevelDropdown();
    loadChapter(1);
});

// Populate 100 Levels in Dropdown
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

// When user changes Level Dropdown
function onLevelChange(levelNum) {
    currentLevel = parseInt(levelNum);
    const startChapter = (currentLevel - 1) * 10 + 1;
    loadChapter(startChapter);
}

// Load Chapter Details & Render Chapter List
function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) {
        alert("Please select a valid chapter (1-1000)");
        return;
    }

    currentChapter = chapterId;
    currentLevel = Math.ceil(chapterId / 10);

    // Update Dropdown UI
    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) levelSelect.value = currentLevel;

    const levelBadge = document.getElementById('levelBadge');
    if (levelBadge) levelBadge.innerText = `Level ${currentLevel}`;

    const topicTag = document.getElementById('topicTag');
    if (topicTag) topicTag.innerText = `CHAPTER ${currentChapter}`;

    // Render Left Sidebar Chapters
    renderSidebarChapters(currentLevel);

    // Set Lesson Content
    const isBoss = chapterId % 10 === 0;
    const titleEl = document.getElementById('chapterTitle');
    const descEl = document.getElementById('chapterDescription');

    if (titleEl) {
        titleEl.innerText = isBoss 
            ? `🔥 Boss Battle (Chapter ${chapterId}): Advanced System Assessment` 
            : `Level ${currentLevel} - Chapter ${chapterId}: Fundamentals & Logic Building`;
    }

    if (descEl) {
        descEl.innerText = isBoss
            ? `Welcome to the Boss Battle of Level ${currentLevel}! Write a JavaScript function in the code editor below to process data array elements efficiently and click 'Run Code'.`
            : `In this chapter, you will learn essential programming concepts required for Level ${currentLevel}.\n\nPractice writing clean, error-free JavaScript code in the playground below.`;
    }

    // Set Default Code in Editor
    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
        codeEditor.value = `// Chapter ${chapterId} Practice Code\nfunction solution() {\n  console.log("Learning Chapter ${chapterId} on GP Codecraft!");\n}\n\nsolution();`;
    }

    // Update Input Box
    const chapterInput = document.getElementById('chapterInput');
    if (chapterInput) chapterInput.value = currentChapter;
}

// Render Left Sidebar Chapter List
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

// Jump Chapter "Go" Button Click
function handleJump() {
    const inputField = document.getElementById('chapterInput');
    if (inputField) {
        loadChapter(inputField.value);
    }
}

// Run Code Functionality (Executes code safely in console box)
function runCode() {
    const code = document.getElementById('codeEditor').value;
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.innerText = '';

    // Capture console.log
    let logs = [];
    const originalLog = console.log;
    console.log = function(...args) {
        logs.push(args.join(' '));
        originalLog.apply(console, args);
    };

    try {
        new Function(code)();
        consoleOutput.innerText = logs.length > 0 ? logs.join('\n') : '✅ Code executed successfully with no logs.';
        consoleOutput.style.color = '#a3e635';
    } catch (err) {
        consoleOutput.innerText = `❌ Error: ${err.message}`;
        consoleOutput.style.color = '#f87171';
    } finally {
        console.log = originalLog;
    }
}

// AI Assistant Integration Mock
function askAI() {
    const aiResponse = document.getElementById('aiResponse');
    const code = document.getElementById('codeEditor').value;

    if (aiResponse) {
        aiResponse.innerText = '🤖 Analyzing your code logic...';
        setTimeout(() => {
            aiResponse.innerText = `✨ AI Feedback for Chapter ${currentChapter}:\n\nYour code structure looks great! Remember to keep functions modular and optimize loops for big performance gains in higher levels.`;
        }, 1000);
    }
}
