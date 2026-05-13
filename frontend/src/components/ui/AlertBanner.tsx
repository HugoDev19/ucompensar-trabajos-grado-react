import { Button } from './Button'

interface AlertBannerProps {
  message: string
  onAction?: () => void
  actionLabel?: string
}

export function AlertBanner({ message, onAction, actionLabel = 'Revisar' }: AlertBannerProps) {
  return (
    <div className="flex items-center gap-3 bg-brand-orange-light border border-[#F5B897] rounded-lg px-3 py-2.5 mb-4">
      <div className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" />
      <span className="text-[11px] text-[#7A3000] flex-1">{message}</span>
      {onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="border-brand-orange text-brand-orange hover:bg-brand-orange-light"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
