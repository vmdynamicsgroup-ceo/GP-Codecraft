let currentUser = JSON.parse(localStorage.getItem('gp_user')) || null;
let userProgress = JSON.parse(localStorage.getItem('gp_progress')) || { currentChapter: 1, maxUnlocked: 1 };
let currentLang = localStorage.getItem('gp_lang') || 'en';

const translations = {
  en: { poweredBy: "Powered by VM Dynamics", welcomePop: "🎉 Welcome!", selectCountry: "Select Country", startJourneyBtn: "Start Journey 🚀", unlockProTitle: "Unlock Pro", unlockProDesc: "Upgrade to unlock 1000 Levels!", monthlyPlan: "Monthly", yearlyPlan: "Yearly", bestValue: "Best Value", closeBtn: "Close", levelLabel: "Level", codePlayground: "💻 Code Playground", runBtn: "▶ Run Code", aiBtn: "✨ AI Mentor", terminalTitle: "TERMINAL:", terminalDefault: "Output...", aiMentorTitle: "🤖 AI Mentor", aiDefaultText: "Click 'AI Mentor' for help before or after coding!" },
  bn: { poweredBy: "ভিএম ডায়নামিকস দ্বারা পরিচালিত", welcomePop: "🎉 স্বাগতম!", selectCountry: "দেশ নির্বাচন", startJourneyBtn: "শুরু করুন 🚀", unlockProTitle: "প্রো আনলক করুন", unlockProDesc: "১০০০ লেভেল আনলক করতে আপগ্রেড করুন!", monthlyPlan: "মাসিক", yearlyPlan: "বার্ষিক", bestValue: "সেরা", closeBtn: "বন্ধ করুন", levelLabel: "লেভেল", codePlayground: "💻 কোড প্লেগ্রাউন্ড", runBtn: "▶ কোড রান করুন", aiBtn: "✨ এআই মেন্টর", terminalTitle: "টার্মিনাল:", terminalDefault: "আউটপুট...", aiMentorTitle: "🤖 এআই মেন্টর", aiDefaultText: "কোড লেখার আগে বা পরে সাহায্যের জন্য 'এআই মেন্টর' এ ক্লিক করুন!" },
  hi: { poweredBy: "वीएम डायनामिक्स", welcomePop: "🎉 स्वागत है!", selectCountry: "देश चुनें", startJourneyBtn: "शुरू करें 🚀", unlockProTitle: "प्रो अनलॉक", unlockProDesc: "1000 लेवल अनलॉक करें!", monthlyPlan: "मासिक", yearlyPlan: "वार्षिक", bestValue: "सर्वश्रेष्ठ", closeBtn: "बंद करें", levelLabel: "स्तर", codePlayground: "💻 कोड ग्राउंड", runBtn: "▶ रन करें", aiBtn: "✨ एआई मेंटर", terminalTitle: "आउटपुट:", terminalDefault: "आउटपुट...", aiMentorTitle: "🤖 एआई मेंटर", aiDefaultText: "कोडिंग से पहले या बाद में मदद लें!" }
};

// 1 to 1000 Scaling Dictionary Base (15 Unique Concepts)
const conceptBase = [
    { type: 'print', en: { t: "Hello World", d: "Print 'Hello'.", s: "console.log('Hello');" }, bn: { t: "হ্যালো ওয়ার্ল্ড", d: "'Hello' প্রিন্ট করুন।", s: "console.log('Hello');" }, hi: { t: "हेलो वर्ल्ड", d: "'Hello' प्रिंट करें।", s: "console.log('Hello');" } },
    { type: 'var', en: { t: "Variables", d: "Create a variable 'x' with value 10 and print it.", s: "let x = 10;\nconsole.log(x);" }, bn: { t: "ভ্যারিয়েবল", d: "x নামে ভ্যারিয়েবল বানিয়ে ১০ রাখুন ও প্রিন্ট করুন।", s: "let x = 10;\nconsole.log(x);" } },
    { type: 'math', en: { t: "Addition", d: "Add 15 and 5, print the result.", s: "console.log(15 + 5);" }, bn: { t: "যোগফল", d: "১৫ ও ৫ যোগ করে প্রিন্ট করুন।", s: "console.log(15 + 5);" } },
    { type: 'string', en: { t: "Strings", d: "Join 'GP' and 'Codecraft' and print.", s: "console.log('GP ' + 'Codecraft');" }, bn: { t: "স্ট্রিং", d: "'GP' এবং 'Codecraft' জুড়ে প্রিন্ট করুন।", s: "console.log('GP ' + 'Codecraft');" } },
    { type: 'if', en: { t: "If Condition", d: "If 10 > 5, print 'True'.", s: "if(10 > 5) {\n  console.log('True');\n}" }, bn: { t: "শর্ত (If)", d: "১০ > ৫ হলে 'True' প্রিন্ট করুন।", s: "if(10 > 5) {\n  console.log('True');\n}" } },
    { type: 'loop', en: { t: "For Loop", d: "Print numbers 1 to 3.", s: "for(let i=1; i<=3; i++) {\n  console.log(i);\n}" }, bn: { t: "লুপ (Loop)", d: "১ থেকে ৩ পর্যন্ত প্রিন্ট করুন।", s: "for(let i=1; i<=3; i++) {\n  console.log(i);\n}" } },
    { type: 'array', en: { t: "Arrays", d: "Create an array of 2 colors and print it.", s: "let colors = ['Red', 'Blue'];\nconsole.log(colors);" }, bn: { t: "অ্যারে (Array)", d: "২টি রঙের অ্যারে বানিয়ে প্রিন্ট করুন।", s: "let colors = ['Red', 'Blue'];\nconsole.log(colors);" } },
    { type: 'func', en: { t: "Functions", d: "Create a function to say 'Hi' and call it.", s: "function sayHi() {\n  console.log('Hi');\n}\nsayHi();" }, bn: { t: "ফাংশন", d: "'Hi' বলার ফাংশন বানিয়ে কল করুন।", s: "function sayHi() {\n  console.log('Hi');\n}\nsayHi();" } },
    { type: 'obj', en: { t: "Objects", d: "Create user object with name and print name.", s: "let user = {name: 'Anup'};\nconsole.log(user.name);" }, bn: { t: "অবজেক্ট", d: "নাম সহ ইউজার অবজেক্ট বানিয়ে নাম প্রিন্ট করুন।", s: "let user = {name: 'Anup'};\nconsole.log(user.name);" } }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('langSwitch').value = currentLang;
    applyLanguage(currentLang);
    checkRegistration();
    renderRoadmap();
    loadChapter(userProgress.currentChapter);
});

