"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MMSResultsType } from "./mms-calculator";

interface MMSResultsProps {
  results: MMSResultsType;
  className?: string;
}

export function MMSResults({ results, className }: MMSResultsProps) {
  const [, setActiveTab] = useState("summary");

  const formatNumber = (num: number) => {
    return num.toFixed(4);
  };

  // Função para calcular fatorial
  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
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
              Resultados do Modelo M/M/s
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
                    Taxa de serviço por servidor (μ)
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
                    Número de servidores (s)
                  </div>
                  <div className="mt-1 text-2xl font-bold">{results.s}</div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Utilização do sistema (ρ)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.rho)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    fração do tempo que cada servidor está ocupado
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

                {results.n !== undefined && (
                  <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                    <div className="text-sm font-medium text-muted-foreground">
                      Probabilidade de {results.n} clientes no sistema (P
                      {results.n})
                    </div>
                    <div className="mt-1 text-2xl font-bold">
                      {formatNumber(results.Pn)}
                    </div>
                  </div>
                )}

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade de cliente na fila (P_queue)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.P_queue)}
                  </div>
                </div>

                {results.PW !== undefined && (
                  <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                    <div className="text-sm font-medium text-muted-foreground">
                      Probabilidade de espera {">"} w (PW)
                    </div>
                    <div className="mt-1 text-2xl font-bold">
                      {formatNumber(results.PW)}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      probabilidade do tempo de espera no sistema ser maior que
                      w
                    </div>
                  </div>
                )}

                {results.Pwq !== undefined && (
                  <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                    <div className="text-sm font-medium text-muted-foreground">
                      Probabilidade de espera na fila {">"} w (Pwq)
                    </div>
                    <div className="mt-1 text-2xl font-bold">
                      {formatNumber(results.Pwq)}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      probabilidade do tempo de espera na fila ser maior que w
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-0 space-y-6">
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Utilização do sistema (ρ)
                </h3>
                <FormulaDisplay
                  formula="ρ = \\frac{λ}{s·μ}"
                  calculationSteps={[
                    `ρ = \\frac{${results.lambda}}{${results.s} \\cdot ${results.mu}}`,
                    `ρ = \\frac{${results.lambda}}{${results.s * results.mu}}`,
                    `ρ = ${formatNumber(results.rho)}`,
                  ]}
                  explanation="A utilização do sistema (ρ) representa a fração do tempo que cada servidor está ocupado. Para que o sistema seja estável, ρ deve ser menor que 1."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade de sistema vazio (P₀)
                </h3>
                <FormulaDisplay
                  formula="P_0 = \\left[ \\sum_{k=0}^{s-1} \\frac{(λ/μ)^k}{k!} + \\frac{(λ/μ)^s}{s!} \\cdot \\frac{1}{1-ρ} \\right]^{-1}"
                  calculationSteps={[
                    `P_0 = \\left[ \\sum_{k=0}^{${results.s}-1} \\frac{(${
                      results.lambda
                    }/${results.mu})^k}{k!} + \\frac{(${results.lambda}/${
                      results.mu
                    })^${results.s}}{${
                      results.s
                    }!} \\cdot \\frac{1}{1-${formatNumber(
                      results.rho
                    )}} \\right]^{-1}`,
                    `P_0 = ${formatNumber(results.P0)}`,
                  ]}
                  explanation="A probabilidade de sistema vazio (P₀) é a probabilidade de não haver clientes no sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes na fila (Lq)
                </h3>
                <FormulaDisplay
                  formula="L_q = \\frac{P_0 (λ/μ)^s ρ}{s!(1-ρ)^2}"
                  calculationSteps={[
                    `L_q = \\frac{${formatNumber(results.P0)} \\cdot (${
                      results.lambda
                    }/${results.mu})^${results.s} \\cdot ${formatNumber(
                      results.rho
                    )}}{${results.s}! \\cdot (1-${formatNumber(
                      results.rho
                    )})^2}`,
                    `L_q = \\frac{${formatNumber(
                      results.P0
                    )} \\cdot ${formatNumber(
                      Math.pow(results.lambda / results.mu, results.s)
                    )} \\cdot ${formatNumber(results.rho)}}{${formatNumber(
                      factorial(results.s)
                    )} \\cdot ${formatNumber(Math.pow(1 - results.rho, 2))}}`,
                    `L_q = ${formatNumber(results.Lq)}`,
                  ]}
                  explanation="O número médio de clientes na fila (Lq) representa apenas os clientes que estão aguardando atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes no sistema (L)
                </h3>
                <FormulaDisplay
                  formula="L = L_q + \\frac{λ}{μ}"
                  calculationSteps={[
                    `L = ${formatNumber(results.Lq)} + \\frac{${
                      results.lambda
                    }}{${results.mu}}`,
                    `L = ${formatNumber(results.Lq)} + ${formatNumber(
                      results.lambda / results.mu
                    )}`,
                    `L = ${formatNumber(results.L)}`,
                  ]}
                  explanation="O número médio de clientes no sistema (L) inclui tanto os clientes em atendimento quanto os que estão na fila."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio na fila (Wq)
                </h3>
                <FormulaDisplay
                  formula="W_q = \\frac{L_q}{λ}"
                  calculationSteps={[
                    `W_q = \\frac{${formatNumber(results.Lq)}}{${
                      results.lambda
                    }}`,
                    `W_q = ${formatNumber(results.Wq)}`,
                  ]}
                  explanation="O tempo médio que um cliente passa na fila (Wq) representa apenas o tempo de espera antes do atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio no sistema (W)
                </h3>
                <FormulaDisplay
                  formula="W = W_q + \\frac{1}{μ}"
                  calculationSteps={[
                    `W = ${formatNumber(results.Wq)} + \\frac{1}{${
                      results.mu
                    }}`,
                    `W = ${formatNumber(results.Wq)} + ${formatNumber(
                      1 / results.mu
                    )}`,
                    `W = ${formatNumber(results.W)}`,
                  ]}
                  explanation="O tempo médio que um cliente passa no sistema (W) inclui tanto o tempo de espera na fila quanto o tempo de atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade do sistema estar ocioso (Pn0)
                </h3>
                <FormulaDisplay
                  formula={"P_0 = P_0"}
                  calculationSteps={[`P_0 = ${formatNumber(results.P0)}`]}
                  explanation="Probabilidade do sistema estar vazio (sem clientes), ou seja, n=0."
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
                    formula="L_q = λW_q"
                    calculationSteps={[
                      `L_q = ${formatNumber(
                        results.lambda
                      )} \\cdot ${formatNumber(results.Wq)}`,
                      `L_q = ${formatNumber(
                        results.lambda * results.Wq
                      )} \\approx ${formatNumber(results.Lq)}`,
                    ]}
                    explanation="Lei de Little para a fila: o número médio de clientes na fila é igual à taxa de chegada vezes o tempo médio na fila."
                  />
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade de cliente na fila (P_queue)
                </h3>
                <FormulaDisplay
                  formula="P_{queue} = \\frac{P_0 (λ/μ)^s}{s!} \\cdot \\frac{1}{1-ρ}"
                  calculationSteps={[
                    `P_{queue} = \\frac{${formatNumber(results.P0)} \\cdot (${
                      results.lambda
                    }/${results.mu})^${results.s}}{${
                      results.s
                    }!} \\cdot \\frac{1}{1-${formatNumber(results.rho)}}`,
                    `P_{queue} = ${formatNumber(results.P_queue)}`,
                  ]}
                  explanation="A probabilidade de um cliente chegar e encontrar todos os servidores ocupados, tendo que esperar na fila."
                />
              </div>

              {results.n !== undefined && (
                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <h3 className="text-lg font-medium mb-2">
                    Probabilidade de {results.n} clientes no sistema (P
                    {results.n})
                  </h3>
                  <FormulaDisplay
                    formula={`P_n = \\begin{cases} 
                      \\frac{(λ/μ)^n}{n!} P_0, & \\text{para } 0 \\leq n \\leq s \\\\
                      \\frac{(λ/μ)^n}{s! \\cdot s^{n-s}} P_0, & \\text{para } n > s
                      \\end{cases}`}
                    calculationSteps={[
                      results.n < results.s
                        ? `P_${results.n} = \\frac{(${results.lambda}/${
                            results.mu
                          })^${results.n}}{${results.n}!} \\cdot ${formatNumber(
                            results.P0
                          )}`
                        : `P_${results.n} = \\frac{(${results.lambda}/${
                            results.mu
                          })^${results.n}}{${results.s}! \\cdot ${results.s}^{${
                            results.n
                          }-${results.s}}} \\cdot ${formatNumber(results.P0)}`,
                      `P_${results.n} = ${formatNumber(results.Pn)}`,
                    ]}
                    explanation="A probabilidade de haver exatamente n clientes no sistema."
                  />
                </div>
              )}

              {results.PW !== undefined && (
                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <h3 className="text-lg font-medium mb-2">
                    Probabilidade de espera {">"} w (PW)
                  </h3>
                  <FormulaDisplay
                    formula="P(W > w) = e^{-μw} \\left[1 + \\frac{P_0 (λ/μ)^s}{s!(1-ρ)} \\cdot \\frac{1-e^{-μw(s-1-λ/μ)}}{s-1-λ/μ}\\right]"
                    calculationSteps={[
                      `P(W > w) = e^{-${
                        results.mu
                      }w} \\left[1 + \\frac{${formatNumber(results.P0)} (${
                        results.lambda
                      }/${results.mu})^${results.s}}{${
                        results.s
                      }!(1-${formatNumber(results.rho)})} \\cdot \\frac{1-e^{-${
                        results.mu
                      }w(${results.s}-1-${results.lambda}/${results.mu})}}{${
                        results.s
                      }-1-${results.lambda}/${results.mu}}\\right]`,
                      `P(W > w) = ${formatNumber(results.PW)}`,
                    ]}
                    explanation="A probabilidade do tempo de espera no sistema ser maior que w."
                  />
                </div>
              )}

              {results.Pwq !== undefined && (
                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <h3 className="text-lg font-medium mb-2">
                    Probabilidade de espera na fila {">"} w (Pwq)
                  </h3>
                  <FormulaDisplay
                    formula="P(W_q > w) = (1-P(W_q=0))e^{-μ(s-ρs)w}"
                    calculationSteps={[
                      `P(W_q > w) = (1-P(W_q=0))e^{-${results.mu}(${
                        results.s
                      }-${formatNumber(results.rho)}${results.s})w}`,
                      `P(W_q > w) = ${formatNumber(results.Pwq)}`,
                    ]}
                    explanation="A probabilidade do tempo de espera na fila ser maior que w."
                  />
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
