import type { LessonTool } from './lessonTools'

// Lesson 1: Google AI intro (EN)
const LESSON_1_TOOLS: LessonTool[] = [
  {
    emoji: '🍌',
    name: 'Nano Banana',
    description: 'Quick photo and image edits: styles, backgrounds, variants. WOW effect in a minute.',
    link: 'https://labs.google/flow/about',
    whenToUse: ['Restyle a photo into a different era for a project', 'Poster/graphic for a presentation', 'Variants of a single idea'],
    prompts: [
      {
        title: 'A) Different era (realistic)',
        text: 'Restyle this photo into the style of ancient Rome. Keep my face and features, realistic lighting, high quality, natural colors. Background: old monumental Roman architecture.',
      },
      {
        title: 'B) School poster',
        text: 'Turn this image into a poster in [minimal / retro / manga] style about [TOPIC]. Add the title: "[TITLE]" and subtitle: [SUBTITLE]. Leave space for the date and room. Readable typography, high contrast.',
      },
      {
        title: 'D) 3 stylings of the same person',
        text: 'Generate 3 style versions: [sporty / elegant / cyberpunk]. Keep the same person and a similar shot. Each variant with different colors and accessories.',
      },
    ],
  },
  {
    emoji: '🎬',
    name: 'Flow',
    description: 'AI tool for making films — generate clips, scenes and entire stories with consistent characters and style.',
    link: 'https://labs.google/flow/about',
    whenToUse: ['A shot for a presentation without filming', 'Scenes for thematic projects', 'Intro/outro for video content'],
    prompts: [
      {
        title: 'A) School of the future (cinematic)',
        text: 'Modern classroom, morning light, students with tablets, hologram on the wall. Style: cinematic, slow pan. No captions. If any captions, on-screen text or dialogue appear, they should be in English.',
      },
      {
        title: 'B) Disco Grandma',
        text: 'Close-up on the hands of an older woman in a flowery apron energetically kneading soft dough in a rustic, sunny kitchen. Flour dust floats in the air. With a smile, grandma tosses a big ball of dough high into the air. The camera follows the dough (slow-motion), which magically transforms in flight — the dough hardens and is covered with thousands of glittering mirrors, becoming a spinning disco ball. Suddenly the kitchen lighting shifts from warm sun to pulsing neons (purple and blue). Grandma takes off her glasses and starts dancing professional boogie-woogie under the spinning ball, while flour on the counter bounces to the bass. If any captions, on-screen text or dialogue appear, they should be in English.',
      },
      {
        title: 'C) Journey through a cell (educational 3D animation)',
        text: 'Inside a cell — mitochondria, nucleus, particle motion. Style: clean educational 3D animation. Camera: smooth flight. No captions. If any captions, on-screen text or dialogue appear, they should be in English.',
      },
      {
        title: 'D) Space flyby',
        text: 'A spaceship flying through a colorful nebula and an asteroid field. The camera follows the ship with slight lateral motion. Style: cinematic, realistic lighting, lots of detail. No captions. If any captions, on-screen text or dialogue appear, they should be in English.',
      },
      {
        title: 'E) Mechanic',
        text: 'A mechanic in a dirty jumpsuit fixes an engine under the hood of an old car. Screwdriver, wrenches, smoke from the exhaust. Suddenly the engine explodes — flash, smoke, the mechanic jumps out with a blackened face and ruffled hair. Style: light comedy, expressive mimicry, short scene. No captions. No swearing. If any captions, on-screen text or dialogue appear, they should be in English.',
      },
    ],
  },
  {
    emoji: '💎',
    name: 'Gemini',
    description: 'Use Gemini to improve prompts or to creatively craft prompts when you have no idea. It can walk you through the thinking and prompt-generation process for other tools.',
    link: 'https://gemini.google.com',
    whenToUse: ['When you want to turn a weak prompt into a better one', 'When you do not know how to start and need a draft prompt'],
    prompts: [
      {
        title: 'Prompt generator for a tool (guide me step by step)',
        text: 'I want to generate a great prompt for the tool: [NANO BANANA / FLOW / LYRA / CANVAS]. First ask me up to 6 short clarifying questions. Then prepare 3 versions of the prompt: (1) short, (2) standard, (3) ambitious. At the end give a checklist of 5 things to verify before running.',
      },
      {
        title: 'Prompt improver',
        text: 'Here is my prompt: "[PASTE YOUR PROMPT]". Improve it: add details, refine style, format and constraints.',
      },
    ],
  },
  {
    emoji: '🎵',
    name: 'Lyra',
    description: 'Generates short backing tracks for videos and presentations (instrumental works best).',
    link: 'https://gemini.google.com',
    whenToUse: ['Intro/outro for a presentation', 'Background for video', 'Mood for a project'],
    prompts: [
      { title: 'A) Lo-fi study (no vocals)', text: 'Instrumental lo-fi. Tempo [70–90 BPM]. Piano, soft bass, gentle drums. No vocals.' },
      { title: 'B) Heroic intro', text: 'Cinematic intro: drums, strings, build-up, finishing on one strong chord. No vocals.' },
      { title: 'C) Cyberpunk / technology', text: 'Electronic backing: neon, synths, rhythm [110 BPM], darker key. No vocals.' },
      { title: 'D) A/B versions', text: 'Two versions: A calmer, B more energetic. Genre [GENRE], instruments [INSTRUMENTS]. No vocals.' },
    ],
  },
  {
    emoji: '🖼️',
    name: 'Canvas',
    description: 'Canvas in Gemini is an interactive workspace where you combine text, sketches, images and notes. Perfect for brainstorming, planning a project, and working together in class.',
    link: 'https://gemini.google.com',
    whenToUse: [
      'Inventing and designing your own games (board, card, role-playing)',
      'Planning simple games / interactive stories for Roblox, Scratch, Twine etc.',
      'Co-designing an "escape room" or a field game for a school event',
    ],
    prompts: [
      { title: 'A) Simple racing game', text: 'Create a simple driving game where you have to dodge obstacles. Briefly describe in English: the goal, examples of obstacles and what happens when the player hits one.' },
      { title: 'B) Platform jumping', text: 'Create a simple game with a character that jumps on platforms and collects coins. Briefly describe in English: the goal, example obstacles and what coins do.' },
      { title: 'C) Festival crew game', text: 'Create a simple narrative game about a group of friends trying to get to their dream music festival. Briefly describe in English 3 situations (e.g. buying tickets, getting there, entering the venue) and 2 possible choices in each.' },
      { title: 'D) Mini rhythm game', text: 'Create a simple rhythm game where you have to tap at the right moment to music. Briefly describe in English: how it works, how the player scores points and when they lose.' },
      { title: 'E) Eagle flight in 3D', text: 'Create a 3D game where the player controls an eagle flying over mountains, forests and lakes (third-person view, behind the bird). Briefly describe in English: how the world looks from above, what the eagle can do (e.g. soar, dive, dodge rocks and trees), what obstacles appear in the air, and when the player wins or loses.' },
    ],
  },
]

