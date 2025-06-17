"use client";

import { MM1Results } from "@/components/queues/mm1/mm1-results";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryParams } from "@/utils/url-params";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export type MM1ResultsType = {
  /**
   * @property {number} lambda - A taxa de chegada (chegadas/unidade de tempo)
   */
  lambda: number;

  /**
   * @property {number} mu - A taxa de serviço (1/tempo de serviço)
   */
  mu: number;

  /**
   * @property {number} rho - A taxa de utilização
   */
  rho: number;

  /**
   * @property {number} n - O número de clientes no sistema
   */
  n: number;

  /**
   * @property {number} L - O número médio de clientes no sistema
   */
  L: number;

  /**
   * @property {number} Lq - O número médio de clientes na fila
   */
  Lq: number;

  /**
   * @property {number} W - O tempo médio de um cliente no sistema
   */
  W: number;

  /**
   * @property {number} Wq - O tempo médio de um cliente na fila
   */
  Wq: number;

  /**
   * @property {number} P0 - A probabilidade de um cliente não ter que esperar para ser servido
   */
  P0: number;

  /**
   * @property {number} waitingTime - O tempo de espera
   */
  waitingTime: number;

  /**
   * @property {number} POccupied - A probabilidade do sistema estar ocupado - P(n > 0)
   */
  POccupied: number;

  /**
   * @property {number} Pn - A probabilidade de n clientes no sistema
   */
  Pn: number;

  /**
   * @property {number} Pn0 - A probabilidade de que o número de clientes no sistema seja 0 (ocioso)
   */
  Pn0: number;

  /**
   * @property {number} PW - Probabilidade do tempo de esperar no sistema ser maior que w
   */
  PW: number;

  /**
   * @property {number} Pwq - Probabilidade do tempo de espera na fila ser maior que wq
   */
  Pwq: number;
};

export function MM1Calculator() {
  const { getQueryParam, setQueryParams } = useQueryParams();

  const [lambda, setLambda] = useState<string>(getQueryParam("lambda") || "");
  const [mu, setMu] = useState<string>(getQueryParam("mu") || "");
  const [waitingTime, setWaitingTime] = useState<string>(
    getQueryParam("waitingTime") || ""
  );
  const [n, setN] = useState<string>(getQueryParam("n") || "");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MM1ResultsType | null>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambda);
    const muValue = Number.parseFloat(mu);
    const waitingTimeValue = Number.parseFloat(waitingTime);
    let nValue = Number.parseFloat(n);

    setQueryParams({
      lambda: lambdaValue.toString(),
      mu: muValue.toString(),
      waitingTime: waitingTimeValue.toString(),
      n: nValue.toString(),
    });

    if (nValue < 0 || !nValue) {
      nValue = 0;
    }

    if (isNaN(lambdaValue) || isNaN(muValue)) {
      setError("Por favor, insira valores numéricos válidos para λ e μ.");
      return;
    }

    if (lambdaValue <= 0 || muValue <= 0) {
      setError("Os valores de λ e μ devem ser maiores que zero.");
      return;
    }

    if (lambdaValue >= muValue) {
      setError(
        "A taxa de chegada (λ) deve ser menor que a taxa de serviço (μ) para que o sistema seja estável. Caso contrário, a fila crescerá indefinidamente."
      );
      return;
    }

    if (waitingTimeValue && waitingTimeValue < 0) {
      setError("O tempo de espera não pode ser negativo.");
      return;
    }

    const rho = lambdaValue / muValue;

    const L = rho / (1 - rho);
    const Lq = rho ** 2 / (1 - rho);
    const W = 1 / (muValue - lambdaValue);
    const Wq = rho / (muValue - lambdaValue);
    const P0 = 1 - rho;
    const Pn = (1 - rho) * Math.pow(rho, nValue);
    const POccupied = 1 - P0;
    const Pn0 = 1 - POccupied;
    const PW = Math.exp(-muValue * (1 - rho) * waitingTimeValue);
    const Pwq = rho * Math.exp(-muValue * (1 - rho) * waitingTimeValue);

    const results: MM1ResultsType = {
      lambda: lambdaValue,
      mu: muValue,
      waitingTime: waitingTimeValue,
      rho,
      n: nValue,
      L,
      Lq,
      W,
      Wq,
      P0,
      POccupied,
      Pn,
      Pn0,
      PW,
      Pwq,
    };

    setResults(results);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Parâmetros do Modelo M/M/1
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
                    (chegadas/unidade de tempo)
                  </span>
                </Label>
                <Input
                  id="lambda"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 5"
                  value={lambda}
                  onChange={(e) => setLambda(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mu">
                  Taxa de serviço (μ)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (1/tempo de serviço)
                  </span>
                </Label>
                <Input
                  id="mu"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 10"
                  value={mu}
                  onChange={(e) => setMu(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="waitingTime">
                  Tempo de espera (opcional)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (unidade de tempo)
                  </span>
                </Label>
                <Input
                  id="waitingTime"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 2"
                  value={waitingTime}
                  onChange={(e) => setWaitingTime(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="waitingTime">
                  Número de clientes no sistema (opcional)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (n)
                  </span>
                </Label>
                <Input
                  id="waitingTime"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 2"
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
            <MM1Results results={results} />
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
