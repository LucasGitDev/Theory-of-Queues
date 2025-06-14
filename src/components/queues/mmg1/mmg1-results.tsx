"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MG1ResultsType } from "./mmg1-calculator";

interface MMG1ResultsProps {
  results: MG1ResultsType;
  className?: string;
}

export function MMG1Results({ results, className }: MMG1ResultsProps) {
  const [, setActiveTab] = useState("summary");
  const formatNumber = (num: number, precision: number = 4) => {
    return num.toFixed(precision);
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
              Resultados do Modelo M/G/1
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    Representa quantos clientes chegam ao sistema por unidade de
                    tempo
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    Representa quantos clientes o servidor consegue atender por
                    unidade de tempo
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Variância do tempo de serviço (σ²)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.sigmaSquared)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    unidades de tempo²
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Mede a variabilidade no tempo de atendimento
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    {results.rho < 0.7
                      ? "O sistema está operando com boa margem de segurança"
                      : results.rho < 0.85
                        ? "O sistema está operando próximo do limite recomendado"
                        : "O sistema está operando próximo da saturação"}
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    Em média, existem {formatNumber(results.L)} clientes no
                    sistema (incluindo atendimento)
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    Em média, existem {formatNumber(results.Lq)} clientes
                    aguardando na fila
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    Um cliente permanece no sistema por{" "}
                    {formatNumber(results.W)} unidades de tempo em média
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    Um cliente aguarda na fila por {formatNumber(results.Wq)}{" "}
                    unidades de tempo em média
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade de sistema vazio (P0)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.P0)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    probabilidade
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    O sistema está vazio {formatNumber(results.P0 * 100)}% do
                    tempo
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Coeficiente de variação (C)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.sigmaSquared)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    adimensional
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Mede a variabilidade relativa do tempo de serviço
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
                  formula={"\\rho = \\frac{\\lambda}{\\mu}"}
                  calculationSteps={[
                    `\\rho = \\frac{${formatNumber(results.lambda, 4)}}{${formatNumber(results.mu, 4)}}`,
                    `\\rho = ${formatNumber(results.lambda / results.mu, 4)}`,
                  ]}
                  explanation="A utilização do sistema (ρ) representa a fração do tempo que o servidor está ocupado. Para que o sistema seja estável, ρ deve ser menor que 1."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes na fila (Lq) - Fórmula de Pollaczek-Khinchine
                </h3>
                <FormulaDisplay
                  formula={"L_q = \\frac{\\rho^2 + \\lambda^2 \\sigma^2}{2(1-\\rho)}"}
                  calculationSteps={[
                    `L_q = \\frac{${formatNumber(Math.pow(results.rho, 2), 4)} + ${formatNumber(Math.pow(results.lambda, 2), 4)} \\cdot ${formatNumber(results.sigmaSquared, 4)}}{2(1-${formatNumber(results.rho, 4)})}`,
                    `L_q = \\frac{${formatNumber(Math.pow(results.rho, 2), 4)} + ${formatNumber(Math.pow(results.lambda, 2) * results.sigmaSquared, 4)}}{${formatNumber(2 * (1 - results.rho), 4)}}`,
                    `L_q = ${formatNumber(results.Lq, 4)}`,
                  ]}
                  explanation="A fórmula de Pollaczek-Khinchine calcula o número médio de clientes na fila considerando a variabilidade do tempo de serviço. Quanto maior a variância, maior será a fila."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes no sistema (L)
                </h3>
                <FormulaDisplay
                  formula={"L = L_q + \\rho"}
                  calculationSteps={[
                    `L = ${formatNumber(results.Lq, 4)} + ${formatNumber(results.rho, 4)}`,
                    `L = ${formatNumber(results.L, 4)}`,
                  ]}
                  explanation="O número médio de clientes no sistema inclui tanto os clientes na fila quanto o cliente em atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio na fila (Wq)
                </h3>
                <FormulaDisplay
                  formula={"W_q = \\frac{L_q}{\\lambda}"}
                  calculationSteps={[
                    `W_q = \\frac{${formatNumber(results.Lq, 4)}}{${formatNumber(results.lambda, 4)}}`,
                    `W_q = ${formatNumber(results.Wq, 4)}`,
                  ]}
                  explanation="O tempo médio na fila é obtido aplicando a Lei de Little à fila."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio no sistema (W)
                </h3>
                <FormulaDisplay
                  formula={"W = W_q + \\frac{1}{\\mu}"}
                  calculationSteps={[
                    `W = ${formatNumber(results.Wq, 4)} + \\frac{1}{${formatNumber(results.mu, 4)}}`,
                    `W = ${formatNumber(results.W, 4)}`,
                  ]}
                  explanation="O tempo médio no sistema inclui o tempo na fila mais o tempo de atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade do sistema estar vazio (P0)
                </h3>
                <FormulaDisplay
                  formula={"P_0 = 1 - \\rho"}
                  calculationSteps={[
                    `P_0 = 1 - ${formatNumber(results.rho, 4)}`,
                    `P_0 = ${formatNumber(results.P0, 4)}`,
                  ]}
                  explanation="A probabilidade do sistema estar vazio é complementar à utilização do sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Coeficiente de variação (C)
                </h3>
                <FormulaDisplay
                  formula={"C = \\frac{\\sigma}{E[S]}"}
                  calculationSteps={[
                    `C = \\frac{${formatNumber(Math.sqrt(results.sigmaSquared), 4)}}{${formatNumber(1 / results.mu, 4)}}`,
                    `C = ${formatNumber(results.sigmaSquared, 4)}`,
                  ]}
                  explanation="O coeficiente de variação mede a variabilidade relativa do tempo de serviço, onde σ é o desvio padrão e E[S] é o tempo médio de serviço."
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
