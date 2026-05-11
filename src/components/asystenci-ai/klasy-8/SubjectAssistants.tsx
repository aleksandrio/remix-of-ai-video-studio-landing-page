import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useT, useLang } from '@/lib/i18n'

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
  const t = useT({ pl: { collapse: 'Zwiń', showAll: 'Pokaż cały plik' }, en: { collapse: 'Collapse', showAll: 'Show full file' } })

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
            <>{t.collapse} <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>{t.showAll} <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  )
}

interface KnowledgeFile {
  title: { pl: string; en: string }
  content: string
}

interface AssistantData {
  emoji: string
  gemName: { pl: string; en: string }
  gemDescription: { pl: string; en: string }
  description: { pl: string; en: string }
  instructions: string
  toolNote: { pl: string; en: string }
  knowledgeFiles?: KnowledgeFile[]
  extraKnowledgeFiles?: KnowledgeFile[]
}

function CollapsibleAssistant({ data }: { data: AssistantData }) {
  const [open, setOpen] = useState(false)
  const t = useT({
    pl: {
      h1: '1. Imię', h2: '2. Opis', h3: '3. Instrukcje', h4: '4. Domyślne narzędzia', h5: '5. Źródła wiedzy', extra: 'Dodatkowe źródła wiedzy',
      sysFile: 'Instrukcje systemowe',
      noteInstr: 'Skopiuj i wklej w pole instrukcji przy tworzeniu Gema.',
      studyMode: 'Tryb nauki',
      noteSources: 'Skopiuj zawartość i wklej jako plik w sekcji źródeł wiedzy Gema, lub zapisz jako .md i wgraj.',
      noteExtra: 'Opcjonalne pliki, które wzbogacą wiedzę asystenta. Wgraj je tak samo jak główne źródła wiedzy.',
    },
    en: {
      h1: '1. Name', h2: '2. Description', h3: '3. Instructions', h4: '4. Default tools', h5: '5. Knowledge sources', extra: 'Additional knowledge sources',
      sysFile: 'System instructions',
      noteInstr: 'Copy and paste into the instructions field when creating the Gem.',
      studyMode: 'Study mode',
      noteSources: 'Copy the content and paste as a file into the Gem\'s knowledge sources, or save as .md and upload.',
      noteExtra: 'Optional files that will enrich the assistant\'s knowledge. Upload them the same way as the main sources.',
    },
  })
  const name = useT(data.gemName)
  const desc = useT(data.gemDescription)
  const shortDesc = useT(data.description)
  const note = useT(data.toolNote)
  const { lang } = useLang()

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-all"
      >
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            {data.emoji} {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{shortDesc}</p>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-border pt-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">{t.h1}</h4>
            <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">{name.split(' — ')[0]}</span>
              <CopyButton text={name.split(' — ')[0]} />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">{t.h2}</h4>
            <div className="bg-muted rounded-lg p-4 flex items-center justify-between gap-4">
              <span className="font-mono text-sm text-foreground">{desc}</span>
              <CopyButton text={desc} />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">{t.h3}</h4>
            <p className="text-xs text-muted-foreground">{t.noteInstr}</p>
            <FileDisplay title={t.sysFile} content={data.instructions} />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">{t.h4}</h4>
            <div className="bg-muted/40 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-lg p-3">
                <span className="text-lg">📚</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.studyMode}</p>
                  <p className="text-xs text-muted-foreground">{note}</p>
                </div>
              </div>
            </div>
          </div>

          {data.knowledgeFiles && data.knowledgeFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">{t.h5}</h4>
              <p className="text-xs text-muted-foreground">{t.noteSources}</p>
              {data.knowledgeFiles.map((f, i) => (
                <FileDisplay key={i} title={f.title[lang]} content={f.content} />
              ))}
            </div>
          )}

          {data.extraKnowledgeFiles && data.extraKnowledgeFiles.length > 0 && (
            <div className="space-y-3 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">{t.extra}</h4>
              <p className="text-xs text-muted-foreground">{t.noteExtra}</p>
              {data.extraKnowledgeFiles.map((f, i) => (
                <FileDisplay key={i} title={f.title[lang]} content={f.content} />
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
    gemName: { pl: 'Tom — Nauczyciel angielskiego', en: 'Tom — English teacher' },
    gemDescription: {
      pl: 'Cierpliwy korepetytor angielskiego dla ucznia 8. klasy. Prowadzi rozmowy po angielsku, delikatnie poprawia błędy i dostosowuje poziom do ucznia.',
      en: 'Patient English tutor for an 8th-grade student. Holds conversations in English, gently corrects mistakes and adapts the level to the student.',
    },
    description: {
      pl: 'Cierpliwy nauczyciel, który prowadzi konwersacje po angielsku, delikatnie koryguje błędy i dostosowuje się do poziomu ucznia 8. klasy.',
      en: 'Patient teacher who runs English conversations, gently corrects mistakes and adapts to an 8th-grader\'s level.',
    },
    instructions: angielskiInstructions,
    toolNote: {
      pl: 'Gemini prowadzi rozmowę w stylu nauczyciela — zadaje pytania, czeka na odpowiedź ucznia i dostosowuje poziom.',
      en: 'Gemini leads the conversation like a teacher — asks questions, waits for the student\'s answer and adapts the level.',
    },
    extraKnowledgeFiles: [
      { title: { pl: 'Zakres materiału', en: 'Material scope' }, content: angielskiScope },
      { title: { pl: 'Typowe błędy polskich uczniów', en: 'Common mistakes of Polish students' }, content: angielskiMistakes },
    ],
  },
  {
    emoji: '📜',
    gemName: { pl: 'Hania — Nauczycielka historii', en: 'Hania — History teacher' },
    gemDescription: {
      pl: 'Entuzjastyczna nauczycielka historii, która opowiada o wydarzeniach jak o fascynującej historii detektywistycznej. Buduje ciekawość, nie testuje wiedzę.',
      en: 'Enthusiastic history teacher who tells about events like a fascinating detective story. Builds curiosity rather than testing knowledge.',
    },
    description: {
      pl: 'Opowiada historię jak detektywistykę — buduje narrację przyczynowo-skutkową, zadaje pytania „dlaczego?" i łączy przeszłość z teraźniejszością.',
      en: 'Tells history like a detective story — builds cause-and-effect narrative, asks "why?" and links the past with the present.',
    },
    instructions: historiaInstructions,
    toolNote: {
      pl: 'Gemini prowadzi rozmowę o historii — opowiada, zadaje pytania przyczynowo-skutkowe i buduje ciekawość ucznia.',
      en: 'Gemini holds a conversation about history — narrates, asks cause-and-effect questions and builds the student\'s curiosity.',
    },
    knowledgeFiles: [
      { title: { pl: 'Zakres materiału — historia', en: 'Material scope — history' }, content: historiaScope },
    ],
  },
  {
    emoji: '📐',
    gemName: { pl: 'Ada — Nauczycielka matematyki', en: 'Ada — Math teacher' },
    gemDescription: {
      pl: 'Cierpliwa nauczycielka matematyki, która nigdy nie daje gotowych odpowiedzi. Naprowadza ucznia krok po kroku do samodzielnego rozwiązania.',
      en: 'Patient math teacher who never gives ready-made answers. Guides the student step by step toward solving the problem themselves.',
    },
    description: {
      pl: 'Nie daje gotowych odpowiedzi — naprowadza krok po kroku pytaniami. Używa analogii ze świata realnego i tłumaczy dlaczego, nie tylko jak.',
      en: 'Doesn\'t give ready answers — guides step by step with questions. Uses real-world analogies and explains why, not just how.',
    },
    instructions: matematykaInstructions,
    toolNote: {
      pl: 'Gemini naprowadza ucznia na rozwiązanie pytaniami — nie podaje gotowych odpowiedzi, prowadzi krok po kroku.',
      en: 'Gemini guides the student toward the solution with questions — never gives ready answers, walks through step by step.',
    },
    knowledgeFiles: [
      { title: { pl: 'Zakres materiału — matematyka', en: 'Material scope — math' }, content: matematykaScope },
    ],
  },
  {
    emoji: '🧠',
    gemName: { pl: 'Kuba — Kompan do nauki', en: 'Kuba — Study buddy' },
    gemDescription: {
      pl: 'Kompan do nauki, który pomaga przetwarzać wiedzę z każdego przedmiotu. Zadaje pytania, wyciąga luki i uczy samodzielnego myślenia.',
      en: 'A study companion who helps process knowledge from any subject. Asks questions, surfaces gaps and teaches independent thinking.',
    },
    description: {
      pl: 'Nie uczy treści — pomaga je przetwarzać. Prosi o wyjaśnienie własnymi słowami, identyfikuje luki w wiedzy i naprowadza pytaniami.',
      en: 'Doesn\'t teach content — helps process it. Asks you to explain in your own words, spots knowledge gaps and guides you with questions.',
    },
    instructions: ziomekInstructions,
    toolNote: {
      pl: 'Gemini pełni rolę kompana do nauki — zadaje pytania pogłębiające, pomaga uczniowi przetwarzać wiedzę samodzielnie.',
      en: 'Gemini acts as a study buddy — asks deepening questions and helps the student process knowledge on their own.',
    },
  },
]

export function SubjectAssistants() {
  const t = useT({
    pl: { title: '🎓 Asystenci do przedmiotów', desc: 'Kliknij asystenta, żeby zobaczyć wszystkie pola potrzebne do stworzenia Gema w Gemini.' },
    en: { title: '🎓 Subject assistants', desc: 'Click an assistant to see all fields needed to create a Gem in Gemini.' },
  })
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-xl font-bold text-foreground">{t.title}</h2>
      <p className="text-sm text-muted-foreground">{t.desc}</p>

      {assistants.map((a, i) => (
        <CollapsibleAssistant key={i} data={a} />
      ))}
    </section>
  )
}
