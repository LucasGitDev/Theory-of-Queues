"use client";

import { MM1Results } from "@/components/queues/mm1/mm1-results";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export type MM1ResultsType = {
  lambda: number;
  mu: number;
  rho: number;
  L: number;
  Lq: number;
  W: number;
  Wq: number;
};

export function MM1Calculator() {
  const [lambda, setLambda] = useState<string>("");
  const [mu, setMu] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MM1ResultsType | null>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambda);
    const muValue = Number.parseFloat(mu);

    if (isNaN(lambdaValue) || isNaN(muValue)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambdaValue <= 0 || muValue <= 0) {
      setError("Os valores de λ e μ devem ser maiores que zero.");
      return;
    }

    if (lambdaValue >= muValue) {
      setError(
        "A taxa de chegada (λ) deve ser menor que a taxa de serviço (μ) para que o sistema seja estável."
      );
      return;
    }

    const rho = lambdaValue / muValue;
    const L = rho / (1 - rho);
    const Lq = Math.pow(rho, 2) / (1 - rho);
    const W = 1 / (muValue - lambdaValue);
    const Wq = rho / (muValue - lambdaValue);

    setResults({
      lambda: lambdaValue,
      mu: muValue,
      rho,
      L,
      Lq,
      W,
      Wq,
    });

    setError(null);
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
                    (clientes/unidade de tempo)
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
                    (clientes/unidade de tempo)
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
