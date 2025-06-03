"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryParams } from "@/utils/url-params";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { MM1KResults } from "./mm1k-results";

export type MM1KResultsType = {
  lambda: number;
  mu: number;
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
  waitingCost: number;
  serviceCost: number;
  numClients: number;
  totalCost: number;
};

export function MM1KCalculator() {
  const { getQueryParam, setQueryParams } = useQueryParams();

  const [lambdaState, setLambdaState] = useState<string>(
    getQueryParam("lambda") || ""
  );
  const [muState, setMuState] = useState<string>(getQueryParam("mu") || "");
  const [kState, setKState] = useState<string>(getQueryParam("k") || "");
  const [waitingCostState, setWaitingCostState] = useState<string>(
    getQueryParam("waitingCost") || ""
  );
  const [serviceCostState, setServiceCostState] = useState<string>(
    getQueryParam("serviceCost") || ""
  );
  const [numClientsState, setNumClientsState] = useState<string>(
    getQueryParam("numClients") || ""
  );
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MM1KResultsType | null>(null);

  const calculateResults = () => {
    const lambdaValue = Number.parseFloat(lambdaState);
    const muValue = Number.parseFloat(muState);
    const kValue = Number.parseInt(kState);
    const waitingCostValue = Number.parseFloat(waitingCostState);
    const serviceCostValue = Number.parseFloat(serviceCostState);
    const numClientsValue = Number.parseInt(numClientsState);

    setQueryParams({
      lambda: lambdaValue.toString(),
      mu: muValue.toString(),
      k: kValue.toString(),
      waitingCost: waitingCostValue.toString(),
      serviceCost: serviceCostValue.toString(),
      numClients: numClientsValue.toString(),
    });

    if (isNaN(lambdaValue) || isNaN(muValue) || isNaN(kValue)) {
      setError("Por favor, insira valores numéricos válidos.");
      return;
    }

    if (lambdaValue <= 0 || muValue <= 0) {
      setError("As taxas de chegada e serviço devem ser maiores que zero.");
      return;
    }

    const rho = lambdaValue / muValue; // Intensidade de tráfego (ρ)

    let P0;
    if (rho === 1) {
      P0 = 1 / (kValue + 1);
    } else {
      P0 = (1 - rho) / (1 - Math.pow(rho, kValue + 1));
    }

    const Pn = [];
    for (let n = 0; n <= kValue; n++) {
      Pn[n] = P0 * Math.pow(rho, n);
    }

    const PK = Pn[kValue]; // Probabilidade de bloqueio (P_block)

    const lambdaEff = lambdaValue * (1 - PK); // Taxa efetiva de chegada (λ_eff)

    let L;
    if (rho === 1) {
      L = kValue / 2;
    } else {
      const numerator = rho / (1 - rho);
      const correction =
        ((kValue + 1) * Math.pow(rho, kValue + 1)) /
        (1 - Math.pow(rho, kValue + 1));
      L = numerator - correction;
    }

    const W = lambdaEff > 0 ? L / lambdaEff : 0; // Tempo médio no sistema (W)

    const Lq = L - (1 - P0); // Número médio de clientes na fila (Lq)

    const Wq = lambdaEff > 0 ? Lq / lambdaEff : 0; // Tempo médio de espera na fila (Wq)

    const totalCost = waitingCostValue * Lq + serviceCostValue * 1; // Custo Total (CT)

    const results: MM1KResultsType = {
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
      waitingCost: waitingCostValue,
      serviceCost: serviceCostValue,
      numClients: numClientsValue,
      totalCost,
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
                  placeholder="Ex: 0.3"
                  value={lambdaState}
                  onChange={(e) => setLambdaState(e.target.value)}
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
                  placeholder="Ex: 0.5"
                  value={muState}
                  onChange={(e) => setMuState(e.target.value)}
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
                  placeholder="Ex: 2"
                  value={kState}
                  onChange={(e) => setKState(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="waitingCost">
                  Custo de espera por cliente (opcional)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (unidades monetárias)
                  </span>
                </Label>
                <Input
                  id="waitingCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 10.0"
                  value={waitingCostState}
                  onChange={(e) => setWaitingCostState(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="serviceCost">
                  Custo de serviço por cliente (opcional)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (unidades monetárias)
                  </span>
                </Label>
                <Input
                  id="serviceCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 5.0"
                  value={serviceCostState}
                  onChange={(e) => setServiceCostState(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="numClients">
                  Número de clientes no sistema (opcional)
                  <span className="ml-1 text-sm text-muted-foreground">
                    (valor inteiro)
                  </span>
                </Label>
                <Input
                  id="numClients"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="Ex: 100"
                  value={numClientsState}
                  onChange={(e) => setNumClientsState(e.target.value)}
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
