import { CalculatorForm } from "../components/CalculatorForm";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl">
        <header className="mb-8 text-center md:text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-fusion-amarelo">
            Fusion Engenharia
          </p>
          <h1 className="mb-3 text-3xl font-semibold text-slate-50 md:text-4xl lg:text-5xl">
            Calculadora de Economia com Energia Solar
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 md:text-base">
            Descubra em poucos segundos quanto sua conta de energia
            pode reduzir com um sistema solar fotovoltaico da Fusion
            Engenharia. Preencha seus dados e veja uma simulação
            personalizada.
          </p>
        </header>

        <CalculatorForm />
      </div>
    </main>
  );
}