function changeLanguage(lang) {
    currentLang = lang; localStorage.setItem('gp_lang', lang);
    applyLanguage(lang); loadChapter(userProgress.currentChapter);
}

function applyLanguage(lang) {
    const t = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        if (t[el.getAttribute('data-i18n')]) el.textContent = t[el.getAttribute('data-i18n')];
    });
}

function checkRegistration() {
    if (!currentUser) document.getElementById('regModal').style.display = 'flex';
    else document.getElementById('headerUserName').textContent = currentUser.name;
}

function handleRegistration(e) {
    e.preventDefault();
    currentUser = { name: document.getElementById('regName').value, email: document.getElementById('regEmail').value, isPro: false, subActive: true };
    localStorage.setItem('gp_user', JSON.stringify(currentUser));
    document.getElementById('headerUserName').textContent = currentUser.name;
    document.getElementById('regModal').style.display = 'none';
}

function closePremiumModal() { document.getElementById('premiumModal').style.display = 'none'; }

function renderRoadmap() {
    const roadmap = document.getElementById('candyRoadmap');
    roadmap.innerHTML = '';
    let currentBlockLevel = Math.ceil(userProgress.currentChapter / 10);
    let startChap = (currentBlockLevel - 1) * 10 + 1;
    document.getElementById('headerLevelNum').textContent = currentBlockLevel;

    for (let i = 0; i < 10; i++) {
        let chapNum = startChap + i;
        if (chapNum > 1000) break;

        let node = document.createElement('div');
        node.className = 'candy-node';

        if (chapNum === 10 || chapNum % 10 === 0) {
            node.classList.add('boss');
            node.innerHTML = `👹<br>${chapNum}`;
        } else {
            node.innerHTML = chapNum;
        }

        if (chapNum < userProgress.maxUnlocked) {
            node.classList.add('completed');
        } else if (chapNum === userProgress.maxUnlocked) {
            node.classList.add('current');
        } else {
            // Lock icon integration
            node.classList.add('locked');
            node.innerHTML = `<span>🔒</span>${chapNum}`;
        }

        node.onclick = () => {
            let userLvl = Math.ceil(chapNum / 10);
            if (userLvl > 5 && (!currentUser || !currentUser.isPro)) {
                document.getElementById('premiumModal').style.display = 'flex'; return;
            }
            if (chapNum <= userProgress.maxUnlocked) loadChapter(chapNum);
            else alert(currentLang === 'bn' ? 'আগের চ্যাপ্টারগুলো সম্পন্ন করুন!' : 'Complete previous chapters first!');
        };
        roadmap.appendChild(node);
    }
}

// Generate Chapter Task
function getChapterData(chapNum) {
    let isBoss = (chapNum % 10 === 0);
    if (isBoss) {
        let prev = chapNum - 9;
        return {
            title: currentLang==='bn' ? `মক টেস্ট (চ্যাপ্টার ${prev}-${chapNum-1})` : `Mock Test (Chap ${prev}-${chapNum-1})`,
            desc: currentLang==='bn' ? "আগের সব লজিক মিলিয়ে এই বস চ্যালেঞ্জটি নিজে সমাধান করুন!" : "Combine all logic from previous 9 chapters to solve this challenge!",
            sample: "// 👹 No hints for Boss Level! You can do it!"
        };
    }
    // Infinite variation math
    let baseIndex = (chapNum - 1) % conceptBase.length;
    let concept = conceptBase[baseIndex];
    let langData = concept[currentLang] || concept['en'];
    
    // Add difficulty label based on multiplier
    let difficulty = Math.ceil(chapNum / conceptBase.length);
    let titleMod = difficulty > 1 ? ` (Level ${difficulty})` : '';

    return { title: langData.t + titleMod, desc: langData.d, sample: langData.s };
}

