"use client";

import { MMG1Results } from "@/components/queues/mg1/mg1-results";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export type MG1ResultsType = {
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
  * @property {number} sigmaSquared - Variância do tempo de serviço
  */
  sigmaSquared: number;

};

export function MG1Calculator() {
  const [lambda, setLambda] = useState<string>("");
  const [mu, setMu] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MG1ResultsType | null>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambda);
    const muValue = Number.parseFloat(mu);

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

    const rho = lambdaValue / muValue;  // Fator de utilização

    const sigmaSquared = 1 / (muValue ** 2);

    // Fórmula de Pollaczek-Khinchine para o número médio na fila (Lq):
    const Lq = ((lambdaValue ** 2) * sigmaSquared + (rho ** 2)) / (2 * (1 - rho));

    // Tempo médio na fila (Wq):
    const Wq = Lq / lambdaValue;

    // Número médio de clientes no sistema (L):
    const L = rho + Lq;

    // Tempo médio de espera no sistema (W):
    const W = Wq + (1 / muValue);

    // Probabilidade de não haver clientes no sistema (P0):
    const P0 = 1 - rho;


    const results: MG1ResultsType = {
      lambda: lambdaValue,
      mu: muValue,
      rho,
      L,
      Lq,
      W,
      Wq,
      P0,
      sigmaSquared
    };

    setResults(results);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Parâmetros do Modelo M/G/1
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

              <Button onClick={calculateResults} className="w-full mt-2">
                Calcular
              </Button>
            </div>
          </CardContent>
        </Card>

        {results ? (
          <div className="md:row-span-2">
            <MMG1Results results={results} />
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
