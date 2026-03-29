import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'

interface Prompt {
  title: string
  text: string
}

interface Props {
  emoji: string
  name: string
  platform: string
  platformLink: string
  description: string
  setupSteps: string[]
  prompts: Prompt[]
}

export function AssistantCard({ emoji, name, platform, platformLink, description, setupSteps, prompts }: Props) {
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
          <p className="text-xs text-muted-foreground mt-0.5">{platform}</p>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-border pt-4">
          <a
            href={platformLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Otwórz {platform} <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Jak skonfigurować?</p>
            <ol className="space-y-1.5">
              {setupSteps.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="font-bold text-primary">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold text-foreground">Prompt do skopiowania</p>
            {prompts.map((p, i) => (
              <div key={i} className="space-y-2">
                <p className="text-sm font-medium text-foreground">{p.title}</p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {p.text}
                </div>
                <div className="flex items-center justify-between">
                  <CopyButton text={p.text} />
                  <span className="text-xs text-muted-foreground">Podmień [NAWIASY].</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
