import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { ChevronDown, ChevronUp } from 'lucide-react'

// Angielski
import angielskiInstructions from './angielski/system_message.md?raw'
import angielskiScope from './angielski/knowledge_scope.md?raw'
import angielskiMistakes from './angielski/usual_mistakes.md?raw'

// Historia
import historiaInstructions from './historia/system_instruction.md?raw'
import historiaScope from './historia/knowledge_scope.md?raw'

// Matematyka
import matematykaInstructions from './matematyka/system_instruction.md?raw'
import matematykaScope from './matematyka/knowledge_scope.md?raw'

// Ziomek do nauki
import ziomekInstructions from './ziomek_do_nauki/system_instruction.md?raw'

interface FileDisplayProps {
  title: string
  content: string
}

function FileDisplay({ title, content }: FileDisplayProps) {
  const [expanded, setExpanded] = useState(false)
  const preview = content.slice(0, 300)

  return (
    <div className="bg-muted rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <CopyButton text={content} />
      </div>
      <div className="font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words max-h-60 overflow-y-auto">
        {expanded ? content : preview + (content.length > 300 ? '…' : '')}
      </div>
      {content.length > 300 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          {expanded ? (
            <>Zwiń <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Pokaż cały plik <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  )
}

interface KnowledgeFile {
  title: string
  content: string
}

interface AssistantData {
  emoji: string
  gemName: string
  gemDescription: string
  description: string
  instructions: string
  toolNote: string
  knowledgeFiles?: KnowledgeFile[]
  extraKnowledgeFiles?: KnowledgeFile[]
}

function CollapsibleAssistant({ data }: { data: AssistantData }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-all"
      >
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            {data.emoji} {data.gemName}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-border pt-4">
          {/* Imię */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">1. Imię</h4>
            <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">{data.gemName}</span>
              <CopyButton text={data.gemName} />
            </div>
          </div>

          {/* Opis */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">2. Opis</h4>
            <div className="bg-muted rounded-lg p-4 flex items-center justify-between gap-4">
              <span className="font-mono text-sm text-foreground">{data.gemDescription}</span>
              <CopyButton text={data.gemDescription} />
            </div>
          </div>

          {/* Instrukcje */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">3. Instrukcje</h4>
            <p className="text-xs text-muted-foreground">Skopiuj i wklej w pole instrukcji przy tworzeniu Gema.</p>
            <FileDisplay title="Instrukcje systemowe" content={data.instructions} />
          </div>

          {/* Domyślne narzędzia */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">4. Domyślne narzędzia</h4>
            <div className="bg-muted/40 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-lg p-3">
                <span className="text-lg">📚</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Tryb nauki</p>
                  <p className="text-xs text-muted-foreground">{data.toolNote}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Pozostałe narzędzia (obrazy, muzyka itp.) możesz wyłączyć.</p>
            </div>
          </div>

          {/* Źródła wiedzy */}
          {data.knowledgeFiles && data.knowledgeFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">5. Źródła wiedzy</h4>
              <p className="text-xs text-muted-foreground">Skopiuj zawartość i wklej jako plik w sekcji źródeł wiedzy Gema, lub zapisz jako .md i wgraj.</p>
              {data.knowledgeFiles.map((f, i) => (
                <FileDisplay key={i} title={f.title} content={f.content} />
              ))}
            </div>
          )}

          {/* Dodatkowe źródła wiedzy */}
          {data.extraKnowledgeFiles && data.extraKnowledgeFiles.length > 0 && (
            <div className="space-y-3 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">Dodatkowe źródła wiedzy</h4>
              <p className="text-xs text-muted-foreground">Opcjonalne pliki, które wzbogacą wiedzę asystenta. Wgraj je tak samo jak główne źródła wiedzy.</p>
              {data.extraKnowledgeFiles.map((f, i) => (
                <FileDisplay key={i} title={f.title} content={f.content} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const assistants: AssistantData[] = [
  {
    emoji: '🇬🇧',
    gemName: 'Tom — Nauczyciel angielskiego',
    gemDescription: 'Cierpliwy korepetytor angielskiego dla ucznia 8. klasy. Prowadzi rozmowy po angielsku, delikatnie poprawia błędy i dostosowuje poziom do ucznia.',
    description: 'Cierpliwy nauczyciel, który prowadzi konwersacje po angielsku, delikatnie koryguje błędy i dostosowuje się do poziomu ucznia 8. klasy.',
    instructions: angielskiInstructions,
    toolNote: 'Gemini prowadzi rozmowę w stylu nauczyciela — zadaje pytania, czeka na odpowiedź ucznia i dostosowuje poziom.',
    extraKnowledgeFiles: [
      { title: 'Zakres materiału', content: angielskiScope },
      { title: 'Typowe błędy polskich uczniów', content: angielskiMistakes },
    ],
  },
  {
    emoji: '📜',
    gemName: 'Hania — Nauczycielka historii',
    gemDescription: 'Entuzjastyczna nauczycielka historii, która opowiada o wydarzeniach jak o fascynującej historii detektywistycznej. Buduje ciekawość, nie testuje wiedzę.',
    description: 'Opowiada historię jak detektywistykę — buduje narrację przyczynowo-skutkową, zadaje pytania „dlaczego?" i łączy przeszłość z teraźniejszością.',
    instructions: historiaInstructions,
    toolNote: 'Gemini prowadzi rozmowę o historii — opowiada, zadaje pytania przyczynowo-skutkowe i buduje ciekawość ucznia.',
    knowledgeFiles: [
      { title: 'Zakres materiału — historia', content: historiaScope },
    ],
  },
  {
    emoji: '📐',
    gemName: 'Ada — Nauczycielka matematyki',
    gemDescription: 'Cierpliwa nauczycielka matematyki, która nigdy nie daje gotowych odpowiedzi. Naprowadza ucznia krok po kroku do samodzielnego rozwiązania.',
    description: 'Nie daje gotowych odpowiedzi — naprowadza krok po kroku pytaniami. Używa analogii ze świata realnego i tłumaczy dlaczego, nie tylko jak.',
    instructions: matematykaInstructions,
    toolNote: 'Gemini naprowadza ucznia na rozwiązanie pytaniami — nie podaje gotowych odpowiedzi, prowadzi krok po kroku.',
    knowledgeFiles: [
      { title: 'Zakres materiału — matematyka', content: matematykaScope },
    ],
  },
  {
    emoji: '🧠',
    gemName: 'Kuba — Kompan do nauki',
    gemDescription: 'Kompan do nauki, który pomaga przetwarzać wiedzę z każdego przedmiotu. Zadaje pytania, wyciąga luki i uczy samodzielnego myślenia.',
    description: 'Nie uczy treści — pomaga je przetwarzać. Prosi o wyjaśnienie własnymi słowami, identyfikuje luki w wiedzy i naprowadza pytaniami.',
    instructions: ziomekInstructions,
    toolNote: 'Gemini pełni rolę kompana do nauki — zadaje pytania pogłębiające, pomaga uczniowi przetwarzać wiedzę samodzielnie.',
  },
]

export function SubjectAssistants() {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-xl font-bold text-foreground">🎓 Asystenci do przedmiotów</h2>
      <p className="text-sm text-muted-foreground">Kliknij asystenta, żeby zobaczyć wszystkie pola potrzebne do stworzenia Gema w Gemini.</p>

      {assistants.map((a, i) => (
        <CollapsibleAssistant key={i} data={a} />
      ))}
    </section>
  )
}
