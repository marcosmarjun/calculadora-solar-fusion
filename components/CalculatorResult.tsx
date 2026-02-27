"use client";

import type { CalculatorResult as ResultType } from "../lib/types";

interface Props {
  result: ResultType;
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "-";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

/** Exibe o resultado da simulação em cards (valor atual, pós solar, economia, investimento). */
export function CalculatorResult({ result }: Props) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">
        Sua simulação de economia
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4">
          <p className="mb-1 text-sm text-slate-400">
            Conta atual estimada
          </p>
          <p className="text-2xl font-bold text-fusion-amarelo">
            {formatCurrency(result.valorAtual)}
          </p>
        </div>

        <div className="card p-4">
          <p className="mb-1 text-sm text-slate-400">
            Conta estimada com energia solar
          </p>
          <p className="text-2xl font-bold text-emerald-400">
            {formatCurrency(result.valorPosSolar)}
          </p>
        </div>

        <div className="card p-4">
          <p className="mb-1 text-sm text-slate-400">
            Economia mensal aproximada
          </p>
          <p className="text-2xl font-bold text-emerald-300">
            {formatCurrency(result.economiaMensal)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Economia anual estimada:{" "}
            <span className="font-semibold">
              {formatCurrency(result.economiaAnual)}
            </span>
          </p>
        </div>

        <div className="card space-y-2 p-4">
          <p className="text-sm text-slate-400">
            Investimento estimado no sistema
          </p>
          <p className="text-xl font-semibold">
            {formatCurrency(result.valorInvestimento)}
          </p>
          {Number.isFinite(result.retornoMeses) && (
            <p className="text-xs text-slate-400">
              Retorno estimado em{" "}
              <span className="font-semibold">
                {result.retornoMeses} meses
              </span>
            </p>
          )}
          <p className="text-xs text-slate-400">
            Taxa de retorno mensal aproximada:{" "}
            <span className="font-semibold">
              {(result.taxaRetorno * 100).toFixed(2)}%
            </span>
          </p>
          <p className="text-xs text-slate-400">
            Simulação de financiamento 60x:{" "}
            <span className="font-semibold">
              {formatCurrency(result.financiamento60x)}/mês
            </span>
          </p>
          <p className="text-xs text-slate-400">
            Simulação em cartão 18x:{" "}
            <span className="font-semibold">
              {formatCurrency(result.cartao18x)}/mês
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
