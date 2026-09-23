# Feedants Competition Details

A production-grade, full-stack mobile competition module built with **React Native CLI**, **Node.js**, **Express.js**, and **MongoDB Atlas**. This project implements a pixel-perfect Classical Dance Competition screen with an uninterrupted real-time lifecycle countdown, atomic spot management, submission video uploads, audit timestamps, and automated 7-day competition rollovers.

---

## 🚀 Tech Stack

### Mobile (Frontend)
- **Framework**: React Native CLI (`0.87.1`)
- **Language**: TypeScript
- **Navigation**: React Navigation (`@react-navigation/native-stack`, `@react-navigation/bottom-tabs`)
- **State & Storage**: React Context (`CompetitionContext`, `LanguageContext`), React Hooks, `@react-native-async-storage/async-storage`
- **File Picker**: `@react-native-documents/picker`
- **Localization**: English (`en`) & Hindi (`hi`) bilingual system

### Backend (API Server)
- **Runtime**: Node.js (ES6 Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose ORM
- **File Uploads**: Multer (Multipart video uploads)
- **Security & Reliability**: Helmet, Express Rate Limiter, Google DNS fallback (`8.8.8.8`)

---

## ✨ Core Features & Architecture

### 1. 🕒 Multi-Phase Lifecycle Countdown Timer
- **Phase-Aware Dynamic Countdown**: The timer in `CountdownTimer.tsx` and `CompetitionDetailsScreen.tsx` adapts to each phase of the competition lifecycle:
  - **Registration Window**: Counts down to `registrationEnd` (*"Registration closes in: 23h : 34m : 12s"*).
  - **Submission Window**: Automatically switches when registration ends and counts down to `submissionEnd` (*"Video submission closes in: 02d : 14h : 20m : 30s"*).
  - **Results Announcement**: Counts down to `resultDate` (*"Results announce in: 02d : 00h : 00m : 00s"*).
  - **Completed**: Displays *"Results Published"* and triggers automatic cycle rollover.
- **Uninterrupted Background Calculation**: Calculations strictly compute against MongoDB UTC timestamps (`Math.max(0, targetDeadline - Date.now())`). The timer **never resets** on user logout, app crash, device reboot, or new user onboarding.

### 2. 🛡️ Atomic Spot Reservation & Audit Tracking
- **ACID Transaction Safeguard**: Prevents overselling spots during high concurrency using MongoDB atomic conditions:
  ```javascript
  {
    $expr: { $lt: ['$registeredCount', '$maxParticipants'] }
  }
  ```
- **Registration Audit Data**: Every participant record in MongoDB stores:
  - `registeredAt`: Exact ISO date & timestamp when the user registered.
  - `timeRemainingAtRegistration`: String showing remaining countdown time at registration moment (e.g. `"23h 29m 20s remaining"`).
- **Duplicate Registration Guard**: Database-level unique compound index on `{ userId: 1, competitionId: 1 }`.

### 3. 🔄 Automated 7-Day Competition Rollover (`autoNextCompetition.js`)
- Once a competition finishes its 7-day cycle (`registration` -> `submission` -> `results`), the server automatically provisions the next competition (e.g., `classical-dance-001` -> `classical-dance-002`).
- Carries forward competition details (judge, prizes, rules, fee) with 0 registrations and new scheduled dates so the app never freezes or becomes empty.

### 4. 🌐 Bilingual Support (English & Hindi)
- Instant one-tap language switch (`🇬🇧 ENG` / `🇮🇳 हिंदी`) with full coverage across countdown timers, status badges, dates, modals, and error messages.

### 5. 🚪 Clean Guest Session & Simulator Protection
- **Logout & Reset User**: Clears local tokens and participation flags while preserving global competition dates and real participant counts.
- **State Simulator Guard**: Prevents redundant server updates and accidental timer resets when testing states.

---

## 📁 Project Structure

```
FeedantsApp/
├── android/                     # Native Android project
├── ios/                         # Native iOS project
├── src/
│   ├── components/competition/  # Modular, memoized UI components
│   │   ├── CompetitionHeader.tsx
│   │   ├── CompetitionHero.tsx
│   │   ├── CountdownTimer.tsx       # Dynamic multi-phase timer
│   │   ├── ImportantDates.tsx       # 2x2 Dates grid
│   │   ├── JudgeCard.tsx
│   │   ├── PreviousWinners.tsx
│   │   ├── CompetitionInfoTabs.tsx
│   │   ├── RewardsSection.tsx
│   │   ├── CompetitionPolicies.tsx
│   │   ├── ReferAndEarnCard.tsx
│   │   ├── UserReviews.tsx
│   │   ├── AdvertisementCard.tsx
│   │   └── UploadSubmissionButton.tsx
│   ├── context/
│   │   ├── CompetitionContext.tsx   # Global competition & session state
│   │   └── LanguageContext.tsx      # Multi-language localization
│   ├── localization/
│   │   └── translations.ts          # EN & HI dictionary
│   ├── navigation/                  # Stack and BottomTab Navigators
│   ├── screens/
│   │   ├── CompetitionsScreen.tsx   # Competitions catalog
│   │   ├── CompetitionDetailsScreen.tsx
│   │   └── ProfileScreen.tsx        # Profile & state simulator
│   ├── services/
│   │   └── api.ts                   # Network fetch client
│   └── utils/
├── server/                          # Express.js Backend
│   ├── config/                      # db.js (Mongoose connection)
│   │   ├── controllers/             # competitionController.js
│   │   ├── middleware/              # errorHandler, upload, validations
│   │   ├── models/                  # Competition.js, User.js, Participation.js
│   │   ├── routes/                  # competitionRoutes.js
│   │   ├── scripts/                 # seedCompetition.js
│   │   ├── services/
│   │   │   ├── competitionState.js      # Lifecycle state engine
│   │   │   └── autoNextCompetition.js   # 7-day auto rollover service
│   │   ├── uploads/                 # Uploaded submission video storage
│   │   └── server.js                # Server entry point
├── App.tsx
└── package.json
```

---

## 🛠️ Setup & Installation

### 1. Backend Setup

```bash
cd server
npm install
```

Configure environment variables in `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

Seed initial competition data:
```bash
node scripts/seedCompetition.js
```

Start the backend server:
```bash
npm run dev
```

---

### 2. Mobile App Setup

In a separate terminal:
```bash
npm install
```

Start Metro bundler:
```bash
npm start
```

Run on Android emulator or physical device:
```bash
npx react-native run-android
```

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/competitions` | List all competitions with dynamic lifecycle state |
| `GET` | `/api/competitions/:id` | Fetch specific competition details & lifecycle |
| `GET` | `/api/competitions/:id/participation?email=...` | Check user registration & submission status |
| `POST` | `/api/competitions/:id/register` | Atomic user registration (saves `registeredAt` and `timeRemainingAtRegistration`) |
| `POST` | `/api/competitions/:id/submission` | Upload video performance (multipart/form-data) |
| `POST` | `/api/competitions/:id/state` | Update competition testing state with date preservation |
| `POST` | `/api/competitions/auto-next` | Check & trigger next competition cycle creation |
