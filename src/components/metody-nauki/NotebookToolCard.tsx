import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  emoji: string
  title: string
  description: string
  details: React.ReactNode
}

export function NotebookToolCard({ emoji, title, description, details }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-all"
      >
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            {emoji} {title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-border pt-4 text-sm text-foreground leading-relaxed">
          {details}
        </div>
      )}
    </div>
  )
}
