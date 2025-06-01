"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryParams } from "@/utils/url-params";
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

  Lq: number;

  L: number;

  Wq: number;

  W: number;

  n: number;

  Pn: number;

  P_queue: number;

  /**
   * @property {number} PW - Probabilidade do tempo de esperar no sistema ser maior que w
   */
  PW: number;

  /**
   * @property {number} Pwq - Probabilidade do tempo de espera na fila ser maior que wq
   */
  Pwq: number;
};

export function MMSCalculator() {
  const { getQueryParam, setQueryParams } = useQueryParams();

  const [lambdaState, setLambdaState] = useState<string>(
    getQueryParam("lambda") || ""
  );
  const [muState, setMuState] = useState<string>(getQueryParam("mu") || "");
  const [sState, setSState] = useState<string>(getQueryParam("s") || "");
  const [nState, setNState] = useState<string>(getQueryParam("n") || "");
  const [waitingTimeState, setWaitingTimeState] = useState<string>(
    getQueryParam("waitingTime") || ""
  );
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MMSResultsType | null>(null);

  const factorial = (n: number): number => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };

  function summation(
    start: number,
    end: number,
    fn: (n: number) => number
  ): number {
    let soma = 0;
    for (let i = start; i <= end; i++) {
      soma += fn(i);
    }
    return soma;
  }

  const calculateResults = () => {
    const lambda = Number.parseFloat(lambdaState);
    const mu = Number.parseFloat(muState);
    const s = Number.parseInt(sState);
    const n = Number.parseInt(nState);
    const waitingTime = Number.parseFloat(waitingTimeState);

    setQueryParams({
      lambda: lambda.toString(),
      mu: mu.toString(),
      s: s.toString(),
      n: n.toString(),
    });

    if (isNaN(lambda) || isNaN(mu) || isNaN(s)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambda <= 0 || mu <= 0 || s <= 0) {
      setError("Os valores de λ, μ e s devem ser maiores que zero.");
      return;
    }

    if (s !== Math.floor(s)) {
      setError("O número de servidores (s) deve ser um número inteiro.");
      return;
    }

    const rho = lambda / (s * mu);

    const sum_terms = summation(
      0,
      s - 1,
      (n) => (lambda / mu) ** n / factorial(n)
    );
    const last_term = ((lambda / mu) ** s / factorial(s)) * (1 / (1 - rho));

    const P0 = 1 / (sum_terms + last_term); // P0_1

    const P_queue =
      ((P0 * (lambda / mu) ** s) / factorial(s)) * (1 / (1 - rho));

    const Lq = (P_queue * rho) / (1 - rho);

    const Wq = Lq / lambda;

    const L = Lq + lambda / mu;

    const W = Wq + 1 / mu;

    const exp_term_w = Math.exp(-mu * waitingTime);
    const bracket_numerator =
      1 - Math.exp(-mu * waitingTime * (s - 1 - lambda / mu));
    const bracket_denominator = s - 1 - lambda / mu;

    const PW =
      exp_term_w *
      (1 +
        ((P0 * (lambda / mu) ** s) / (factorial(s) * (1 - rho))) *
          (bracket_numerator / bracket_denominator));

    let P_Wq_equals_0 = 0;
    for (let i = 0; i < s; i++) {
      P_Wq_equals_0 += ((lambda / mu) ** i / factorial(i)) * P0;
    }

    const P_Wq_greater_t =
      (1 - P_Wq_equals_0) * Math.exp(-mu * (s - rho * s) * waitingTime);

    let Pn;
    if (n < s) {
      Pn = (Math.pow(lambda / mu, n) / factorial(n)) * P0;
    } else {
      Pn =
        (Math.pow(lambda / mu, n) / (factorial(s) * Math.pow(s, n - s))) * P0;
    }

    const results: MMSResultsType = {
      lambda,
      mu,
      s,
      rho,
      P0,
      Lq,
      L,
      Wq,
      W,
      n,
      Pn,
      P_queue,
      PW,
      Pwq: P_Wq_greater_t,
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
                  value={lambdaState}
                  onChange={(e) => setLambdaState(e.target.value)}
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
                  onChange={(e) => setMuState(e.target.value)}
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
                  onChange={(e) => setSState(e.target.value)}
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
                  value={nState}
                  onChange={(e) => setNState(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="waitingTime">
                  Tempo de espera (w)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor opcional)
                  </span>
                </Label>
                <Input
                  id="waitingTime"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="Ex: 100"
                  value={waitingTimeState}
                  onChange={(e) => setWaitingTimeState(e.target.value)}
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
