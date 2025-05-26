"use client";

import { MM1KResults } from "@/components/queues/mm1k/mm1k-results";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export function MM1KCalculator() {
  const [lambda, setLambda] = useState<string>("");
  const [mu, setMu] = useState<string>("");
  const [k, setK] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambda);
    const muValue = Number.parseFloat(mu);
    const kValue = Number.parseInt(k);

    if (isNaN(lambdaValue) || isNaN(muValue) || isNaN(kValue)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambdaValue <= 0 || muValue <= 0 || kValue <= 0) {
      setError("Os valores de λ, μ e K devem ser maiores que zero.");
      return;
    }

    if (kValue !== Math.floor(kValue)) {
      setError("A capacidade do sistema (K) deve ser um número inteiro.");
      return;
    }

    const rho = lambdaValue / muValue;

    // Cálculo de P0 (probabilidade de sistema vazio)
    let P0;
    if (Math.abs(rho - 1.0) < 0.000001) {
      // Caso especial quando rho = 1
      P0 = 1 / (kValue + 1);
    } else {
      P0 = (1 - rho) / (1 - Math.pow(rho, kValue + 1));
    }

    // Cálculo das probabilidades Pn
    const Pn = [];
    for (let n = 0; n <= kValue; n++) {
      Pn[n] = Math.pow(rho, n) * P0;
    }

    // Probabilidade de perda (PK)
    const PK = Pn[kValue];

    // Taxa efetiva de chegada
    const lambdaEff = lambdaValue * (1 - PK);

    // Número médio de clientes no sistema (L)
    let L;
    if (Math.abs(rho - 1.0) < 0.000001) {
      // Caso especial quando rho = 1
      L = kValue / 2;
    } else {
      L =
        (rho *
          (1 -
            (kValue + 1) * Math.pow(rho, kValue) +
            kValue * Math.pow(rho, kValue + 1))) /
        ((1 - rho) * (1 - Math.pow(rho, kValue + 1)));
    }

    // Número médio de clientes na fila (Lq)
    const Lq = L - (1 - P0);

    // Tempo médio no sistema (W)
    const W = L / lambdaEff;

    // Tempo médio na fila (Wq)
    const Wq = Lq / lambdaEff;

    setResults({
      lambda: lambdaValue,
      mu: muValue,
      k: kValue,
      rho,
      P0,
      PK,
      lambdaEff,
      L,
      Lq,
      W,
      Wq,
      Pn,
    });

    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Parâmetros do Modelo M/M/1/K
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
                  placeholder="Ex: 12"
                  value={mu}
                  onChange={(e) => setMu(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="k">
                  Capacidade do sistema (K)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor inteiro)
                  </span>
                </Label>
                <Input
                  id="k"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="Ex: 5"
                  value={k}
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
            <MM1KResults results={results} />
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
