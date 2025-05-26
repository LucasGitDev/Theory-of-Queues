"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { MMSResults } from "./mms-results";

export type MMSResultsType = {
  lambda: number;
  mu: number;
  s: number;
  rho: number;
  P0: number;
  Lq: number;
  L: number;
  Wq: number;
  W: number;
};

export function MMSCalculator() {
  const [lambda, setLambda] = useState<string>("");
  const [mu, setMu] = useState<string>("");
  const [s, setS] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MMSResultsType | null>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambda);
    const muValue = Number.parseFloat(mu);
    const sValue = Number.parseInt(s);

    if (isNaN(lambdaValue) || isNaN(muValue) || isNaN(sValue)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambdaValue <= 0 || muValue <= 0 || sValue <= 0) {
      setError("Os valores de λ, μ e s devem ser maiores que zero.");
      return;
    }

    if (sValue !== Math.floor(sValue)) {
      setError("O número de servidores (s) deve ser um número inteiro.");
      return;
    }

    const rho = lambdaValue / (sValue * muValue);

    if (rho >= 1) {
      setError(
        "A taxa de chegada (λ) deve ser menor que s*μ para que o sistema seja estável."
      );
      return;
    }

    // Cálculo de P0 (probabilidade de sistema vazio)
    let sum = 0;
    for (let k = 0; k < sValue; k++) {
      sum += Math.pow(lambdaValue / muValue, k) / factorial(k);
    }
    sum +=
      (Math.pow(lambdaValue / muValue, sValue) / factorial(sValue)) *
      (1 / (1 - rho));
    const P0 = 1 / sum;

    // Cálculo de Lq (número médio na fila)
    const Lq =
      (P0 * Math.pow(lambdaValue / muValue, sValue) * rho) /
      (factorial(sValue) * Math.pow(1 - rho, 2));

    // Outros indicadores
    const L = Lq + lambdaValue / muValue;
    const Wq = Lq / lambdaValue;
    const W = Wq + 1 / muValue;

    setResults({
      lambda: lambdaValue,
      mu: muValue,
      s: sValue,
      rho,
      P0,
      Lq,
      L,
      Wq,
      W,
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
              Parâmetros do Modelo M/M/s
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
                  Taxa de chegada (λ)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (clientes/unidade de tempo)
                  </span>
                </Label>
                <Input
                  id="lambda"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 10"
                  value={lambda}
                  onChange={(e) => setLambda(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mu">
                  Taxa de serviço por servidor (μ)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (clientes/unidade de tempo)
                  </span>
                </Label>
                <Input
                  id="mu"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 4"
                  value={mu}
                  onChange={(e) => setMu(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="c">
                  Número de servidores (s)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor inteiro)
                  </span>
                </Label>
                <Input
                  id="c"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="Ex: 3"
                  value={s}
                  onChange={(e) => setS(e.target.value)}
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
            <MMSResults results={results} />
          </div>
        ) : (
          <Card className="bg-slate-50 dark:bg-slate-800/50 border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <h3 className="text-lg font-medium mb-2">Resultados</h3>
              <p className="text-muted-foreground">
                Insira os parâmetros e clique em &quot;Calcular&quot; para ver
                os resultados.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
