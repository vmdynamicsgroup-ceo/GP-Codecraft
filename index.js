const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve Static Frontend Files

// Gemini AI API Configuration (Will read from Render Environment Variable)
const API_KEY = process.env.GEMINI_API_KEY || "PASTE_YOUR_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper function to read chapters data safely
const getChaptersData = () => {
  const filePath = path.join(__dirname, 'chapters.json');
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  }
  return [];
};

// ==========================================
// API ROUTES
// ==========================================

// 1. Fetch Specific Chapter Detail (1 to 1000)
app.get('/api/chapter/:id', (req, res) => {
  try {
    const chapterId = parseInt(req.params.id, 10);
    const chaptersData = getChaptersData();
    
    const chapter = chaptersData.find(c => c.id === chapterId);

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found.' });
    }

    res.json({ success: true, data: chapter });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving chapter data.' });
  }
});

// 2. Fetch All Chapters Overview
app.get('/api/chapters/overview', (req, res) => {
  try {
    const chaptersData = getChaptersData();
    const overview = chaptersData.map(c => ({
      id: c.id,
      level: c.level,
      title: c.title
    }));
    res.json({ success: true, data: overview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load chapter list.' });
  }
});

// 3. User Registration Route (Saves user details to users.json)
app.post('/api/register-user', (req, res) => {
  try {
    const { name, phone, email, country } = req.body;

    if (!name || !phone || !email || !country) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const userData = {
      id: Date.now(),
      name,
      phone,
      email,
      country,
      joinedAt: new Date().toISOString()
    };

    const usersFilePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(usersFilePath)) {
      const existingData = fs.readFileSync(usersFilePath, 'utf8');
      users = existingData ? JSON.parse(existingData) : [];
    }

    users.push(userData);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.json({ success: true, message: 'User registered successfully!', user: userData });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// 4. AI Mentor Integration Endpoint
app.post('/api/real-ai-mentor', async (req, res) => {
  try {
    const { studentCode, chapterContext } = req.body;

    if (!studentCode) {
      return res.status(400).json({ mentorAdvice: "Please enter some code before asking the AI Mentor." });
    }

    const model = genAI.getGenerativeAIModel({ model: "gemini-1.5-flash" });
    const prompt = `You are the Official AI Mentor for 'GP Codecraft by VM Dynamics'.
Context: ${chapterContext}
Student's Code:
${studentCode}

Provide a concise, encouraging, and clear explanation of what is correct or how to fix any errors in English.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ mentorAdvice: response.text() });
  } catch (error) {
    console.error('AI Mentor Error:', error);
    res.status(500).json({ mentorAdvice: "AI Mentor service is temporarily unavailable." });
  }
});

// Fallback Route to serve SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 GP Codecraft Server running on port ${PORT}`);
});
