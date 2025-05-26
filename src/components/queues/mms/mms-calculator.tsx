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
  /**
   * @property {number} P0 - Probabilidade do sistema estar vazio (sem clientes)
   */
  P0: number;

  /**
   * @property {number} Pn - Probabilidade de n clientes no sistema
   */
  Pn: number;

  /**
   * @property {number} n - Número de clientes no sistema
   */
  n: number;

  /**
   * @property {number} Pw - Probabilidade do tempo de espera no sistema (W) > t
   */
  Pw: number;

  /**
   * @property {number} Pwq - Probabilidade do tempo de espera na fila (Wq) > t
   */
  Pwq: number;

  /**
   * @property {number} Lq - Número médio de clientes na fila
   */
  Lq: number;

  /**
   * @property {number} L - Número médio de clientes no sistema
   */
  L: number;

  /**
   * @property {number} Wq - Tempo médio de espera na fila
   */
  Wq: number;

  /**
   * @property {number} W - Tempo médio de espera no sistema
   */
  W: number;
};

export function MMSCalculator() {
  const [lambda, setLambda] = useState<string>("");
  const [mu, setMu] = useState<string>("");
  const [s, setS] = useState<string>("");
  const [n, setN] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MMSResultsType | null>(null);

  const factorial = (n: number): number => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };

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

    let sumP0 = 0;

    for (let i = 0; i <= sValue; i++) {
      sumP0 += Math.pow(lambdaValue / muValue, i) / factorial(i);
    }

    const P0 =
      1 /
      (sumP0 +
        (Math.pow(lambdaValue / muValue, sValue) / factorial(sValue)) *
          ((1 / (1 - lambdaValue)) * (sValue * muValue)));

    const t = 1; // Defina o valor de 't' conforme necessário
    const Pw =
      Math.exp(-muValue * t) *
      (1 +
        (((P0 * Math.pow(lambdaValue / muValue, sValue)) /
          (factorial(sValue) * (1 - rho))) *
          (1 - Math.exp(-muValue * (sValue - 1 - lambdaValue / muValue) * t))) /
          (sValue - 1 - lambdaValue / muValue));

    const Lq =
      (P0 * (Math.pow(lambdaValue / muValue, sValue) * rho)) /
      (factorial(sValue) * Math.pow(1 - rho, 2));
    const Wq = Lq / lambdaValue;

    const L = Lq + lambdaValue / muValue;

    const W = L / lambdaValue;

    const results: MMSResultsType = {
      lambda: lambdaValue,
      mu: muValue,
      s: sValue,
      rho,
      P0,
      Lq,
      L,
      Wq,
      W,
      Pn: 0,
      n: 0,
      Pw,
      Pwq: 0,
    };

    setResults(results);

    setError(null);
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

              <div className="grid gap-2">
                <Label htmlFor="n">
                  (n) clientes no sistema (Pn)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor opcional)
                  </span>
                </Label>
                <Input
                  id="n"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="Ex: 100"
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
