import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Loader2 } from "lucide-react";
import gteamLogo from "@/assets/gteam-logo.png";

const loadingMessages = [
  "Calculando valor energético da refeição",
  "Analisando macros",
  "Gerando relatório",
];

export function AnalysisLoading() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (currentMessageIndex < loadingMessages.length - 1) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
          setShowMessage(true);
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-background to-secondary flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-5 sm:space-y-6 md:space-y-8">
        {/* Logo */}
        <div className="flex justify-center animate-float">
          <img
            src={gteamLogo}
            alt="GTEAM Logo"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain"
          />
        </div>

        {/* Loading Card */}
        <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95">
          <CardContent className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
            {/* Spinner */}
            <div className="flex justify-center">
              <div className="relative">
                <Loader2 className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-primary animate-spin" />
                <div className="absolute inset-0 h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-primary/20 animate-ping" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                Analisando sua refeição
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2">
                Aguarde enquanto processamos sua imagem
              </p>
            </div>

            {/* Typing Animation Messages */}
            <div className="min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex items-center justify-center">
              <div
                className={`transition-opacity duration-300 ${
                  showMessage ? "opacity-100" : "opacity-0"
                }`}
              >
                {showMessage && (
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                      <TypingAnimation
                        text={loadingMessages[currentMessageIndex]}
                        duration={30}
                        className="text-sm sm:text-base md:text-lg font-medium text-foreground"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span>Progresso</span>
                <span>{Math.min(((currentMessageIndex + 1) / loadingMessages.length) * 100, 100).toFixed(0)}%</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.min(((currentMessageIndex + 1) / loadingMessages.length) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 sm:pt-4">
              {loadingMessages.map((message, index) => (
                <div
                  key={index}
                  className={`text-center p-2 sm:p-3 rounded-lg border transition-all duration-300 ${
                    index <= currentMessageIndex
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary/30 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-center mb-1.5 sm:mb-2">
                    {index < currentMessageIndex ? (
                      <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : index === currentMessageIndex ? (
                      <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-spin" />
                    ) : (
                      <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium line-clamp-2">{message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground animate-pulse">
            Isso pode levar alguns segundos...
          </p>
        </div>
      </div>
    </div>
  );
}
