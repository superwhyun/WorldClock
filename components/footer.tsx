import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-center">
          <a
            href="https://github.com/superwhyun/WorldClock"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="h-6 w-6" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}