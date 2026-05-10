import type { ReactNode } from 'react'

export interface MethodEntry {
  emoji: string
  title: string
  subtitle: string
  description: string
  details: ReactNode
}

export interface ToolEntry {
  emoji: string
  title: string
  description: string
  details: ReactNode
}

export interface MetodyContent {
  brand: string
  pageTitle: string
  introTitle: string
  introP1: string
  introP2: string
  weakLabel: string
  weakDesc: string
  strongLabel: string
  strongDesc: string
  methodsTitle: string
  methods: MethodEntry[]
  addTitle: string
  addStep1Title: string
  addStep1Body: string
  addStep1Note: string
  addStep3Title: string
  addStep3Body: string
  addStep3Note: string
  addStep4Title: string
  addStep4Body: string
  addStep4Note: string
  addStep2Title: string
  addStep2Body: string
  addStep2Note: string
  toolsTitle: string
  toolsIntro: string
  tools: ToolEntry[]
  otherToolsTitle: string
  otherToolsNote: string
  otherTools: ToolEntry[]
  previewTitle: string
  previewIntro: string
  previewProsLabel: string
  previewProsBody: string
  previewConsLabel: string
  previewConsBody: string
  goldenRule: ReactNode
}

const pl: MetodyContent = {
  brand: 'AI w szkole',
  pageTitle: 'Lekcja 2 – Metody uczenia się i NotebookLM',
  introTitle: '🧠 Dlaczego warto zmienić sposób nauki',
  introP1:
    'Większość uczniów uczy się przez czytanie i przepisywanie. Mózg nie jest wtedy zaangażowany. Zapamiętywanie to nie wkładanie informacji do głowy — to wyciąganie jej z głowy. Im częściej to robisz, tym trwalszy ślad.',
  introP2:
    'Na tej lekcji zobaczysz kilka sprawdzonych metod uczenia się — i poznasz NotebookLM: narzędzie, które pomaga je stosować. Ważne: NotebookLM pokaże Ci jak wyglądają dobre materiały do nauki. Zrobienie ich samemu da Ci jeszcze lepszy efekt.',
  weakLabel: '❌ Metody słabe (pasywne)',
  weakDesc:
    'Czytanie notatek, przepisywanie, podkreślanie — mózg nie musi nic robić, informacja przepływa ale nie zostaje.',
  strongLabel: '✅ Metody silne (aktywne)',
  strongDesc:
    'Testowanie siebie, tłumaczenie innym, rysowanie map myśli, powtórki w odstępach — mózg musi się wysilić, a wysiłek buduje trwałe połączenia.',
  methodsTitle: 'Sprawdzone metody uczenia się',
  methods: [
    {
      emoji: '📇',
      title: 'Active Recall',
      subtitle: 'aktywne odtwarzanie',
      description:
        'Wyciągasz wiedzę z głowy zamiast ją czytać. Najskuteczniejsza metoda według dziesiątek badań.',
      details: (
        <>
          <p><strong>Na czym polega:</strong> Zamknij książkę i napisz lub powiedz głośno wszystko co pamiętasz. Mózg musi pracować — to buduje połączenia neuronowe.</p>
          <p><strong>Jak to zrobić:</strong> Po przeczytaniu rozdziału zapisz na kartce 5 najważniejszych rzeczy bez zaglądania. Albo odpowiedz na pytania z fiszek.</p>
          <p><strong>Efekt:</strong> Badania pokazują 2–3× lepsze zapamiętywanie niż samo czytanie.</p>
        </>
      ),
    },
    {
      emoji: '🔁',
      title: 'Spaced Repetition',
      subtitle: 'powtórki rozłożone w czasie',
      description: 'Powtarzaj materiał w rosnących odstępach — 1 dzień, 3 dni, tydzień, miesiąc.',
      details: (
        <>
          <p><strong>Na czym polega:</strong> Każda powtórka tuż przed momentem zapomnienia „resetuje" krzywą Ebbinghausa. Po 4–5 powtórkach wiedza zostaje na lata.</p>
          <p><strong>Jak to zrobić:</strong> Podziel fiszki na dwie kupki: „wiem" i „nie wiem". Jutro ucz się tylko z kupki „nie wiem". Powtarzaj aż wszystko trafi do „wiem".</p>
          <p><strong>Efekt:</strong> To samo co 5 godzin nauki w jedną noc — ale rozłożone na 20 minut dziennie przez tydzień. I zostaje na dłużej.</p>
        </>
      ),
    },
    {
      emoji: '🧑‍🏫',
      title: 'Metoda nauczyciela',
      subtitle: 'efekt protegé',
      description:
        'Wytłumacz temat komuś innemu. Najsilniejsza metoda budowania głębokiego zrozumienia.',
      details: (
        <>
          <p><strong>Na czym polega:</strong> Gdy tłumaczysz, natychmiast wychodzą luki. Mózg musi zbudować spójną narrację — nie wystarczy „mniej więcej wiem".</p>
          <p><strong>Jak to zrobić:</strong> Poproś kogoś z domu żeby posłuchał przez 5 minut jak tłumaczysz temat — bez notatek.</p>
          <p><strong>Efekt:</strong> Do 90% zapamiętanej wiedzy przy nauczaniu innych, vs ok. 10% przy samym czytaniu.</p>
        </>
      ),
    },
    {
      emoji: '✏️',
      title: 'Technika Feynmana',
      subtitle: 'wytłumacz prostymi słowami',
      description:
        'Sprawdzian prawdziwego rozumienia — wytłumacz pojęcie maksymalnie prostym językiem, bez żargonu.',
      details: (
        <>
          <p><strong>Kroki:</strong> (1) Napisz pojęcie na kartce. (2) Wyjaśnij je jak 8-latkowi. (3) Gdzie się zaplątałeś? Wróć do źródła. (4) Uprość i powtórz.</p>
          <div className="bg-muted/40 rounded-lg p-4 space-y-2">
            <p className="text-xs text-muted-foreground"><strong>Skomplikowanie:</strong> fotosynteza to autotroficzny proces anaboliczny w chloroplastach z cyklem Calvina i fotofosforylacją.</p>
            <p className="text-xs text-muted-foreground"><strong>Prosto:</strong> roślina robi cukier ze słońca, powietrza i wody — i przy okazji produkuje tlen.</p>
          </div>
          <p><strong>Efekt:</strong> Ujawnia dokładnie które fragmenty rozumiesz, a które tylko „znasz z widzenia".</p>
        </>
      ),
    },
    {
      emoji: '🗺️',
      title: 'Mapa myśli',
      subtitle: '',
      description:
        'Wizualne organizowanie wiedzy — temat w centrum, gałęzie z kategoriami, szczegóły na końcach.',
      details: (
        <>
          <p><strong>Na czym polega:</strong> Rysując mapę musisz zdecydować co jest ważne i jak rzeczy się łączą. To aktywne przetwarzanie, nie kopiowanie.</p>
          <p><strong>Jak to zrobić:</strong> Weź kartkę A4. Napisz temat w środku. Zrób 3–5 głównych gałęzi (kategorie). Każdą rozgałęziaj na szczegóły. Używaj kolorów.</p>
          <p><strong>Efekt:</strong> Świetna do przeglądania całości tematu przed klasówką. Dwa kanały percepcji naraz: tekst + obraz.</p>
        </>
      ),
    },
  ],
  addTitle: '📥 Jak dodać materiał do NotebookLM',
  addStep1Title: '1. Wyszukaj temat automatycznie (Discover Sources)',
  addStep1Body:
    'Wpisz temat w pasku wyszukiwania w panelu Źródła → kliknij Enter → NotebookLM znajdzie artykuły z internetu i zaproponuje je do dodania → kliknij „Importuj".',
  addStep1Note: 'Najszybsza metoda. Działa identycznie na telefonie i laptopie.',
  addStep3Title: '3. Wgraj plik',
  addStep3Body:
    'Dodaj źródło → „Prześlij pliki" → wybierz PDF, zdjęcie lub dokument. NotebookLM odczyta nawet zdjęcie strony podręcznika (OCR).',
  addStep3Note: 'Obsługuje: PDF, DOCX, zdjęcia (JPG/PNG), EPUB, CSV, audio.',
  addStep4Title: '4. Dodaj link',
  addStep4Body:
    'Dodaj źródło → „Witryny" → wklej adres URL strony, artykułu lub filmu YouTube.',
  addStep4Note:
    'Działa z Wikipedia, stronami edukacyjnymi i filmami na YouTube (NotebookLM odczyta transkrypcję).',
  addStep2Title: '2. Wklej tekst',
  addStep2Body:
    'Dodaj źródło → „Skopiowany tekst" → wklej fragment podręcznika, notatki lub artykułu → Wstaw. Minimum ok. 100 słów.',
  addStep2Note: 'Idealne gdy masz gotowy tekst — np. fragment z podręcznika podany przez nauczyciela.',
  toolsTitle: '🛠️ NotebookLM — narzędzia',
  toolsIntro:
    'NotebookLM to narzędzie Google zasilane modelem Gemini. Wgrywasz swoje materiały — i AI tworzy na ich podstawie różne pomoce do nauki. Każde narzędzie możesz dostosować do swojego tematu i potrzeb.',
  tools: [
    {
      emoji: '📇',
      title: 'Fiszki (Flashcards)',
      description:
        'Automatycznie generuje zestaw pytanie–odpowiedź z Twoich materiałów. Z trybem „Wiem / Nie wiem" i zapamiętywaniem postępu.',
      details: (
        <>
          <p><strong>Co robi:</strong> Tworzy dwustronne karty: pytanie na froncie, odpowiedź na odwrocie. Możesz tasować talię, oznaczać trudne karty i wracać tylko do nich. Postęp jest zapisywany między sesjami.</p>
          <p><strong>Jak dostosować:</strong> Przed wygenerowaniem możesz w chacie napisać „Stwórz fiszki skupione tylko na pojęciach biologicznych" albo „Ogranicz fiszki do materiału z rozdziału 3". Możesz też ręcznie usunąć fiszki które są zbyt łatwe lub źle sformułowane.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Słownictwo na angielski: wgraj listę słówek, AI robi fiszki EN→PL</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Daty historyczne: pytanie = wydarzenie, odpowiedź = data</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Wzory i definicje: pytanie = nazwa, odpowiedź = wzór/definicja</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Powtórka z całego semestru: wgraj wszystkie notatki, wygeneruj 50 fiszek</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '❓',
      title: 'Test (Quiz)',
      description:
        'Generuje pytania testowe z Twoich materiałów — wielokrotnego wyboru lub otwarte. Pokazuje odpowiedzi z odniesieniami do źródła.',
      details: (
        <>
          <p><strong>Co robi:</strong> Tworzy interaktywny quiz z automatycznym sprawdzaniem. Każda odpowiedź ma cytat ze źródła który ją uzasadnia — możesz zobaczyć skąd pochodzi każda informacja.</p>
          <p><strong>Jak dostosować:</strong> Wpisz w chacie „Wygeneruj quiz tylko z wydarzeń po 1939 roku" albo „Skup się na pytaniach przyczynowo-skutkowych". Możesz usunąć pytania które uważasz za nieważne i wygenerować kolejne.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Pre-testing: zrób quiz ZANIM zaczniesz uczyć — zobaczysz co już wiesz</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Symulacja klasówki: wgraj materiał i poproś o 20 pytań w stylu egzaminacyjnym</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🎨',
      title: 'Infografika',
      description: 'Tworzy wizualne podsumowanie tematu jako grafika z kluczowymi informacjami.',
      details: (
        <>
          <p><strong>Co robi:</strong> Generuje jednostronicową infografikę z najważniejszymi faktami, liczbami i powiązaniami. Dostępnych 10 stylów wizualnych do wyboru.</p>
          <p><strong>Jak dostosować:</strong> Wybierz styl: Sketch Note, Kawaii, Professional, Scientific, Anime, Clay, Editorial, Instructional, Bento Grid lub Bricks. Możesz wgrać swoje wytyczne wizualne (np. kolory klasy) jako źródło — AI dopasuje wygląd.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Ściągawka wizualna do zawieszenia nad biurkiem</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Plakat na korytarz szkolny</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Podsumowanie projektu badawczego</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '📄',
      title: 'Raporty (Reports)',
      description: 'Generuje gotowe dokumenty tekstowe różnych typów na podstawie Twoich źródeł.',
      details: (
        <>
          <p><strong>Co robi:</strong> Tworzy ustrukturyzowany dokument: streszczenie, przewodnik do nauki (study guide), wpis blogowy, analiza lub odpowiedź na konkretne pytanie badawcze.</p>
          <p><strong>Jak dostosować:</strong> Wybierz typ raportu. Wpisz dokładne pytanie lub zakres — np. „Napisz przewodnik do nauki skupiony tylko na datach i osobach". Możesz też podać własne instrukcje formatowania.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Study guide przed klasówką: „Najważniejsze pojęcia, daty i osoby z tego rozdziału"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Streszczenie lektury na język polski</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Odpowiedź na pytanie otwarte z egzaminu: „Jakie były gospodarcze skutki I wojny?"</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🎧',
      title: 'Podsumowanie audio (Audio Overview)',
      description:
        'Zamienia Twoje materiały w podcast prowadzony przez dwóch AI-hostów. Słuchasz streszczenia jak audycji radiowej.',
      details: (
        <>
          <p><strong>Co robi:</strong> Dwóch rozmówców omawia Twoje źródła w naturalnej, konwersacyjnej formie — z przykładami, analogiami i odniesieniami między tematami. Możesz pobrać audio i słuchać offline.</p>
          <p><strong>Jak dostosować:</strong> Przed wygenerowaniem możesz określić: format (pogłębiona rozmowa / krótkie streszczenie / krytyczna analiza / debata), język, długość oraz pole „Na czym mają się skupić prowadzący - wpisz konkretne pytanie lub aspekt tematu.</p>
          <p className="text-xs text-muted-foreground">Możesz też dołączyć do rozmowy w trybie interaktywnym: przerywasz hostom i zadajesz pytania głosowo.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Historia: „Skupcie się na przyczynach, nie na przebiegu bitew"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Biologia: „Wytłumaczcie mi cykl Krebsa tak, żebym mógł go narysować"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Język polski: „Omówcie symbolikę w Weselu Wyspiańskiego"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Nauka do egzaminu: „Zróbcie krótkie 5-minutowe podsumowanie przed testem"</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🗺️',
      title: 'Mapa myśli (Mind Map)',
      description:
        'Interaktywny diagram pokazujący strukturę i powiązania między wszystkimi tematami w Twoich źródłach. Aktualnie dostępna tylko na laptopie.',
      details: (
        <>
          <p><strong>Co robi:</strong> Generuje klikalne drzewo pojęć — główne tematy jako węzły, szczegóły jako gałęzie. Kliknięcie węzła otwiera czat z pytaniami dotyczącymi tylko tego fragmentu.</p>
          <p><strong>Jak dostosować:</strong> Wybierz które źródła mają być uwzględnione (możesz pominąć część). Możesz wygenerować kilka wersji z różnymi zestawami źródeł.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Ogląd całego tematu przed rozpoczęciem nauki</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Sprawdzenie czy Twoja własna mapa myśli zgadza się z tym co AI uznało za ważne</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Nawigacja po dużym materiale — klikasz w to co Cię interesuje</li>
          </ul>
        </>
      ),
    },
  ],
  otherToolsTitle: 'Pozostałe narzędzia NotebookLM',
  otherToolsNote: 'Nie będziemy ich dziś omawiać, ale żebyście mieli pogląd co jeszcze potrafi NotebookLM.',
  otherTools: [
    {
      emoji: '🖥️',
      title: 'Prezentacja (Slide Deck)',
      description:
        'Generuje gotową prezentację slajdów na podstawie Twoich źródeł. Eksport do PDF lub PPTX.',
      details: (
        <>
          <p><strong>Co robi:</strong> Tworzy wieloslajdową prezentację z tytułami, punktami kluczowymi i układem graficznym. Każdy slajd możesz poprawić — wyślij feedback tekstowy a AI przegeneruje slajd.</p>
          <p><strong>Jak dostosować:</strong> Wpisz temat lub pytanie przewodnie prezentacji. Możesz wgrać własne wytyczne stylu (brand guidelines) jako źródło — AI dopasuje kolory i czcionki. Można też określić poziom szczegółowości i grupę docelową.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Referat na lekcję: „Zrób prezentację 10 slajdów o skutkach II wojny światowej"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Projekt grupowy: wgrajcie notatki wszystkich członków grupy jako źródła</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Ściągawka wizualna: „Jedna strona z najważniejszymi wzorami z działu"</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🎬',
      title: 'Podsumowanie wideo (Video Overview)',
      description:
        'Tworzy krótki film z narracją AI, animacjami i wizualizacjami na podstawie Twoich materiałów.',
      details: (
        <>
          <p><strong>Co robi:</strong> Generuje wideo łączące narrację głosową z wizualizacjami, schematami i kluczowymi informacjami. Dostępny też tryb Cinematic — bardziej immersyjny, z płynnymi animacjami (dla użytkowników AI Ultra).</p>
          <p><strong>Jak dostosować:</strong> Wybierz styl wizualny: tablica (whiteboard), kawaii, akwarela lub klasyczny. Określ format: wyjaśniający krok po kroku lub krótkie streszczenie. Wpisz na czym ma się skupić narracja.</p>
          <p className="font-semibold">Przykłady użycia w szkole:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Wizualne wytłumaczenie procesu (fotosynteza, obieg wody)</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Streszczenie rozdziału przed klasówką w 3 minuty</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Materiał do powtórki w drodze do szkoły — włączasz jak YouTube</li>
          </ul>
        </>
      ),
    },
  ],
  previewTitle: '🔍 NotebookLM: podgląd, nie skrót',
  previewIntro:
    'NotebookLM może w 10 sekund wygenerować fiszki, mapę myśli i quiz. To świetne narzędzie — ale ważne żebyś rozumiał co to znaczy i czego to nie robi.',
  previewProsLabel: '✅ Co daje NotebookLM',
  previewProsBody:
    'Pokazuje jak powinny wyglądać dobre fiszki i pytania. Pomaga ogarnąć strukturę tematu. Daje gotowe materiały do ćwiczenia — możesz testować się z jego quizów i fiszek. Oszczędza czas na przygotowanie.',
  previewConsLabel: '⚠️ Czego nie robi',
  previewConsBody:
    'Nie uczy się za Ciebie. Samo klikanie „generuj" i odkładanie telefonu = zero efektu. Nie zastąpi samodzielnego rysowania mapy myśli — bo rysowanie to nauka. Nie zastąpi tłumaczenia na głos — bo mówienie to nauka.',
  goldenRule: (
    <>
      💡 <strong>Złota zasada:</strong> Używaj NotebookLM do szybkich efektów i żeby zobaczyć jak powinny wyglądać Twoje materiały do nauki — a potem spróbuj je zrobić sam. Obserwuj efekty i porównuj.
    </>
  ),
}

const en: MetodyContent = {
  brand: 'AI in school',
  pageTitle: 'Lesson 2 – Learning methods & NotebookLM',
  introTitle: '🧠 Why change the way you study',
  introP1:
    'Most students learn by reading and rewriting. Their brain barely engages. Memorizing isn’t about putting information into your head — it’s about pulling it back out. The more often you do that, the stronger the trace.',
  introP2:
    'In this lesson you’ll see proven study methods — and meet NotebookLM: a tool that helps you apply them. Heads up: NotebookLM will show you what good study materials look like. Making them yourself works even better.',
  weakLabel: '❌ Weak methods (passive)',
  weakDesc:
    'Reading notes, rewriting, highlighting — your brain doesn’t have to do anything; the information flows past but doesn’t stick.',
  strongLabel: '✅ Strong methods (active)',
  strongDesc:
    'Self-testing, teaching others, drawing mind maps, spaced repetition — your brain has to work, and effort builds lasting connections.',
  methodsTitle: 'Proven study methods',
  methods: [
    {
      emoji: '📇',
      title: 'Active Recall',
      subtitle: 'pulling knowledge from memory',
      description:
        'You retrieve knowledge instead of re-reading it. The most effective method according to dozens of studies.',
      details: (
        <>
          <p><strong>What it is:</strong> Close the book and write or say out loud everything you remember. Your brain has to work — that builds neural connections.</p>
          <p><strong>How to do it:</strong> After reading a chapter, write down the 5 most important things from memory. Or answer flashcard questions.</p>
          <p><strong>Effect:</strong> Studies show 2–3× better retention than re-reading.</p>
        </>
      ),
    },
    {
      emoji: '🔁',
      title: 'Spaced Repetition',
      subtitle: 'reviews spread over time',
      description: 'Review material at increasing intervals — 1 day, 3 days, a week, a month.',
      details: (
        <>
          <p><strong>What it is:</strong> Each review just before forgetting "resets" the Ebbinghaus curve. After 4–5 reviews knowledge sticks for years.</p>
          <p><strong>How to do it:</strong> Split flashcards into two piles: "I know" and "I don’t". Tomorrow study only the "I don’t" pile. Repeat until everything moves to "I know".</p>
          <p><strong>Effect:</strong> Same as 5 hours of cramming in one night — but spread over 20 minutes a day for a week. And it lasts longer.</p>
        </>
      ),
    },
    {
      emoji: '🧑‍🏫',
      title: 'The teacher method',
      subtitle: 'protégé effect',
      description: 'Explain a topic to someone else. The strongest way to build deep understanding.',
      details: (
        <>
          <p><strong>What it is:</strong> When you explain, gaps show up immediately. Your brain has to build a coherent narrative — "I sort of know it" isn’t enough.</p>
          <p><strong>How to do it:</strong> Ask someone at home to listen for 5 minutes while you explain a topic — without notes.</p>
          <p><strong>Effect:</strong> Up to 90% retention when teaching others vs about 10% from reading alone.</p>
        </>
      ),
    },
    {
      emoji: '✏️',
      title: 'Feynman technique',
      subtitle: 'explain it in plain words',
      description:
        'A test of real understanding — explain a concept in the simplest possible language, no jargon.',
      details: (
        <>
          <p><strong>Steps:</strong> (1) Write the concept on paper. (2) Explain it like to an 8-year-old. (3) Where did you get stuck? Go back to the source. (4) Simplify and repeat.</p>
          <div className="bg-muted/40 rounded-lg p-4 space-y-2">
            <p className="text-xs text-muted-foreground"><strong>Complicated:</strong> photosynthesis is an autotrophic anabolic process in chloroplasts with the Calvin cycle and photophosphorylation.</p>
            <p className="text-xs text-muted-foreground"><strong>Simple:</strong> a plant makes sugar from sunlight, air and water — and produces oxygen along the way.</p>
          </div>
          <p><strong>Effect:</strong> Reveals exactly which parts you understand and which you only "recognize".</p>
        </>
      ),
    },
    {
      emoji: '🗺️',
      title: 'Mind map',
      subtitle: '',
      description:
        'Visual organization of knowledge — topic in the middle, branches for categories, details on the ends.',
      details: (
        <>
          <p><strong>What it is:</strong> Drawing a map forces you to decide what matters and how things connect. That’s active processing, not copying.</p>
          <p><strong>How to do it:</strong> Take an A4 sheet. Write the topic in the middle. Draw 3–5 main branches (categories). Branch each one further into details. Use colors.</p>
          <p><strong>Effect:</strong> Great for reviewing a whole topic before a test. Two perception channels at once: text + image.</p>
        </>
      ),
    },
  ],
  addTitle: '📥 How to add material to NotebookLM',
  addStep1Title: '1. Search for a topic automatically (Discover Sources)',
  addStep1Body:
    'Type a topic in the search bar in the Sources panel → press Enter → NotebookLM will find articles online and suggest them → click "Import".',
  addStep1Note: 'Fastest method. Works the same on phone and laptop.',
  addStep3Title: '3. Upload a file',
  addStep3Body:
    'Add source → "Upload files" → choose a PDF, photo or document. NotebookLM can even read a photo of a textbook page (OCR).',
  addStep3Note: 'Supports: PDF, DOCX, photos (JPG/PNG), EPUB, CSV, audio.',
  addStep4Title: '4. Add a link',
  addStep4Body:
    'Add source → "Websites" → paste the URL of a page, article or YouTube video.',
  addStep4Note:
    'Works with Wikipedia, educational sites and YouTube videos (NotebookLM reads the transcript).',
  addStep2Title: '2. Paste text',
  addStep2Body:
    'Add source → "Copied text" → paste a textbook fragment, notes or article → Insert. Minimum about 100 words.',
  addStep2Note: 'Perfect when you already have text — e.g. a textbook excerpt from your teacher.',
  toolsTitle: '🛠️ NotebookLM — tools',
  toolsIntro:
    'NotebookLM is a Google tool powered by Gemini. You upload your materials — and the AI creates different study aids based on them. Each tool can be tailored to your topic and needs.',
  tools: [
    {
      emoji: '📇',
      title: 'Flashcards',
      description:
        'Automatically generates a question–answer set from your materials. With a "Know / Don’t know" mode and progress tracking.',
      details: (
        <>
          <p><strong>What it does:</strong> Creates two-sided cards: question on the front, answer on the back. You can shuffle the deck, mark hard cards and revisit only those. Progress is saved between sessions.</p>
          <p><strong>How to customize:</strong> Before generating, type in the chat "Create flashcards focused only on biology terms" or "Limit flashcards to chapter 3". You can also delete cards that are too easy or poorly worded.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> English vocabulary: upload a word list, AI builds EN→PL flashcards</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Historical dates: question = event, answer = date</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Formulas and definitions: question = name, answer = formula/definition</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Whole-semester review: upload all notes, generate 50 cards</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '❓',
      title: 'Quiz',
      description:
        'Generates test questions from your materials — multiple choice or open-ended. Shows answers with citations from the source.',
      details: (
        <>
          <p><strong>What it does:</strong> Creates an interactive quiz with automatic checking. Each answer comes with a source quote that justifies it — you can see exactly where the information came from.</p>
          <p><strong>How to customize:</strong> Type in the chat "Generate a quiz only from events after 1939" or "Focus on cause-and-effect questions". You can remove questions you find irrelevant and generate more.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Pre-testing: take a quiz BEFORE you start studying — see what you already know</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Test simulation: upload material and ask for 20 exam-style questions</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🎨',
      title: 'Infographic',
      description: 'Creates a visual summary of a topic as graphics with the key information.',
      details: (
        <>
          <p><strong>What it does:</strong> Generates a one-page infographic with the most important facts, numbers and connections. 10 visual styles to choose from.</p>
          <p><strong>How to customize:</strong> Pick a style: Sketch Note, Kawaii, Professional, Scientific, Anime, Clay, Editorial, Instructional, Bento Grid or Bricks. You can upload your own visual guidelines (e.g. class colors) as a source — the AI will match the look.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Visual cheat sheet to hang above your desk</li>
            <li className="flex gap-2"><span className="text-primary">•</span> A poster for the school hallway</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Summary of a research project</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '📄',
      title: 'Reports',
      description: 'Generates ready-made text documents of various types based on your sources.',
      details: (
        <>
          <p><strong>What it does:</strong> Creates a structured document: a summary, study guide, blog post, analysis or answer to a specific research question.</p>
          <p><strong>How to customize:</strong> Pick the report type. Enter the exact question or scope — e.g. "Write a study guide focused only on dates and people". You can also provide your own formatting instructions.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Pre-test study guide: "Most important concepts, dates and people from this chapter"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Reading summary for Polish class</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Open exam answer: "What were the economic consequences of WWI?"</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🎧',
      title: 'Audio Overview',
      description:
        'Turns your materials into a podcast hosted by two AI presenters. You listen to a summary like a radio show.',
      details: (
        <>
          <p><strong>What it does:</strong> Two hosts discuss your sources in a natural, conversational way — with examples, analogies and cross-references. You can download the audio and listen offline.</p>
          <p><strong>How to customize:</strong> Before generating you can set: format (deep dive / brief summary / critical analysis / debate), language, length and a "What should the hosts focus on" field — type a specific question or aspect of the topic.</p>
          <p className="text-xs text-muted-foreground">You can also join the conversation in interactive mode: interrupt the hosts and ask questions by voice.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> History: "Focus on causes, not on the course of battles"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Biology: "Explain the Krebs cycle so I can draw it"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Literature: "Discuss the symbolism in Wyspiański’s Wesele"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Exam prep: "Give me a short 5-minute summary before the test"</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🗺️',
      title: 'Mind Map',
      description:
        'An interactive diagram showing the structure and connections between all topics in your sources. Currently available only on laptop.',
      details: (
        <>
          <p><strong>What it does:</strong> Generates a clickable concept tree — main topics as nodes, details as branches. Clicking a node opens a chat with questions about just that fragment.</p>
          <p><strong>How to customize:</strong> Choose which sources to include (you can skip some). You can generate several versions with different source sets.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Overview of an entire topic before you start studying</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Check whether your own mind map matches what AI considered important</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Navigation through a large body of material — click on what interests you</li>
          </ul>
        </>
      ),
    },
  ],
  otherToolsTitle: 'Other NotebookLM tools',
  otherToolsNote: 'We won’t cover them today, but you should know what else NotebookLM can do.',
  otherTools: [
    {
      emoji: '🖥️',
      title: 'Slide Deck',
      description: 'Generates a ready slide deck based on your sources. Export to PDF or PPTX.',
      details: (
        <>
          <p><strong>What it does:</strong> Creates a multi-slide deck with titles, key bullet points and a graphic layout. You can fix any slide — send text feedback and the AI regenerates it.</p>
          <p><strong>How to customize:</strong> Enter the topic or guiding question of the deck. You can upload your own brand guidelines as a source — the AI will match colors and fonts. You can also set the level of detail and target audience.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Class presentation: "Make a 10-slide deck on the consequences of WWII"</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Group project: upload notes from every team member as sources</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Visual cheat sheet: "One page with the most important formulas from the unit"</li>
          </ul>
        </>
      ),
    },
    {
      emoji: '🎬',
      title: 'Video Overview',
      description:
        'Creates a short video with AI narration, animations and visualizations based on your materials.',
      details: (
        <>
          <p><strong>What it does:</strong> Generates a video combining voice narration with visualizations, diagrams and key information. There’s also a Cinematic mode — more immersive, with smooth animations (for AI Ultra users).</p>
          <p><strong>How to customize:</strong> Pick a visual style: whiteboard, kawaii, watercolor or classic. Choose the format: step-by-step explanation or short summary. State what the narration should focus on.</p>
          <p className="font-semibold">School use cases:</p>
          <ul className="space-y-1">
            <li className="flex gap-2"><span className="text-primary">•</span> Visual explanation of a process (photosynthesis, the water cycle)</li>
            <li className="flex gap-2"><span className="text-primary">•</span> 3-minute chapter summary before a test</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Review on the way to school — play it like YouTube</li>
          </ul>
        </>
      ),
    },
  ],
  previewTitle: '🔍 NotebookLM: a preview, not a shortcut',
  previewIntro:
    'NotebookLM can spit out flashcards, a mind map and a quiz in 10 seconds. It’s a great tool — but you need to understand what it actually does and what it doesn’t.',
  previewProsLabel: '✅ What NotebookLM gives you',
  previewProsBody:
    'It shows what good flashcards and questions should look like. It helps you grasp the structure of a topic. It gives you ready material to practice on — you can test yourself with its quizzes and cards. It saves prep time.',
  previewConsLabel: '⚠️ What it doesn’t do',
  previewConsBody:
    'It doesn’t learn for you. Just clicking "generate" and putting your phone down = zero effect. It won’t replace drawing your own mind map — because drawing is learning. It won’t replace explaining things out loud — because speaking is learning.',
  goldenRule: (
    <>
      💡 <strong>Golden rule:</strong> Use NotebookLM for quick wins and to see what your study materials should look like — then try to make them yourself. Watch the results and compare.
    </>
  ),
}

export const metodyContent = { pl, en }
