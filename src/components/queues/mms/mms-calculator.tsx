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
};

export function MMSCalculator() {
  const { getQueryParam, setQueryParams } = useQueryParams();

  const [lambdaState, setLambdaState] = useState<string>(
    getQueryParam("lambda") || ""
  );
  const [muState, setMuState] = useState<string>(getQueryParam("mu") || "");
  const [sState, setSState] = useState<string>(getQueryParam("s") || "");
  const [nState, setNState] = useState<string>(getQueryParam("n") || "");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MMSResultsType | null>(null);

  const factorial = (n: number): number => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };

  /**
   * Função para calcular o somatório da expressão (lambda/mu)^n / n!
   * para n de 0 até s-1.
   *
   * @param lambda - Taxa média de chegada.
   * @param mu - Taxa média de atendimento.
   * @param s - Número de servidores.
   * @returns Valor do somatório.
   */
  function summatory(lambda: number, mu: number, s: number): number {
    let soma = 0;
    const fator = lambda / mu;

    for (let n = 0; n <= s - 1; n++) {
      soma += Math.pow(fator, n) / factorial(n);
    }

    return soma;
  }

  const calculateResults = () => {
    const lambda = Number.parseFloat(lambdaState);
    const mu = Number.parseFloat(muState);
    const s = Number.parseInt(sState);
    const n = Number.parseInt(nState);

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

    const rho = lambda / mu;

    const P0_1 = summatory(lambda, mu, s);
    const P0_2 = (lambda / mu) ** s / factorial(s);
    const P0_3 = 1 / ((1 - lambda) / (s * mu));

    const P0 = 1 / (P0_1 + P0_2 * P0_3);

    const P_ocup = (rho ** s / (factorial(s - 1) * (s - rho))) * P0;

    const Lq = (rho / (s - rho)) * P_ocup;

    const Wq = Lq / lambda;

    const L = Lq + lambda / mu;

    const W = L / lambda;

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
