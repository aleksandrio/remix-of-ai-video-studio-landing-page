export const LESSON_TOOLS = [
  {
    emoji: '💎',
    name: 'Gemini',
    description: 'Gemini możesz używać do ulepszania promptów albo do kreatywnego tworzenia promptów, gdy nie masz pomysłu. Może przeprowadzić Cię przez proces myślenia i generowania promptu dla kolejnych narzędzi.',
    whenToUse: [
      'Gdy chcesz przerobić słaby prompt na lepszy',
      'Gdy nie wiesz, jak zacząć i potrzebujesz szkicu promptu',
      'Gdy chcesz szybko zrobić quiz lub plan nauki',
    ],
    prompts: [
      {
        title: 'Generator promptu dla narzędzia (prowadź mnie krok po kroku)',
        text: 'Chcę wygenerować świetny prompt do narzędzia: [NANO BANANA / VEO / LYRA]. Najpierw zadaj mi maks. 6 krótkich pytań doprecyzowujących. Potem przygotuj 3 wersje promptu: (1) krótka, (2) standard, (3) ambitna. Na końcu podaj checklistę 5 rzeczy do sprawdzenia przed uruchomieniem.',
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
    emoji: '🎥',
    name: 'Veo (Google)',
    description: 'Tworzy krótkie klipy wideo na podstawie opisu sceny. Idealne na "wow" i ujęcia do projektów.',
    whenToUse: [
      'Ujęcie do prezentacji bez kręcenia',
      'Scenki do projektów tematycznych',
      'Intro do materiału',
    ],
    prompts: [
      {
        title: 'A) Szkoła przyszłości (cinematic)',
        text: 'Realistyczny klip: nowoczesna klasa, poranne światło, uczniowie przy tabletach, na ścianie hologram. Kamera: cinematic slow pan. Długość [8s]. Bez napisów.',
      },
      {
        title: 'B) Średniowieczne miasto',
        text: 'Realistycznie: miasto o świcie, bruk, stragany, dym z kominów. Kamera: ujęcie z góry → płynny zjazd na ulicę. Długość [czas]. Bez napisów.',
      },
      {
        title: 'C) Podróż w komórce (edukacyjna animacja 3D)',
        text: 'Wnętrze komórki, mitochondria, jądro, ruch cząsteczek. Styl: czysta edukacyjna animacja 3D. Kamera: płynny lot. Długość [czas]. Bez napisów.',
      },
      {
        title: 'D) 3 warianty jednego ujęcia',
        text: 'Wygeneruj 3 warianty: temat [TEMAT], styl [realistyczny/animowany]. Zmieniaj porę dnia, pogodę i kąt kamery. Długość [czas].',
      },
    ],
  },
  {
    emoji: '🎵',
    name: 'Lyra/Lyria (Google)',
    description: 'Generuje krótkie podkłady do filmów i prezentacji (najlepiej instrumentalne).',
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
