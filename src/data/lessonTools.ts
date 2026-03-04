export interface LessonTool {
  emoji: string
  name: string
  description: string
  link: string
  whenToUse: string[]
  prompts: {
    title: string
    text: string
  }[]
}

// Lesson 1: Google AI intro
const LESSON_1_TOOLS: LessonTool[] = [
  {
    emoji: '🍌',
    name: 'Nano Banana',
    description: 'Szybkie przeróbki zdjęć i obrazów: style, tła, warianty. Efekt WOW w minutę.',
    link: 'https://labs.google/flow/about',
    whenToUse: ['Przeróbka zdjęcia na epokę/styl do projektu', 'Plakat/grafika do prezentacji', 'Warianty jednego pomysłu'],
    prompts: [
      {
        title: 'A) Inna epoka (realistycznie)',
        text: 'Przerób to zdjęcie na styl z epoki staroytnego Rzymu. Zachowaj moją twarz i rysy, realistyczne światło, wysoka jakość, naturalne kolory. Tło: stara zabytkowa architektura Rzymu.',
      },
      {
        title: 'B) Plakat szkolny',
        text: 'Zrób z tego obrazka plakat w stylu [minimal / retro / manga] na temat [TEMAT]. Dodaj tytuł: "[TYTUŁ]" i podtytuł: [PODTYTUŁ]. Zostaw miejsce na datę i salę. Czytelna typografia, wysoki kontrast.',
      },
      {
        title: 'D) 3 stylizacje tej samej osoby',
        text: 'Wygeneruj 3 wersje stylu: [sportowy / elegancki / cyberpunk]. Zachowaj tę samą osobę i podobne ujęcie. Każdy wariant z inną kolorystyką i dodatkami.',
      },
    ],
  },
  {
    emoji: '🎬',
    name: 'Flow',
    description: 'Narzędzie AI do tworzenia filmów — generuj klipy, sceny i całe historie z zachowaniem spójności postaci i stylu.',
    link: 'https://labs.google/flow/about',
    whenToUse: ['Ujęcie do prezentacji bez kręcenia', 'Scenki do projektów tematycznych', 'Intro/outro do materiału wideo'],
    prompts: [
      {
        title: 'A) Szkoła przyszłości (cinematic)',
        text: 'Nowoczesna klasa, poranne światło, uczniowie przy tabletach, na ścianie hologram. Styl: cinematic, slow pan. Bez napisów. Jeśli pojawiają się jakiekolwiek napisy, tekst na ekranie lub dialogi, wszystko ma być w języku polskim.',
      },
      {
        title: 'B) Średniowieczne miasto',
        text: 'Miasto o świcie, bruk, stragany, dym z kominów. Ujęcie z góry → płynny zjazd na ulicę. Styl realistyczny. Bez napisów. Jeśli pojawiają się jakiekolwiek napisy, tekst na ekranie lub dialogi, wszystko ma być w języku polskim.',
      },
      {
        title: 'C) Podróż w komórce (edukacyjna animacja 3D)',
        text: 'Wnętrze komórki, mitochondria, jądro, ruch cząsteczek. Styl: czysta edukacyjna animacja 3D. Kamera: płynny lot. Bez napisów. Jeśli pojawiają się jakiekolwiek napisy, tekst na ekranie lub dialogi, wszystko ma być w języku polskim.',
      },
      {
        title: 'D) Kosmiczny przelot',
        text: 'Lot statku kosmicznego przez kolorową mgławicę i pole asteroid. Kamera podąża za statkiem z lekkim ruchem bocznym. Styl: cinematic, realistyczne światło, dużo detali. Bez napisów. Jeśli pojawiają się jakiekolwiek napisy, tekst na ekranie lub dialogi, wszystko ma być w języku polskim.',
      },
      {
        title: 'E) Mechanik',
        text: 'Mechanik w brudnym kombinezonie naprawia silnik pod maską starego samochodu. Śrubokręt, klucze, dym z komina. Nagle silnik wybucha — błysk, dym, mechanik wyskakuje z czarną twarzą i nastroszonymi włosami. Styl: lekka komedia, wyraźna mimika, krótka scena. Bez napisów. Bez przekleństw. Jeśli pojawiają się jakiekolwiek napisy, tekst na ekranie lub dialogi, wszystko ma być w języku polskim.',
      },
    ],
  },
  {
    emoji: '💎',
    name: 'Gemini',
    description:
      'Gemini możesz używać do ulepszania promptów albo do kreatywnego tworzenia promptów, gdy nie masz pomysłu. Może przeprowadzić Cię przez proces myślenia i generowania promptu dla kolejnych narzędzi.',
    link: 'https://gemini.google.com',
    whenToUse: ['Gdy chcesz przerobić słaby prompt na lepszy', 'Gdy nie wiesz, jak zacząć i potrzebujesz szkicu promptu'],
    prompts: [
      {
        title: 'Generator promptu dla narzędzia (prowadź mnie krok po kroku)',
        text: 'Chcę wygenerować świetny prompt do narzędzia: [NANO BANANA / FLOW / LYRA / CANVAS]. Najpierw zadaj mi maks. 6 krótkich pytań doprecyzowujących. Potem przygotuj 3 wersje promptu: (1) krótka, (2) standard, (3) ambitna. Na końcu podaj checklistę 5 rzeczy do sprawdzenia przed uruchomieniem.',
      },
      {
        title: 'Ulepszacz promptu',
        text: 'Oto mój prompt: "[WKLEJ SWÓJ PROMPT]". Popraw go: dodaj szczegóły, uściślij styl, format i ograniczenia.',
      },
    ],
  },
  {
    emoji: '🎵',
    name: 'Lyra',
    description: 'Generuje krótkie podkłady do filmów i prezentacji (najlepiej instrumentalne).',
    link: 'https://gemini.google.com',
    whenToUse: ['Intro/outro do prezentacji', 'Tło do wideo', 'Klimat do projektu'],
    prompts: [
      {
        title: 'A) Lo-fi do nauki (bez wokalu)',
        text: 'Instrumentalny lo-fi. Tempo [70–90 BPM]. Pianino, miękki bas, delikatne bębny. Zero wokalu.',
      },
      {
        title: 'B) Heroiczne intro',
        text: 'Filmowe intro: bębny, smyczki, narastanie, finał na 1 mocnym akordzie. Bez wokalu.',
      },
      {
        title: 'C) Cyberpunk / technologia',
        text: 'Elektroniczny podkład: neon, syntezatory, rytm [110 BPM], ciemniejsza tonacja. Bez wokalu.',
      },
      {
        title: 'D) Wersje A/B',
        text: 'Dwie wersje: A spokojniej, B bardziej energicznie. Gatunek [GATUNEK], instrumenty [INSTRUMENTY]. Bez wokalu.',
      },
    ],
  },
  {
    emoji: '🖼️',
    name: 'Canvas',
    description:
      'Canvas w Gemini to interaktywna przestrzeń robocza, w której możesz łączyć tekst, szkice, obrazy i notatki. Idealne do burzy mózgów, planowania projektu i wspólnej pracy w klasie.',
    link: 'https://gemini.google.com',
    whenToUse: [
      'Wymyślanie i projektowanie własnych gier (planszowych, karcianych, fabularnych)',
      'Planowanie prostych gier / historii interaktywnych pod Roblox, Scratch, Twine itp.',
      'Wspólne projektowanie „escape roomu” lub gry terenowej na szkolny event',
    ],
    prompts: [
      {
        title: 'A) Prosta gra samochodowa',
        text: 'Stwórz prostą grę samochodową, w której trzeba omijać przeszkody. Wypisz krótko po polsku: cel gry, przykłady przeszkód i co się dzieje, gdy gracz uderzy w przeszkodę.',
      },
      {
        title: 'B) Skakanie po platformach',
        text: 'Stwórz prostą grę z postacią, która skacze po platformach i zbiera monety. Krótko opisz po polsku: cel gry, przykładowe przeszkody i co daje zebranie monet.',
      },
      {
        title: 'C) Gra o ekipie na festiwalu',
        text: 'Stwórz prostą grę fabularną o ekipie znajomych, która próbuje dostać się na wymarzony festiwal muzyczny. Krótko opisz po polsku 3 sytuacje (np. kupowanie biletów, dojazd, wejście na teren) i po 2 możliwe wybory w każdej.',
      },
      {
        title: 'D) Mini gra rytmiczna',
        text: 'Stwórz prostą grę rytmiczną, w której trzeba klikać w odpowiednim momencie do muzyki. Krótko opisz po polsku: na czym polega gra, jak gracz zdobywa punkty i kiedy przegrywa.',
      },
      {
        title: 'E) Latanie orłem w 3D',
        text: 'Stwórz grę 3D, w której gracz steruje orłem lecącym nad górami, lasami i jeziorami (widok z trzeciej osoby, zza ptaka). Krótko opisz po polsku: jak wygląda świat z góry, co orzeł może robić (np. szybować, pikować, omijać skały i drzewa), jakie przeszkody pojawiają się w powietrzu oraz kiedy gracz wygrywa, a kiedy przegrywa.',
      },
    ],
  },
];

