"use client"

import { useState } from "react"
import { Check, Copy, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/lib/i18n"
import type { Language } from "@/types"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shareUrl: string
  language: Language
}

export default function ShareDialog({ open, onOpenChange, shareUrl, language }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const t = useTranslations(language)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)

      toast({
        title: t.copied,
        description: t.shareDescription,
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
      toast({
        title: "복사 실패",
        description: "URL을 클립보드에 복사하지 못했습니다.",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "World Clock 공유",
          text: "내 World Clock 구성을 확인해보세요!",
          url: shareUrl,
        })

        toast({
          title: "공유됨",
          description: "World Clock 구성이 공유되었습니다.",
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err)
          toast({
            title: "공유 실패",
            description: "World Clock 구성을 공유하지 못했습니다.",
            variant: "destructive",
          })
        }
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.shareTitle}</DialogTitle>
          <DialogDescription>{t.shareDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="w-full"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <div className="text-xs text-muted-foreground">
              이 URL을 통해 다른 사람이 동일한 시계 구성을 볼 수 있습니다.
            </div>
          </div>
          <Button size="icon" onClick={handleCopy} className="shrink-0">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">{t.copyUrl}</span>
          </Button>
        </div>
        {navigator.share && (
          <Button onClick={handleShare} className="w-full mt-4 flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>기기에서 공유하기</span>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
