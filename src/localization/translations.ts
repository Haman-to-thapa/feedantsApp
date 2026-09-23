export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // Bottom Tab Bar
    tabHome: 'Home',
    tabExplore: 'Explore',
    tabCompetitions: 'Competitions',
    tabProfile: 'Profile',

    // Header
    goBack: 'Go back',

    // Hero Section
    competitionTitle: 'Feedants Classical Dance',
    danceTag: 'Dance',
    multiWinTag: 'Multi-Win',
    registered: 'Registered',
    winnersGetCertificate: 'Winners get certificate',
    prizePool: 'Prize Pool',
    entryFee: 'Entry Fee',
    onlySpotsLeft: 'Only {count} spots left',
    noSpotsLeft: 'No spots left',
    booked: '{registered} / {total} Booked',

    // Judge Card
    judge: 'Judge',
    judgeName: 'Manju Dubey',
    judgeProfession: 'Professional Kathak Dancer',
    judgeExperience: '12+ Years of Experience',
    introVideo: 'Intro Video',
    experience: 'Exp',

    // Countdown Timer
    registrationClosesIn: 'Registration closes in',
    registrationEnded: 'Registration ended',
    hurryUp: '⏱ Hurry up!',
    closed: 'Closed',
    daysShort: 'd',
    hoursShort: 'h',
    minsShort: 'm',
    secsShort: 's',

    // Important Dates
    importantDates: 'Important Dates',
    registerBefore: 'Register Before',
    submissionStarts: 'Submission Starts',
    submissionEnds: 'Submission Ends',
    resultDate: 'Result Date',
    tba: 'TBA',

    // Previous Winners
    previousWinners: 'Previous Winners',
    firstWinner: '1st Winner',
    secondWinner: '2nd Winner',
    thirdWinner: '3rd Winner',
    riyaShah: 'Riya Shah',
    aaravMehta: 'Aarav Mehta',
    nehaVerma: 'Neha Verma',
    ishitaChouhan: 'Ishita Chouhan',

    // Tabs
    aboutCompetition: 'About Competition',
    judgingParameters: 'Judging Parameters',
    rulesEligibility: 'Rules & Eligibility',
    viewMore: 'View more ∨',
    viewLess: 'View less ∧',
    defaultAbout:
      'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
    aboutExpanded:
      'Winners will receive attractive cash prizes and verified certificates. Get feedback from experienced mentors and build your artistic portfolio!',
    judgingItem1: 'Technique and precision',
    judgingItem2: 'Expression and presentation',
    judgingItem3: 'Creativity and choreography',
    judgingItem4: 'Overall performance',
    rulesItem1: 'Participants must submit their own recorded performance.',
    rulesItem2: 'Video duration should adhere to standard event guidelines.',
    rulesItem3: 'Late entries will not be accepted for evaluation.',

    // Rewards
    rewardsTitle: 'Rewards',
    allPositions: '(All Positions)',
    winnerSuffix: 'Winner',
    certificate: 'Certificate',

    // Policies
    disclaimerLabel: 'Disclaimer: ',
    disclaimerText:
      'Only contributions from paid participants will be considered for judging.',
    howReceivePrize: 'How will you receive prize money?',
    watchVideoToKnowMore: 'Watch video to know more',
    refundPolicy: 'Refund policy',
    securePaymentsPoweredBy: 'Secure payments powered by',

    // Refer & Earn
    referTitle: 'Refer & Earn more discount',
    copyLink: 'Copy Link',
    copied: 'Copied',
    referNow: 'Refer Now',
    referFooter: 'You earn {amount} for every signup',
    shareTitle: 'Feedants Classical Dance Competition',
    shareMessage:
      'Join me on Feedants Classical Dance Competition and get 20% discount on your entry fee! Register now: {link}',

    // Reviews & Ads
    hearFromUsers: 'Hear From Our Users',
    hearFromUsersSub: 'See what participants say about Feedants',
    adHere: 'Ad Here',

    // Action Button
    registerNow: 'Register Now',
    uploadSubmission: 'Upload Submission',
    uploading: 'Uploading...',
    submissionUploaded: 'Submission Uploaded',
    registeredStatus: 'Registered',
    registrationNotStarted: 'Registration Not Started',
    registrationFull: 'Registration Full',
    registrationClosed: 'Registration Closed',
    submissionClosed: 'Submission Closed',
    viewResult: 'View Result',
    submittedSuccessfully: 'Submitted successfully',
    submissionStartsOn: 'Submission starts {date}',
    entryFeeBadge: 'Entry Fee ₹{fee}',

    // Registration Modal
    modalTitle: 'Register for Competition',
    modalSubtitle: 'Enter your details to continue.',
    fullNamePlaceholder: 'Full name',
    emailPlaceholder: 'Email address',
    nameAndEmailRequired: 'Name and email are required',
    registering: 'Registering...',
    registerBtn: 'Register • ₹{fee}',

    // Success / Error Banners
    youAreRegistered: 'You are registered',
    participationSaved: 'Your participation has been saved.',
    submissionUploadedTitle: 'Submission uploaded',
    videoSubmittedSuccess: 'Your video has been submitted successfully.',
    loadingCompetition: 'Loading competition',
    pleaseWait: 'Please wait...',
    unableToLoad: 'Unable to load competition',
    checkConnection: 'Please check your connection and try again.',
    tryAgain: 'Try Again',

    // Profile / User State
    profileTitle: 'Profile & Settings',
    currentUser: 'Current User',
    guestUser: 'Guest (Not Registered)',
    statusLabel: 'Status',
    profileRegisteredStatus: 'Registered for Competition',
    submissionStatusUploaded: 'Video Submission Completed',
    noActiveRegistration: 'No Active Registration',
    testingSwitchTip: 'Testing another user? Log out below to register as a new user.',
    switchUser: 'Switch / Test New User',
    logoutBtn: 'Logout & Reset User',
    logoutConfirmTitle: 'Confirm Logout',
    logoutConfirmMsg: 'Are you sure you want to log out? This will allow you to test with a new user.',
    cancel: 'Cancel',
    loggedOutSuccess: 'Logged out successfully! You can now register as a new user.',
    stateSimulatorTitle: 'State Simulator (Testing)',
    stateSimulatorDesc: 'Switch live competition state to test different flows:',
    stateRegOpen: '🟢 Open Registration (Timer ON)',
    stateSubOpen: '📤 Open Video Submission',
    stateRegFull: '🔴 Fill Spots (Full)',
    stateUpdated: 'Competition state set to {state}',
    openSubmissionNowTitle: 'Test Video Submission',
    openSubmissionNowMsg: 'Submission window is scheduled for a future date. Would you like to open the submission window now to upload your video?',
    testUploadBtn: 'Open & Upload Video',

    // Video Upload Modal
    uploadModalTitle: 'Submit Dance Video',
    uploadModalSubtitle: 'Select or configure your video submission',
    chooseVideoPrompt: 'Select Video Performance',
    videoNameLabel: 'Video File Name',
    videoSizeLabel: 'File Size',
    videoQuality: '1080p HD • Stereo Audio',
    guideline1: 'Max file size 100 MB',
    guideline2: 'Clear lighting & full body performance',
    guideline3: 'Allowed formats: MP4, MOV, MKV',
    uploadingToBackend: 'Uploading to Feedants Server...',
    uploadProgress: 'Uploading {progress}%',
    confirmUploadBtn: 'Upload Video Now',
    videoUploadedSuccessMsg: 'Your video has been saved to the backend server!',
    close: 'Close',
    changeFile: 'Change Video',
  },

  hi: {
    // Bottom Tab Bar
    tabHome: 'होम',
    tabExplore: 'एक्सप्लोर',
    tabCompetitions: 'प्रतियोगिताएं',
    tabProfile: 'प्रोफाइल',

    // Header
    goBack: 'वापस जाएं',

    // Hero Section
    competitionTitle: 'Feedants शास्त्रीय नृत्य',
    danceTag: 'नृत्य',
    multiWinTag: 'मल्टी-विन',
    registered: 'पंजीकृत',
    winnersGetCertificate: 'विजेताओं को प्रमाणपत्र मिलेगा',
    prizePool: 'पुरस्कार राशि',
    entryFee: 'प्रवेश शुल्क',
    onlySpotsLeft: 'केवल {count} सीटें शेष',
    noSpotsLeft: 'कोई सीट शेष नहीं',
    booked: '{registered} / {total} भरी हुई',

    // Judge Card
    judge: 'निर्णायक (जज)',
    judgeName: 'मंजू दुबे',
    judgeProfession: 'पेशेवर कथक नृत्यांगना',
    judgeExperience: '12+ वर्षों का अनुभव',
    introVideo: 'परिचय वीडियो',
    experience: 'अनुभव',

    // Countdown Timer
    registrationClosesIn: 'समाप्त होने में:',
    registrationEnded: 'पंजीकरण समाप्त',
    hurryUp: '⏱ जल्दी करें!',
    closed: 'समाप्त',
    daysShort: 'd',
    hoursShort: 'h',
    minsShort: 'm',
    secsShort: 's',

    // Important Dates
    importantDates: 'महत्वपूर्ण तिथियां',
    registerBefore: 'पंजीकरण अंतिम तिथि',
    submissionStarts: 'सबमिशन प्रारंभ',
    submissionEnds: 'सबमिशन अंतिम तिथि',
    resultDate: 'परिणाम तिथि',
    tba: 'जल्द घोषित',

    // Previous Winners
    previousWinners: 'पिछले विजेता',
    firstWinner: 'प्रथम विजेता',
    secondWinner: 'द्वितीय विजेता',
    thirdWinner: 'तृतीय विजेता',
    riyaShah: 'रिया शाह',
    aaravMehta: 'आरव मेहता',
    nehaVerma: 'नेहा वर्मा',
    ishitaChouhan: 'इशिता चौहान',

    // Tabs
    aboutCompetition: 'प्रतियोगिता के बारे में',
    judgingParameters: 'निर्णय के मापदंड',
    rulesEligibility: 'नियम और पात्रता',
    viewMore: 'और देखें ∨',
    viewLess: 'कम देखें ∧',
    defaultAbout:
      'यह सभी आयु समूहों के लिए एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। कहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें। पारंपरिक नृत्य के माध्यम से अपनी कला व्यक्त करें।',
    aboutExpanded:
      'विजेताओं को आकर्षक नकद पुरस्कार और सत्यापित प्रमाण पत्र प्राप्त होंगे। अनुभवी आकाओं से प्रतिक्रिया प्राप्त करें और अपना कलात्मक पोर्टफोलियो बनाएं!',
    judgingItem1: 'तकनीक और सटीकता',
    judgingItem2: 'भाव-भंगिमा और प्रस्तुति',
    judgingItem3: 'रचनात्मकता और कोरियोग्राफी',
    judgingItem4: 'समग्र प्रदर्शन',
    rulesItem1: 'प्रतिभागियों को अपना स्वयं का रिकॉर्ड किया गया प्रदर्शन जमा करना होगा।',
    rulesItem2: 'वीडियो की अवधि मानक कार्यक्रम दिशानिर्देशों के अनुरूप होनी चाहिए।',
    rulesItem3: 'मूल्यांकन के लिए विलंबित प्रविष्टियां स्वीकार नहीं की जाएंगी।',

    // Rewards
    rewardsTitle: 'पुरस्कार',
    allPositions: '(सभी स्थान)',
    winnerSuffix: 'विजेता',
    certificate: 'प्रमाणपत्र',

    // Policies
    disclaimerLabel: 'अस्वीकरण: ',
    disclaimerText:
      'केवल पंजीकृत और भुगतान करने वाले प्रतिभागियों की प्रविष्टियों पर ही विचार किया जाएगा।',
    howReceivePrize: 'पुरस्कार राशि कैसे मिलेगी?',
    watchVideoToKnowMore: 'अधिक जानने के लिए वीडियो देखें',
    refundPolicy: 'रिफंड नीति',
    securePaymentsPoweredBy: 'सुरक्षित भुगतान प्रणाली',

    // Refer & Earn
    referTitle: 'रेफर करें और छूट पाएं',
    copyLink: 'लिंक कॉपी करें',
    copied: 'कॉपी किया गया',
    referNow: 'अभी रेफर करें',
    referFooter: 'हर साइनअप पर पाएं {amount}',
    shareTitle: 'Feedants शास्त्रीय नृत्य प्रतियोगिता',
    shareMessage:
      'Feedants शास्त्रीय नृत्य प्रतियोगिता में मेरे साथ भाग लें और 20% छूट पाएं! अभी पंजीकरण करें: {link}',

    // Reviews & Ads
    hearFromUsers: 'उपयोगकर्ताओं की राय',
    hearFromUsersSub: 'देखें प्रतिभागी Feedants के बारे में क्या कहते हैं',
    adHere: 'विज्ञापन स्थान',

    // Action Button
    registerNow: 'अभी पंजीकरण करें',
    uploadSubmission: 'सबमिशन अपलोड करें',
    uploading: 'अपलोड हो रहा है...',
    submissionUploaded: 'सबमिशन अपलोड हो गया',
    registeredStatus: 'पंजीकृत',
    registrationNotStarted: 'पंजीकरण शुरू नहीं हुआ',
    registrationFull: 'पंजीकरण पूर्ण',
    registrationClosed: 'पंजीकरण बंद',
    submissionClosed: 'सबमिशन बंद',
    viewResult: 'परिणाम देखें',
    submittedSuccessfully: 'सफलतापूर्वक जमा किया गया',
    submissionStartsOn: 'सबमिशन प्रारंभ: {date}',
    entryFeeBadge: 'प्रवेश शुल्क ₹{fee}',

    // Registration Modal
    modalTitle: 'प्रतियोगिता के लिए पंजीकरण',
    modalSubtitle: 'जारी रखने के लिए अपना विवरण दर्ज करें।',
    fullNamePlaceholder: 'पूरा नाम',
    emailPlaceholder: 'ईमेल पता',
    nameAndEmailRequired: 'नाम और ईमेल आवश्यक हैं',
    registering: 'पंजीकरण हो रहा है...',
    registerBtn: 'पंजीकरण करें • ₹{fee}',

    // Success / Error Banners
    youAreRegistered: 'आप पंजीकृत हैं',
    participationSaved: 'आपकी भागीदारी सुरक्षित कर ली गई है।',
    submissionUploadedTitle: 'सबमिशन अपलोड हो गया',
    videoSubmittedSuccess: 'आपका वीडियो सफलतापूर्वक जमा हो गया है।',
    loadingCompetition: 'प्रतियोगिता लोड हो रही है',
    pleaseWait: 'कृपया प्रतीक्षा करें...',
    unableToLoad: 'प्रतियोगिता लोड करने में असमर्थ',
    checkConnection: 'कृपया अपना कनेक्शन जांचें और पुन: प्रयास करें।',
    tryAgain: 'पुन: प्रयास करें',

    // Profile / User State
    profileTitle: 'प्रोफाइल और सेटिंग्स',
    currentUser: 'वर्तमान यूजर',
    guestUser: 'गेस्ट यूजर (रजिस्टर्ड नहीं)',
    statusLabel: 'स्थिति',
    profileRegisteredStatus: 'प्रतियोगिता में पंजीकृत',
    submissionStatusUploaded: 'वीडियो सबमिशन पूर्ण हो गया',
    noActiveRegistration: 'कोई सक्रिय पंजीकरण नहीं',
    testingSwitchTip: 'दूसरे यूजर की टेस्टिंग कर रहे हैं? नया यूजर टेस्ट करने के लिए नीचे लॉग आउट करें।',
    switchUser: 'यूजर बदलें / नया टेस्ट',
    logoutBtn: 'लॉग आउट करें / नया यूजर',
    logoutConfirmTitle: 'लॉग आउट की पुष्टि करें',
    logoutConfirmMsg: 'क्या आप लॉग आउट करना चाहते हैं? इससे आप नए यूजर से टेस्ट कर सकेंगे।',
    cancel: 'रद्द करें',
    loggedOutSuccess: 'सफलतापूर्वक लॉग आउट हो गया! अब आप नए यूजर से पंजीकरण कर सकते हैं।',
    stateSimulatorTitle: 'स्टेट सिमुलेटर (टेस्टिंग)',
    stateSimulatorDesc: 'विभिन्न फ्लो टेस्ट करने के लिए लाइव स्थिति बदलें:',
    stateRegOpen: '🟢 रजिस्ट्रेशन खोलें (टाइमर चालू)',
    stateSubOpen: '📤 वीडियो सबमिशन खोलें',
    stateRegFull: '🔴 सीटें भरें (फुल)',
    stateUpdated: 'प्रतियोगिता स्थिति बदलकर {state} कर दी गई',
    openSubmissionNowTitle: 'वीडियो सबमिशन टेस्ट करें',
    openSubmissionNowMsg: 'सबमिशन विंडो आगामी तारीख के लिए निर्धारित है। क्या आप वीडियो अपलोड टेस्ट करने के लिए सबमिशन विंडो अभी खोलना चाहते हैं?',
    testUploadBtn: 'विंडो खोलें और वीडियो अपलोड करें',

    // Video Upload Modal
    uploadModalTitle: 'नृत्य वीडियो सबमिट करें',
    uploadModalSubtitle: 'अपना वीडियो सबमिशन चुनें या कॉन्फ़िगर करें',
    chooseVideoPrompt: 'वीडियो प्रदर्शन चुनें',
    videoNameLabel: 'वीडियो फ़ाइल का नाम',
    videoSizeLabel: 'फ़ाइल का आकार',
    videoQuality: '1080p HD • स्पष्ट ऑडियो',
    guideline1: 'अधिकतम फ़ाइल आकार 100 MB',
    guideline2: 'स्पष्ट रोशनी और पूर्ण प्रदर्शन फ्रेम',
    guideline3: 'स्वीकृत प्रारूप: MP4, MOV, MKV',
    uploadingToBackend: 'Feedants सर्वर पर अपलोड हो रहा है...',
    uploadProgress: 'अपलोड हो रहा है {progress}%',
    confirmUploadBtn: 'अभी वीडियो अपलोड करें',
    videoUploadedSuccessMsg: 'आपका वीडियो बैकएंड सर्वर पर सेव हो गया है!',
    close: 'बंद करें',
    changeFile: 'वीडियो बदलें',
  },
};

