"use client";

import { useState } from "react";
import { calcularEconomiaSolar } from "../lib/calculator";
import type {
  CalculatorResult,
  TipoImovel,
  SimNao,
} from "../lib/types";
import { CalculatorResult as ResultView } from "./CalculatorResult";
import { WhatsAppButton } from "./WhatsAppButton";

interface FormState {
  consumoKwh: string;
  usinaNoLocal: SimNao;
  tipoImovel: TipoImovel;
  considerarBandeira: SimNao;
  cidade: string;
  nome: string;
  whatsapp: string;
}

/** Formulário da calculadora: campos de consumo, tipo de imóvel, lead (nome/WhatsApp). Resultado só aparece com nome e WhatsApp preenchidos. */
export function CalculatorForm() {
  const [form, setForm] = useState<FormState>({
    consumoKwh: "",
    usinaNoLocal: "SIM",
    tipoImovel: "Residencial",
    considerarBandeira: "SIM",
    cidade: "",
    nome: "",
    whatsapp: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.nome.trim() || !form.whatsapp.trim()) {
      setResult(null);
      setError(
        "Para ver o resultado, preencha seu nome e WhatsApp."
      );
      return;
    }

    const consumoKwh = Number(
      (form.consumoKwh || "").replace(",", ".")
    );

    if (!consumoKwh || consumoKwh <= 0) {
      setResult(null);
      setError("Informe um valor de consumo em kWh maior que zero.");
      return;
    }

    const calcResult = calcularEconomiaSolar({
      consumoKwh,
      usinaNoLocal: form.usinaNoLocal,
      tipoImovel: form.tipoImovel,
      considerarBandeira: form.considerarBandeira,
    });

    setResult(calcResult);

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataHora: new Date().toISOString(),
        nome: form.nome.trim(),
        whatsapp: form.whatsapp.trim(),
        cidade: form.cidade.trim(),
        consumoKwh,
        usinaNoLocal: form.usinaNoLocal,
        tipoImovel: form.tipoImovel,
        considerarBandeira: form.considerarBandeira,
        valorAtual: calcResult.valorAtual,
        valorPosSolar: calcResult.valorPosSolar,
        economiaMensal: calcResult.economiaMensal,
        economiaAnual: calcResult.economiaAnual,
        valorInvestimento: calcResult.valorInvestimento,
        retornoMeses: calcResult.retornoMeses,
        financiamento60x: calcResult.financiamento60x,
        cartao18x: calcResult.cartao18x,
      }),
    }).catch(() => {});
  };

  const canSubmit =
    !!form.consumoKwh.trim() &&
    !!form.nome.trim() &&
    !!form.whatsapp.trim();

  return (
    <div className="card p-6 md:p-8">
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="consumoKwh">
              Consumo mensal (kWh)
            </label>
            <input
              id="consumoKwh"
              name="consumoKwh"
              type="number"
              min={0}
              step={1}
              className="input"
              placeholder="Ex: 500"
              value={form.consumoKwh}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="usinaNoLocal">
              Usina será instalada nesse local?
            </label>
            <select
              id="usinaNoLocal"
              name="usinaNoLocal"
              className="input"
              value={form.usinaNoLocal}
              onChange={handleChange}
            >
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="tipoImovel">
              Tipo de imóvel
            </label>
            <select
              id="tipoImovel"
              name="tipoImovel"
              className="input"
              value={form.tipoImovel}
              onChange={handleChange}
            >
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="considerarBandeira">
              Considerar bandeira?
            </label>
            <select
              id="considerarBandeira"
              name="considerarBandeira"
              className="input"
              value={form.considerarBandeira}
              onChange={handleChange}
            >
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="cidade">
              Cidade
            </label>
            <input
              id="cidade"
              name="cidade"
              type="text"
              className="input"
              placeholder="Ex: Fortaleza - CE"
              value={form.cidade}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="nome">
              Nome completo *
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              className="input"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="whatsapp">
              WhatsApp *
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              className="input"
              placeholder="(DDD) 9 9999-9999"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <button
            type="submit"
            className="btn-primary w-full md:w-auto"
            disabled={!canSubmit}
          >
            Calcular minha economia
          </button>

          <WhatsAppButton />
        </div>
      </form>

      {result && form.nome && form.whatsapp && (
        <ResultView result={result} />
      )}
    </div>
  );
}
