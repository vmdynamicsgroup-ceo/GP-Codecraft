// index.js - Mobile Coding Simulator Backend Engine

const express = require('express');
const app = express();

// JSON ডেটা গ্রহণ করার জন্য Middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ইউটিউবার ও তাদের নির্দিষ্ট প্রোমো কোডের তালিকা (Database Mapping)
const PROMO_CODES = {
  "TECHBENGAL": { creatorId: "YT_101", creatorName: "Tech Bengal Channel" },
  "CODINGGURU": { creatorId: "YT_102", creatorName: "Coding Guru Channel" },
  "ANUPCODING":  { creatorId: "YT_103", creatorName: "Anup Coding World" }
};

// ১. হেলথ চেক রুট (সার্ভার রানিং আছে কি না দেখার জন্য)
app.get('/', (req, res) => {
  res.json({
    message: "Mobile Coding Simulator Backend API is Running!",
    status: "Active"
  });
});

// ২. পেমেন্ট ও প্রোমো কোড ট্র্যাকিং API Endpoint
app.post('/api/calculate-checkout', (req, res) => {
  const { planType, promoCode } = req.body; // planType: 'MONTHLY' or 'YEARLY'

  // ১. প্রোমো কোড না থাকলে অরিজিনাল প্রাইস
  let basePrice = (planType === 'YEARLY') ? 9.99 : 0.99;
  let discountPercentage = 0;
  let finalStudentPrice = basePrice;
  
  let appliedCreator = null; // যে ইউটিউবার টাকা পাবে

  // ২. প্রোমো কোড মিললে নির্দিষ্ট ইউটিউবারকে শনাক্ত করা
  if (promoCode) {
    const formattedCode = promoCode.trim().toUpperCase();
    
    // চেক করা হচ্ছে প্রোমো কোডটি আমাদের ডাটাবেসে আছে কি না
    if (PROMO_CODES[formattedCode]) {
      discountPercentage = 5; // ৫% ডিসকাউন্ট
      appliedCreator = PROMO_CODES[formattedCode]; // নির্দিষ্ট ইউটিউবারের তথ্য
      
      // ৫% ছাড়ের পর ছাত্রের দাম
      finalStudentPrice = (planType === 'YEARLY') ? 9.49 : 0.94;
    }
  }

  // ৩. শুধুমাত্র নির্দিষ্ট ইউটিউবারের জন্য কমিশন হিসেব করা
  let creatorCommissionRate = 0;
  let creatorEarnings = 0;

  if (appliedCreator) {
    // Monthly-তে ১০% কমিশন, Yearly-তে ২০% কমিশন
    creatorCommissionRate = (planType === 'YEARLY') ? 20 : 10;
    creatorEarnings = Number(((finalStudentPrice * creatorCommissionRate) / 100).toFixed(2));
  }

  // ৪. ফাইনাল রেসপন্স পাঠানো
  res.json({
    success: true,
    planType: planType,
    originalPrice: `$${basePrice}`,
    hasPromoApplied: appliedCreator ? true : false,
    appliedPromoCode: appliedCreator ? promoCode.toUpperCase() : "NONE",
    studentDiscountPercent: `${discountPercentage}%`,
    finalPriceToPay: `$${finalStudentPrice}`, // ছাত্র এই টাকা পেমেন্ট করবে
    
    // শুধুমাত্র প্রোমো কোডের নির্দিষ্ট ইউটিউবারের পে-আউট ডেটা
    payoutToCreator: appliedCreator ? {
      creatorId: appliedCreator.creatorId,
      creatorName: appliedCreator.creatorName,
      commissionRate: `${creatorCommissionRate}%`,
      creatorEarningsPerCycle: `$${creatorEarnings}` // এই নির্দিষ্ট ইউটিউবারের অ্যাকাউন্টে এই কমিশন জমা হবে
    } : "No Creator Promo Used"
  });
});

