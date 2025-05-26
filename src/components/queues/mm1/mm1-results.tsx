"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface MM1ResultsProps {
  results: {
    lambda: number;
    mu: number;
    rho: number;
    L: number;
    Lq: number;
    W: number;
    Wq: number;
  };
  className?: string;
}

export function MM1Results({ results, className }: MM1ResultsProps) {
  const [, setActiveTab] = useState("summary");

  const formatNumber = (num: number) => {
    return num.toFixed(4);
  };

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <Tabs
          defaultValue="summary"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-t-lg">
            <h3 className="text-lg font-medium mb-3">
              Resultados do Modelo M/M/1
            </h3>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Resumo</TabsTrigger>
              <TabsTrigger value="details">Detalhes dos Cálculos</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="summary" className="mt-0 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Taxa de chegada (λ)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.lambda)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes/unidade de tempo
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Taxa de serviço (μ)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.mu)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes/unidade de tempo
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Utilização do sistema (ρ)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.rho)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    fração do tempo que o servidor está ocupado
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Número médio no sistema (L)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.L)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Número médio na fila (Lq)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.Lq)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Tempo médio no sistema (W)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.W)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    unidades de tempo
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Tempo médio na fila (Wq)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.Wq)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    unidades de tempo
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-0 space-y-6">
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Utilização do sistema (ρ)
                </h3>
                <FormulaDisplay
                  formula="ρ = \\frac{λ}{μ}"
                  calculationSteps={[
                    `ρ = \\frac{${results.lambda}}{${results.mu}}`,
                    `ρ = ${formatNumber(results.rho)}`,
                  ]}
                  explanation="A utilização do sistema (ρ) representa a fração do tempo que o servidor está ocupado. Para que o sistema seja estável, ρ deve ser menor que 1."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes no sistema (L)
                </h3>
                <FormulaDisplay
                  formula="L = \\frac{ρ}{1-ρ}"
                  calculationSteps={[
                    `L = \\frac{${formatNumber(results.rho)}}{1-${formatNumber(
                      results.rho
                    )}}`,
                    `L = \\frac{${formatNumber(results.rho)}}{${formatNumber(
                      1 - results.rho
                    )}}`,
                    `L = ${formatNumber(results.L)}`,
                  ]}
                  explanation="O número médio de clientes no sistema (L) inclui tanto os clientes em atendimento quanto os que estão na fila."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes na fila (Lq)
                </h3>
                <FormulaDisplay
                  formula="Lq = \\frac{ρ^2}{1-ρ}"
                  calculationSteps={[
                    `Lq = \\frac{${formatNumber(
                      results.rho
                    )}^2}{1-${formatNumber(results.rho)}}`,
                    `Lq = \\frac{${formatNumber(
                      Math.pow(results.rho, 2)
                    )}}{${formatNumber(1 - results.rho)}}`,
                    `Lq = ${formatNumber(results.Lq)}`,
                  ]}
                  explanation="O número médio de clientes na fila (Lq) representa apenas os clientes que estão aguardando atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio no sistema (W)
                </h3>
                <FormulaDisplay
                  formula="W = \\frac{1}{μ-λ}"
                  calculationSteps={[
                    `W = \\frac{1}{${results.mu}-${results.lambda}}`,
                    `W = \\frac{1}{${formatNumber(
                      results.mu - results.lambda
                    )}}`,
                    `W = ${formatNumber(results.W)}`,
                  ]}
                  explanation="O tempo médio que um cliente passa no sistema (W) inclui tanto o tempo de espera na fila quanto o tempo de atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio na fila (Wq)
                </h3>
                <FormulaDisplay
                  formula="Wq = \\frac{ρ}{μ-λ}"
                  calculationSteps={[
                    `Wq = \\frac{${formatNumber(results.rho)}}{${results.mu}-${
                      results.lambda
                    }}`,
                    `Wq = \\frac{${formatNumber(results.rho)}}{${formatNumber(
                      results.mu - results.lambda
                    )}}`,
                    `Wq = ${formatNumber(results.Wq)}`,
                  ]}
                  explanation="O tempo médio que um cliente passa na fila (Wq) representa apenas o tempo de espera antes do atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Relações entre os indicadores
                </h3>
                <div className="mt-2 space-y-3">
                  <FormulaDisplay
                    formula="L = λW"
                    calculationSteps={[
                      `L = ${formatNumber(
                        results.lambda
                      )} \\cdot ${formatNumber(results.W)}`,
                      `L = ${formatNumber(
                        results.lambda * results.W
                      )} \\approx ${formatNumber(results.L)}`,
                    ]}
                    explanation="Lei de Little para o sistema: o número médio de clientes no sistema é igual à taxa de chegada vezes o tempo médio no sistema."
                  />

                  <FormulaDisplay
                    formula="Lq = λWq"
                    calculationSteps={[
                      `Lq = ${formatNumber(
                        results.lambda
                      )} \\cdot ${formatNumber(results.Wq)}`,
                      `Lq = ${formatNumber(
                        results.lambda * results.Wq
                      )} \\approx ${formatNumber(results.Lq)}`,
                    ]}
                    explanation="Lei de Little para a fila: o número médio de clientes na fila é igual à taxa de chegada vezes o tempo médio na fila."
                  />

                  <FormulaDisplay
                    formula="W = Wq + \\frac{1}{μ}"
                    calculationSteps={[
                      `W = ${formatNumber(
                        results.Wq
                      )} + \\frac{1}{${formatNumber(results.mu)}}`,
                      `W = ${formatNumber(results.Wq)} + ${formatNumber(
                        1 / results.mu
                      )}`,
                      `W = ${formatNumber(
                        results.Wq + 1 / results.mu
                      )} \\approx ${formatNumber(results.W)}`,
                    ]}
                    explanation="O tempo médio no sistema é igual ao tempo médio na fila mais o tempo médio de atendimento."
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
