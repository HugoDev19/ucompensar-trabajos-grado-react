import { useState, useEffect } from 'react'
import { AUTH_STEPS, C } from '@/constants'

interface AuthOverlayProps {
  onDone: () => void
}

export function AuthOverlay({ onDone }: AuthOverlayProps) {
  const [stepsDone, setStepsDone] = useState<number[]>([])

  useEffect(() => {
    AUTH_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setStepsDone(prev => [...prev, i])
        if (i === AUTH_STEPS.length - 1) setTimeout(onDone, 500)
      }, i * 650)
    })
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(255,255,255,0.97)' }}
    >
      {/* Spinner */}
      <div
        className="w-11 h-11 rounded-full mb-4 animate-spin"
        style={{ border: `3px solid ${C.orangeL}`, borderTopColor: C.orange }}
      />

      <p className="text-sm font-bold text-zinc-900 mb-1">Autenticando con Microsoft…</p>
      <p className="text-xs text-zinc-500 mb-5">Conectando con Azure AD UCompensar</p>

      {/* Steps */}
      <div className="flex flex-col gap-1.5 w-64">
        {AUTH_STEPS.map((step, i) => (
          <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-500">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold transition-all duration-300"
              style={{
                background:  stepsDone.includes(i) ? C.greenL  : '#f4f4f5',
                border:      `1px solid ${stepsDone.includes(i) ? C.green : '#e4e4e7'}`,
                color:       stepsDone.includes(i) ? C.green   : '#a1a1aa',
              }}
            >
              {stepsDone.includes(i) ? '✓' : '·'}
            </div>
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}