// সার্ভার চালু করা
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// ==========================================
// ৩. AI MENTOR INTEGRATION (কোড ভুল ধরা ও গাইড করার জন্য)
// ==========================================
app.post('/api/ai-mentor', (req, res) => {
  const { userCode, userQuestion, chapterNumber } = req.body;

  if (!userCode && !userQuestion) {
    return res.status(400).json({
      success: false,
      message: "দয়া করে আপনার কোড বা প্রশ্নটি পাঠাল।"
    });
  }

  // AI Mentor Response Structure
  // (ভবিষ্যতে এখানে OpenAI/Gemini API key কানেক্ট হবে)
  const aiResponse = {
    success: true,
    chapter: chapterNumber || 1,
    mentorFeedback: {
      explanation: "আপনার কোডের লজিক ঠিক আছে, তবে শেষে একটি সেমিকোলন (;) দেওয়া বা ব্র্যাকেট মেলানো বাকি আছে।",
      suggestedHint: "দ্বিতীয় লাইনে গিয়ে প্রিন্ট ফাংশনের বানানটি আরেকবার চেক করুন।",
      encouragement: "দারুণ চেষ্টা করছেন! আরেকটু চেষ্টা করলেই প্রবলেমটি সলভ হয়ে যাবে। 🚀"
    }
  };

  res.json(aiResponse);
});
// ==========================================
// ৪. DATABASE & USER SUBSCRIPTION TRACKER
// ==========================================

// ইউজার ও ইউটিউবার কমিশন সেভ রাখার জন্য লোকাল ডাটাবেস অ্যারে
const userSubscriptions = [];
const creatorPayouts = [];

