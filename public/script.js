// GP Codecraft - VM Dynamics Front-end Engine

let chaptersData = [];

// 1. Load chapters.json when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    fetch('chapters.json')
        .then(response => {
            if (!response.ok) throw new Error("JSON file not found");
            return response.json();
        })
        .then(data => {
            chaptersData = data;
            console.log("✅ chapters.json loaded successfully!");
        })
        .catch(err => {
            console.log("ℹ️ chapters.json fetch fallback activated:", err.message);
        });

    // Load Chapter 1 by default
    loadChapter(1);
});

// 2. Dynamic Function for Chapters (1 to 1000)
function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);

    // ID Validation (1 to 1000)
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) {
        alert("Please select a valid chapter between 1 and 1000.");
        return;
    }

    const levelNumber = Math.ceil(chapterId / 10);
    
    // Search in chapters.json first
    let chapter = chaptersData.find(c => c.id === chapterId);

    // Dynamic fallback generation with Boss Level logic
    if (!chapter) {
        const isBossLevel = (chapterId % 10 === 0);

        if (isBossLevel) {
            chapter = {
                id: chapterId,
                level: levelNumber,
                title: `⚔️ Level ${levelNumber} BOSS BATTLE: Final Coding Challenge`,
                content: `Congratulations on reaching the Boss Level of Level ${levelNumber}!\n\nMission Objective:\nIn this Boss Battle, you must apply all the skills learned from Chapters ${(levelNumber-1)*10 + 1} to ${chapterId - 1}.\n\nChallenge Requirement:\nBuild a mini-module to solve a real-world software engineering problem. Pass all automated test cases to unlock Level ${levelNumber + 1}!`
            };
        } else {
            chapter = {
                id: chapterId,
                level: levelNumber,
                title: `Level ${levelNumber} - Chapter ${chapterId}: Developer Skill Mastery`,
                content: `Welcome to Chapter ${chapterId} under Level ${levelNumber} of GP Codecraft by VM Dynamics.\n\nIn this module, you will explore essential software engineering concepts, problem-solving strategies, and best practices expected by top tech companies.\n\nKey Topics:\n- Core Logic & Algorithm Building\n- Code Optimization & Efficiency\n- Industry Standard Guidelines for Level ${levelNumber}`
            };
        }
    }

    // Update UI Content
    const titleElement = document.getElementById('chapter-title') || document.querySelector('.chapter-title');
    const contentElement = document.getElementById('chapter-content') || document.querySelector('.chapter-content');
    const levelElement = document.getElementById('level-info') || document.querySelector('.level-info');

    if (titleElement) titleElement.innerText = chapter.title;
    if (contentElement) contentElement.innerText = chapter.content;
    if (levelElement) levelElement.innerText = `Level ${chapter.level} | Chapter ${chapter.id}`;
}
