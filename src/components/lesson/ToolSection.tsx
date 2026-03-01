import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

interface Prompt {
  title: string
  text: string
}

interface ToolProps {
  emoji: string
  name: string
  description: string
  whenToUse: string[]
  prompts: Prompt[]
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Skopiowano!' : 'Kopiuj'}
    </button>
  )
}

function PromptBlock({ prompt }: { prompt: Prompt }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{prompt.title}</p>
      <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
        {prompt.text}
      </div>
      <div className="flex items-center justify-between">
        <CopyButton text={prompt.text} />
        <span className="text-xs text-muted-foreground">Podmień [NAWIASY].</span>
      </div>
    </div>
  )
}

export function ToolSection({ emoji, name, description, whenToUse, prompts }: ToolProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-all"
      >
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            {emoji} {name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-border pt-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Kiedy używać?</p>
            <ul className="space-y-1">
              {whenToUse.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold text-foreground">Prompty do skopiowania</p>
            {prompts.map((p, i) => (
              <PromptBlock key={i} prompt={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
