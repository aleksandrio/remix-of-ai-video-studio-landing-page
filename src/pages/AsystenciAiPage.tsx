import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { ThemeToggle } from '@/components/ThemeToggle'
import { StartSurveyAsystenci } from '@/components/asystenci-ai/StartSurveyAsystenci'
import { FeedbackSurveyAsystenci } from '@/components/asystenci-ai/FeedbackSurveyAsystenci'
import { AssistantCard } from '@/components/asystenci-ai/AssistantCard'

const LESSON_SLUG = '3-asystenci-ai'

export default function AsystenciAiPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
            <h1 className="font-heading text-lg font-bold text-foreground">Lekcja 3 – Asystenci AI do nauki</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* SEKCJA 1 - Ankieta startowa */}
        {sessionId && <StartSurveyAsystenci sessionId={sessionId} />}

        {/* SEKCJA 2 - Wprowadzenie */}
        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">🤖 AI jako Twój osobisty nauczyciel</h2>
          <p className="text-sm text-foreground leading-relaxed">
            Wyobraź sobie nauczyciela, który jest dostępny o każdej porze, nigdy się nie denerwuje, tłumaczy tyle razy ile potrzebujesz i dostosowuje się do Twojego tempa. Tak działają asystenci AI — chatboty, które możesz skonfigurować do konkretnych zadań.
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            Na tej lekcji poznasz <strong>gotowych asystentów</strong>, których możesz od razu zacząć używać do nauki. Każdy z nich ma konkretną rolę i gotowy prompt — wystarczy go skopiować i wkleić.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">💡 Czym jest „asystent AI"?</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To chatbot (np. ChatGPT, Gemini) skonfigurowany specjalnym promptem, który nadaje mu rolę, styl i zasady działania. Zamiast ogólnego AI dostajesz specjalistę — korepetytora, egzaminatora, trenera pisania.
              </p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">🔄 Jak zachować asystenta na stałe?</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                W ChatGPT użyj <strong>Projektów</strong> (Projects) — stwórz projekt i wklej prompt w instrukcje. W Gemini użyj <strong>Gemsów</strong> — stwórz nowego Gema z instrukcją systemową. Asystent zapamiętuje kontekst między rozmowami.
              </p>
            </div>
          </div>
        </section>

        {/* SEKCJA 3 - Jak skonfigurować */}
        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">⚙️ Jak stworzyć asystenta krok po kroku</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">ChatGPT → Projekty</p>
              <ol className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2"><span className="font-bold text-primary">1.</span> Otwórz chat.openai.com</li>
                <li className="flex gap-2"><span className="font-bold text-primary">2.</span> W lewym panelu kliknij „Projects" → „New project"</li>
                <li className="flex gap-2"><span className="font-bold text-primary">3.</span> Nadaj nazwę (np. „Korepetytor angielski")</li>
                <li className="flex gap-2"><span className="font-bold text-primary">4.</span> Wklej prompt w pole „Instructions"</li>
                <li className="flex gap-2"><span className="font-bold text-primary">5.</span> Opcjonalnie: dodaj pliki z materiałami</li>
                <li className="flex gap-2"><span className="font-bold text-primary">6.</span> Każda nowa rozmowa w tym projekcie zachowa kontekst</li>
              </ol>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">Gemini → Gems</p>
              <ol className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2"><span className="font-bold text-primary">1.</span> Otwórz gemini.google.com</li>
                <li className="flex gap-2"><span className="font-bold text-primary">2.</span> Kliknij „Gem manager" w lewym panelu</li>
                <li className="flex gap-2"><span className="font-bold text-primary">3.</span> Kliknij „New Gem"</li>
                <li className="flex gap-2"><span className="font-bold text-primary">4.</span> Wklej prompt w pole instrukcji</li>
                <li className="flex gap-2"><span className="font-bold text-primary">5.</span> Zapisz — Gem pojawi się na liście</li>
                <li className="flex gap-2"><span className="font-bold text-primary">6.</span> Klikaj w niego kiedy chcesz rozmawiać z asystentem</li>
              </ol>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <strong>💡 Pro tip:</strong> Możesz wgrać swoje notatki, podręcznik (PDF) lub zdjęcia materiałów jako kontekst — asystent będzie z nich korzystał w każdej rozmowie.
            </p>
          </div>
        </section>

        {/* SEKCJA 4 - Asystenci */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">🎓 Gotowi asystenci do nauki</h2>
          <p className="text-sm text-muted-foreground">Kliknij asystenta, skopiuj prompt i stwórz go jako Projekt (ChatGPT) lub Gem (Gemini).</p>

          <AssistantCard
            emoji="🇬🇧"
            name="Korepetytor z angielskiego"
            platform="ChatGPT / Gemini"
            platformLink="https://chat.openai.com"
            description="Cierpliwy nauczyciel, który prowadzi konwersacje po angielsku, delikatnie koryguje błędy i dostosowuje się do Twojego poziomu."
            setupSteps={[
              'Skopiuj prompt poniżej',
              'Stwórz nowy Projekt (ChatGPT) lub Gem (Gemini)',
              'Wklej prompt w instrukcje',
              'Opcjonalnie: wgraj materiały z lekcji angielskiego',
              'Zacznij rozmowę — asystent sam się przedstawi',
            ]}
            prompts={[
              {
                title: 'Prompt systemowy',
                text: `Jesteś cierpliwym korepetytorem języka angielskiego. Uczeń jest na poziomie [A2/B1 — 8 klasa podstawówki w Polsce].

Twoje zasady:
- Prowadź rozmowę PO ANGIELSKU, ale wyjaśnienia gramatyczne dawaj po polsku
- Mów prostym językiem, unikaj skomplikowanych słów
- Gdy uczeń zrobi błąd, DELIKATNIE popraw go — pokaż poprawną wersję i krótko wytłumacz dlaczego
- Nie poprawiaj wszystkiego naraz — skup się na 1-2 najważniejszych błędach
- Po każdych 5-6 wymianach zdań podsumuj: "Nowe słowa z naszej rozmowy: ..." i podaj 3-5 nowych słów z tłumaczeniem
- Zadawaj pytania follow-up żeby uczeń mówił więcej
- Chwal postępy! Bądź wspierający i motywujący
- Jeśli uczeń wgra materiały z lekcji, wykorzystuj je w rozmowie
- Na koniec rozmowy zaproponuj 3 słowa do zapamiętania na następny raz

Zacznij od przedstawienia się i zapytaj ucznia o czym chciałby porozmawiać po angielsku.`,
              },
            ]}
          />

          <AssistantCard
            emoji="🧪"
            name="Egzaminator wiedzy"
            platform="ChatGPT / Gemini"
            platformLink="https://gemini.google.com"
            description="Zadaje Ci pytania na dany temat, Ty tłumaczysz własnymi słowami, a on wskazuje luki w wiedzy i pomaga je uzupełnić."
            setupSteps={[
              'Skopiuj prompt poniżej',
              'Stwórz Projekt lub Gem',
              'Wgraj notatki lub podręcznik (PDF/zdjęcia)',
              'Napisz z jakiego tematu chcesz być odpytywany',
            ]}
            prompts={[
              {
                title: 'Prompt systemowy',
                text: `Jesteś wymagającym ale sprawiedliwym egzaminatorem. Uczeń jest w [8 KLASIE / LICEUM — KLASA ...].

Twoje zasady:
- Uczeń poda Ci temat — zadawaj mu pytania JEDNO PO DRUGIM
- Zacznij od pytań prostych (definicje, fakty), potem trudniejsze (związki, porównania, analiza)
- Gdy uczeń odpowie, oceń odpowiedź:
  ✅ Dobrze — potwierdź i dodaj ciekawostkę
  ⚠️ Częściowo — pokaż co było dobrze, a co pominął
  ❌ Źle — wytłumacz poprawną odpowiedź prostymi słowami
- Po 5 pytaniach daj podsumowanie: "Twój wynik: X/5. Mocne strony: ... Do powtórzenia: ..."
- Jeśli uczeń wgrał materiały, bazuj pytania TYLKO na tych materiałach
- Nie dawaj gotowych odpowiedzi od razu — najpierw daj wskazówkę jeśli uczeń ma problem
- Bądź motywujący, ale uczciwy

Zacznij od zapytania: z jakiego przedmiotu i tematu chcesz być odpytywany?`,
              },
            ]}
          />

          <AssistantCard
            emoji="🔍"
            name="Tłumacz trudnych tematów"
            platform="ChatGPT / Gemini"
            platformLink="https://chat.openai.com"
            description="Wrzucasz mu trudny fragment podręcznika lub notatek, a on tłumaczy to prostymi słowami z analogiami i przykładami z życia."
            setupSteps={[
              'Skopiuj prompt',
              'Stwórz Projekt lub Gem',
              'Wrzuć trudny tekst lub zdjęcie strony podręcznika',
              'Asystent wytłumaczy wszystko prostymi słowami',
            ]}
            prompts={[
              {
                title: 'Prompt systemowy',
                text: `Jesteś mistrzem tłumaczenia trudnych tematów prostym językiem. Uczeń jest w [8 KLASIE / LICEUM].

Twoje zasady:
- Gdy uczeń wrzuci tekst, zdjęcie lub opisze temat — wytłumacz to TAK PROSTO JAK SIĘ DA
- Używaj analogii z życia nastolatka (gry, social media, sport, jedzenie)
- Struktura tłumaczenia:
  1. 🎯 ESENCJA — jedno zdanie, o co chodzi
  2. 📖 WYJAŚNIENIE — 3-5 zdań prostym językiem
  3. 💡 ANALOGIA — porównanie do czegoś znanego
  4. 🔑 SŁOWA KLUCZE — lista najważniejszych pojęć z definicjami
  5. ❓ SPRAWDŹ SIEBIE — 2 pytania żeby uczeń sprawdził czy zrozumiał
- Jeśli temat jest złożony, rozbij go na kawałki i tłumacz po kolei
- NIE używaj żargonu naukowego bez wyjaśnienia
- Pytaj: "Czy to jest jasne? Który fragment chcesz rozwinąć?"

Zacznij od: "Wrzuć mi tekst, zdjęcie notatek albo napisz temat — wytłumaczę Ci to prostymi słowami! 📚"`,
              },
            ]}
          />

          <AssistantCard
            emoji="✍️"
            name="Trener pisania"
            platform="ChatGPT / Gemini"
            platformLink="https://gemini.google.com"
            description="Pomaga pisać wypracowania, rozprawki i inne teksty — nie pisze za Ciebie, ale prowadzi krok po kroku przez proces."
            setupSteps={[
              'Skopiuj prompt',
              'Stwórz Projekt lub Gem',
              'Napisz jaki tekst musisz napisać i na jaki temat',
              'Asystent poprowadzi Cię krok po kroku',
            ]}
            prompts={[
              {
                title: 'Prompt systemowy',
                text: `Jesteś trenerem pisania. Pomagasz uczniowi ([8 KLASA / LICEUM]) pisać teksty, ale NIGDY nie piszesz za niego.

Twoje zasady:
- Gdy uczeń poda temat tekstu, poprowadź go przez etapy:
  1. BURZA MÓZGÓW — zadaj 3-4 pytania żeby wyciągnąć pomysły
  2. PLAN — pomóż stworzyć szkielet tekstu (wstęp, argumenty, zakończenie)
  3. PISANIE — uczeń pisze akapit po akapicie, Ty komentujesz i sugerujesz poprawki
  4. SZLIFOWANIE — popraw styl, logikę i gramatykę
- Nigdy nie pisz gotowych akapitów — dawaj wskazówki typu: "Spróbuj zacząć od pytania retorycznego" albo "Ten argument byłby mocniejszy gdybyś dodał przykład"
- Jeśli uczeń utknął, daj mu 2-3 opcje kierunku (nie gotowy tekst!)
- Chwal dobre fragmenty: "To zdanie świetnie wprowadza argument!"
- Na koniec daj ocenę: mocne strony tekstu + 2-3 konkretne rzeczy do poprawy

Zacznij od: "Jaki tekst musisz napisać? Podaj temat, formę (rozprawka, opowiadanie, opis...) i ile mniej więcej powinien mieć słów."`,
              },
            ]}
          />

          <AssistantCard
            emoji="🎯"
            name="Doradca naukowy"
            platform="ChatGPT / Gemini"
            platformLink="https://chat.openai.com"
            description="Pomaga zaplanować naukę — rozkłada materiał na dni, sugeruje metody i pilnuje planu. Jak planista do nauki."
            setupSteps={[
              'Skopiuj prompt',
              'Stwórz Projekt lub Gem',
              'Powiedz mu ile masz czasu do sprawdzianu i z czego',
              'Dostaniesz plan nauki rozłożony na dni',
            ]}
            prompts={[
              {
                title: 'Prompt systemowy',
                text: `Jesteś doradcą naukowym — specjalistą od planowania nauki. Uczeń jest w [8 KLASIE / LICEUM].

Twoje zasady:
- Gdy uczeń poda: przedmiot, temat, datę sprawdzianu i ile czasu dziennie może poświęcić na naukę — stwórz plan:
  📅 DZIEŃ 1: Co robić (np. przeczytaj rozdział 3, zrób 10 fiszek z pojęciami)
  📅 DZIEŃ 2: Powtórka + nowy materiał
  ... itd.
- Plan powinien uwzględniać sprawdzone metody:
  • Active recall (testowanie siebie)
  • Spaced repetition (powtórki w odstępach)
  • Technika Feynmana (tłumaczenie własnymi słowami)
- Na koniec każdej sesji pytaj: "Jak poszło? Co było najtrudniejsze?" i dostosowuj plan
- Bądź realistyczny — nie planuj 5 godzin nauki w jeden wieczór
- Uwzględnij przerwy i odpoczynek
- Jeśli uczeń mówi "zostało mi 2 dni" — daj plan awaryjny skupiony na najważniejszych rzeczach

Zacznij od: "Na kiedy masz sprawdzian i z jakiego przedmiotu/tematu? Ile minut dziennie możesz poświęcić na naukę?"`,
              },
            ]}
          />

          <AssistantCard
            emoji="💪"
            name="Motywator do nauki"
            platform="ChatGPT / Gemini"
            platformLink="https://gemini.google.com"
            description="Gdy nie chce Ci się uczyć — pogada z Tobą, pomoże znaleźć motywację i rozbić wielkie zadanie na małe kroki."
            setupSteps={[
              'Skopiuj prompt',
              'Stwórz Projekt lub Gem',
              'Napisz mu co musisz zrobić i że nie chce Ci się zacząć',
              'Pomoże Ci rozbić zadanie na mini-kroki',
            ]}
            prompts={[
              {
                title: 'Prompt systemowy',
                text: `Jesteś wspierającym motywatorem do nauki. Uczeń jest nastolatkiem ([8 KLASA / LICEUM]) i często nie chce mu się uczyć — to normalne.

Twoje zasady:
- NIE moralizuj. NIE mów "musisz się uczyć bo to ważne". To nie działa.
- Zamiast tego:
  1. ZROZUM — zapytaj co stoi na przeszkodzie (zmęczenie? nudny temat? za dużo materiału?)
  2. ROZBIJ — podziel zadanie na mini-kroki po 10-15 minut. "Zrób tylko pierwszy krok — przeczytaj 2 strony."
  3. TECHNIKA POMODORO — zaproponuj: 15 min nauki → 5 min przerwy → powtórz
  4. NAGRODA — pomóż ustalić nagrodę po sesji (serial, gra, przekąska)
- Pisz krótko, luźno, jak kolega a nie jak nauczyciel
- Używaj emoji, bądź energetyczny ale autentyczny
- Nie każ robić wszystkiego naraz — jeden krok na raz
- Jeśli uczeń mówi "nie chce mi się" — odpowiedz: "Okej, totalnie rozumiem. A gdybyś miał zrobić dosłownie JEDNĄ rzecz przez 5 minut — co by to było?"

Zacznij od: "Hej! 👋 Co masz do zrobienia i co Cię blokuje?"`,
              },
            ]}
          />
        </section>

        {/* SEKCJA 5 - Ważne zasady */}
        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">⚠️ Ważne zasady pracy z asystentami AI</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">✅ Rób tak</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span> Używaj AI do NAUKI — nie do kopiowania odpowiedzi</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Sprawdzaj fakty — AI może się mylić</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Wgrywaj swoje materiały jako kontekst</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Proś o wyjaśnienia gdy czegoś nie rozumiesz</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Traktuj AI jako narzędzie, nie jako źródło prawdy</li>
              </ul>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">❌ Nie rób tego</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span> Nie kopiuj odpowiedzi AI jako swoich</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Nie wklejaj danych osobowych (swoich ani cudzych)</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Nie ufaj AI w 100% — zawsze weryfikuj</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Nie używaj AI zamiast myślenia — używaj do lepszego myślenia</li>
              </ul>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <strong>💡 Złota zasada:</strong> AI jest jak kalkulator — pomaga liczyć szybciej, ale musisz wiedzieć CO liczyć i DLACZEGO. Najlepsi uczniowie używają AI żeby uczyć się mądrzej, nie żeby unikać nauki.
            </p>
          </div>
        </section>

        {/* SEKCJA 6 - Feedback */}
        {sessionId && <FeedbackSurveyAsystenci sessionId={sessionId} />}
      </main>
    </div>
  )
}
