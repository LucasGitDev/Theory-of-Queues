import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { MG1PResults } from './mg1Priority-results';

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
  const [lambdaValues, setLambdaValues] = useState<string[]>(['', '', '']);
  const [mu, setMu] = useState<string>('');
  const [serverCount, setServerCount] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MG1PriorityResults | null>(null);

  const calculateResults = () => {
    const muValue = parseFloat(mu);
    const s = parseInt(serverCount) || 1;
    const sigmaSqValue = 1 / (muValue ** 2) // 1/μ²

    // Parse priority classes
    const classes: PriorityClass[] = [];
    let totalLambda = 0;

    for (let i = 0; i < lambdaValues.length; i++) {
      const lambda = parseFloat(lambdaValues[i]) || 0;
      if (lambda > 0) {
        classes.push({
          lambda,
          label: `Classe ${i + 1} (Prioridade ${i + 1})`
        });
        totalLambda += lambda;
      }
    }

    // Validations
    if (isNaN(muValue) || muValue <= 0) {
      setError("A taxa de serviço (μ) deve ser maior que zero.");
      return;
    }

    if (totalLambda <= 0) {
      setError("Insira pelo menos uma taxa de chegada válida.");
      return;
    }

    if (totalLambda >= s * muValue) {
      setError(`A taxa total de chegada (${totalLambda}) deve ser menor que s×μ (${s * muValue}) para estabilidade.`);
      return;
    }

    const rho = totalLambda / muValue;
    const results: MG1PriorityResults = {
      lambda: totalLambda,
      mu: muValue,
      rho,
      sigmaSquared: sigmaSqValue,
      classes
    };

    // Simple M/G/1 results (no priorities)
    if (classes.length === 0) {
      const lambda = parseFloat(lambdaValues[0]) || 0;
      const Lq = (Math.pow(lambda, 2) * sigmaSqValue + Math.pow(rho, 2)) / (2 * (1 - rho));
      const Wq = Lq / lambda;
      const W = Wq + (1 / muValue);
      const L = lambda * W;
      const P0 = 1 - rho;

      results.simpleMG1 = { L, Lq, W, Wq, P0 };
    }
    // Priority system calculations
    else {
      // With interruption (preemptive)
      const withInt = {
        W: [] as number[],
        Wq: [] as number[],
        L: [] as number[],
        Lq: [] as number[],
      };

      // Without interruption (non-preemptive)
      const withoutInt = {
        W: [] as number[],
        Wq: [] as number[],
        L: [] as number[],
        Lq: [] as number[],
      };


      let sumLambdasBefore = 0;

      classes.forEach((classInfo, k) => {
        const lambdaK = classInfo.lambda;
        const sumLambdasUpToK = sumLambdasBefore + lambdaK;

        // ----- COM INTERRUPÇÃO -----

        const W_with = k === 0
          ? 1 / (muValue - lambdaK)
          : muValue / ((muValue - sumLambdasBefore) * (muValue - sumLambdasUpToK));

        const Wq_with = W_with - (1 / muValue);
        const L_with = sumLambdasUpToK * W_with;
        const Lq_with = L_with - (sumLambdasUpToK / muValue);

        withInt.W.push(W_with);
        withInt.Wq.push(Wq_with);
        withInt.L.push(L_with);
        withInt.Lq.push(Lq_with);

        // ----- SEM INTERRUPÇÃO -----

        const sumLambdaBeforeK = sumLambdasBefore;
        // Soma dos lambdas até a classe k (Σλi, i=1 até k)
        const sumLambdaUpToK = sumLambdasBefore + lambdaK;

        // Cálculo do termo W conforme a imagem
        const termoRaiz = Math.sqrt((muValue - totalLambda) /
          (Math.pow(totalLambda / muValue, 1) *
            (1 + (totalLambda / muValue))));

        const termoIntermediario = termoRaiz + muValue;

        // Fórmula completa de W
        const W = (1 / termoIntermediario) *
          (1 - (sumLambdaBeforeK / muValue)) *
          (1 - (sumLambdaUpToK / muValue)) +
          (1 / muValue);

        // Cálculos derivados conforme a imagem
        const Wq = W - (1 / muValue);
        const L = lambdaK * W;
        const Lq = lambdaK * Wq;

        withoutInt.W.push(W);
        withoutInt.Wq.push(Wq);
        withoutInt.L.push(L);
        withoutInt.Lq.push(Lq);

        sumLambdasBefore += lambdaK;
      })

      results.withInterruption = withInt;
      results.withoutInterruption = withoutInt;
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
                <Label htmlFor="servers">
                  Número de servidores (s)
                </Label>
                <Input
                  id="servers"
                  type="number"
                  min="1"
                  value={serverCount}
                  onChange={(e) => setServerCount(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mu">
                  Taxa de serviço por servidor (μ)
                </Label>
                <Input
                  id="mu"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={mu}
                  onChange={(e) => setMu(e.target.value)}
                />
              </div>

              <h4 className="font-medium mt-4">Taxas de Chegada por Classe (opcional)</h4>

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
                Insira os parâmetros e clique em "Calcular" para ver os resultados.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}