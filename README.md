# DSA Guru - AI-Powered Data Structures & Algorithms Learning App

A beautiful, production-ready React application for learning Data Structures and Algorithms with AI-powered responses in Indian teaching style.

## Features

- 🔐 **Firebase Authentication** - Email/password and Google sign-in
- 💬 **Interactive Chat Interface** - Real-time Q&A with typewriter effect
- 🎯 **Query Limiting** - 5 queries per day per user (tracked via Firestore)
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistence
- 🤖 **AI-Powered Responses** - Google Gemini integration for DSA explanations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Beautiful UI** - Soft, loving aesthetics with smooth animations

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd dsa-guru
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)❣️
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password and Google sign-in
4. Create Firestore Database:
   - Go to Firestore Database > Create database
   - Start in test mode (configure rules later)
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click on web app icon
   - Copy the config object

### 3. Google Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/)❣️
2. Create an API key
3. Copy the API key

### 4. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials in `.env`:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Update `src/firebase/config.ts` with your Firebase config

### 5. Development

```bash
npm run dev
```

### 6. Firebase Deployment

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase (if not already done):
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. Build and deploy:
   ```bash
   npm run build 
   // to check the build recheck using
   npm run dev
   firebase deploy
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthForm.tsx    # Login/signup form
│   ├── Header.tsx      # App header with dark mode toggle
│   ├── Dashboard.tsx   # Main chat interface
│   ├── ChatMessage.tsx # Individual chat message
│   ├── ChatInput.tsx   # Message input component
│   └── QueryLimitIndicator.tsx # Query limit display
├── context/            # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Dark mode state
├── services/           # API services
│   ├── geminiService.ts # Google Gemini AI integration
│   └── queryService.ts  # Query limit management
├── firebase/           # Firebase configuration
│   └── config.ts       # Firebase setup
└── App.tsx            # Main app component
```

## Usage

1. **Sign Up/Login** - Create an account or sign in with Google
2. **Ask Questions** - Type any DSA-related question in the chat
3. **Get Responses** - Receive detailed explanations with Java code examples
4. **Track Queries** - Monitor your daily query limit (5 per day)
5. **Toggle Dark Mode** - Switch between light and dark themes

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **AI**: Google Gemini API
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting
- **Icons**: Lucide React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
Copyright (c) 2025 Varun Jha
MIT License - feel free to use this project for learning and development!