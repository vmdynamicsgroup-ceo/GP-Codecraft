let allChaptersOverview = [];
let currentChapterId = 1;

// Initialize Web Application
document.addEventListener('DOMContentLoaded', async () => {
  populateLevelDropdown();
  await loadChaptersOverview();
  loadChapterContent(1);
});

// Populate Level Dropdown (1 to 100)
function populateLevelDropdown() {
  const levelSelect = document.getElementById('levelSelect');
  for (let i = 1; i <= 100; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `Level ${i}`;
    levelSelect.appendChild(opt);
  }
}

// Fetch Overview of All Chapters for Navigation
async function loadChaptersOverview() {
  try {
    const res = await fetch('/api/chapters/overview');
    const data = await res.json();

    if (data.success) {
      allChaptersOverview = data.data;
      renderSidebarList(1); // Default show Level 1 chapters
    }
  } catch (err) {
    console.error('Failed to load overview:', err);
  }
}

// Render Sidebar List based on Selected Level
function renderSidebarList(levelNumber) {
  const sidebarContainer = document.getElementById('chapterList');
  sidebarContainer.innerHTML = '';

  const filteredChapters = allChaptersOverview.filter(c => c.level === parseInt(levelNumber, 10));

  if (filteredChapters.length === 0) {
    sidebarContainer.innerHTML = `<div style="padding:10px; color:#94a3b8;">No chapters found for Level ${levelNumber}.</div>`;
    return;
  }

  filteredChapters.forEach(ch => {
    const div = document.createElement('div');
    div.className = `chapter-item ${ch.id === currentChapterId ? 'active' : ''}`;
    div.onclick = () => loadChapterContent(ch.id);

    div.innerHTML = `
      <div class="chapter-item-title">Ch. ${ch.id}: ${ch.title}</div>
    `;
    sidebarContainer.appendChild(div);
  });
}

// Handle Level Dropdown Change
function onLevelChange(selectedLevel) {
  renderSidebarList(selectedLevel);
}

// Dynamic Fetch Chapter Data via Single-Page Architecture (No Page Reload)
async function loadChapterContent(chapterId) {
  currentChapterId = chapterId;

  // Highlight active chapter in sidebar
  document.querySelectorAll('.chapter-item').forEach(item => item.classList.remove('active'));

  try {
    const res = await fetch(`/api/chapter/${chapterId}`);
    const result = await res.json();

    if (result.success) {
      const chapter = result.data;

      // Dynamic UI Updates
      document.getElementById('chapterLevelTag').textContent = `Level ${chapter.level}`;
      document.getElementById('chapterTopicTag').textContent = chapter.topic || 'Software Eng';
      document.getElementById('chapterTitle').textContent = `Chapter ${chapter.id}: ${chapter.title}`;
      document.getElementById('chapterDescription').textContent = chapter.content;
      document.getElementById('codeEditor').value = chapter.initialCode || '';
      document.getElementById('consoleOutput').textContent = '> Press "Run Code" to execute.';
      document.getElementById('aiResponseText').textContent = 'AI Mentor is ready to analyze your code!';

      // Sync Level dropdown if needed
      document.getElementById('levelSelect').value = chapter.level;
    }
  } catch (error) {
    console.error('Error fetching chapter:', error);
  }
}

// Client-Side Code Execution Sandbox
function runCode() {
  const code = document.getElementById('codeEditor').value;
  const consoleBox = document.getElementById('consoleOutput');

  try {
    // Evaluate Javascript safely in browser context
    let output = eval(code);
    consoleBox.textContent = `> ${output !== undefined ? output : 'Executed successfully.'}`;
  } catch (err) {
    consoleBox.textContent = `> Runtime Error: ${err.message}`;
  }
}

// AI Mentor Gemini Integration Query
async function askAIMentor() {
  const aiBox = document.getElementById('aiResponseText');
  const userCode = document.getElementById('codeEditor').value;
  const currentTitle = document.getElementById('chapterTitle').textContent;

  aiBox.textContent = '🤖 Gemini AI Mentor is analyzing your code structure...';

  try {
    const response = await fetch('/api/real-ai-mentor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentCode: userCode,
        chapterContext: currentTitle
      })
    });

    const data = await response.json();
    aiBox.textContent = data.mentorAdvice || 'Unable to retrieve AI analysis.';
  } catch (err) {
    aiBox.textContent = 'Connection error with AI service.';
  }
}
