let chaptersData = [];
document.addEventListener("DOMContentLoaded", () => {
    checkUserSession();

    fetch('chapters.json')
        .then(response => {
            if (!response.ok) throw new Error("JSON file not found");
            return response.json();
        })
        .then(data => {
            chaptersData = data;
        })
        .catch(err => {
            console.log("Fallback logic active:", err.message);
        });

    loadChapter(1);
});

// Check User Session
function checkUserSession() {
    const savedUser = localStorage.getItem('gp_user');
    if (!savedUser) {
        document.getElementById('userModal').style.display = 'flex';
    } else {
        const user = JSON.parse(savedUser);
        document.getElementById('displayUserName').innerText = user.name;
    }
}

// Handle User Registration
async function handleUserRegister(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('uName').value,
        email: document.getElementById('uEmail').value,
        phone: document.getElementById('uPhone').value,
        country: document.getElementById('uCountry').value
    };

    try {
        const response = await fetch('/api/register-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem('gp_user', JSON.stringify(userData));
            document.getElementById('displayUserName').innerText = userData.name;
            document.getElementById('userModal').style.display = 'none';
        } else {
            alert("Failed to save registration details.");
        }
    } catch (err) {
        alert("Server error during registration.");
    }
}

// Dynamic Load Chapter Function with 5 Free Levels & Level-Up Pop-up Logic
function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);

    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) {
        alert("Please select a valid chapter between 1 and 1000.");
        return;
    }

    // 🔒 FREE LIMIT CHECK: First 5 Levels (50 Chapters) are Free
    if (chapterId > 50) {
        document.getElementById('paywallModal').style.display = 'flex';
        return;
    }

    const levelNumber = Math.ceil(chapterId / 10);

    // 🎉 LEVEL UP POP-UP CHECK: Triggers on completing every 10th chapter (Boss Battle)
    if (chapterId % 10 === 0) {
        document.getElementById('congratsText').innerHTML = `You have reached the <strong>Boss Battle of Level ${levelNumber}</strong> (Chapter ${chapterId})!<br>Complete this boss challenge to level up!`;
        document.getElementById('congratsModal').style.display = 'flex';
    }

    let chapter = chaptersData.find(c => c.id === chapterId);

    if (!chapter) {
        const isBossLevel = (chapterId % 10 === 0);

        if (isBossLevel) {
            chapter = {
                id: chapterId,
                level: levelNumber,
                title: `⚔️ Level ${levelNumber} BOSS BATTLE: Final Coding Challenge`,
                content: `Congratulations on reaching the Boss Level of Level ${levelNumber}!\n\nMission Objective:\nApply all skills learned from Chapters ${(levelNumber-1)*10 + 1} to ${chapterId - 1} to solve this final engineering task.`
            };
        } else {
            chapter = {
                id: chapterId,
                level: levelNumber,
                title: `Level ${levelNumber} - Chapter ${chapterId}: Developer Skill Mastery`,
                content: `Welcome to Chapter ${chapterId} under Level ${levelNumber} of GP Codecraft by VM Dynamics.`
            };
        }
    }

    const titleElement = document.getElementById('chapter-title');
    const contentElement = document.getElementById('chapter-content');
    const levelElement = document.getElementById('level-info');

    if (titleElement) titleElement.innerText = chapter.title;
    if (contentElement) contentElement.innerText = chapter.content;
    if (levelElement) levelElement.innerText = `Level ${chapter.level} | Chapter ${chapter.id}`;
}

// Close Congratulations Modal
function closeCongratsModal() {
    document.getElementById('congratsModal').style.display = 'none';
}
// =========================================================
// ANTI-CHEATING / COPY-PASTE DISABLE LOGIC FOR GP CODECRAFT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // ১. কোড এডিটর বা ইনপুট বক্সে Paste এবং Copy ডিসেবল করা
    const codeInputs = document.querySelectorAll('textarea, input[type="text"], .code-editor');

    codeInputs.forEach(element => {
        // পেস্ট বাটন বন্ধ
        element.addEventListener('paste', (e) => {
            e.preventDefault();
            alert("⚠️ Copy-Paste is disabled! Please write the code manually to practice.");
        });

        // কপি বাটন বন্ধ
        element.addEventListener('copy', (e) => {
            e.preventDefault();
            alert("⚠️ Copying content from GP Codecraft is disabled.");
        });

        // কাট বন্ধ
        element.addEventListener('cut', (e) => {
            e.preventDefault();
        });
    });

    // ২. মাউসের Right Click Menu বন্ধ করা (যেন রাইট ক্লিক করে Copy/Paste না করা যায়)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // ৩. Keyboard Shortcuts ব্লক করা (Ctrl+C, Ctrl+V, Ctrl+X, Cmd+C, Cmd+V, F12 / DevTools)
    document.addEventListener('keydown', (e) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

        // Ctrl + C, Ctrl + V, Ctrl + X, Ctrl + U (View Source)
        if (ctrlOrCmd && ['c', 'v', 'x', 'u'].includes(e.key.toLowerCase())) {
            e.preventDefault();
            alert("⚠️ Keyboard shortcuts for Copy/Paste are disabled on this platform.");
        }

        // F12 / Developer Tools ওপেন হওয়া বন্ধ করা (ঐচ্ছিক)
        if (e.key === "F12" || (ctrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))) {
            e.preventDefault();
        }
    });
});
