import { createContext, useCallback, useContext, useState, PropsWithChildren } from 'react'
import { Toast } from '../components/ui/Toast'

type ToastMessage = { id: number; text: string; type?: 'success' | 'error'; durationMs?: number }

type ToastContextValue = {
  show: (text: string, opts?: { type?: 'success' | 'error'; durationMs?: number }) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<ToastMessage[]>([])
  const show = useCallback((text: string, opts?: { type?: 'success' | 'error'; durationMs?: number }) => {
    const msg: ToastMessage = { id: Date.now(), text, type: opts?.type, durationMs: opts?.durationMs }
    setMessages(prev => [...prev, msg])
    setTimeout(() => setMessages(prev => prev.filter(m => m.id !== msg.id)), msg.durationMs ?? 2500)
  }, [])
  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div aria-live="polite" aria-atomic="true">
        {messages.map(m => (
          <Toast key={m.id} message={m.text} type={m.type} durationMs={m.durationMs} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}


