"use client";

import { MMSNResults } from "@/components/queues/mmsn/mmsn-results";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export type MMSNResultsType = {
  lambda: number;
  mu: number;
  s: number;
  n: number;
  a: number;       // Razão lambda/mu
  P0: number;      // Probabilidade do sistema estar vazio
  lambdaEff: number; // Taxa efetiva de chegada
  L: number;       // Número médio no sistema
  Lq: number;      // Número médio na fila
  W: number;       // Tempo médio no sistema
  Wq: number;      // Tempo médio na fila
  Pn: number[];    // Probabilidades de estado
  operationalRobots: number; // Número médio de robôs operacionais (N - L)
  idleTechnicians: number;
};

export function MMSNCalculator() {
  const [lambda, setLambda] = useState<string>("");
  const [mu, setMu] = useState<string>("");
  const [s, setS] = useState<string>("");
  const [n, setN] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MMSNResultsType | null>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambda);
    const muValue = Number.parseFloat(mu);
    const sValue = Number.parseInt(s);
    const NValue = Number.parseInt(n);

    if (isNaN(lambdaValue) || isNaN(muValue) || isNaN(sValue) || isNaN(NValue)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambdaValue <= 0 || muValue <= 0 || sValue <= 0 || NValue <= 0) {
      setError("Todos os valores devem ser maiores que zero.");
      return;
    }

    if (sValue !== Math.floor(sValue) || NValue !== Math.floor(NValue)) {
      setError("O número de servidores (s) e o tamanho da população (N) devem ser números inteiros.");
      return;
    }

    const a = lambdaValue / muValue;

    // Cálculo de P0 (probabilidade de sistema vazio)
    let sum1 = 0;
    for (let n = 0; n <= sValue - 1; n++) {
      sum1 += (factorial(NValue) / (factorial(NValue - n) * factorial(n))) * Math.pow(a, n);
    }

    let sum2 = 0;
    for (let n = sValue; n <= NValue; n++) {
      sum2 += (factorial(NValue) / (factorial(NValue - n) * factorial(sValue) * Math.pow(sValue, n - sValue))) * Math.pow(a, n);
    }

    const P0 = 1 / (sum1 + sum2);

    // Cálculo das probabilidades Pn
    const Pn = [];
    for (let n = 0; n <= NValue; n++) {
      if (n <= sValue) {
        Pn[n] = (factorial(NValue) / (factorial(NValue - n) * factorial(n))) * Math.pow(a, n) * P0;
      } else {
        Pn[n] = (factorial(NValue) / (factorial(NValue - n) * factorial(sValue) * Math.pow(sValue, n - sValue))) * Math.pow(a, n) * P0;
      }
    }

    // Número médio de clientes no sistema (L)
    let L = 0;
    for (let n = 1; n <= NValue; n++) {
      L += n * Pn[n];
    }

    // Taxa efetiva de chegada (depende de quantos clientes estão fora do sistema)
    const lambdaEff = lambdaValue * (NValue - L);

    // Número médio de clientes na fila (Lq)
    const Lq = L - (lambdaEff / muValue);

    // Tempo médio no sistema (W)
    const W = L / lambdaEff;

    // Tempo médio na fila (Wq)
    const Wq = Lq / lambdaEff;


    // Número médio de robôs operacionais
    const operationalRobots = NValue - L;


    const idleTechnicians = 1 - (lambdaEff / sValue)

    setResults({
      lambda: lambdaValue,
      mu: muValue,
      s: sValue,
      n: NValue,
      a,
      P0,
      lambdaEff,
      L,
      Lq,
      W,
      Wq,
      Pn,
      operationalRobots,
      idleTechnicians
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
              Parâmetros do Modelo M/M/s/N/N
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
                  Taxa de chegada por máquina operante (λ)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (clientes/unidade de tempo)
                  </span>
                </Label>
                <Input
                  id="lambda"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 0.1"
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
                <Label htmlFor="s">
                  Número de servidores (s)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor inteiro)
                  </span>
                </Label>
                <Input
                  id="s"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="Ex: 2"
                  value={s}
                  onChange={(e) => setS(e.target.value)}
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
            <MMSNResults results={results} />
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