"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface MM1KResultsProps {
  results: {
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
  };
  className?: string;
}

export function MM1KResults({ results, className }: MM1KResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");

  const formatNumber = (num: number) => {
    return num.toFixed(4);
  };

  const isRhoOne = Math.abs(results.rho - 1.0) < 0.000001;

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
                    clientes no máximo
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
                    Probabilidade de sistema vazio (P₀)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.P0)}
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade de perda (P_K)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.PK)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    probabilidade de sistema cheio
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Taxa efetiva de chegada (λ_eff)
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
                  explanation="A utilização do sistema (ρ) representa a fração do tempo que o servidor está ocupado. No modelo M/M/1/K, ρ pode ser maior ou igual a 1, pois a capacidade limitada impede que o sistema fique instável."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade de sistema vazio (P₀)
                </h3>
                {isRhoOne ? (
                  <FormulaDisplay
                    formula="P_0 = \\frac{1}{K+1} \\quad \\text{(para } ρ = 1 \\text{)}"
                    calculationSteps={[
                      `P_0 = \\frac{1}{${results.k}+1}`,
                      `P_0 = \\frac{1}{${results.k + 1}}`,
                      `P_0 = ${formatNumber(results.P0)}`,
                    ]}
                    explanation="A probabilidade de sistema vazio (P₀) quando ρ = 1 é calculada como 1/(K+1)."
                  />
                ) : (
                  <FormulaDisplay
                    formula="P_0 = \\frac{1-ρ}{1-ρ^{K+1}} \\quad \\text{(para } ρ \\neq 1 \\text{)}"
                    calculationSteps={[
                      `P_0 = \\frac{1-${formatNumber(
                        results.rho
                      )}}{1-${formatNumber(results.rho)}^{${results.k}+1}}`,
                      `P_0 = \\frac{${formatNumber(
                        1 - results.rho
                      )}}{${formatNumber(
                        1 - Math.pow(results.rho, results.k + 1)
                      )}}`,
                      `P_0 = ${formatNumber(results.P0)}`,
                    ]}
                    explanation="A probabilidade de sistema vazio (P₀) quando ρ ≠ 1 é calculada como (1-ρ)/(1-ρ^(K+1))."
                  />
                )}
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidades de estado (P_n)
                </h3>
                <FormulaDisplay
                  formula="P_n = ρ^n \\cdot P_0 \\quad \\text{para } 0 \\leq n \\leq K"
                  calculationSteps={[
                    `P_n = ${formatNumber(results.rho)}^n \\cdot ${formatNumber(
                      results.P0
                    )} \\quad \\text{para } 0 \\leq n \\leq ${results.k}`,
                  ]}
                  explanation="As probabilidades de estado (P_n) representam a probabilidade de haver n clientes no sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade de perda (P_K)
                </h3>
                <FormulaDisplay
                  formula="P_K = ρ^K \\cdot P_0"
                  calculationSteps={[
                    `P_K = ${formatNumber(results.rho)}^${
                      results.k
                    } \\cdot ${formatNumber(results.P0)}`,
                    `P_K = ${formatNumber(
                      Math.pow(results.rho, results.k)
                    )} \\cdot ${formatNumber(results.P0)}`,
                    `P_K = ${formatNumber(results.PK)}`,
                  ]}
                  explanation="A probabilidade de perda (P_K) é a probabilidade de o sistema estar cheio, resultando na rejeição de novos clientes."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Taxa efetiva de chegada (λ_eff)
                </h3>
                <FormulaDisplay
                  formula="λ_{eff} = λ(1-P_K)"
                  calculationSteps={[
                    `λ_{eff} = ${results.lambda} \\cdot (1-${formatNumber(
                      results.PK
                    )})`,
                    `λ_{eff} = ${results.lambda} \\cdot ${formatNumber(
                      1 - results.PK
                    )}`,
                    `λ_{eff} = ${formatNumber(results.lambdaEff)}`,
                  ]}
                  explanation="A taxa efetiva de chegada (λ_eff) é a taxa de clientes que efetivamente entram no sistema, considerando as perdas devido à capacidade limitada."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes no sistema (L)
                </h3>
                {isRhoOne ? (
                  <FormulaDisplay
                    formula="L = \\frac{K}{2} \\quad \\text{(para } ρ = 1 \\text{)}"
                    calculationSteps={[
                      `L = \\frac{${results.k}}{2}`,
                      `L = ${formatNumber(results.k / 2)}`,
                    ]}
                    explanation="O número médio de clientes no sistema (L) quando ρ = 1 é calculado como K/2."
                  />
                ) : (
                  <FormulaDisplay
                    formula="L = \\frac{ρ[1-(K+1)ρ^K+Kρ^{K+1}]}{(1-ρ)(1-ρ^{K+1})} \\quad \\text{(para } ρ \\neq 1 \\text{)}"
                    calculationSteps={[
                      `L = \\frac{${formatNumber(results.rho)}[1-(${
                        results.k
                      }+1)${formatNumber(results.rho)}^${results.k}+${
                        results.k
                      }${formatNumber(results.rho)}^{${
                        results.k
                      }+1}]}{(1-${formatNumber(results.rho)})(1-${formatNumber(
                        results.rho
                      )}^{${results.k}+1})}`,
                      `L = ${formatNumber(results.L)}`,
                    ]}
                    explanation="O número médio de clientes no sistema (L) quando ρ ≠ 1 é calculado usando a fórmula acima."
                  />
                )}
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes na fila (Lq)
                </h3>
                <FormulaDisplay
                  formula="L_q = L - (1 - P_0)"
                  calculationSteps={[
                    `L_q = ${formatNumber(results.L)} - (1 - ${formatNumber(
                      results.P0
                    )})`,
                    `L_q = ${formatNumber(results.L)} - ${formatNumber(
                      1 - results.P0
                    )}`,
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
                    formula="L = λ_{eff} \\cdot W"
                    calculationSteps={[
                      `L = ${formatNumber(
                        results.lambdaEff
                      )} \\cdot ${formatNumber(results.W)}`,
                      `L = ${formatNumber(
                        results.lambdaEff * results.W
                      )} \\approx ${formatNumber(results.L)}`,
                    ]}
                    explanation="Lei de Little para o sistema: o número médio de clientes no sistema é igual à taxa efetiva de chegada vezes o tempo médio no sistema."
                  />

                  <FormulaDisplay
                    formula="L_q = λ_{eff} \\cdot W_q"
                    calculationSteps={[
                      `L_q = ${formatNumber(
                        results.lambdaEff
                      )} \\cdot ${formatNumber(results.Wq)}`,
                      `L_q = ${formatNumber(
                        results.lambdaEff * results.Wq
                      )} \\approx ${formatNumber(results.Lq)}`,
                    ]}
                    explanation="Lei de Little para a fila: o número médio de clientes na fila é igual à taxa efetiva de chegada vezes o tempo médio na fila."
                  />

                  <FormulaDisplay
                    formula="W = W_q + \\frac{1}{μ}"
                    calculationSteps={[
                      `W = ${formatNumber(results.Wq)} + \\frac{1}{${
                        results.mu
                      }}`,
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
