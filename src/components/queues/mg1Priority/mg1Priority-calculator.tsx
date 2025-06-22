import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryParams } from "@/utils/url-params";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { MG1PResults } from "./mg1Priority-results";

type PriorityClass = {
  lambda: number;
  label: string;
};

export type MG1PriorityResults = {
  lambda: number;
  mu: number;
  rho: number;
  sigmaSquared: number;
  classes: PriorityClass[];
  withInterruption?: {
    W: number[];
    Wq: number[];
    L: number[];
    Lq: number[];
  };
  withoutInterruption?: {
    W: number[];
    Wq: number[];
    L: number[];
    Lq: number[];
  };
  simpleMG1?: {
    L: number;
    Lq: number;
    W: number;
    Wq: number;
    P0: number;
  };
};

export function MG1PCalculator() {
  const { getQueryParam } = useQueryParams();

  const [lambdaValues, setLambdaValues] = useState<string[]>([
    getQueryParam("lambda1") || "",
    getQueryParam("lambda2") || "",
    getQueryParam("lambda3") || "",
  ]);
  const [mu, setMu] = useState<string>(getQueryParam("mu") || "");
  const [serverCount, setServerCount] = useState<string>(
    getQueryParam("serverCount") || "1"
  );
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MG1PriorityResults | null>(null);

  const calculateResults = () => {
    const muValue = parseFloat(mu);
    const s = parseInt(serverCount) || 1;
    const sigmaSqValue = 1 / (muValue ** 2);

    const classes: PriorityClass[] = [];
    let totalLambda = 0;

    for (let i = 0; i < lambdaValues.length; i++) {
      const lambda = parseFloat(lambdaValues[i]) || 0;
      if (lambda > 0) {
        classes.push({
          lambda,
          label: `Classe ${i + 1} (Prioridade ${i + 1})`,
        });
        totalLambda += lambda;
      }
    }

    if (isNaN(muValue) || muValue <= 0) {
      setError("A taxa de serviço (μ) deve ser maior que zero.");
      return;
    }

    if (totalLambda <= 0) {
      setError("Insira pelo menos uma taxa de chegada válida.");
      return;
    }

    if (totalLambda >= s * muValue) {
      setError(`Sistema instável: a taxa total de chegada (${totalLambda}) ≥ s×μ (${s * muValue}).`);
      return;
    }

    const rho = totalLambda / muValue;
    const results: MG1PriorityResults = {
      lambda: totalLambda,
      mu: muValue,
      rho,
      sigmaSquared: sigmaSqValue,
      classes,
    };

    if (s === 1) {
      // -------------------- M/G/1 com Prioridade (Preemptivo e Não Preemptivo) --------------------

      const withInt = { W: [] as number[], Wq: [] as number[], L: [] as number[], Lq: [] as number[] };
      const withoutInt = { W: [] as number[], Wq: [] as number[], L: [] as number[], Lq: [] as number[] };

      const serviceTimes = classes.map(() => 1 / muValue);
      const serviceVariances = classes.map(() => 1 / (muValue ** 2));
      const utilizations = classes.map((c, i) => c.lambda * serviceTimes[i]);
      const ESquared = serviceVariances.map((varS, i) => varS + Math.pow(serviceTimes[i], 2));
      const totalRho = utilizations.reduce((acc, curr) => acc + curr, 0);

      if (totalRho >= 1) {
        setError("Sistema instável: soma das utilizações ≥ 1.");
        return;
      }

      let rhoSumUntilPrev = 0;
      let sumLambdasBefore = 0;

      classes.forEach((classInfo, k) => {
        const lambdaK = classInfo.lambda;
        const sumLambdasUpToK = sumLambdasBefore + lambdaK;

        // ----- COM INTERRUPÇÃO -----
        const W_with = k === 0
          ? 1 / (muValue - lambdaK)
          : muValue / ((muValue - sumLambdasBefore) * (muValue - sumLambdasUpToK));

        const Wq_with = W_with - 1 / muValue;
        const L_with = sumLambdasUpToK * W_with;
        const Lq_with = L_with - sumLambdasUpToK / muValue;

        withInt.W.push(W_with);
        withInt.Wq.push(Wq_with);
        withInt.L.push(L_with);
        withInt.Lq.push(Lq_with);

        // ----- SEM INTERRUPÇÃO -----
        const serviceTimeK = serviceTimes[k];
        const rhoK = utilizations[k];
        const rhoUpToK = utilizations.slice(0, k + 1).reduce((acc, curr) => acc + curr, 0);

        const numerator = classes.reduce((sum, c, idx) => sum + c.lambda * ESquared[idx], 0);

        let denominator = 0;
        if (k === 0) {
          denominator = 2 * (1 - rhoUpToK);
        } else {
          denominator = 2 * (1 - rhoSumUntilPrev) * (1 - rhoUpToK);
        }

        const Wq = numerator / denominator;
        const W = Wq + serviceTimeK;
        const L = lambdaK * W;
        const Lq = lambdaK * Wq;

        withoutInt.W.push(W);
        withoutInt.Wq.push(Wq);
        withoutInt.L.push(L);
        withoutInt.Lq.push(Lq);

        rhoSumUntilPrev += rhoK;
        sumLambdasBefore += lambdaK;
      });

      results.withInterruption = withInt;
      results.withoutInterruption = withoutInt;

    } else {
      // -------------------- M/G/S>1 com Prioridade (Preemptivo e Não Preemptivo) --------------------

      const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

      const arrivalRates = classes.map(c => c.lambda);

      // ----- NÃO PREEMPTIVO -----
      const sFact = factorial(s);
      const r = totalLambda / muValue;
      const sum_rj_by_jfact = Array.from({ length: s }).reduce<number>((acc, _, j) => acc + Math.pow(r, j) / factorial(j), 0);
      const r_pow_s = Math.pow(r, s);

      const withoutInt = { W: [] as number[], Wq: [] as number[], L: [] as number[], Lq: [] as number[] };

      arrivalRates.forEach((lambdaI, i) => {
        const sumToIMinus1 = arrivalRates.slice(0, i).reduce((acc, l) => acc + l, 0);
        const sumToI = arrivalRates.slice(0, i + 1).reduce((acc, l) => acc + l, 0);

        const termo1 = (sFact * (s * muValue - totalLambda)) / r_pow_s * sum_rj_by_jfact + s * muValue;
        const termo2 = 1 - sumToIMinus1 / (s * muValue);
        const termo3 = 1 - sumToI / (s * muValue);

        const denominator = termo1 * termo2 * termo3;

        if (denominator <= 0) {
          withoutInt.W.push(NaN);
          withoutInt.Wq.push(NaN);
          withoutInt.L.push(NaN);
          withoutInt.Lq.push(NaN);
        } else {
          const Wq = 1 / denominator;
          const W = Wq + 1 / muValue;
          const Lq = lambdaI * Wq;
          const L = lambdaI * W;

          withoutInt.W.push(W);
          withoutInt.Wq.push(Wq);
          withoutInt.L.push(L);
          withoutInt.Lq.push(Lq);
        }
      });

      results.withoutInterruption = withoutInt;

      // ----- PREEMPTIVO -----
      const erlangC = (lambd: number, mu: number, s: number): number => {
        const a = lambd / mu;
        const sumTerms = Array.from({ length: s }).reduce<number>((acc, _, k) => acc + Math.pow(a, k) / factorial(k), 0);
        const lastTerm = (Math.pow(a, s) / factorial(s)) * (s * mu) / (s * mu - lambd);
        return lastTerm / (sumTerms + lastTerm);
      };

      const withInt = { W: [] as number[], Wq: [] as number[], L: [] as number[], Lq: [] as number[] };

      arrivalRates.forEach((lambdaI, i) => {
        const sumLambdaI = arrivalRates.slice(0, i + 1).reduce((acc, l) => acc + l, 0);

        const Pw = erlangC(sumLambdaI, muValue, s);
        const denominator = s * muValue - sumLambdaI;

        if (denominator <= 0) {
          withInt.W.push(NaN);
          withInt.Wq.push(NaN);
          withInt.L.push(NaN);
          withInt.Lq.push(NaN);
        } else {
          const Wq = Pw / denominator;
          const W = Wq + (1 / muValue);
          const L = lambdaI * W;
          const Lq = lambdaI * Wq;

          withInt.W.push(W);
          withInt.Wq.push(Wq);
          withInt.L.push(L);
          withInt.Lq.push(Lq);
        }
      });

      results.withInterruption = withInt;
    }

    setResults(results);
    setError(null);
  };


  const handleLambdaChange = (index: number, value: string) => {
    const newValues = [...lambdaValues];
    newValues[index] = value;
    setLambdaValues(newValues);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Parâmetros do Modelo M/G/1 com Prioridades
            </h3>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="servers">Número de servidores (s)</Label>
                <Input
                  id="servers"
                  type="number"
                  min="1"
                  value={serverCount}
                  onChange={(e) => setServerCount(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mu">Taxa de serviço por servidor (μ)</Label>
                <Input
                  id="mu"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={mu}
                  onChange={(e) => setMu(e.target.value)}
                />
              </div>

              <h4 className="font-medium mt-4">
                Taxas de Chegada por Classe (opcional)
              </h4>

              {[0, 1, 2].map((index) => (
                <div key={index} className="grid gap-2">
                  <Label htmlFor={`lambda${index + 1}`}>
                    λ{index + 1} (Prioridade {index + 1})
                  </Label>
                  <Input
                    id={`lambda${index + 1}`}
                    type="number"
                    step="0.01"
                    min="0"
                    value={lambdaValues[index]}
                    onChange={(e) => handleLambdaChange(index, e.target.value)}
                  />
                </div>
              ))}

              <Button onClick={calculateResults} className="w-full mt-4">
                Calcular
              </Button>
            </div>
          </CardContent>
        </Card>

        {results ? (
          <div className="md:row-span-2">
            <MG1PResults results={results} />
          </div>
        ) : (
          <Card className="bg-slate-50 dark:bg-slate-800/50 border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <h3 className="text-lg font-medium mb-2">Resultados</h3>
              <p className="text-muted-foreground">
                Insira os parâmetros e clique em Calcular para ver os
                resultados.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
