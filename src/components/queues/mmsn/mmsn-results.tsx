"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface MMSNResultsProps {
  results: {
    lambda: number;
    mu: number;
    s: number;
    n: number;
    a: number;       // Razão lambda/mu
    P0: number;      // Probabilidade do sistema estar vazio
    lambdaEff: number; // Taxa efetiva de chegada
    L: number;       // Número médio no sistema
    Lq: number;      // Número médio na fila
    W: number;       // Tempo médio no sistema
    Wq: number;      // Tempo médio na fila
    Pn: number[];    // Probabilidades de estado
  };
  className?: string;
}

export function MMSNResults({ results, className }: MMSNResultsProps) {
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
              Resultados do Modelo M/M/s/N/N (População Finita)
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
                    Taxa de chegada por máquina (λ)
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
                    Tamanho da população (N)
                  </div>
                  <div className="mt-1 text-2xl font-bold">{results.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    máquinas totais
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                  <div className="text-sm font-medium text-muted-foreground">
                    Razão λ/μ (a)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.a)}
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
                    máquinas quebradas
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
                    máquinas esperando conserto
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
                  Probabilidade de sistema vazio (P₀)
                </h3>
                <FormulaDisplay
                  formula="P_0 = \\left[ \\sum_{n=0}^{s-1} \\frac{N!}{(N-n)!n!}a^n + \\sum_{n=s}^{N} \\frac{N!}{(N-n)!s!s^{n-s}}a^n \\right]^{-1}"
                  calculationSteps={[
                    `P_0 = \\left[ \\sum_{n=0}^{${results.s}-1} \\frac{${results.n}!}{(${results.n}-n)!n!}(${formatNumber(results.a)})^n + \\sum_{n=${results.s}}^{${results.n}} \\frac{${results.n}!}{(${results.n}-n)!${results.s}!${results.s}^{n-${results.s}}}(${formatNumber(results.a)})^n \\right]^{-1}`,
                    `P_0 = ${formatNumber(results.P0)}`,
                  ]}
                  explanation="A probabilidade de sistema vazio (P₀) considera todas as combinações possíveis de máquinas quebradas."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Probabilidades de estado (P_n)
                </h3>
                <FormulaDisplay
                  formula="P_n = \\begin{cases} 
                    \\frac{N!}{(N-n)!n!}a^n P_0, & \\text{para } 0 \\leq n \\leq s \\\\
                    \\frac{N!}{(N-n)!s!s^{n-s}}a^n P_0, & \\text{para } s < n \\leq N
                    \\end{cases}"
                  calculationSteps={[
                    `P_n = \\begin{cases} 
                      \\frac{${results.n}!}{(${results.n}-n)!n!}(${formatNumber(results.a)})^n \\cdot ${formatNumber(results.P0)}, & \\text{para } 0 \\leq n \\leq ${results.s} \\\\
                      \\frac{${results.n}!}{(${results.n}-n)!${results.s}!${results.s}^{n-${results.s}}}(${formatNumber(results.a)})^n \\cdot ${formatNumber(results.P0)}, & \\text{para } ${results.s} < n \\leq ${results.n}
                      \\end{cases}`
                  ]}
                  explanation="As probabilidades de estado (P_n) representam a probabilidade de haver n máquinas quebradas."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Taxa efetiva de chegada (λ_eff)
                </h3>
                <FormulaDisplay
                  formula="λ_{eff} = λ(N - L)"
                  calculationSteps={[
                    `λ_{eff} = ${results.lambda} \\cdot (${results.n} - ${formatNumber(results.L)})`,
                    `λ_{eff} = ${results.lambda} \\cdot ${formatNumber(results.n - results.L)}`,
                    `λ_{eff} = ${formatNumber(results.lambdaEff)}`,
                  ]}
                  explanation="A taxa efetiva de chegada considera apenas as máquinas que estão operando e podem quebrar."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio no sistema (L)
                </h3>
                <FormulaDisplay
                  formula="L = \\sum_{n=1}^{N} n \\cdot P_n"
                  calculationSteps={[
                    `L = \\sum_{n=1}^{${results.n}} n \\cdot P_n`,
                    `L = ${formatNumber(results.L)}`
                  ]}
                  explanation="O número médio de máquinas quebradas no sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio na fila (Lq)
                </h3>
                <FormulaDisplay
                  formula="L_q = L - \\frac{λ_{eff}}{μ}"
                  calculationSteps={[
                    `L_q = ${formatNumber(results.L)} - \\frac{${formatNumber(results.lambdaEff)}}{${results.mu}}`,
                    `L_q = ${formatNumber(results.L)} - ${formatNumber(results.lambdaEff / results.mu)}`,
                    `L_q = ${formatNumber(results.Lq)}`
                  ]}
                  explanation="O número médio de máquinas esperando conserto (excluindo as em atendimento)."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio no sistema (W)
                </h3>
                <FormulaDisplay
                  formula="W = \\frac{L}{λ_{eff}}"
                  calculationSteps={[
                    `W = \\frac{${formatNumber(results.L)}}{${formatNumber(results.lambdaEff)}}`,
                    `W = ${formatNumber(results.W)}`
                  ]}
                  explanation="Tempo médio que uma máquina fica quebrada (espera + conserto)."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio na fila (Wq)
                </h3>
                <FormulaDisplay
                  formula="W_q = \\frac{L_q}{λ_{eff}}"
                  calculationSteps={[
                    `W_q = \\frac{${formatNumber(results.Lq)}}{${formatNumber(results.lambdaEff)}}`,
                    `W_q = ${formatNumber(results.Wq)}`
                  ]}
                  explanation="Tempo médio que uma máquina espera para ser consertada."
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}