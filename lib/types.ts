/** Tipos da calculadora de economia solar - Fusion Engenharia */

export type TipoImovel = "Residencial" | "Comercial";

export type SimNao = "SIM" | "NAO";

export interface CalculatorInput {
  consumoKwh: number;
  usinaNoLocal: SimNao; // SIM = 30% consumo instantâneo, NAO = 0%
  tipoImovel: TipoImovel;
  considerarBandeira: SimNao; // SIM = 10,5 R$/MWh, NAO = 0
}

export interface CalculatorResult {
  valorAtual: number;
  valorPosSolar: number;
  economiaMensal: number;
  economiaAnual: number;
  valorInvestimento: number;
  retornoMeses: number;
  taxaRetorno: number;
  financiamento60x: number;
  cartao18x: number;
}
