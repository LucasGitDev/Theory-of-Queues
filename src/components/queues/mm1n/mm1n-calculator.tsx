"use client";

import { MM1NResults } from "@/components/queues/mm1n/mm1n-results";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export function MM1NCalculator() {
  const [lambda, setLambda] = useState<string>("");
  const [mu, setMu] = useState<string>("");
  const [n, setN] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambda);
    const muValue = Number.parseFloat(mu);
    const nValue = Number.parseInt(n);

    if (isNaN(lambdaValue) || isNaN(muValue) || isNaN(nValue)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambdaValue <= 0 || muValue <= 0 || nValue <= 0) {
      setError("Os valores de λ, μ e N devem ser maiores que zero.");
      return;
    }

    if (nValue !== Math.floor(nValue)) {
      setError("O tamanho da população (N) deve ser um número inteiro.");
      return;
    }

    const rho = lambdaValue / muValue;

    // Cálculo de P0 (probabilidade de sistema vazio)
    let sum = 0;
    for (let k = 0; k <= nValue; k++) {
      sum += (factorial(nValue) / factorial(nValue - k)) * Math.pow(rho, k);
    }
    const P0 = 1 / sum;

    // Cálculo das probabilidades Pn
    const Pn = [];
    for (let k = 0; k <= nValue; k++) {
      Pn[k] =
        (factorial(nValue) / factorial(nValue - k)) * Math.pow(rho, k) * P0;
    }

    // Número médio de clientes no sistema (L)
    let L = 0;
    for (let k = 1; k <= nValue; k++) {
      L += k * Pn[k];
    }

    // Número médio de clientes na fila (Lq)
    const Lq = L - (1 - P0);

    // Número médio de clientes fora do sistema
    const M = nValue - L;

    // Taxa efetiva de chegada
    const lambdaEff = lambdaValue * M;

    // Tempo médio no sistema (W)
    const W = L / lambdaEff;

    // Tempo médio na fila (Wq)
    const Wq = Lq / lambdaEff;

    setResults({
      lambda: lambdaValue,
      mu: muValue,
      n: nValue,
      rho,
      P0,
      L,
      Lq,
      M,
      lambdaEff,
      W,
      Wq,
      Pn,
    });

    setError(null);
  };

  // Função para calcular fatorial
  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Parâmetros do Modelo M/M/1/N (População Finita)
            </h3>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="lambda">
                  Taxa de chegada por cliente inativo (λ)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (clientes/unidade de tempo)
                  </span>
                </Label>
                <Input
                  id="lambda"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 0.5"
                  value={lambda}
                  onChange={(e) => setLambda(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mu">
                  Taxa de serviço (μ)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (clientes/unidade de tempo)
                  </span>
                </Label>
                <Input
                  id="mu"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 5"
                  value={mu}
                  onChange={(e) => setMu(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="n">
                  Tamanho da população (N)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor inteiro)
                  </span>
                </Label>
                <Input
                  id="n"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="Ex: 10"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                />
              </div>

              <Button onClick={calculateResults} className="w-full mt-2">
                Calcular
              </Button>
            </div>
          </CardContent>
        </Card>

        {results ? (
          <div className="md:row-span-2">
            <MM1NResults results={results} />
          </div>
        ) : (
          <Card className="bg-slate-50 dark:bg-slate-800/50 border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <h3 className="text-lg font-medium mb-2">Resultados</h3>
              <p className="text-muted-foreground">
                Insira os parâmetros e clique em "Calcular" para ver os
                resultados.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
