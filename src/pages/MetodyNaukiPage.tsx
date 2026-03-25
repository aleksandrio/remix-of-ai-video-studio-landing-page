import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { ThemeToggle } from '@/components/ThemeToggle'
import { StartSurveyMetody } from '@/components/metody-nauki/StartSurveyMetody'
import { FeedbackSurveyMetody } from '@/components/metody-nauki/FeedbackSurveyMetody'
import { MethodCard } from '@/components/metody-nauki/MethodCard'
import { NotebookToolCard } from '@/components/metody-nauki/NotebookToolCard'
import { EXAMPLE_SOURCE_TEXT } from '@/data/exampleSource'

const LESSON_SLUG = '2-metody-nauki'

export default function MetodyNaukiPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(EXAMPLE_SOURCE_TEXT).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  useEffect(() => {
    async function load() {
      let { data: sessionData } = await supabase
        .from('survey_sessions')
        .select('*')
        .eq('lesson_slug', LESSON_SLUG)
        .eq('status', 'active')
        .maybeSingle()

      if (!sessionData) {
        const name = `Auto: ${new Date().toLocaleString('pl')}`
        const { data: newSession } = await supabase
          .from('survey_sessions')
          .insert({ lesson_slug: LESSON_SLUG, name, status: 'active' })
          .select()
          .single()
        sessionData = newSession
      }

      if (sessionData) setSessionId(sessionData.id)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">AI w szkole</p>
            <h1 className="font-heading text-lg font-bold text-foreground">Lekcja 2 – Metody uczenia się i NotebookLM</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* SEKCJA 1 - Ankieta startowa */}
        {sessionId && <StartSurveyMetody sessionId={sessionId} />}

        {/* SEKCJA 2 - Wprowadzenie */}
        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">🧠 Dlaczego warto zmienić sposób nauki</h2>
          <p className="text-sm text-foreground leading-relaxed">
            Większość uczniów uczy się przez czytanie i przepisywanie. Mózg nie jest wtedy zaangażowany. Zapamiętywanie to nie wkładanie informacji do głowy — to wyciąganie jej z głowy. Im częściej to robisz, tym trwalszy ślad.
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            Na tej lekcji zobaczysz kilka sprawdzonych metod uczenia się — i poznasz NotebookLM: narzędzie, które pomaga je stosować. Ważne: NotebookLM pokaże Ci jak wyglądają dobre materiały do nauki. Zrobienie ich samemu da Ci jeszcze lepszy efekt.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">❌ Metody słabe (pasywne)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Czytanie notatek, przepisywanie, podkreślanie — mózg nie musi nic robić, informacja przepływa ale nie zostaje.
              </p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">✅ Metody silne (aktywne)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Testowanie siebie, tłumaczenie innym, rysowanie map myśli, powtórki w odstępach — mózg musi się wysilić, a wysiłek buduje trwałe połączenia.
              </p>
            </div>
          </div>
        </section>

        {/* SEKCJA 3 - Metody uczenia się */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Sprawdzone metody uczenia się</h2>

          <MethodCard
            emoji="📇"
            title="Active Recall"
            subtitle="aktywne odtwarzanie"
            description="Wyciągasz wiedzę z głowy zamiast ją czytać. Najskuteczniejsza metoda według dziesiątek badań."
            details={
              <>
                <p><strong>Na czym polega:</strong> Zamknij książkę i napisz lub powiedz głośno wszystko co pamiętasz. Mózg musi pracować — to buduje połączenia neuronowe.</p>
                <p><strong>Jak to zrobić:</strong> Po przeczytaniu rozdziału zapisz na kartce 5 najważniejszych rzeczy bez zaglądania. Albo odpowiedz na pytania z fiszek.</p>
                <p><strong>Efekt:</strong> Badania pokazują 2–3× lepsze zapamiętywanie niż samo czytanie.</p>
              </>
            }
          />

          <MethodCard
            emoji="🔁"
            title="Spaced Repetition"
            subtitle="powtórki rozłożone w czasie"
            description="Powtarzaj materiał w rosnących odstępach — 1 dzień, 3 dni, tydzień, miesiąc."
            details={
              <>
                <p><strong>Na czym polega:</strong> Każda powtórka tuż przed momentem zapomnienia „resetuje" krzywą Ebbinghausa. Po 4–5 powtórkach wiedza zostaje na lata.</p>
                <p><strong>Jak to zrobić:</strong> Podziel fiszki na dwie kupki: „wiem" i „nie wiem". Jutro ucz się tylko z kupki „nie wiem". Powtarzaj aż wszystko trafi do „wiem".</p>
                <p><strong>Efekt:</strong> To samo co 5 godzin nauki w jedną noc — ale rozłożone na 20 minut dziennie przez tydzień. I zostaje na dłużej.</p>
              </>
            }
          />

          <MethodCard
            emoji="🧑‍🏫"
            title="Metoda nauczyciela"
            subtitle="efekt protegé"
            description="Wytłumacz temat komuś innemu. Najsilniejsza metoda budowania głębokiego zrozumienia."
            details={
              <>
                <p><strong>Na czym polega:</strong> Gdy tłumaczysz, natychmiast wychodzą luki. Mózg musi zbudować spójną narrację — nie wystarczy „mniej więcej wiem".</p>
                <p><strong>Jak to zrobić:</strong> Poproś kogoś z domu żeby posłuchał przez 5 minut jak tłumaczysz temat — bez notatek.</p>
                <p><strong>Efekt:</strong> Do 90% zapamiętanej wiedzy przy nauczaniu innych, vs ok. 10% przy samym czytaniu.</p>
              </>
            }
          />

          <MethodCard
            emoji="✏️"
            title="Technika Feynmana"
            subtitle="wytłumacz prostymi słowami"
            description="Sprawdzian prawdziwego rozumienia — wytłumacz pojęcie maksymalnie prostym językiem, bez żargonu."
            details={
              <>
                <p><strong>Kroki:</strong> (1) Napisz pojęcie na kartce. (2) Wyjaśnij je jak 8-latkowi. (3) Gdzie się zaplątałeś? Wróć do źródła. (4) Uprość i powtórz.</p>
                <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-muted-foreground"><strong>Skomplikowanie:</strong> fotosynteza to autotroficzny proces anaboliczny w chloroplastach z cyklem Calvina i fotofosforylacją.</p>
                  <p className="text-xs text-muted-foreground"><strong>Prosto:</strong> roślina robi cukier ze słońca, powietrza i wody — i przy okazji produkuje tlen.</p>
                </div>
                <p><strong>Efekt:</strong> Ujawnia dokładnie które fragmenty rozumiesz, a które tylko „znasz z widzenia".</p>
              </>
            }
          />

          <MethodCard
            emoji="🗺️"
            title="Mapa myśli"
            subtitle=""
            description="Wizualne organizowanie wiedzy — temat w centrum, gałęzie z kategoriami, szczegóły na końcach."
            details={
              <>
                <p><strong>Na czym polega:</strong> Rysując mapę musisz zdecydować co jest ważne i jak rzeczy się łączą. To aktywne przetwarzanie, nie kopiowanie.</p>
                <p><strong>Jak to zrobić:</strong> Weź kartkę A4. Napisz temat w środku. Zrób 3–5 głównych gałęzi (kategorie). Każdą rozgałęziaj na szczegóły. Używaj kolorów.</p>
                <p><strong>Efekt:</strong> Świetna do przeglądania całości tematu przed klasówką. Dwa kanały percepcji naraz: tekst + obraz.</p>
              </>
            }
          />
        </section>

        {/* SEKCJA 4 - Jak dodać materiał */}
        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
          <h2 className="font-heading text-xl font-bold text-foreground">📥 Jak dodać materiał do NotebookLM</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">1. Wyszukaj temat automatycznie (Discover Sources)</p>
              <p className="text-sm text-foreground leading-relaxed">
                Wpisz temat w pasku wyszukiwania w panelu Źródła → kliknij Enter → NotebookLM znajdzie artykuły z internetu i zaproponuje je do dodania → kliknij „Importuj".
              </p>
              <p className="text-xs text-muted-foreground">Najszybsza metoda. Działa identycznie na telefonie i laptopie.</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">3. Wgraj plik</p>
              <p className="text-sm text-foreground leading-relaxed">
                Dodaj źródło → „Prześlij pliki" → wybierz PDF, zdjęcie lub dokument. NotebookLM odczyta nawet zdjęcie strony podręcznika (OCR).
              </p>
              <p className="text-xs text-muted-foreground">Obsługuje: PDF, DOCX, zdjęcia (JPG/PNG), EPUB, CSV, audio.</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">4. Dodaj link</p>
              <p className="text-sm text-foreground leading-relaxed">
                Dodaj źródło → „Witryny" → wklej adres URL strony, artykułu lub filmu YouTube.
              </p>
              <p className="text-xs text-muted-foreground">Działa z Wikipedia, stronami edukacyjnymi i filmami na YouTube (NotebookLM odczyta transkrypcję).</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-foreground">2. Wklej tekst</p>
              <button
                id="copy-example-source-btn"
                onClick={handleCopy}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted active:scale-95"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Skopiowano!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Kopiuj tekst
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Dodaj źródło → „Skopiowany tekst" → wklej fragment podręcznika, notatki lub artykułu → Wstaw. Minimum ok. 100 słów.
            </p>
            <p className="text-xs text-muted-foreground">Idealne gdy masz gotowy tekst — np. fragment z podręcznika podany przez nauczyciela.</p>
          </div>
        </section>

        {/* SEKCJA 5 - NotebookLM narzędzia */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">🛠️ NotebookLM — narzędzia</h2>
          <p className="text-sm text-muted-foreground">
            NotebookLM to narzędzie Google zasilane modelem Gemini. Wgrywasz swoje materiały — i AI tworzy na ich podstawie różne pomoce do nauki. Każde narzędzie możesz dostosować do swojego tematu i potrzeb.
          </p>

          <NotebookToolCard
            emoji="📇"
            title="Fiszki (Flashcards)"
            description={'Automatycznie generuje zestaw pytanie–odpowiedź z Twoich materiałów. Z trybem „Wiem / Nie wiem" i zapamiętywaniem postępu.'}
            details={
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
            }
          />

          <NotebookToolCard
            emoji="❓"
            title="Test (Quiz)"
            description="Generuje pytania testowe z Twoich materiałów — wielokrotnego wyboru lub otwarte. Pokazuje odpowiedzi z odniesieniami do źródła."
            details={
              <>
                <p><strong>Co robi:</strong> Tworzy interaktywny quiz z automatycznym sprawdzaniem. Każda odpowiedź ma cytat ze źródła który ją uzasadnia — możesz zobaczyć skąd pochodzi każda informacja.</p>
                <p><strong>Jak dostosować:</strong> Wpisz w chacie „Wygeneruj quiz tylko z wydarzeń po 1939 roku" albo „Skup się na pytaniach przyczynowo-skutkowych". Możesz usunąć pytania które uważasz za nieważne i wygenerować kolejne.</p>
                <p className="font-semibold">Przykłady użycia w szkole:</p>
                <ul className="space-y-1">
                  <li className="flex gap-2"><span className="text-primary">•</span> Pre-testing: zrób quiz ZANIM zaczniesz uczyć — zobaczysz co już wiesz</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Symulacja klasówki: wgraj materiał i poproś o 20 pytań w stylu egzaminacyjnym</li>
                </ul>
              </>
            }
          />

          <NotebookToolCard
            emoji="🎨"
            title="Infografika"
            description="Tworzy wizualne podsumowanie tematu jako grafika z kluczowymi informacjami."
            details={
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
            }
          />

          <NotebookToolCard
            emoji="📄"
            title="Raporty (Reports)"
            description="Generuje gotowe dokumenty tekstowe różnych typów na podstawie Twoich źródeł."
            details={
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
            }
          />

          <NotebookToolCard
            emoji="🎧"
            title="Podsumowanie audio (Audio Overview)"
            description="Zamienia Twoje materiały w podcast prowadzony przez dwóch AI-hostów. Słuchasz streszczenia jak audycji radiowej."
            details={
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
            }
          />

          <NotebookToolCard
            emoji="🗺️"
            title="Mapa myśli (Mind Map) "
            description="Interaktywny diagram pokazujący strukturę i powiązania między wszystkimi tematami w Twoich źródłach. Aktualnie dostępna tylko na laptopie."
            details={
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
            }
          />
        </section>

        {/* Pozostałe narzędzia */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Pozostałe narzędzia NotebookLM</h2>
          <p className="text-xs text-muted-foreground">Nie będziemy ich dziś omawiać, ale żebyście mieli pogląd co jeszcze potrafi NotebookLM.</p>

          <NotebookToolCard
            emoji="🖥️"
            title="Prezentacja (Slide Deck)"
            description="Generuje gotową prezentację slajdów na podstawie Twoich źródeł. Eksport do PDF lub PPTX."
            details={
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
            }
          />

          <NotebookToolCard
            emoji="🎬"
            title="Podsumowanie wideo (Video Overview)"
            description="Tworzy krótki film z narracją AI, animacjami i wizualizacjami na podstawie Twoich materiałów."
            details={
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
            }
          />
        </section>

        {/* SEKCJA 6 - Podgląd nie skrót */}
        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
          <h2 className="font-heading text-xl font-bold text-foreground">🔍 NotebookLM: podgląd, nie skrót</h2>
          <p className="text-sm text-foreground leading-relaxed">
            NotebookLM może w 10 sekund wygenerować fiszki, mapę myśli i quiz. To świetne narzędzie — ale ważne żebyś rozumiał co to znaczy i czego to nie robi.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">✅ Co daje NotebookLM</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pokazuje jak powinny wyglądać dobre fiszki i pytania. Pomaga ogarnąć strukturę tematu. Daje gotowe materiały do ćwiczenia — możesz testować się z jego quizów i fiszek. Oszczędza czas na przygotowanie.
              </p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">⚠️ Czego nie robi</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nie uczy się za Ciebie. Samo klikanie „generuj" i odkładanie telefonu = zero efektu. Nie zastąpi samodzielnego rysowania mapy myśli — bo rysowanie to nauka. Nie zastąpi tłumaczenia na głos — bo mówienie to nauka.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <p className="text-sm text-foreground">
              💡 <strong>Złota zasada:</strong> Używaj NotebookLM do szybkich efektów i żeby zobaczyć jak powinny wyglądać Twoje materiały do nauki — a potem spróbuj je zrobić sam. Obserwuj efekty i porównuj.
            </p>
          </div>
        </section>

        {/* SEKCJA 7 - Feedback */}
        {sessionId && <FeedbackSurveyMetody sessionId={sessionId} />}
      </main>
    </div>
  )
}
