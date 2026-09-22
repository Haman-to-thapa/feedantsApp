import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';

import connectDB from '../config/db.js';
import Competition from '../models/Competition.js';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // fallback
}

const seedCompetition = async () => {
  try {
    await connectDB();

    await Competition.deleteMany({});

    const competition = await Competition.create({
      competitionId: 'classical-dance-001',
      title: 'Feedants Classical Dance',

      category: 'Dance',

      tags: ['Dance', 'Multi-Win'],

      prizePool: 1500,

      entryFee: 99,

      maxParticipants: 20,

      registeredCount: 1,

      registrationStart: new Date(Date.now() - 24 * 60 * 60 * 1000),

      registrationEnd: new Date(Date.now() + 24 * 60 * 60 * 1000),

      submissionStart: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),

      submissionEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),

      resultDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

      judge: {
        name: 'Manju Dubey',
        profession: 'Professional Kathak Dancer',
        experience: '12+ Years of Experience',
        image:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        introVideo: '',
      },

      about: 'Showcase your talent through classical dance.',

      judgingParameters: [
        'Technique and precision',
        'Expression and presentation',
        'Creativity and choreography',
        'Overall performance',
      ],

      rules: [
        'Submit your own performance',
        'Follow competition guidelines',
        'Submit before deadline',
      ],

      eligibility: [
        'Open to eligible participants',
        'Valid registration is required',
      ],

      rewards: {
        first: 800,
        second: 400,
        third: 200,
        fourthToSixth: 'Certificate',
      },

      status: 'open',
    });

    console.log('✅ Competition created with ID:', competition._id.toString());

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedCompetition();
