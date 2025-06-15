"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { MG1PriorityResults } from './mg1Priority-calculator'

interface MG1PResultsProps {
  results: MG1PriorityResults;
  className?: string;
}

export function MG1PResults({ results, className }: MG1PResultsProps) {
  const [, setActiveTab] = useState("summary");
  const formatNumber = (num: number, precision: number = 4) => {
    return num.toFixed(precision);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Resultados do Modelo M/G/1</h3>

        {/* Global metrics */}
        <div className="grid gap-4 mb-6">
          <h4 className="font-medium">Métricas Globais</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Taxa total (λ)</div>
              <div className="text-2xl font-bold">{results.lambda.toFixed(4)}</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Taxa serviço (μ)</div>
              <div className="text-2xl font-bold">{results.mu.toFixed(4)}</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Utilização (ρ)</div>
              <div className="text-2xl font-bold">{results.rho.toFixed(4)}</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Variância (σ²)</div>
              <div className="text-2xl font-bold">{results.sigmaSquared.toFixed(6)}</div>
            </div>
          </div>
        </div>

        {/* Simple M/G/1 results (no priorities) */}
        {results.simpleMG1 && (
          <div className="grid gap-4 mb-6">
            <h4 className="font-medium">Modelo M/G/1 Simples (sem prioridades)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">L (sistema)</div>
                <div className="text-2xl font-bold">{results.simpleMG1.L.toFixed(4)}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Lq (fila)</div>
                <div className="text-2xl font-bold">{results.simpleMG1.Lq.toFixed(4)}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">W (sistema)</div>
                <div className="text-2xl font-bold">{results.simpleMG1.W.toFixed(4)}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Wq (fila)</div>
                <div className="text-2xl font-bold">{results.simpleMG1.Wq.toFixed(4)}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">P0</div>
                <div className="text-2xl font-bold">{results.simpleMG1.P0.toFixed(4)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Priority system results */}
        {results.classes.length > 0 && (
          <>
            {/* With interruption */}
            <div className="grid gap-4 mb-6">
              <h4 className="font-medium">Prioridades com Interrupção</h4>
              {results.classes.map((classInfo, index) => (
                <div key={`with-${index}`} className="rounded-lg border p-4">
                  <h5 className="font-medium mb-2">{classInfo.label}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">W (sistema)</div>
                      <div>{results.withInterruption?.W[index].toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Wq (fila)</div>
                      <div>{results.withInterruption?.Wq[index].toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">L (sistema)</div>
                      <div>{results.withInterruption?.L[index].toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Lq (fila)</div>
                      <div>{results.withInterruption?.Lq[index].toFixed(4)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Without interruption */}
            <div className="grid gap-4">
              <h4 className="font-medium">Prioridades sem Interrupção</h4>
              {results.classes.map((classInfo, index) => (
                <div key={`without-${index}`} className="rounded-lg border p-4">
                  <h5 className="font-medium mb-2">{classInfo.label}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">W (sistema)</div>
                      <div>{results.withoutInterruption?.W[index].toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Wq (fila)</div>
                      <div>{results.withoutInterruption?.Wq[index].toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">L (sistema)</div>
                      <div>{results.withoutInterruption?.L[index].toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Lq (fila)</div>
                      <div>{results.withoutInterruption?.Lq[index].toFixed(4)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
