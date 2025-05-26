"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface FormulaDisplayProps {
  formula: string;
  calculationSteps: string[];
  explanation?: string;
  className?: string;
}

declare global {
  interface Window {
    MathJax: {
      typeset: (elements: HTMLElement[]) => void;
      startup: {
        ready: () => Promise<void>;
        typeset: boolean;
      };
      tex: {
        inlineMath: string[][];
        displayMath: string[][];
      };
      svg: {
        fontCache: string;
      };
    };
  }
}

export function FormulaDisplay({
  formula,
  calculationSteps,
  explanation,
  className,
}: FormulaDisplayProps) {
  const formulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMathJax = async () => {
      if (!window.MathJax) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
        script.async = true;

        await new Promise<void>((resolve, reject) => {
          script.onload = () => {
            // Configurar o MathJax
            window.MathJax = {
              tex: {
                inlineMath: [["$", "$"]],
                displayMath: [["$$", "$$"]],
              },
              svg: {
                fontCache: "global",
              },
              startup: {
                typeset: false,
              },
            } as Window["MathJax"];

            // Aguardar a inicialização completa do MathJax
            const checkMathJax = setInterval(() => {
              if (
                window.MathJax &&
                typeof window.MathJax.typeset === "function"
              ) {
                clearInterval(checkMathJax);
                resolve();
              }
            }, 100);

            // Timeout após 5 segundos
            setTimeout(() => {
              clearInterval(checkMathJax);
              reject(new Error("MathJax initialization timeout"));
            }, 5000);
          };

          script.onerror = (event: Event | string) => {
            console.error("Error loading MathJax:", event);
            reject(new Error("Failed to load MathJax"));
          };

          document.head.appendChild(script);
        });
      }

      // Renderizar as fórmulas após o MathJax estar carregado
      if (formulaRef.current) {
        try {
          window.MathJax.typeset([formulaRef.current]);
        } catch (err) {
          console.error("MathJax typeset error:", err);
        }
      }
    };

    loadMathJax();

    // Re-render MathJax when formula or steps change
    const timer = setTimeout(() => {
      if (window.MathJax && formulaRef.current) {
        try {
          window.MathJax.typeset([formulaRef.current]);
        } catch (err) {
          console.error("MathJax typeset error:", err);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [formula, calculationSteps]);

  return (
    <div ref={formulaRef} className={cn("space-y-3", className)}>
      <div className="my-3 text-center">{"$$" + formula + "$$"}</div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Passos do cálculo:</h4>
        {calculationSteps.map((step, index) => (
          <div key={index} className="text-center my-2">
            {"$$" + step + "$$"}
          </div>
        ))}
      </div>

      {explanation && (
        <div className="mt-3 text-sm text-muted-foreground">
          <h4 className="text-sm font-medium text-foreground">Explicação:</h4>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
