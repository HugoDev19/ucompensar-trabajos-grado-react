import { Button } from './Button'

interface AlertBannerProps {
  message: string
  onAction?: () => void
  actionLabel?: string
}

export function AlertBanner({ message, onAction, actionLabel = 'Revisar' }: AlertBannerProps) {
  return (
    <div className="flex items-center gap-3 bg-primary-soft border border-primary/20 rounded-lg px-3 py-2.5 mb-4">
      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
      <span className="text-[11px] text-primary flex-1">{message}</span>
      {onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="border-primary text-primary hover:bg-primary-soft"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