// Lesson 2: NotebookLM na telefonie
const LESSON_2_TOOLS: LessonTool[] = [
  {
    emoji: '📓',
    name: 'NotebookLM — Chat ze źródłami',
    description: 'Wgraj źródła (PDF, YouTube, strony WWW, tekst) i zadawaj pytania. AI odpowiada TYLKO na podstawie Twoich materiałów — z cytatami i odniesieniami.',
    link: 'https://notebooklm.google.com',
    whenToUse: [
      'Przygotowanie do sprawdzianu z notatek/podręcznika',
      'Szybkie streszczenie długiego artykułu lub filmu',
      'Szukanie konkretnych informacji w wielu źródłach naraz',
    ],
    prompts: [
      {
        title: 'A) Streszczenie w 5 punktach',
        text: 'Podsumuj najważniejsze wnioski z moich źródeł w 5 krótkich punktach. Przy każdym punkcie podaj, z którego źródła pochodzi.',
      },
      {
        title: 'B) Wyjaśnij jak dla ucznia',
        text: 'Wyjaśnij temat [TEMAT Z MOICH ŹRÓDEŁ] prostym językiem, jakbyś tłumaczył licealiście. Użyj przykładów i analogii.',
      },
      {
        title: 'C) Porównaj dwa źródła',
        text: 'Porównaj główne tezy źródła 1 i źródła 2. Co mają wspólnego? Czym się różnią? Podaj w formie tabeli.',
      },
      {
        title: 'D) Znajdź luki w wiedzy',
        text: 'Na podstawie moich źródeł — jakich informacji brakuje, żeby dobrze zrozumieć temat [TEMAT]? Co powinienem doczytać?',
      },
    ],
  },
  {
    emoji: '🎧',
    name: 'NotebookLM — Audio Overview (podcast AI)',
    description: 'Zamień swoje źródła w podcast prowadzony przez dwóch AI-gospodarzy. Słuchaj streszczenia w drodze do szkoły. Możesz nawet dołączyć do rozmowy i zadawać pytania głosowo!',
    link: 'https://notebooklm.google.com',
    whenToUse: [
      'Powtórka materiału w autobusie / na spacerze',
      'Szybkie zrozumienie tematu bez czytania',
      'Przygotowanie do dyskusji na lekcji',
    ],
    prompts: [
      {
        title: 'A) Deep Dive (domyślny)',
        text: 'Wgraj źródła → zakładka Studio → Generate → Deep Dive. Dwóch AI-gospodarzy omówi Twoje materiały w formie rozmowy.',
      },
      {
        title: 'B) Brief (krótkie streszczenie)',
        text: 'Studio → Generate → Brief. Jeden AI-gospodarz poda krótkie streszczenie najważniejszych punktów. Idealne na 2-3 minuty przed lekcją.',
      },
      {
        title: 'C) Debate (dwie strony tematu)',
        text: 'Studio → Generate → Debate. Dwóch AI-gospodarzy będzie dyskutować za i przeciw tematowi z Twoich źródeł. Świetne przed dyskusją w klasie.',
      },
      {
        title: 'D) Dołącz do rozmowy (Interactive)',
        text: 'Podczas odtwarzania Audio Overview kliknij "Interactive" → "Join". Zadaj pytanie głosowo — AI-gospodarze odpowiedzą na żywo na podstawie Twoich źródeł.',
      },
    ],
  },
  {
    emoji: '🃏',
    name: 'NotebookLM — Fiszki i Quizy',
    description: 'AI tworzy fiszki i quizy bezpośrednio z Twoich materiałów. Idealne do aktywnej powtórki — nie musisz nic pisać ręcznie.',
    link: 'https://notebooklm.google.com',
    whenToUse: [
      'Powtórka przed sprawdzianem z notatek',
      'Zapamiętanie kluczowych pojęć i dat',
      'Testowanie swojej wiedzy przed egzaminem',
    ],
    prompts: [
      {
        title: 'A) Generuj fiszki',
        text: 'W NotebookLM kliknij "Flashcards" w zakładce Studio. AI stworzy fiszki z kluczowymi pojęciami z Twoich źródeł. Możesz wybrać temat i poziom trudności.',
      },
      {
        title: 'B) Quiz z materiału',
        text: 'W zakładce Studio kliknij "Quiz". AI wygeneruje pytania testowe na podstawie Twoich źródeł. Po każdym błędzie kliknij "Explain" — AI wyjaśni odpowiedź z cytowaniem źródła.',
      },
      {
        title: 'C) Udostępnij znajomemu',
        text: 'Po wygenerowaniu fiszek/quizu kliknij "Share" — możesz wysłać link znajomemu, żeby też mógł się uczyć z Twoich materiałów.',
      },
      {
        title: 'D) Chat: doprecyzuj quiz',
        text: 'Stwórz quiz 10 pytań TYLKO z rozdziału [NUMER/NAZWA]. Pytania powinny być na poziomie [łatwy / średni / trudny]. Dodaj wyjaśnienie do każdej odpowiedzi.',
      },
    ],
  },
  {
    emoji: '📋',
    name: 'NotebookLM — Raporty i Notatki',
    description: 'Generuj gotowe dokumenty ze swoich źródeł: streszczenia, przewodniki, wpisy blogowe, analizy. AI dopasuje format do Twojego tematu.',
    link: 'https://notebooklm.google.com',
    whenToUse: [
      'Pisanie wypracowania na podstawie kilku źródeł',
      'Tworzenie notatki/ściągawki przed sprawdzianem',
      'Przygotowanie prezentacji z zebranych materiałów',
    ],
    prompts: [
      {
        title: 'A) Study Guide',
        text: 'W zakładce Studio kliknij "Study Guide". AI stworzy kompletny przewodnik do nauki z Twoich źródeł — z podziałem na sekcje, kluczowe pojęcia i pytania kontrolne.',
      },
      {
        title: 'B) Briefing Doc',
        text: 'Studio → "Briefing Doc". Otrzymasz profesjonalne streszczenie wszystkich źródeł w jednym dokumencie — idealne do szybkiego przeglądu.',
      },
      {
        title: 'C) Blog Post',
        text: 'Studio → "Blog Post". AI zamieni Twoje źródła w przystępny artykuł blogowy — świetne jako baza do prezentacji lub wypracowania.',
      },
      {
        title: 'D) Chat: własny format',
        text: 'Na podstawie moich źródeł przygotuj [NOTATKI / ŚCIĄGAWKĘ / PLAN PREZENTACJI] na temat [TEMAT]. Format: [punkty / tabela / mindmapa tekstowa]. Maksymalnie [1 strona / 500 słów].',
      },
    ],
  },
]

