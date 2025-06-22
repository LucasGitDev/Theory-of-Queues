"use client";

import { MMSKResults } from "@/components/queues/mmsk/mmsk-results";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryParams } from "@/utils/url-params";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export type MMSKResultsType = {
  lambda: number;
  mu: number;
  s: number;
  k: number;
  rho: number;
  P0: number;
  PK: number;
  lambdaEff: number;
  L: number;
  Lq: number;
  W: number;
  Wq: number;
  Pn: number[];
  Pk: number;
};

export function MMSKCalculator() {
  const { getQueryParam, setQueryParams } = useQueryParams();

  const [lambdaState, setLambda] = useState<string>(
    getQueryParam("lambda") || ""
  );
  const [muState, setMu] = useState<string>(getQueryParam("mu") || "");
  const [sState, setS] = useState<string>(getQueryParam("s") || "");
  const [kState, setK] = useState<string>(getQueryParam("k") || "");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MMSKResultsType | null>(null);

  const calculateResults = () => {
    const lambda = Number.parseFloat(lambdaState);
    const mu = Number.parseFloat(muState);
    const s = Number.parseInt(sState);
    const k = Number.parseInt(kState);

    setQueryParams({
      lambda: lambda.toString(),
      mu: mu.toString(),
      s: s.toString(),
      k: k.toString(),
    });

    if (isNaN(lambda) || isNaN(mu) || isNaN(s) || isNaN(k)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambda <= 0 || mu <= 0 || s <= 0 || k <= 0) {
      setError("Todos os valores devem ser maiores que zero.");
      return;
    }

    if (s !== Math.floor(s) || k !== Math.floor(k)) {
      setError(
        "O número de servidores (s) e a capacidade do sistema (K) devem ser números inteiros."
      );
      return;
    }

    if (k <= s) {
      setError(
        "A capacidade do sistema (K) deve ser maior que o número de servidores (s)."
      );
      return;
    }

    const rho = lambda / (s * mu);

    // Cálculo de P0 (probabilidade de sistema vazio)
    let sum1 = 0;
    for (let n = 0; n <= s - 1; n++) {
      sum1 += Math.pow(lambda / mu, n) / factorial(n);
    }

    let sum2 = 0;
    for (let n = 0; n <= k - s; n++) {
      sum2 += Math.pow(lambda / (s * mu), n);
    }

    const P0 = 1 / (sum1 + (Math.pow(lambda / mu, s) / factorial(s)) * sum2);

    // Cálculo das probabilidades Pn
    const Pn = [];
    for (let n = 0; n <= k; n++) {
      if (n <= s) {
        Pn[n] = (Math.pow(lambda / mu, n) / factorial(n)) * P0;
      } else {
        Pn[n] =
          (Math.pow(lambda / mu, n) / (factorial(s) * Math.pow(s, n - s))) * P0;
      }
    }

    // Probabilidade de perda (PK)
    const PK = Pn[k];

    // Taxa efetiva de chegada
    const lambdaEff = lambda * (1 - PK);

    // Número médio de clientes no sistema (L)
    let L = 0;
    for (let n = 1; n <= k; n++) {
      L += n * Pn[n];
    }

    // Número médio de clientes na fila (Lq)
    const Lq = L - lambdaEff / mu;

    // Tempo médio no sistema (W)
    const W = L / lambdaEff;

    // Tempo médio na fila (Wq)
    const Wq = Lq / lambdaEff;

    // Probabilidade de bloqueio (Pk)
    const Pk = ((lambda / mu) ** k / (factorial(s) * s ** (k - s))) * P0;

    setResults({
      lambda: lambda,
      mu: mu,
      s: s,
      k: k,
      rho,
      P0,
      PK,
      lambdaEff,
      L,
      Lq,
      W,
      Wq,
      Pn,
      Pk,
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
              Parâmetros do Modelo M/M/s/K
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
                  placeholder="Ex: 15"
                  value={lambdaState}
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
                  value={muState}
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
                  value={sState}
                  onChange={(e) => setS(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="k">
                  Capacidade do sistema (K)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor inteiro &gt; c)
                  </span>
                </Label>
                <Input
                  id="k"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="Ex: 10"
                  value={kState}
                  onChange={(e) => setK(e.target.value)}
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
            <MMSKResults results={results} />
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
