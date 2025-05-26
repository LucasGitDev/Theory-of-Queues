import { QueueCalculator } from "@/components/queues/queue-calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          Calculadora de Teoria das Filas
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Resolva problemas de teoria das filas com diferentes modelos
        </p>
        <QueueCalculator />
      </div>
    </main>
  );
}