// সাবস্ক্রিপশন সফল হলে ডাটা সেভ করার API
app.post('/api/subscribe', (req, res) => {
  const { userId, planType, promoCode, paidAmount } = req.body;

  if (!userId || !planType) {
    return res.status(400).json({
      success: false,
      message: "ইউজার আইডি এবং প্ল্যান টাইপ দেওয়া আবশ্যক।"
    });
  }

  // ১. ইউজার সাবস্ক্রিপশন রেকর্ড তৈরি
  const newSubscription = {
    subscriptionId: `SUB_${Date.now()}`,
    userId: userId,
    planType: planType, // 'MONTHLY' or 'YEARLY'
    paidAmount: paidAmount,
    status: 'ACTIVE',
    startDate: new Date().toISOString()
  };

  userSubscriptions.push(newSubscription);

  // ২. যদি কোনো প্রোমো কোড থাকে, তবে ইউটিউবারের পে-আউট জমা করা
  let creatorPayout = null;
  if (promoCode && PROMO_CODES[promoCode.toUpperCase()]) {
    const creator = PROMO_CODES[promoCode.toUpperCase()];
    const commissionPercent = (planType === 'YEARLY') ? 20 : 10;
    const earnedAmount = Number(((paidAmount * commissionPercent) / 100).toFixed(2));

    creatorPayout = {
      payoutId: `PAY_${Date.now()}`,
      creatorId: creator.creatorId,
      creatorName: creator.creatorName,
      studentUserId: userId,
      commissionPercent: `${commissionPercent}%`,
      earnedAmount: earnedAmount,
      date: new Date().toISOString()
    };

    creatorPayouts.push(creatorPayout);
  }

  res.json({
    success: true,
    message: "সাবস্ক্রিপশন সফলভাবে সম্পন্ন হয়েছে!",
    subscriptionData: newSubscription,
    creatorPayoutData: creatorPayout || "No Creator Code Used"
  });
});
// ==========================================
// ৬. CHAPTER 10 BOSS BATTLE VERIFICATION API
// ==========================================
app.post('/api/boss-battle-check', async (req, res) => {
  try {
    const { userId, levelNumber, studentCode, studentExplanation } = req.body;

    if (!studentCode || !studentExplanation) {
      return res.status(400).json({
        success: false,
        message: "দয়া করে আপনার কোড এবং লজিকের ব্যাখ্যা (Why) দুটোই প্রদান করুন।"
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Boss Level Evaluation Prompt
    const prompt = `
    You are a strict yet supportive Coding Judge evaluating a Level ${levelNumber || 1} Boss Challenge for a student.
    
    Student's Submitted Code:
    \`\`\`
    ${studentCode}
    \`\`\`
    
    Student's Explanation of "Why it works":
    "${studentExplanation}"
    
    Tasks:
    1. Check if the code and explanation correctly address Level ${levelNumber || 1} concepts.
    2. Evaluate if the student genuinely understands the logic or just copied code.
    3. Respond in JSON format only with this exact structure:
    {
      "passed": true/false,
      "score": 0 to 100,
      "feedbackInBengali": "Provide clear feedback in Bengali explaining why they passed or what to improve",
      "unlockNextLevel": true/false
    }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // JSON রেসপন্স পার্স করা
    const cleanJsonResponse = JSON.parse(responseText.replace(/```json|```/g, "").trim());

    res.json({
      success: true,
      userId: userId,
      levelEvaluated: levelNumber || 1,
      evaluationResult: cleanJsonResponse
    });

  } catch (error) {
    console.error("Boss Battle Evaluation Error:", error);
    res.status(500).json({
      success: false,
      message: "Boss Level মূল্যায়ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      error: error.message
    });
  }
});
// ==========================================
// ৭. 100 LEVELS (1000 CHAPTERS) HALL OF FAME API
// ==========================================

// ১০০ লেভেল সম্পূর্ণ করা শিক্ষার্থীদের মেসেজ সেভ রাখার ডাটাবেস অ্যারে
const level100Champions = [
  {
    studentName: "Anup Pradhan",
    institution: "Coding Simulator Team",
    completionDate: new Date().toISOString(),
    congratulationsMessage: "🎉 আমি সফলভাবে ১০০টি লেভেল এবং ১০০০টি চ্যাপ্টার শেষ করেছি! মোবাইল দিয়ে কোডিং শেখা সম্ভব!"
  }
];

// ১. শিক্ষার্থী ১০০ লেভেল সম্পূর্ণ করলে মেসেজ জমা করার API
app.post('/api/complete-roadmap', (req, res) => {
  const { studentName, institution, userMessage } = req.body;

  if (!studentName) {
    return res.status(400).json({
      success: false,
      message: "শিক্ষার্থীর নাম দেওয়া আবশ্যক।"
    });
  }

  const championData = {
    championId: `CHAMP_${Date.now()}`,
    studentName: studentName,
    institution: institution || "Self Learner",
    completionDate: new Date().toISOString(),
    congratulationsMessage: userMessage || "🎉 আমি সফলভাবে ১০০টি লেভেল এবং ১০০০টি চ্যাপ্টার সম্পন্ন করেছি!"
  };

  // চ্যাম্পিয়নদের তালিকায় যুক্ত করা
  level100Champions.unshift(championData); // নতুন চ্যাম্পিয়ন সবার উপরে দেখাবে

  res.json({
    success: true,
    message: "🏆 অভিনন্দন! আপনার ১০০ লেভেল সম্পূর্ণ হওয়ার সাফল্য অ্যাপে লাইভ সম্প্রচার করা হচ্ছে!",
    data: championData
  });
});

// ২. অ্যাপ খুললেই সব শিক্ষার্থী যাতে ১০০ লেভেল কমপ্লিটকারীদের দেখতে পায় (Broadcast API)
app.get('/api/hall-of-fame', (req, res) => {
  res.json({
    success: true,
    totalChampions: level100Champions.length,
    championsList: level100Champions
  });
});
// ==========================================
// ৫. REAL GEMINI AI INTEGRATION (Google Gemini API)
// ==========================================
const { GoogleGenerativeAI } = require("@google/generative-ai");

// আপনার Jio থেকে পাওয়া Gemini API Key এনভায়রনমেন্ট ভেরিয়েবল থেকে নেবে
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE");

app.post('/api/real-ai-mentor', async (req, res) => {
  try {
    const { userCode, userQuestion, chapterNumber } = req.body;

    // Gemini 1.5 Flash / Pro মডেল সিলেক্ট করা
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // AI Mentor-এর জন্য বিশেষ নির্দেশিকা (Prompt)
    const prompt = `
    You are an expert AI Coding Mentor for a student studying Chapter ${chapterNumber || 1}.
    Student's Question/Issue: ${userQuestion || "Please review my code and point out errors."}
    Student's Code:
    \`\`\`
    ${userCode || "// No code provided"}
    \`\`\`
    
    Instructions:
    1. Explain the error or concept simply in Bengali (বাংলা).
    2. Give a clear hint on how to fix it without directly giving away the whole solution immediately.
    3. Keep the tone encouraging, friendly, and supportive for students.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({
      success: true,
      chapter: chapterNumber || 1,
      aiMentorAdvice: responseText
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      success: false,
      message: "AI Mentor সার্ভিস সংযোগে সমস্যা হয়েছে। API Key টি সঠিকভাবে সেট করা আছে কি না চেক করুন।",
      error: error.message
    });
  }
});
