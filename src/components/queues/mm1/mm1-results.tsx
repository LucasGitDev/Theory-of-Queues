"use client";

import { FormulaDisplay } from "@/components/queues/formula-display";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MM1ResultsType } from "./mm1-calculator";

interface MM1ResultsProps {
  results: MM1ResultsType;
  className?: string;
}

export function MM1Results({ results, className }: MM1ResultsProps) {
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

                {results.waitingTime && (
                  <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Probabilidade de espera &gt; {results.waitingTime} (Px)
                    </div>
                    <div className="mt-1 text-2xl font-bold">
                      {formatNumber(results.Px ?? 0)}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      probabilidade
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {formatNumber((results.Px ?? 0) * 100)}% dos clientes
                      esperam mais de {results.waitingTime} unidades de tempo
                    </div>
                  </div>
                )}

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade do sistema estar ocupado (Pocupado, n &gt; 0)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.POccupied, 4)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Para n = 1
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    O sistema está ocupado (pelo menos 1 cliente){" "}
                    {formatNumber(results.POccupied * 100, 4)}% do tempo
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade de exatamente 1 cliente no sistema (Pn, n=1)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.Pn, 4)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    n = 1
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Probabilidade de haver exatamente 1 cliente no sistema
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade de mais de 1 cliente no sistema (Pnr, r=1)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.Pnr, 4)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    r = 1
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Probabilidade de haver mais de 1 cliente no sistema
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade do sistema estar ocioso (Pn0)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.Pn0, 4)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    n = 0
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Probabilidade do sistema estar vazio (sem clientes)
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade do tempo de espera no sistema ser maior que w
                    (PW)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.PW, 4)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    w = 1 (padrão)
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Probabilidade de um cliente esperar mais que w=1 no sistema
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white dark:bg-slate-950 md:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Probabilidade do tempo de espera na fila ser maior que wq
                    (Pwq)
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {formatNumber(results.Pwq, 4)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    wq = 1 (padrão)
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Probabilidade de um cliente esperar mais que wq=1 na fila
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
                    `\\rho = \\frac{${formatNumber(
                      results.lambda,
                      4
                    )}}{${formatNumber(results.mu, 4)}}`,
                    `\\rho = ${formatNumber(results.lambda / results.mu, 4)}`,
                  ]}
                  explanation="A utilização do sistema (ρ) representa a fração do tempo que o servidor está ocupado. Para que o sistema seja estável, ρ deve ser menor que 1. Quanto mais próximo de 1, maior a chance de congestionamento. Esta é a razão entre a taxa de chegada e a taxa de serviço."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes no sistema (L)
                </h3>
                <FormulaDisplay
                  formula={"L = \\frac{\\rho}{1-\\rho}"}
                  calculationSteps={[
                    `L = \\frac{${formatNumber(
                      results.rho,
                      4
                    )}}{1-${formatNumber(results.rho, 4)}}`,
                    `L = \\frac{${formatNumber(results.rho, 4)}}{${formatNumber(
                      1 - results.rho,
                      4
                    )}}`,
                    `L = ${formatNumber(results.L, 4)}`,
                  ]}
                  explanation="O número médio de clientes no sistema (L) inclui tanto os clientes em atendimento quanto os que estão na fila. Este valor aumenta exponencialmente conforme ρ se aproxima de 1. A fórmula é derivada da distribuição de probabilidade do número de clientes no sistema."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Número médio de clientes na fila (Lq)
                </h3>
                <FormulaDisplay
                  formula={"L_q = \\frac{\\rho^2}{1-\\rho}"}
                  calculationSteps={[
                    `L_q = \\frac{${formatNumber(
                      results.rho,
                      4
                    )}^2}{1-${formatNumber(results.rho, 4)}}`,
                    `L_q = \\frac{${formatNumber(
                      Math.pow(results.rho, 2),
                      4
                    )}}{${formatNumber(1 - results.rho, 4)}}`,
                    `L_q = ${formatNumber(results.Lq, 4)}`,
                  ]}
                  explanation="O número médio de clientes na fila (Lq) representa apenas os clientes que estão aguardando atendimento. Este valor é sempre menor que L, pois exclui o cliente em atendimento. A fórmula é obtida multiplicando ρ por L, já que a fila é o sistema menos o cliente em atendimento."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio no sistema (W)
                </h3>
                <FormulaDisplay
                  formula={"W = \\frac{1}{\\mu-\\lambda}"}
                  calculationSteps={[
                    `W = \\frac{1}{${formatNumber(
                      results.mu,
                      4
                    )}-${formatNumber(results.lambda, 4)}}`,
                    `W = \\frac{1}{${formatNumber(
                      results.mu - results.lambda,
                      4
                    )}}`,
                    `W = ${formatNumber(results.W, 4)}`,
                  ]}
                  explanation="O tempo médio que um cliente passa no sistema (W) inclui tanto o tempo de espera na fila quanto o tempo de atendimento. Este valor é crucial para avaliar a qualidade do serviço. A fórmula é derivada da distribuição exponencial do tempo de serviço."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Tempo médio na fila (Wq)
                </h3>
                <FormulaDisplay
                  formula={"W_q = \\frac{\\rho}{\\mu-\\lambda}"}
                  calculationSteps={[
                    `W_q = \\frac{${formatNumber(
                      results.rho,
                      4
                    )}}{${formatNumber(results.mu, 4)}-${formatNumber(
                      results.lambda,
                      4
                    )}}`,
                    `W_q = \\frac{${formatNumber(
                      results.rho,
                      4
                    )}}{${formatNumber(results.mu - results.lambda, 4)}}`,
                    `W_q = ${formatNumber(results.Wq, 4)}`,
                  ]}
                  explanation="O tempo médio que um cliente passa na fila (Wq) representa apenas o tempo de espera antes do atendimento. Este valor é importante para avaliar a satisfação dos clientes. A fórmula é obtida multiplicando ρ pelo tempo médio de serviço (1/μ)."
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
                  explanation="A probabilidade do sistema estar vazio (P0) é complementar à utilização do sistema. Esta é a probabilidade de que não haja clientes no sistema em um momento qualquer."
                />
              </div>

              <div className="rounded-lg border p-4 bg-white dark:bg-slate-950">
                <h3 className="text-lg font-medium mb-2">
                  Relações entre os indicadores
                </h3>
                <div className="mt-2 space-y-3">
                  <FormulaDisplay
                    formula={"L = \\lambda W"}
                    calculationSteps={[
                      `L = ${formatNumber(
                        results.lambda,
                        4
                      )} \\cdot ${formatNumber(results.W, 4)}`,
                      `L = ${formatNumber(results.L, 4)}`,
                    ]}
                    explanation="Lei de Little para o sistema: o número médio de clientes no sistema é igual à taxa de chegada vezes o tempo médio no sistema. Esta relação é fundamental na teoria das filas e permite validar os cálculos."
                  />

                  <FormulaDisplay
                    formula={"L_q = \\lambda W_q"}
                    calculationSteps={[
                      `L_q = ${formatNumber(
                        results.lambda,
                        4
                      )} \\cdot ${formatNumber(results.Wq, 4)}`,
                      `L_q = ${formatNumber(results.Lq, 4)}`,
                    ]}
                    explanation="Lei de Little para a fila: o número médio de clientes na fila é igual à taxa de chegada vezes o tempo médio na fila. Esta relação é uma consequência direta da Lei de Little para o sistema."
                  />

                  <FormulaDisplay
                    formula={"W = W_q + \\frac{1}{\\mu}"}
                    calculationSteps={[
                      `W = ${formatNumber(
                        results.Wq,
                        4
                      )} + \\frac{1}{${formatNumber(results.mu, 4)}}`,
                      `W = ${formatNumber(results.W, 4)}`,
                    ]}
                    explanation="O tempo médio no sistema é igual ao tempo médio na fila mais o tempo médio de atendimento. Esta relação é fundamental para entender a decomposição do tempo total no sistema."
                  />

                  <FormulaDisplay
                    formula={"L = L_q + \\rho"}
                    calculationSteps={[
                      `L = ${formatNumber(results.Lq, 4)} + ${formatNumber(
                        results.rho,
                        4
                      )}`,
                      `L = ${formatNumber(results.L, 4)}`,
                    ]}
                    explanation="O número médio de clientes no sistema é igual ao número médio na fila mais a utilização do sistema. Esta relação mostra que o sistema sempre tem pelo menos um cliente quando está ocupado."
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