function loadChapter(chapNum) {
    userProgress.currentChapter = chapNum;
    localStorage.setItem('gp_progress', JSON.stringify(userProgress));

    let data = getChapterData(chapNum);
    
    document.getElementById('chapterTypeTag').textContent = `CHAPTER ${chapNum}`;
    document.getElementById('chapterTitle').textContent = data.title;
    document.getElementById('chapterDescription').textContent = data.desc;
    document.getElementById('sampleCodeText').textContent = data.sample;

    // Reset Code Box & Output completely for new chapter
    document.getElementById('codeEditor').value = '';
    document.getElementById('consoleOutput').textContent = '';
    document.getElementById('aiResponse').innerHTML = translations[currentLang].aiDefaultText;

    renderRoadmap();
}

function selectPlan(type, price) {
    document.getElementById('countryPayOptions').innerHTML = `<button type="button" class="btn btn-success popup-btn" onclick="openRazorpayPayment(${price})">Pay ₹${price}</button>`;
    document.getElementById('paymentMethods').style.display = 'block';
}

function openRazorpayPayment(amount) {
    var options = {
        "key": "YOUR_API_KEY", "amount": amount * 100, "currency": "INR", "name": "GP Codecraft",
        "handler": function (res){
            currentUser.isPro = true; localStorage.setItem('gp_user', JSON.stringify(currentUser));
            document.getElementById('premiumModal').style.display = 'none';
            renderRoadmap(); alert("Pro unlocked!");
        }
    };
    new Razorpay(options).open();
}

function runCode() {
    let code = document.getElementById('codeEditor').value;
    let out = document.getElementById('consoleOutput');
    let chapNum = userProgress.currentChapter;
    
    try {
        let logs = []; let orig = console.log;
        console.log = (arg) => logs.push(arg);
        new Function(code)();
        console.log = orig;
        
        out.textContent = logs.length ? logs.join('\n') : 'Code Executed (No Output)';
        
        if (chapNum === userProgress.maxUnlocked) {
            userProgress.maxUnlocked++;
            localStorage.setItem('gp_progress', JSON.stringify(userProgress));
        }
        renderRoadmap();
        askAI(true); // Auto breakdown after run
    } catch (err) {
        out.textContent = `Error: ${err.message}`;
        document.getElementById('aiResponse').innerHTML = `<strong>❌ ${currentLang==='bn'?'ভুল হয়েছে!':'Error!'}</strong><br>${err.message}`;
    }
}

function askAI(isAfterRun = false) {
    let code = document.getElementById('codeEditor').value.trim();
    let res = document.getElementById('aiResponse');
    let data = getChapterData(userProgress.currentChapter);
    
    // Pre-coding Help
    if (code === "") {
        let tipIntro = currentLang === 'bn' ? "💡 <strong>এআই মেন্টর টিপস:</strong><br>তুমি এখনো কোড লেখোনি! এই চ্যাপ্টারের কাজ হলো:<br>" : "💡 <strong>AI Mentor Tip:</strong><br>You haven't written code yet! Your goal is:<br>";
        let structure = currentLang === 'bn' ? `<br><br><b>কীভাবে শুরু করবে?</b><br>নিচের ইনস্ট্রাকশনে থাকা স্যাম্পল কোডটি বক্সে লেখো এবং 'Run' করো।` : `<br><br><b>How to start?</b><br>Type the sample code shown above into the editor and hit Run.`;
        res.innerHTML = tipIntro + "<em>" + data.desc + "</em>" + structure;
        return;
    }

    // Line-by-line breakdown
    let lines = code.split('\n');
    let text = currentLang === 'bn' ? "<strong>✅ লাইন-বাই-লাইন বিশ্লেষণ:</strong><br>" : "<strong>✅ Line-by-Line Breakdown:</strong><br>";
    
    lines.forEach((l, i) => {
        if(l.trim()) {
            let logic = currentLang === 'bn' ? "লজিক প্রসেস হচ্ছে।" : "Processing logic.";
            if(l.includes('console.log')) logic = currentLang==='bn' ? "টার্মিনালে আউটপুট দেখাচ্ছে।" : "Printing output to terminal.";
            if(l.includes('let') || l.includes('const')) logic = currentLang==='bn' ? "নতুন ভ্যারিয়েবল তৈরি হচ্ছে।" : "Declaring variable.";
            if(l.includes('if')) logic = currentLang==='bn' ? "শর্ত (Condition) চেক করা হচ্ছে।" : "Checking condition.";
            
            text += `<code>L${i+1}: ${l.trim()}</code><br>&nbsp;&nbsp;↳ <em>${logic}</em><br>`;
        }
    });
    res.innerHTML = text;
}
