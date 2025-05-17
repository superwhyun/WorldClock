import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            <p>Made with ❤️ by superwhyun</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/superwhyun/WorldClock"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>© 2024 World Clock. 전 세계의 시간을 한눈에.</p>
        </div>
      </div>
    </footer>
  )
}