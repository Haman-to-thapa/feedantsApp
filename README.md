# Feedants Competition Details

A full-stack mobile competition details module built using **React Native CLI**, **Node.js**, **Express.js**, and **MongoDB Atlas**. This project implements a pixel-perfect Classical Dance Competition screen with real-time countdown, spot management, atomic registration, and video submission uploads.

---

## 🚀 Tech Stack

### Mobile (Frontend)
- **Framework**: React Native CLI (`0.87.1`)
- **Language**: TypeScript
- **Navigation**: React Navigation (`@react-navigation/native-stack`, `@react-navigation/bottom-tabs`)
- **State & Storage**: React Hooks (`useState`, `useEffect`, `useCallback`, `React.memo`), `@react-native-async-storage/async-storage`
- **File Picker**: `@react-native-documents/picker`

### Backend (API Server)
- **Runtime**: Node.js (ES6 Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose ORM
- **File Uploads**: Multer
- **Security & Performance**: Helmet, Express Rate Limiter, DNS optimization

---

## ✨ Features

- **Pixel-Perfect UI**: 1:1 match with Figma/production reference (Header, Hero card, Judge info, 2x2 Dates grid, Previous Winners carousel, Underline Tabs, Rewards rank ladder, Policies, Referral card, User Reviews).
- **Zero-Lag Architecture**: The 1-second countdown timer is isolated in a child component (`CountdownTimer.tsx`) and all UI sections are wrapped in `React.memo` to eliminate screen re-renders.
- **Dynamic Competition Lifecycle**: Automatically calculates state (`UPCOMING`, `REGISTRATION_OPEN`, `REGISTRATION_FULL`, `REGISTRATION_CLOSED`, `SUBMISSION_OPEN`, `SUBMISSION_CLOSED`, `RESULT_PUBLISHED`).
- **Atomic Spot Reservation**: Uses MongoDB atomic operators (`$expr: { $lt: ['$registeredCount', '$maxParticipants'] }` and `$inc: { registeredCount: 1 }`) within ACID transactions to prevent overselling spots during concurrent registrations.
- **Duplicate Registration Guard**: Database-level unique compound index on `{ userId: 1, competitionId: 1 }` in Participation model.
- **Persistent State**: User registration and submission states persist across app reloads via AsyncStorage and backend verification.
- **Multipart Video Upload**: Video picker integration with 100MB file limit and MIME filtering.
- **Brand Loading & Error States**: Dedicated loading screen with branded "F" badge and error screen with interactive retry button.

---

## 📁 Project Structure

```
feedantsApp/
├── FeedantsApp/                     # React Native Mobile App
│   ├── android/                     # Native Android project
│   ├── ios/                         # Native iOS project
│   ├── src/
│   │   ├── components/competition/  # Modular, memoized UI components
│   │   │   ├── CompetitionHeader.tsx
│   │   │   ├── CompetitionHero.tsx
│   │   │   ├── JudgeCard.tsx
│   │   │   ├── CountdownTimer.tsx
│   │   │   ├── ImportantDates.tsx
│   │   │   ├── PreviousWinners.tsx
│   │   │   ├── CompetitionInfoTabs.tsx
│   │   │   ├── RewardsSection.tsx
│   │   │   ├── CompetitionPolicies.tsx
│   │   │   ├── ReferAndEarnCard.tsx
│   │   │   ├── UserReviews.tsx
│   │   │   ├── AdvertisementCard.tsx
│   │   │   └── UploadSubmissionButton.tsx
│   │   ├── navigation/              # Stack and Tab Navigators
│   │   ├── screens/                 # Main CompetitionDetailsScreen
│   │   ├── services/                # api.ts (Fetch service)
│   │   └── utils/                   # storage.ts & documentPicker.ts adapters
│   ├── server/                      # Express.js Backend
│   │   ├── config/                  # db.js (Mongoose connection)
│   │   ├── controllers/             # competitionController.js
│   │   ├── middleware/              # errorHandler, upload, validateObjectId, validateRegistration
│   │   ├── models/                  # Competition.js, User.js, Participation.js
│   │   ├── routes/                  # competitionRoutes.js
│   │   ├── scripts/                 # seedCompetition.js (Demo seeding)
│   │   ├── services/                # competitionState.js (Lifecycle engine)
│   │   ├── uploads/                 # Uploaded submission video files
│   │   ├── .env                     # Local environment variables
│   │   ├── .env.example             # Template environment variables
│   │   ├── server.js                # Server entry point
│   │   └── package.json
│   ├── App.tsx
│   └── package.json
└── README.md
```

---

## 🛠️ Setup & Installation

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (refer to `.env.example`):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Seed initial competition data (for development/testing):
```bash
node scripts/seedCompetition.js
```

Start the backend server:
```bash
node server.js
```

---

### 2. Mobile App Setup

In a separate terminal:
```bash
cd ..
npm install
```

Start Metro bundler:
```bash
npm start
```

In another terminal, run on Android:
```bash
npm run android
```

> **Note on Emulator Network**:
> When using the Android Emulator, the app connects to the local backend using `http://10.0.2.2:5000/api`. On physical devices, replace `10.0.2.2` with your machine's local IP address in `src/services/api.ts`.

---

## 📡 API Reference

| Method | Endpoint | Description | Sample Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/competitions/:id` | Fetch competition details + dynamic lifecycle | `{ success: true, data: { ...comp, lifecycle: { ... } } }` |
| `GET` | `/api/competitions/:id/participation?email=...` | Check if user is registered/submitted | `{ success: true, registered: true, participation: { ... } }` |
| `POST` | `/api/competitions/:id/register` | Register user with atomic spot reservation | `{ success: true, message: "Registration successful" }` |
| `POST` | `/api/competitions/:id/submission` | Upload video performance (multipart/form-data) | `{ success: true, submission: { url: "/uploads/..." } }` |

---

## 🧪 Testing Checklist

- [x] **GET Competition**: Fetches title, prize pool (₹1,500), entry fee (₹99), spots, judge, dates, and rewards.
- [x] **Lifecycle Calculations**: Real-time status transitions (`UPCOMING` $\rightarrow$ `REGISTRATION_OPEN` $\rightarrow$ `REGISTRATION_FULL` $\rightarrow$ `SUBMISSION_OPEN`).
- [x] **Registration Flow**: Slide-up modal validates full name and email address.
- [x] **Concurrency & Atomicity**: Spot count atomically incremented inside a MongoDB transaction; returns 409 when full.
- [x] **Duplicate Protection**: Unique index prevents duplicate registrations for the same user.
- [x] **Video Submission**: Document picker selects MP4/video and uploads via Multer.
- [x] **Persistent State**: State restored automatically on app relaunch.
- [x] **Network Resilience**: Loading spinner and error retry screen with "Try Again" functionality.
