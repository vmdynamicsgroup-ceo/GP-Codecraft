// GP Codecraft - VM Dynamics Front-end Engine

let chaptersData = [];

// ১. পেজ লোড হলে chapters.json লোড করার চেষ্টা করবে
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

    // ডিফল্টভাবে ১ নম্বর চ্যাপ্টার লোড হবে
    loadChapter(1);
});

// ২. ১ থেকে ১০০০০ চ্যাপ্টার হ্যান্ডেল করার ডায়নামিক ফাংশন
function loadChapter(chapterId) {
    chapterId = parseInt(chapterId);

    // ID ভ্যালিডেশন (১ থেকে ১০০০)
    if (isNaN(chapterId) || chapterId < 1 || chapterId > 1000) {
        alert("Please select a valid chapter between 1 and 1000.");
        return;
    }

    const levelNumber = Math.ceil(chapterId / 10);
    
    // প্রথমে JSON ফাইল থেকে ম্যাচিং ডাটা খোঁজা হবে
    let chapter = chaptersData.find(c => c.id === chapterId);

    // JSON-এ না পাওয়া গেলে ডায়নামিকালি তৈরি হবে
    if (!chapter) {
        chapter = {
            id: chapterId,
            level: levelNumber,
            title: `Level ${levelNumber} - Chapter ${chapterId}: Developer Skill Mastery`,
            content: `Welcome to Chapter ${chapterId} under Level ${levelNumber} of GP Codecraft by VM Dynamics.\n\nIn this module, you will explore essential software engineering concepts, problem-solving strategies, and best practices expected by top tech companies.\n\nKey Topics:\n- Core Logic & Algorithm Building\n- Code Optimization & Efficiency\n- Industry Standard Guidelines for Level ${levelNumber}`
        };
    }

    // UI-তে কন্টেন্ট আপডেট করা
    const titleElement = document.getElementById('chapter-title') || document.querySelector('.chapter-title');
    const contentElement = document.getElementById('chapter-content') || document.querySelector('.chapter-content');
    const levelElement = document.getElementById('level-info') || document.querySelector('.level-info');

    if (titleElement) titleElement.innerText = chapter.title;
    if (contentElement) contentElement.innerText = chapter.content;
    if (levelElement) levelElement.innerText = `Level ${chapter.level} | Chapter ${chapter.id}`;
}
