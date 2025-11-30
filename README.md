# 🌙 SoulLines - Emotion-Intelligent Poetry Platform

**SoulLines** is a revolutionary poetry platform that combines AI, emotion detection, and atmospheric interactions to create an unprecedented reading experience.

## ✨ Extraordinary Features

### 🎨 Emotion-Reactive Poetry Display
- Background themes change automatically based on detected poem emotions
- Sad → rain effect, Romantic → petals, Motivational → sunrise glow

### 🎤 Voice Aura Interpretation
- Analyzes user's tone/emotion when reading poems aloud
- Recommends poems based on vocal emotional patterns

### 📅 Poem Time-Travel Timeline
- Interactive timeline showing writing evolution
- Mood graphs and theme progression visualization

### 🤖 AI Poem Companion Read-Along Mode
- Emotion-matched narration with adaptive ambient soundscapes
- Dynamic audio experience that responds to poem content

### 🔍 Hidden Meanings Layer
- Swipable deeper layers revealing secrets and interpretations
- Admin-only feature to add hidden context

### 🧬 Poem Fusion Generator
- Users can pick any two poems
- AI generates temporary fusion pieces (not saved)

### 💭 Mood-Driven Home Feed
- Users select current emotion
- Feed adapts to match or balance their mood

### 🌊 Real-Time Poetry Atmosphere Projection
- Background colors, animations shift as users scroll line by line
- Subtle atmospheric effects enhance reading experience

### ⏰ Poem Memory Capsule
- Lock poems with personal notes
- Reopens after chosen future date

### 📊 Admin Analytics Dashboard
- Poem popularity metrics
- Emotional reader trends
- Reading-time heatmaps
- Line-highlighting statistics

## 🏗️ Tech Stack

### Frontend
- **Web**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Mobile**: React Native, Expo
- **State Management**: Zustand
- **UI Components**: Shadcn/ui, Radix UI

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + 2FA
- **Storage**: Supabase Storage (poem covers, media)
- **API**: Next.js API Routes + Supabase Edge Functions

### AI & ML
- **Emotion Detection**: Google Gemini API
- **Voice Analysis**: Web Speech API + Gemini
- **Poem Fusion**: Gemini Pro
- **Sentiment Analysis**: Natural Language Processing

### Deployment
- **Web**: Vercel
- **Mobile**: Expo EAS
- **Backend**: Supabase Cloud
- **CDN**: Vercel Edge Network

## 📁 Project Structure

```
soullines-poetry-platform/
├── apps/
│   ├── web/                    # Next.js web application
│   ├── mobile/                 # React Native mobile app
│   └── admin/                  # Admin dashboard
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── database/               # Database schemas & migrations
│   ├── ai-engine/              # AI/ML services
│   └── shared/                 # Shared utilities
├── supabase/
│   ├── migrations/             # Database migrations
│   ├── functions/              # Edge functions
│   └── seed.sql               # Seed data
└── docs/                       # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Google AI API key

### Installation

```bash
# Clone repository
git clone https://github.com/nnkskt-art/soullines-poetry-platform.git
cd soullines-poetry-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=your_admin_email
```

## 🎯 Features Breakdown

### User Roles
- **Admin**: Full control (upload, edit, schedule, delete poems)
- **Viewers**: View, like, share, comment, bookmark

### Core Features
- ✅ Clean minimal UI with dark/light mode
- ✅ Secure admin login with 2FA
- ✅ Poem categories & cover images
- ✅ Favorites section
- ✅ Offline mode for viewed poems
- ✅ Cloud-based backend with auto backups

## 📱 Mobile App

Built with React Native and Expo for iOS and Android.

```bash
cd apps/mobile
npm install
npx expo start
```

## 🔐 Security

- Two-factor authentication for admin
- Row-level security (RLS) in Supabase
- Secure API endpoints
- Rate limiting
- Input validation & sanitization

## 📊 Analytics

Admin dashboard includes:
- Poem view counts & engagement
- Emotional trend analysis
- Reading time heatmaps
- Line-by-line highlighting stats
- User mood distribution

## 🎨 Design Philosophy

SoulLines focuses on:
- **Atmospheric**: Immersive, emotion-driven visuals
- **Smooth**: Fluid animations and transitions
- **AI-Enhanced**: Intelligent recommendations and interactions
- **Emotionally Interactive**: Responds to user emotions
- **Unique**: Features never seen in poetry apps

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Created by Kavyansh Verma

## 🤝 Contributing

This is a personal project. Issues and suggestions are welcome!

---

**SoulLines** - Where poetry meets emotion, technology meets art.