// Lesson 2: NotebookLM (EN)
const LESSON_2_TOOLS: LessonTool[] = [
  {
    emoji: '📓',
    name: 'NotebookLM — Chat with sources',
    description: 'Upload sources (PDF, YouTube, web pages, text) and ask questions. AI answers ONLY based on your materials — with citations and references.',
    link: 'https://notebooklm.google.com',
    whenToUse: ['Preparing for a test from notes/textbook', 'Quick summary of a long article or video', 'Looking for specific information across many sources at once'],
    prompts: [
      { title: 'A) Summary in 5 points', text: 'Summarize the key takeaways from my sources in 5 short bullet points. For each point, indicate which source it comes from.' },
      { title: 'B) Explain it like to a student', text: 'Explain the topic [TOPIC FROM MY SOURCES] in simple language, as if explaining it to a high-schooler. Use examples and analogies.' },
      { title: 'C) Compare two sources', text: 'Compare the main theses of source 1 and source 2. What do they have in common? What differs? Present as a table.' },
      { title: 'D) Find knowledge gaps', text: 'Based on my sources — what information is missing to fully understand the topic [TOPIC]? What should I read up on?' },
    ],
  },
  {
    emoji: '🎧',
    name: 'NotebookLM — Audio Overview (AI podcast)',
    description: 'Turn your sources into a podcast hosted by two AI hosts. Listen to the summary on your way to school. You can even join the conversation and ask questions by voice!',
    link: 'https://notebooklm.google.com',
    whenToUse: ['Reviewing material on the bus / on a walk', 'Quickly grasping a topic without reading', 'Preparing for a class discussion'],
    prompts: [
      { title: 'A) Deep Dive (default)', text: 'Upload sources → Studio tab → Generate → Deep Dive. Two AI hosts will discuss your materials in conversation form.' },
      { title: 'B) Brief (short summary)', text: 'Studio → Generate → Brief. One AI host will give a short summary of the key points. Perfect for 2–3 minutes before class.' },
      { title: 'C) Debate (two sides of the topic)', text: 'Studio → Generate → Debate. Two AI hosts will argue for and against the topic from your sources. Great before a class debate.' },
      { title: 'D) Join the conversation (Interactive)', text: 'During Audio Overview playback click "Interactive" → "Join". Ask a question by voice — the AI hosts will respond live based on your sources.' },
    ],
  },
  {
    emoji: '🃏',
    name: 'NotebookLM — Flashcards and Quizzes',
    description: 'AI creates flashcards and quizzes directly from your materials. Perfect for active review — you do not have to write anything by hand.',
    link: 'https://notebooklm.google.com',
    whenToUse: ['Reviewing before a test from notes', 'Memorizing key concepts and dates', 'Testing your knowledge before an exam'],
    prompts: [
      { title: 'A) Generate flashcards', text: 'In NotebookLM click "Flashcards" in the Studio tab. AI will create flashcards with key concepts from your sources. You can pick the topic and difficulty.' },
      { title: 'B) Quiz from material', text: 'In the Studio tab click "Quiz". AI will generate test questions based on your sources. After each mistake click "Explain" — AI will explain the answer with a citation to the source.' },
      { title: 'C) Share with a friend', text: 'After generating flashcards/a quiz click "Share" — you can send a link to a friend so they can study from your materials too.' },
      { title: 'D) Chat: refine the quiz', text: 'Create a 10-question quiz ONLY from chapter [NUMBER/NAME]. Questions should be at [easy / medium / hard] level. Add an explanation for each answer.' },
    ],
  },
  {
    emoji: '📋',
    name: 'NotebookLM — Reports and Notes',
    description: 'Generate ready documents from your sources: summaries, guides, blog posts, analyses. AI fits the format to your topic.',
    link: 'https://notebooklm.google.com',
    whenToUse: ['Writing an essay based on multiple sources', 'Creating a note/cheat sheet before a test', 'Preparing a presentation from collected materials'],
    prompts: [
      { title: 'A) Study Guide', text: 'In the Studio tab click "Study Guide". AI will create a complete study guide from your sources — split into sections, key concepts and check questions.' },
      { title: 'B) Briefing Doc', text: 'Studio → "Briefing Doc". You will get a professional summary of all sources in one document — ideal for a quick overview.' },
      { title: 'C) Blog Post', text: 'Studio → "Blog Post". AI will turn your sources into an accessible blog article — great as a basis for a presentation or essay.' },
      { title: 'D) Chat: custom format', text: 'Based on my sources prepare [NOTES / CHEAT SHEET / PRESENTATION OUTLINE] on the topic [TOPIC]. Format: [bullets / table / text mind-map]. Maximum [1 page / 500 words].' },
    ],
  },
]

