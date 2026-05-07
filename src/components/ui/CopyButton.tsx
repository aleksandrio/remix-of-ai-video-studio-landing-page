import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useT } from '@/lib/i18n'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const t = useT({ pl: { copied: 'Skopiowano!', copy: 'Kopiuj' }, en: { copied: 'Copied!', copy: 'Copy' } })
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
      {copied ? t.copied : t.copy}
    </button>
  )
}

