# Envio de leads para Google Sheets

Os dados do lead (nome, WhatsApp, cidade, consumo e resultado da simulação) podem ser salvos em uma planilha Google. O frontend envia um POST em segundo plano quando `NEXT_PUBLIC_LEADS_SHEET_URL` está definido.

## Passo a passo

### 1. Criar a planilha

1. Acesse [Google Sheets](https://sheets.google.com) e crie uma nova planilha (ex.: "Leads Calculadora Solar Fusion").
2. Na primeira linha, adicione os cabeçalhos (exatamente nesta ordem):

   | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
   |---|---|---|---||---||---||---||---||---||---||---||---||---||---||---||---|
   | Data/Hora | Nome | WhatsApp | Cidade | Consumo kWh | Usina no local? | Tipo imóvel | Considerar bandeira? | Conta atual | Conta com solar | Economia mensal | Economia anual | Investimento | Retorno meses | Financ. 60x | Cartão 18x |

### 2. Criar o Google Apps Script

1. Na planilha: **Extensões** > **Apps Script**.
2. Apague o conteúdo padrão e cole o código abaixo.
3. Salve o projeto (Ctrl+S) e dê um nome (ex.: "Leads Calculadora").

```javascript
// Responde GET (abrir URL no navegador) para não dar erro "doGet not found"
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    message: "Use POST a partir da calculadora. Os dados são enviados automaticamente ao calcular."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse(400, { error: "Body ausente" });
    }
    var body = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    // Usar != null em vez de ?? para compatibilidade com Apps Script (motor antigo)
    var row = [
      body.dataHora || "",
      body.nome || "",
      body.whatsapp || "",
      body.cidade || "",
      body.consumoKwh != null ? body.consumoKwh : "",
      body.usinaNoLocal || "",
      body.tipoImovel || "",
      body.considerarBandeira || "",
      body.valorAtual != null ? body.valorAtual : "",
      body.valorPosSolar != null ? body.valorPosSolar : "",
      body.economiaMensal != null ? body.economiaMensal : "",
      body.economiaAnual != null ? body.economiaAnual : "",
      body.valorInvestimento != null ? body.valorInvestimento : "",
      body.retornoMeses != null ? body.retornoMeses : "",
      body.financiamento60x != null ? body.financiamento60x : "",
      body.cartao18x != null ? body.cartao18x : ""
    ];
    sheet.appendRow(row);
    return createResponse(200, { ok: true });
  } catch (err) {
    return createResponse(500, { error: String(err.message) });
  }
}

function createResponse(status, obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

### 3. Implantar como Web App

1. No editor do Apps Script: **Implantar** > **Nova implantação**.
2. Clique no ícone de engrenagem ao lado de "Selecionar tipo" e escolha **Aplicativo da Web**.
3. **Descrição:** ex.: "Leads calculadora solar".
4. **Executar como:** Eu (seu e-mail).
5. **Quem pode acessar:** Qualquer pessoa.
6. Clique em **Implantar** e autorize o app quando solicitado.
7. Copie a **URL do aplicativo da web** (formato: `https://script.google.com/macros/s/XXXX/exec`).

### 4. Configurar o projeto

1. No projeto, copie `.env.local.example` para `.env.local` (se ainda não tiver).
2. Em `.env.local`, adicione ou edite:
   ```env
   NEXT_PUBLIC_LEADS_SHEET_URL=https://script.google.com/macros/s/SUA_ID_AQUI/exec
   ```
3. Reinicie o servidor de desenvolvimento (`npm run dev`). Novos cálculos com nome e WhatsApp preenchidos passarão a gerar uma linha na planilha.

## Observações

- Se `NEXT_PUBLIC_LEADS_SHEET_URL` não estiver definido, o envio é omitido (a calculadora funciona normalmente).
- Falhas de rede no envio não são mostradas ao usuário e não impedem a exibição do resultado.
- Os dados enviados são de lead comercial; informe na política de privacidade do site o uso para contato comercial.