// Lesson 3: Asystenci głosowi AI do nauki języków
const LESSON_3_TOOLS: LessonTool[] = [
  {
    emoji: '🎙️',
    name: 'Gemini Live — rozmowa głosowa',
    description: 'Tryb głosowy Gemini pozwala prowadzić naturalną konwersację po angielsku. Możesz mówić i słuchać — AI odpowiada głosem, poprawia błędy i dostosowuje się do Twojego poziomu.',
    link: 'https://gemini.google.com',
    whenToUse: [
      'Ćwiczenie mówienia po angielsku bez stresu',
      'Przygotowanie do odpowiedzi ustnej',
      'Symulacja rozmowy na konkretny temat z lekcji',
    ],
    prompts: [
      {
        title: 'A) Nauczyciel konwersacji (ogólny)',
        text: 'You are my English conversation teacher. My level is A2/B1 (8th grade, Polish school). Speak slowly and clearly. After each of my responses: 1) correct grammar mistakes gently, 2) suggest a better way to say it, 3) ask a follow-up question to keep the conversation going. Start with a simple topic: [TOPIC — e.g. hobbies, school, weekend plans].',
      },
      {
        title: 'B) Nauczyciel na podstawie zdjęcia',
        text: "Look at this photo I'm sending you. Describe what you see in simple English (A2/B1 level). Then ask me 5 questions about the photo — start easy, then make them harder. After each of my answers, correct my English and teach me 2 new words related to the picture.",
      },
      {
        title: 'C) Powtórka z notatek/materiałów',
        text: 'Here are my English class notes: [WKLEJ NOTATKI LUB OPISZ TEMAT]. Act as my teacher. First, explain the grammar rule in simple terms with 3 examples. Then test me — ask me 5 questions using this grammar. Correct my mistakes and explain why.',
      },
      {
        title: 'D) Scenka sytuacyjna (role-play)',
        text: "Let's do a role-play in English. Scenario: [CHOOSE: ordering food in a restaurant / buying a ticket / asking for directions / job interview for a summer job / meeting a new classmate]. You play the other person. My level is A2/B1. If I make a mistake, gently correct me after the exchange. Start the conversation.",
      },
    ],
  },
  {
    emoji: '🤖',
    name: 'ChatGPT Voice — asystent głosowy',
    description: 'Tryb głosowy ChatGPT (Advanced Voice) pozwala na naturalną konwersację. Świetny do ćwiczeń wymowy, bo rozumie nawet niedoskonały akcent i cierpliwie poprawia.',
    link: 'https://chat.openai.com',
    whenToUse: [
      'Ćwiczenie wymowy i intonacji',
      'Rozmowa na temat z lekcji lub podręcznika',
      'Tłumaczenie i wyjaśnianie zwrotów „na żywo"',
    ],
    prompts: [
      {
        title: 'A) Trener wymowy',
        text: "You are my English pronunciation coach. My level is A2/B1 (8th grade). I will say words and sentences — tell me if my pronunciation is correct. If not, break the word into syllables and show me how to say it. Focus on these sounds I struggle with: [TH / R / W / V — or say 'general']. Let's start with 10 common words I might mispronounce.",
      },
      {
        title: 'B) Konwersacja z materiału lekcyjnego',
        text: "I'm preparing for my English class about [TOPIC FROM TEXTBOOK — e.g. environment, technology, healthy lifestyle]. My level is A2/B1. Have a conversation with me about this topic. Use vocabulary from this word list: [WKLEJ SŁÓWKA]. After every 3 exchanges, summarize new words I should remember.",
      },
      {
        title: 'C) Opisywanie obrazka (matura/egzamin)',
        text: "I'm practicing describing pictures for my English exam. I will describe a photo to you. Listen and then: 1) rate my description 1-5, 2) point out grammar mistakes, 3) give me useful phrases I could have used, 4) ask me 3 follow-up questions about the photo. My level is A2/B1.",
      },
      {
        title: 'D) Codzienne sytuacje',
        text: "Let's practice everyday English conversations. My level is A2/B1 (8th grade). Pick a random everyday situation (shopping, doctor visit, asking for help, talking to a friend) and start a dialogue with me. After each of my responses, give me a score (1-5) and one tip to sound more natural. Switch situations every 5 minutes.",
      },
    ],
  },
  {
    emoji: '🟠',
    name: 'Claude Voice — cierpliwy nauczyciel',
    description: 'Claude od Anthropic wyróżnia się cierpliwością i dokładnymi wyjaśnieniami gramatyki. Idealny, gdy chcesz zrozumieć DLACZEGO tak się mówi, nie tylko CO powiedzieć.',
    link: 'https://claude.ai',
    whenToUse: [
      'Dokładne wyjaśnienie reguły gramatycznej',
      'Analiza tekstu z podręcznika krok po kroku',
      'Przygotowanie do sprawdzianu z konkretnego działu',
    ],
    prompts: [
      {
        title: 'A) Analiza tekstu z lekcji',
        text: 'Here is a text from my English textbook: [WKLEJ TEKST LUB OPISZ GO]. My level is A2/B1 (8th grade). Please: 1) Explain 5 most difficult words in simple English + Polish translation, 2) Find 3 grammar structures and explain them, 3) Write 5 comprehension questions, 4) Create a mini-dialogue using vocabulary from this text.',
      },
      {
        title: 'B) Gramatyka krok po kroku',
        text: 'Explain this English grammar topic to me: [TOPIC — e.g. Present Perfect vs Past Simple / conditionals / passive voice / reported speech]. My level is A2/B1. Use: 1) Simple explanation in English, 2) 5 clear examples, 3) Common mistakes Polish students make, 4) A quick 5-question quiz to test me. Be patient and encouraging.',
      },
      {
        title: 'C) Nauczyciel ze zdjęcia notatek',
        text: "I'm sending you a photo of my English class notes. Please: 1) Read and organize the notes clearly, 2) Correct any mistakes in the notes, 3) Add 3 examples for each grammar rule, 4) Create 5 practice sentences for me to translate (Polish → English). My level is A2/B1.",
      },
      {
        title: 'D) Przygotowanie do sprawdzianu',
        text: 'I have an English test about [TOPIC/UNIT] on [KIEDY]. My level is A2/B1 (8th grade). Help me prepare: 1) List the most important vocabulary (20 words with examples), 2) Explain key grammar rules, 3) Create a practice test (10 questions: 5 grammar, 3 vocabulary, 2 writing). After I answer, grade me and explain mistakes.',
      },
    ],
  },
  {
    emoji: '📸',
    name: 'AI + zdjęcie = lekcja angielskiego',
    description: 'Zrób zdjęcie czegokolwiek — notatek, strony z podręcznika, ulicy, jedzenia — i użyj AI do nauki angielskiego na podstawie tego, co widzisz. Działa we wszystkich trzech asystentach!',
    link: 'https://gemini.google.com',
    whenToUse: [
      'Nauka słówek z otoczenia (zdjęcie ulicy, sklepu, kuchni)',
      'Tłumaczenie i analiza strony z podręcznika',
      'Ćwiczenie opisywania zdjęć na egzamin',
    ],
    prompts: [
      {
        title: 'A) Słówka z otoczenia',
        text: "Look at this photo of [MY ROOM / STREET / KITCHEN / CLASSROOM]. Name every object you can see in English. For each object give: 1) English word, 2) pronunciation guide, 3) example sentence a student would use. My level is A2/B1. Then quiz me — describe an object and I'll guess the English word.",
      },
      {
        title: 'B) Strona z podręcznika → interaktywna lekcja',
        text: "I'm sending a photo of a page from my English textbook. Read it and turn it into an interactive lesson for me: 1) Summarize the main topic, 2) Explain new vocabulary, 3) Create a dialogue using the grammar from this page, 4) Give me 5 exercises. My level is A2/B1 (8th grade, Polish school).",
      },
      {
        title: 'C) Zdjęcie → opowiadanie',
        text: 'Look at this photo. Help me write a short story (100-150 words) in English based on what you see. First, help me brainstorm: who, where, when, what happened? Then we write it together sentence by sentence — you suggest, I try, you correct. Level: A2/B1.',
      },
      {
        title: 'D) Zdjęcie notatek → fiszki',
        text: "I'm sending a photo of my English notes from class. Please: 1) Read all the content, 2) Create 15 flashcards (English word/phrase → Polish translation + example sentence), 3) Group them by topic, 4) Mark which ones are most important for a test. Format each flashcard clearly.",
      },
    ],
  },
]

// Map lesson slugs to their tools
export const LESSON_TOOLS_MAP: Record<string, LessonTool[]> = {
  '1-google-intro': LESSON_1_TOOLS,
  '2-notebooklm': LESSON_2_TOOLS,
  '3-ai-english': LESSON_3_TOOLS,
}

// Default export for backward compatibility
export const LESSON_TOOLS = LESSON_1_TOOLS
