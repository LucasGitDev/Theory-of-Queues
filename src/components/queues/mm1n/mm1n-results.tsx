"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface MM1NResultsProps {
  results: {
    lambda: number;
    mu: number;
    n: number;
    rho: number;
    P0: number;
    L: number;
    Lq: number;
    M: number;
    lambdaEff: number;
    W: number;
    Wq: number;
    Pn: number[];
  };
  className?: string;
}

export function MM1NResults({ results, className }: MM1NResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");

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
              Resultados do Modelo M/M/1/N (População Finita)
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
                    Taxa de chegada por cliente inativo (λ)
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
                    Tamanho da população (N)
                  </div>
                  <div className="mt-1 text-2xl font-bold">{results.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes potenciais
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Razão λ/μ (ρ)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.rho)}
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
                    Número médio fora do sistema (M)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.M)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    clientes
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
                <h3 className="text-lg font-medium mb-2">Razão λ/μ (ρ)</h3>
                <FormulaDisplay
                  formula="ρ = \\frac{λ}{μ}"
                  calculationSteps={[
                    `ρ = \\frac{${results.lambda}}{${results.mu}}`,
                    `ρ = ${formatNumber(results.rho)}`,
                  ]}
                  explanation="A razão ρ = λ/μ é um parâmetro importante no modelo de população finita, representando a relação entre a taxa de chegada por cliente inativo e a taxa de serviço."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidade de sistema vazio (P₀)
                </h3>
                <FormulaDisplay
                  formula="P_0 = \\left[ \\sum_{k=0}^{N} \\frac{N!}{(N-k)!} ρ^k \\right]^{-1}"
                  calculationSteps={[
                    `P_0 = \\left[ \\sum_{k=0}^{${results.n}} \\frac{${
                      results.n
                    }!}{(${results.n}-k)!} ${formatNumber(
                      results.rho
                    )}^k \\right]^{-1}`,
                    `P_0 = ${formatNumber(results.P0)}`,
                  ]}
                  explanation="A probabilidade de sistema vazio (P₀) é a probabilidade de não haver clientes no sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidades de estado (P_n)
                </h3>
                <FormulaDisplay
                  formula="P_n = \\frac{N!}{(N-n)!} ρ^n P_0 \\quad \\text{para } 0 \\leq n \\leq N"
                  calculationSteps={[
                    `P_n = \\frac{${results.n}!}{(${
                      results.n
                    }-n)!} ${formatNumber(results.rho)}^n \\cdot ${formatNumber(
                      results.P0
                    )} \\quad \\text{para } 0 \\leq n \\leq ${results.n}`,
                  ]}
                  explanation="As probabilidades de estado (P_n) representam a probabilidade de haver n clientes no sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes no sistema (L)
                </h3>
                <FormulaDisplay
                  formula="L = \\sum_{n=1}^{N} n \\cdot P_n"
                  calculationSteps={[
                    `L = \\sum_{n=1}^{${results.n}} n \\cdot P_n`,
                    `L = ${formatNumber(results.L)}`,
                  ]}
                  explanation="O número médio de clientes no sistema (L) é calculado como a soma ponderada do número de clientes multiplicado pela probabilidade correspondente."
                />
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
                  Número médio de clientes fora do sistema (M)
                </h3>
                <FormulaDisplay
                  formula="M = N - L"
                  calculationSteps={[
                    `M = ${results.n} - ${formatNumber(results.L)}`,
                    `M = ${formatNumber(results.M)}`,
                  ]}
                  explanation="O número médio de clientes fora do sistema (M) representa os clientes potenciais que não estão no sistema (nem na fila nem em atendimento)."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Taxa efetiva de chegada (λ_eff)
                </h3>
                <FormulaDisplay
                  formula="λ_{eff} = λ \\cdot M"
                  calculationSteps={[
                    `λ_{eff} = ${results.lambda} \\cdot ${formatNumber(
                      results.M
                    )}`,
                    `λ_{eff} = ${formatNumber(results.lambdaEff)}`,
                  ]}
                  explanation="A taxa efetiva de chegada (λ_eff) é a taxa total de chegada ao sistema, considerando que apenas os clientes fora do sistema podem gerar novas chegadas."
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
