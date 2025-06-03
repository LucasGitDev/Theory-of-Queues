"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MM1KResultsType } from "./mm1k-calculator";

interface MM1KResultsProps {
  results: MM1KResultsType;
  className?: string;
}

export function MM1KResults({ results, className }: MM1KResultsProps) {
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
              Resultados do Modelo M/M/1/K
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
                    Capacidade do sistema (K)
                  </div>
                  <div className="mt-1 text-2xl font-bold">{results.k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Intensidade de tráfego (ρ)
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
                    Taxa efetiva de chegada (λeff)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.lambdaEff)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes/unidade de tempo
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade de sistema vazio (P₀)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.P0)}
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade de bloqueio (PK)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.PK)}
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

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
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

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Custo de espera por cliente
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.waitingCost)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    unidades monetárias
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Custo de serviço por cliente
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.serviceCost)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    unidades monetárias
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Número de clientes no sistema
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {results.numClients}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Custo total do sistema
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.totalCost)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    unidades monetárias
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
                    `ρ = \\frac{${formatNumber(results.lambda)}}{${formatNumber(
                      results.mu
                    )}}`,
                    `ρ = ${formatNumber(results.rho)}`,
                  ]}
                  explanation="A utilização do sistema (ρ) representa a fração do tempo que o servidor está ocupado."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade de sistema vazio (P₀)
                </h3>
                <FormulaDisplay
                  formula="P_0 = \\begin{cases} \\frac{1-ρ}{1-ρ^{K+1}}, & \\text{se } ρ \\neq 1 \\\\ \\frac{1}{K+1}, & \\text{se } ρ = 1 \\end{cases}"
                  calculationSteps={[
                    results.rho === 1
                      ? `P_0 = \\frac{1}{${results.k + 1}}`
                      : `P_0 = \\frac{1-${formatNumber(
                          results.rho
                        )}}{1-${formatNumber(results.rho)}^{${results.k + 1}}}`,
                    `P_0 = ${formatNumber(results.P0)}`,
                  ]}
                  explanation="A probabilidade de sistema vazio (P₀) é a probabilidade de não haver clientes no sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade de perda (PK)
                </h3>
                <FormulaDisplay
                  formula="P_K = ρ^K P_0"
                  calculationSteps={[
                    `P_K = ${formatNumber(results.rho)}^${
                      results.k
                    } \\cdot ${formatNumber(results.P0)}`,
                    `P_K = ${formatNumber(results.PK)}`,
                  ]}
                  explanation="A probabilidade de perda (PK) é a probabilidade de um cliente chegar e encontrar o sistema cheio."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Taxa efetiva de chegada (λeff)
                </h3>
                <FormulaDisplay
                  formula="λ_{eff} = λ(1-P_K)"
                  calculationSteps={[
                    `λ_{eff} = ${formatNumber(
                      results.lambda
                    )} \\cdot (1-${formatNumber(results.PK)})`,
                    `λ_{eff} = ${formatNumber(results.lambdaEff)}`,
                  ]}
                  explanation="A taxa efetiva de chegada (λeff) é a taxa de chegada ajustada pela probabilidade de perda."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes no sistema (L)
                </h3>
                <FormulaDisplay
                  formula="L = \\begin{cases} \\frac{ρ}{1-ρ} - \\frac{(K+1)ρ^{K+1}}{1-ρ^{K+1}}, & \\text{se } ρ \\neq 1 \\\\ \\frac{K}{2}, & \\text{se } ρ = 1 \\end{cases}"
                  calculationSteps={[
                    results.rho === 1
                      ? `L = \\frac{${results.k}}{2}`
                      : `L = \\frac{${formatNumber(
                          results.rho
                        )}}{1-${formatNumber(results.rho)}} - \\frac{(${
                          results.k + 1
                        })${formatNumber(results.rho)}^{${
                          results.k + 1
                        }}}{1-${formatNumber(results.rho)}^{${results.k + 1}}}`,
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
                  formula="L_q = L - (1-P_0)"
                  calculationSteps={[
                    `L_q = ${formatNumber(results.L)} - (1-${formatNumber(
                      results.P0
                    )})`,
                    `L_q = ${formatNumber(results.Lq)}`,
                  ]}
                  explanation="O número médio de clientes na fila (Lq) representa apenas os clientes que estão aguardando atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio no sistema (W)
                </h3>
                <FormulaDisplay
                  formula="W = \\frac{L}{λ_{eff}}"
                  calculationSteps={[
                    `W = \\frac{${formatNumber(results.L)}}{${formatNumber(
                      results.lambdaEff
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
                  formula="W_q = \\frac{L_q}{λ_{eff}}"
                  calculationSteps={[
                    `W_q = \\frac{${formatNumber(results.Lq)}}{${formatNumber(
                      results.lambdaEff
                    )}}`,
                    `W_q = ${formatNumber(results.Wq)}`,
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
                    formula="L = λ_{eff}W"
                    calculationSteps={[
                      `L = ${formatNumber(
                        results.lambdaEff
                      )} \\cdot ${formatNumber(results.W)}`,
                      `L = ${formatNumber(results.L)}`,
                    ]}
                    explanation="Lei de Little para o sistema: o número médio de clientes no sistema é igual à taxa efetiva de chegada vezes o tempo médio no sistema."
                  />

                  <FormulaDisplay
                    formula="L_q = λ_{eff}W_q"
                    calculationSteps={[
                      `L_q = ${formatNumber(
                        results.lambdaEff
                      )} \\cdot ${formatNumber(results.Wq)}`,
                      `L_q = ${formatNumber(results.Lq)}`,
                    ]}
                    explanation="Lei de Little para a fila: o número médio de clientes na fila é igual à taxa efetiva de chegada vezes o tempo médio na fila."
                  />

                  <FormulaDisplay
                    formula="W = W_q + \\frac{1}{μ}"
                    calculationSteps={[
                      `W = ${formatNumber(
                        results.Wq
                      )} + \\frac{1}{${formatNumber(results.mu)}}`,
                      `W = ${formatNumber(results.W)}`,
                    ]}
                    explanation="O tempo médio no sistema é igual ao tempo médio na fila mais o tempo médio de atendimento."
                  />

                  <FormulaDisplay
                    formula="L = L_q + (1-P_0)"
                    calculationSteps={[
                      `L = ${formatNumber(results.Lq)} + (1-${formatNumber(
                        results.P0
                      )})`,
                      `L = ${formatNumber(results.L)}`,
                    ]}
                    explanation="O número médio de clientes no sistema é igual ao número médio na fila mais a probabilidade do sistema estar ocupado."
                  />
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Cálculo do Custo Total
                </h3>
                <FormulaDisplay
                  formula="Custo_{total} = Custo_{espera} \\cdot L_q + Custo_{serviço} \\cdot N"
                  calculationSteps={[
                    `Custo_{total} = ${formatNumber(
                      results.waitingCost
                    )} \\cdot ${formatNumber(results.Lq)} + ${formatNumber(
                      results.serviceCost
                    )} \\cdot ${results.numClients}`,
                    `Custo_{total} = ${formatNumber(results.totalCost)}`,
                  ]}
                  explanation="O custo total do sistema é composto pelo custo de espera (custo de espera por cliente multiplicado pelo número médio de clientes na fila) mais o custo de serviço (custo de serviço por cliente multiplicado pelo número total de clientes no sistema)."
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
