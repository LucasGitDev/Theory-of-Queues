"use client";

import { MM1Calculator } from "@/components/queues/mm1/mm1-calculator";
import { MM1KCalculator } from "@/components/queues/mm1k/mm1k-calculator";
import { MM1NCalculator } from "@/components/queues/mm1n/mm1n-calculator";
import { MMSCalculator } from "@/components/queues/mms/mms-calculator";
import { MMSKCalculator } from "@/components/queues/mmsk/mmsk-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryParams } from "@/utils/url-params";
import { useMemo } from "react";
import { MG1Calculator } from "./mg1/mg1-calculator";
import { MG1PCalculator } from "./mg1Priority/mg1Priority-calculator";
import { MMSNCalculator } from "./mmsn/mmsn-calculator";

type Model = {
  value: string;
  label: string;
  description: string;
};
// M/M/1, M/M/c, M/M/1/K, M/M/c/K, M/M/1/N (População finita), M/M/c/N (população finita), M/G/1
const models: Model[] = [
  {
    value: "mm1",
    label: "M/M/1",
    description:
      "Fila com um único servidor, chegadas seguindo distribuição de Poisson e tempos de serviço exponenciais.",
  },
  {
    value: "mms",
    label: "M/M/s",
    description:
      "Fila com múltiplos servidores (s), chegadas seguindo distribuição de Poisson e tempos de serviço exponenciais.",
  },
  {
    value: "mm1k",
    label: "M/M/1/K",
    description:
      "Fila com um único servidor e capacidade limitada (K), chegadas seguindo distribuição de Poisson e tempos de serviço exponenciais.",
  },
  {
    value: "mmsk",
    label: "M/M/s/K",
    description:
      "Fila com múltiplos servidores (s) e capacidade limitada (K), chegadas seguindo distribuição de Poisson e tempos de serviço exponenciais.",
  },
  {
    value: "mm1n",
    label: "M/M/1/N",
    description:
      "Fila com um único servidor e população finita (N), chegadas seguindo distribuição de Poisson e tempos de serviço exponenciais.",
  },
  {
    value: "mmsn",
    label: "M/M/s/N",
    description:
      "Fila com múltiplos servidores (s) e população finita (N), chegadas seguindo distribuição de Poisson e tempos de serviço exponenciais.",
  },
  {
    value: "mmg1",
    label: "M/G/1",
    description:
      "Fila com servidor único, chegadas Poisson e tempo de serviço com distribuição geral (média e variância conhecidas), atendimento FIFO.",
  },
  {
    value: "mg1-p",
    label: "M/G/1 com prioridades",
    description:
      "Fila M/G/1 com classes de prioridade (ex.: alta/baixa), onde clientes prioritários são atendidos primeiro, sem interromper serviços em andamento.",
  }
];

export function QueueCalculator() {
  // memo the models
  const memoizedModels = useMemo(() => models, []);
  const { getQueryParam, setQueryParams } = useQueryParams();
  const selectedModel = getQueryParam("model") || "mm1";

  const handleModelChange = (value: string) => {
    console.log(value);
    setQueryParams({ model: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Tabs
            value={selectedModel}
            onValueChange={handleModelChange}
            className="w-full"
          >
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold mb-3">
                Selecione o Modelo {selectedModel}
              </h2>
              <div className="overflow-x-auto pb-2">
                <TabsList className="inline-flex min-w-full w-auto">
                  {memoizedModels.map((model) => (
                    <TabsTrigger
                      key={model.value}
                      value={model.value}
                      className="flex-1 whitespace-nowrap px-3"
                    >
                      {model.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="text-sm text-muted-foreground mt-4">
                {
                  memoizedModels.find((model) => model.value === selectedModel)
                    ?.description
                }
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
              <TabsContent value="mmsn" className="mt-0">
                <MMSNCalculator />
              </TabsContent>
              <TabsContent value="mmg1" className="mt-0">
                <MG1Calculator />
              </TabsContent>
              <TabsContent value="mg1-p" className="mt-0">
                <MG1PCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
