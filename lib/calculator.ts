/**
 * Lógica de cálculo da calculadora de economia solar - Fusion Engenharia.
 * Baseada nas fórmulas da planilha (consumo medido, tarifas sem/pós solar, análise financeira).
 */

import type { CalculatorInput, CalculatorResult } from "./types";

export function calcularEconomiaSolar(
  input: CalculatorInput
): CalculatorResult {
  // Planilha: Usina será instalada nesse local? SIM → 0,3; NÃO → 0
  const consumoInstantaneo = input.usinaNoLocal === "SIM" ? 0.3 : 0;

  // Consumo medido (kWh) - fórmula da planilha
  const consumoMedido = Math.ceil(
    input.consumoKwh * (1 - consumoInstantaneo)
  );

  // Limite de iluminação pública conforme tipo de imóvel (planilha: SE Residencial; 80; 250)
  const limiteIluminacao =
    input.tipoImovel === "Residencial" ? 80 : 250;

  // Tarifas da planilha (valores explícitos nas células)
  const tarifaTUSD = 0.5761854;
  const tarifaTE = 0.41507725;
  // Planilha: Considerar bandeira? SIM → 10,5 R$/MWh; NÃO → 0
  const bandeiraPorKwh = (input.considerarBandeira === "SIM" ? 10.5 : 0) / 100;

  // Conta SEM energia solar: usa CONSUMO TOTAL (planilha usa C4 = 500 kWh em todas as linhas)
  // Iluminação: planilha =SE(D17<C17;C10;...) → quando consumo >= limite, valor R$ = limite (80)
  const iluminacaoSemSolarRs = Math.min(
    input.consumoKwh,
    limiteIluminacao
  );
  const totalSemSolar =
    input.consumoKwh * (tarifaTUSD + tarifaTE + bandeiraPorKwh) +
    iluminacaoSemSolarRs;

  // Pós-solar (compensações): usa CONSUMO MEDIDO (350 kWh)
  // Iluminação pós: planilha 350 kWh * 0,129 = 45,15 (sem cap)
  const compTUSD = -0.36656915;
  const compTE = -0.41507725;
  const iluminacaoTarifaPos = 0.129;

  const totalPosSolarBruto =
    consumoMedido * (tarifaTUSD + tarifaTE + compTUSD + compTE) +
    consumoMedido * iluminacaoTarifaPos;

  const valorAtual = Math.max(0, totalSemSolar);
  const valorPosSolar = Math.max(0, totalPosSolarBruto);

  const economiaMensal = Math.max(0, valorAtual - valorPosSolar);
  const economiaAnual = economiaMensal * 12;

  // Investimento estimado (fórmula planilha: mínimo R$ 6.800)
  const valorInvestimento = Math.max(
    6800,
    Math.ceil((16.165 * input.consumoKwh + 1679.8) / 100) * 100
  );

  const retornoMeses =
    economiaMensal > 0
      ? Math.ceil(valorInvestimento / economiaMensal)
      : Number.POSITIVE_INFINITY;

  const taxaRetorno =
    valorInvestimento > 0 ? economiaMensal / valorInvestimento : 0;

  // Financiamento 60x e cartão 18x (planilha)
  const financiamento60x = 0.0272 * valorInvestimento + 42.018;
  const cartao18x =
    valorInvestimento > 0
      ? valorInvestimento / (1 - 0.153) / 18
      : 0;

  return {
    valorAtual,
    valorPosSolar,
    economiaMensal,
    economiaAnual,
    valorInvestimento,
    retornoMeses,
    taxaRetorno,
    financiamento60x,
    cartao18x,
  };
}