// Lesson 3: AI voice assistants for languages (EN)
const LESSON_3_TOOLS: LessonTool[] = [
  {
    emoji: '🎙️',
    name: 'Gemini Live — voice conversation',
    description: 'Gemini voice mode lets you have a natural conversation in English. You can speak and listen — the AI replies by voice, corrects mistakes and adapts to your level.',
    link: 'https://gemini.google.com',
    whenToUse: ['Practising speaking English without stress', 'Preparing for an oral answer', 'Simulating a conversation on a specific lesson topic'],
    prompts: [
      { title: 'A) Conversation teacher (general)', text: 'You are my English conversation teacher. My level is A2/B1 (8th grade, Polish school). Speak slowly and clearly. After each of my responses: 1) correct grammar mistakes gently, 2) suggest a better way to say it, 3) ask a follow-up question to keep the conversation going. Start with a simple topic: [TOPIC — e.g. hobbies, school, weekend plans].' },
      { title: 'B) Teacher based on a photo', text: "Look at this photo I'm sending you. Describe what you see in simple English (A2/B1 level). Then ask me 5 questions about the photo — start easy, then make them harder. After each of my answers, correct my English and teach me 2 new words related to the picture." },
      { title: 'C) Review from notes/materials', text: 'Here are my English class notes: [PASTE NOTES OR DESCRIBE THE TOPIC]. Act as my teacher. First, explain the grammar rule in simple terms with 3 examples. Then test me — ask me 5 questions using this grammar. Correct my mistakes and explain why.' },
      { title: 'D) Role-play scenario', text: "Let's do a role-play in English. Scenario: [CHOOSE: ordering food in a restaurant / buying a ticket / asking for directions / job interview for a summer job / meeting a new classmate]. You play the other person. My level is A2/B1. If I make a mistake, gently correct me after the exchange. Start the conversation." },
    ],
  },
  {
    emoji: '🤖',
    name: 'ChatGPT Voice — voice assistant',
    description: 'ChatGPT Voice mode (Advanced Voice) supports natural conversation. Great for pronunciation practice — it understands even imperfect accents and patiently corrects.',
    link: 'https://chat.openai.com',
    whenToUse: ['Practising pronunciation and intonation', 'Conversation on a topic from class or textbook', 'Translating and explaining phrases live'],
    prompts: [
      { title: 'A) Pronunciation coach', text: "You are my English pronunciation coach. My level is A2/B1 (8th grade). I will say words and sentences — tell me if my pronunciation is correct. If not, break the word into syllables and show me how to say it. Focus on these sounds I struggle with: [TH / R / W / V — or say 'general']. Let's start with 10 common words I might mispronounce." },
      { title: 'B) Conversation from class material', text: "I'm preparing for my English class about [TOPIC FROM TEXTBOOK — e.g. environment, technology, healthy lifestyle]. My level is A2/B1. Have a conversation with me about this topic. Use vocabulary from this word list: [PASTE WORDS]. After every 3 exchanges, summarize new words I should remember." },
      { title: 'C) Describing a picture (exam prep)', text: "I'm practicing describing pictures for my English exam. I will describe a photo to you. Listen and then: 1) rate my description 1-5, 2) point out grammar mistakes, 3) give me useful phrases I could have used, 4) ask me 3 follow-up questions about the photo. My level is A2/B1." },
      { title: 'D) Everyday situations', text: "Let's practice everyday English conversations. My level is A2/B1 (8th grade). Pick a random everyday situation (shopping, doctor visit, asking for help, talking to a friend) and start a dialogue with me. After each of my responses, give me a score (1-5) and one tip to sound more natural. Switch situations every 5 minutes." },
    ],
  },
  {
    emoji: '🟠',
    name: 'Claude Voice — patient teacher',
    description: 'Anthropic\'s Claude stands out for patience and accurate grammar explanations. Ideal when you want to understand WHY a phrase is said, not just WHAT to say.',
    link: 'https://claude.ai',
    whenToUse: ['Detailed explanation of a grammar rule', 'Step-by-step text analysis from a textbook', 'Preparing for a test on a specific unit'],
    prompts: [
      { title: 'A) Lesson text analysis', text: 'Here is a text from my English textbook: [PASTE TEXT OR DESCRIBE IT]. My level is A2/B1 (8th grade). Please: 1) Explain 5 most difficult words in simple English + Polish translation, 2) Find 3 grammar structures and explain them, 3) Write 5 comprehension questions, 4) Create a mini-dialogue using vocabulary from this text.' },
      { title: 'B) Grammar step by step', text: 'Explain this English grammar topic to me: [TOPIC — e.g. Present Perfect vs Past Simple / conditionals / passive voice / reported speech]. My level is A2/B1. Use: 1) Simple explanation in English, 2) 5 clear examples, 3) Common mistakes Polish students make, 4) A quick 5-question quiz to test me. Be patient and encouraging.' },
      { title: 'C) Teacher from a notes photo', text: "I'm sending you a photo of my English class notes. Please: 1) Read and organize the notes clearly, 2) Correct any mistakes in the notes, 3) Add 3 examples for each grammar rule, 4) Create 5 practice sentences for me to translate (Polish → English). My level is A2/B1." },
      { title: 'D) Test preparation', text: 'I have an English test about [TOPIC/UNIT] on [WHEN]. My level is A2/B1 (8th grade). Help me prepare: 1) List the most important vocabulary (20 words with examples), 2) Explain key grammar rules, 3) Create a practice test (10 questions: 5 grammar, 3 vocabulary, 2 writing). After I answer, grade me and explain mistakes.' },
    ],
  },
  {
    emoji: '📸',
    name: 'AI + photo = English lesson',
    description: 'Take a photo of anything — notes, a textbook page, the street, food — and use AI to learn English from what you see. Works in all three assistants!',
    link: 'https://gemini.google.com',
    whenToUse: ['Learning vocabulary from your surroundings (street, store, kitchen photos)', 'Translating and analyzing a textbook page', 'Practising picture description for an exam'],
    prompts: [
      { title: 'A) Vocabulary from your surroundings', text: "Look at this photo of [MY ROOM / STREET / KITCHEN / CLASSROOM]. Name every object you can see in English. For each object give: 1) English word, 2) pronunciation guide, 3) example sentence a student would use. My level is A2/B1. Then quiz me — describe an object and I'll guess the English word." },
      { title: 'B) Textbook page → interactive lesson', text: "I'm sending a photo of a page from my English textbook. Read it and turn it into an interactive lesson for me: 1) Summarize the main topic, 2) Explain new vocabulary, 3) Create a dialogue using the grammar from this page, 4) Give me 5 exercises. My level is A2/B1 (8th grade, Polish school)." },
      { title: 'C) Photo → story', text: 'Look at this photo. Help me write a short story (100-150 words) in English based on what you see. First, help me brainstorm: who, where, when, what happened? Then we write it together sentence by sentence — you suggest, I try, you correct. Level: A2/B1.' },
      { title: 'D) Notes photo → flashcards', text: "I'm sending a photo of my English notes from class. Please: 1) Read all the content, 2) Create 15 flashcards (English word/phrase → Polish translation + example sentence), 3) Group them by topic, 4) Mark which ones are most important for a test. Format each flashcard clearly." },
    ],
  },
]

export const LESSON_TOOLS_MAP_EN: Record<string, LessonTool[]> = {
  '1-google-intro': LESSON_1_TOOLS,
  '2-notebooklm': LESSON_2_TOOLS,
  '3-ai-english': LESSON_3_TOOLS,
}

export const LESSON_TOOLS_EN = LESSON_1_TOOLS