export type TranslationKey = keyof typeof translations.en;

// Dynamic Dictionary for Data coming from Backend / Mock
const dynamicDictionary: Record<string, {en: string; hi: string}> = {
  'Feedants Classical Dance': {
    en: 'Feedants Classical Dance',
    hi: 'Feedants शास्त्रीय नृत्य',
  },
  'Dance': {
    en: 'Dance',
    hi: 'नृत्य',
  },
  'Multi-Win': {
    en: 'Multi-Win',
    hi: 'मल्टी-विन',
  },
  'Manju Dubey': {
    en: 'Manju Dubey',
    hi: 'मंजू दुबे',
  },
  'Professional Kathak Dancer': {
    en: 'Professional Kathak Dancer',
    hi: 'पेशेवर कथक नृत्यांगना',
  },
  '12+ Years of Experience': {
    en: '12+ Years of Experience',
    hi: '12+ वर्षों का अनुभव',
  },
  'Riya Shah': {
    en: 'Riya Shah',
    hi: 'रिया शाह',
  },
  'Aarav Mehta': {
    en: 'Aarav Mehta',
    hi: 'आरव मेहता',
  },
  'Neha Verma': {
    en: 'Neha Verma',
    hi: 'नेहा वर्मा',
  },
  'Ishita Chouhan': {
    en: 'Ishita Chouhan',
    hi: 'इशिता चौहान',
  },
};

export const localizeDynamic = (text: string, lang: Language): string => {
  if (!text) return '';
  const item = dynamicDictionary[text];
  if (item) {
    return item[lang] || text;
  }
  return text;
};
