export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Created by:{" "}
            <a
              href="https://x.com/thisnotmeeme"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-orange-600 transition-colors duration-200 hover:underline"
            >
              Yhontan Peguero
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
