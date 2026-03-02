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
    emoji: '💎',
    name: 'Gemini',
    description: 'Gemini możesz używać do ulepszania promptów albo do kreatywnego tworzenia promptów, gdy nie masz pomysłu. Może przeprowadzić Cię przez proces myślenia i generowania promptu dla kolejnych narzędzi.',
    link: 'https://gemini.google.com',
    whenToUse: [
      'Gdy chcesz przerobić słaby prompt na lepszy',
      'Gdy nie wiesz, jak zacząć i potrzebujesz szkicu promptu',
      'Gdy chcesz szybko zrobić quiz lub plan nauki',
    ],
    prompts: [
      {
        title: 'Generator promptu dla narzędzia (prowadź mnie krok po kroku)',
        text: 'Chcę wygenerować świetny prompt do narzędzia: [NANO BANANA / FLOW / LYRA]. Najpierw zadaj mi maks. 6 krótkich pytań doprecyzowujących. Potem przygotuj 3 wersje promptu: (1) krótka, (2) standard, (3) ambitna. Na końcu podaj checklistę 5 rzeczy do sprawdzenia przed uruchomieniem.',
      },
      {
        title: 'Ulepszacz promptu',
        text: 'Oto mój prompt: "[WKLEJ SWÓJ PROMPT]". Popraw go: dodaj szczegóły, uściślij styl, format i ograniczenia. Podaj 3 wersje: minimalna, standardowa, rozbudowana.',
      },
      {
        title: 'Quiz z tematu',
        text: 'Stwórz quiz 10 pytań (jednokrotnego wyboru, 4 odpowiedzi) z tematu: [TEMAT]. Poziom: [szkoła podstawowa / liceum]. Na końcu podaj klucz odpowiedzi.',
      },
      {
        title: 'Plan nauki',
        text: 'Przygotuj plan nauki na [LICZBA] dni do tematu: [TEMAT]. Każdy dzień: cel, materiały, ćwiczenie praktyczne. Poziom: [początkujący / średni / zaawansowany].',
      },
    ],
  },
  {
    emoji: '🍌',
    name: 'Nano Banana (Google)',
    description: 'Szybkie przeróbki zdjęć i obrazów: style, tła, warianty. Efekt WOW w minutę.',
    link: 'https://aistudio.google.com',
    whenToUse: [
      'Przeróbka zdjęcia na epokę/styl do projektu',
      'Plakat/grafika do prezentacji',
      'Warianty jednego pomysłu',
    ],
    prompts: [
      {
        title: 'A) Inna epoka (realistycznie)',
        text: 'Przerób to zdjęcie na styl: [EPOKA / ROK]. Zachowaj moją twarz i rysy, realistyczne światło, wysoka jakość, naturalne kolory. Tło: [MIEJSCE]. Zrób 3 warianty.',
      },
      {
        title: 'B) Plakat szkolny',
        text: 'Zrób z tego obrazka plakat w stylu [minimal / retro / manga] na temat [TEMAT]. Dodaj tytuł: "[TYTUŁ]" i podtytuł: [PODTYTUŁ]. Zostaw miejsce na datę i salę. Czytelna typografia, wysoki kontrast.',
      },
      {
        title: 'C) Czyste tło',
        text: 'Usuń elementy tła i zostaw główną postać/obiekt. Tło ustaw na jednolite [KOLOR]. Zachowaj naturalne krawędzie, bez artefaktów.',
      },
      {
        title: 'D) 3 stylizacje tej samej osoby',
        text: 'Wygeneruj 3 wersje stylu: [sportowy / elegancki / cyberpunk]. Zachowaj tę samą osobę i podobne ujęcie. Każdy wariant z inną kolorystyką i dodatkami.',
      },
    ],
  },
  {
    emoji: '🎬',
    name: 'Google Flow',
    description: 'Narzędzie AI do tworzenia filmów — generuj klipy, sceny i całe historie z zachowaniem spójności postaci i stylu.',
    link: 'https://flow.google.com',
    whenToUse: [
      'Ujęcie do prezentacji bez kręcenia',
      'Scenki do projektów tematycznych',
      'Intro/outro do materiału wideo',
    ],
    prompts: [
      {
        title: 'A) Szkoła przyszłości (cinematic)',
        text: 'Nowoczesna klasa, poranne światło, uczniowie przy tabletach, na ścianie hologram. Styl: cinematic, slow pan. Długość: [8s]. Bez napisów.',
      },
      {
        title: 'B) Średniowieczne miasto',
        text: 'Miasto o świcie, bruk, stragany, dym z kominów. Ujęcie z góry → płynny zjazd na ulicę. Styl realistyczny. Długość: [czas]. Bez napisów.',
      },
      {
        title: 'C) Podróż w komórce (edukacyjna animacja 3D)',
        text: 'Wnętrze komórki, mitochondria, jądro, ruch cząsteczek. Styl: czysta edukacyjna animacja 3D. Kamera: płynny lot. Długość: [czas]. Bez napisów.',
      },
      {
        title: 'D) 3 warianty jednego ujęcia',
        text: 'Wygeneruj 3 warianty: temat [TEMAT], styl [realistyczny/animowany]. Zmieniaj porę dnia, pogodę i kąt kamery. Długość: [czas].',
      },
    ],
  },
  {
    emoji: '🎵',
    name: 'Lyra/Lyria (Google)',
    description: 'Generuje krótkie podkłady do filmów i prezentacji (najlepiej instrumentalne).',
    link: 'https://aistudio.google.com',
    whenToUse: [
      'Intro/outro do prezentacji',
      'Tło do wideo',
      'Klimat do projektu',
    ],
    prompts: [
      {
        title: 'A) Lo-fi do nauki (bez wokalu)',
        text: 'Instrumentalny lo-fi. Tempo [70–90 BPM]. Pianino, miękki bas, delikatne bębny. Zero wokalu. Długość [30s].',
      },
      {
        title: 'B) Heroiczne intro (10–15s)',
        text: 'Filmowe intro: bębny, smyczki, narastanie, finał na 1 mocnym akordzie. Bez wokalu. Długość [10–15s].',
      },
      {
        title: 'C) Cyberpunk / technologia',
        text: 'Elektroniczny podkład: neon, syntezatory, rytm [BPM], ciemniejsza tonacja. Bez wokalu. Długość [czas].',
      },
      {
        title: 'D) Wersje A/B',
        text: 'Dwie wersje: A spokojniej, B bardziej energicznie. Gatunek [GATUNEK], instrumenty [INSTRUMENTY], długość [czas]. Bez wokalu.',
      },
    ],
  },
]

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

// Map lesson slugs to their tools
export const LESSON_TOOLS_MAP: Record<string, LessonTool[]> = {
  '1-google-intro': LESSON_1_TOOLS,
  '2-notebooklm': LESSON_2_TOOLS,
}

// Default export for backward compatibility
export const LESSON_TOOLS = LESSON_1_TOOLS
