"use client";

import { MM1Calculator } from "@/components/queues/mm1/mm1-calculator";
import { MM1KCalculator } from "@/components/queues/mm1k/mm1k-calculator";
import { MM1NCalculator } from "@/components/queues/mm1n/mm1n-calculator";
import { MMSCalculator } from "@/components/queues/mms/mms-calculator";
import { MMSKCalculator } from "@/components/queues/mmsk/mmsk-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function QueueCalculator() {
  const [selectedModel, setSelectedModel] = useState("mm1");

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Tabs
            defaultValue="mm1"
            onValueChange={setSelectedModel}
            className="w-full"
          >
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold mb-3">Selecione o Modelo</h2>
              <div className="overflow-x-auto pb-2">
                <TabsList className="inline-flex min-w-full w-auto">
                  <TabsTrigger
                    value="mm1"
                    className="flex-1 whitespace-nowrap px-3"
                  >
                    M/M/1
                  </TabsTrigger>
                  <TabsTrigger
                    value="mms"
                    className="flex-1 whitespace-nowrap px-3"
                  >
                    M/M/s
                  </TabsTrigger>
                  <TabsTrigger
                    value="mm1k"
                    className="flex-1 whitespace-nowrap px-3"
                  >
                    M/M/1/K
                  </TabsTrigger>
                  <TabsTrigger
                    value="mmsk"
                    className="flex-1 whitespace-nowrap px-3"
                  >
                    M/M/s/K
                  </TabsTrigger>
                  <TabsTrigger
                    value="mm1n"
                    className="flex-1 whitespace-nowrap px-3"
                  >
                    M/M/1/N
                  </TabsTrigger>
                  <TabsTrigger
                    value="mmsn"
                    className="flex-1 whitespace-nowrap px-3"
                  >
                    M/M/s/N
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="text-sm text-muted-foreground mt-4">
                {selectedModel === "mm1" && (
                  <p>
                    Fila com um único servidor, chegadas seguindo distribuição
                    de Poisson e tempos de serviço exponenciais.
                  </p>
                )}
                {selectedModel === "mms" && (
                  <p>
                    Fila com múltiplos servidores (s), chegadas seguindo
                    distribuição de Poisson e tempos de serviço exponenciais.
                  </p>
                )}
                {selectedModel === "mm1k" && (
                  <p>
                    Fila com um único servidor e capacidade limitada (K),
                    chegadas seguindo distribuição de Poisson e tempos de
                    serviço exponenciais.
                  </p>
                )}
                {selectedModel === "mmsk" && (
                  <p>
                    Fila com múltiplos servidores (s) e capacidade limitada (K),
                    chegadas seguindo distribuição de Poisson e tempos de
                    serviço exponenciais.
                  </p>
                )}
                {selectedModel === "mm1n" && (
                  <p>
                    Fila com um único servidor e população finita (N), chegadas
                    seguindo distribuição de Poisson e tempos de serviço
                    exponenciais.
                  </p>
                )}
                {/* {selectedModel === "mmsn" && (
                  <p>
                    Fila com múltiplos servidores (s) e população finita (N), chegadas
                    seguindo distribuição de Poisson e tempos de serviço
                    exponenciais.
                  </p>
                )} */}
              </div>
            </div>

            <div className="p-6">
              <TabsContent value="mm1" className="mt-0">
                <MM1Calculator />
              </TabsContent>
              <TabsContent value="mms" className="mt-0">
                <MMSCalculator />
              </TabsContent>
              <TabsContent value="mm1k" className="mt-0">
                <MM1KCalculator />
              </TabsContent>
              <TabsContent value="mmsk" className="mt-0">
                <MMSKCalculator />
              </TabsContent>
              <TabsContent value="mm1n" className="mt-0">
                <MM1NCalculator />
              </TabsContent>
              {/* <TabsContent value="mmsn" className="mt-0">
                <MMSNCalculator />
              </TabsContent> */}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
