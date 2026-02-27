# Calculadora de Economia com Energia Solar – Fusion Engenharia

Página web para simular a economia na conta de energia antes e depois da instalação de energia solar. Desenvolvida com Next.js (App Router), TypeScript e Tailwind CSS.

## Requisitos

- Node.js 18+
- npm (ou yarn/pnpm)

## Como rodar o projeto localmente

1. **Clone ou acesse a pasta do projeto**
   ```bash
   cd calculadora-solar-fusion
   ```

2. **Instale as dependências** (se ainda não instalou)
   ```bash
   npm install
   ```

3. **Configure o número do WhatsApp**
   - Copie o arquivo de exemplo: `copy .env.local.example .env.local` (Windows) ou `cp .env.local.example .env.local` (Linux/Mac)
   - Abra `.env.local` e substitua `55SEUNUMEROAQUI` pelo número real (ex.: `5511999999999`), sem espaços ou símbolos

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Abra no navegador**
   - Acesse [http://localhost:3000](http://localhost:3000)

6. **Build para produção** (opcional)
   ```bash
   npm run build
   npm start
   ```

## Estrutura do projeto

- `app/` – Layout, página principal e estilos globais (Next.js App Router)
- `components/` – Formulário da calculadora, resultado e botão WhatsApp
- `lib/` – Tipos e lógica de cálculo (fórmulas baseadas na planilha)

## Regras da calculadora

- O resultado só é exibido após preencher **Nome completo** e **WhatsApp**.
- Entrada principal: **Consumo mensal (kWh)**. Tipo de imóvel (Residencial/Comercial), consumo instantâneo (%) e bandeira são opcionais/ajustáveis.
- O botão "Falar com especialista no WhatsApp" abre o WhatsApp com uma mensagem pré-definida; o número é configurado em `.env.local`.

## Envio de leads para Google Sheets

É possível salvar cada lead (nome, WhatsApp, cidade, consumo e resultado da simulação) em uma planilha Google. Configure a URL do Web App em `NEXT_PUBLIC_LEADS_SHEET_URL` no `.env.local`. Passo a passo completo (planilha, script e implantação): [docs/LEADS_GOOGLE_SHEETS.md](docs/LEADS_GOOGLE_SHEETS.md).

## Enviar o projeto para o GitHub

No terminal (Cursor: **Ctrl + \`**), na pasta do projeto, rode os comandos abaixo. O repositório já existe em `marcosmarjun/calculadora-solar-fusion`.

```powershell
cd "c:\Users\Marcos Medeiros Jr\OneDrive\Projetos Cursor\calculadora-solar-fusion"
git init
git add .
git commit -m "Projeto calculadora solar"
git branch -M main
git remote add origin https://github.com/marcosmarjun/calculadora-solar-fusion.git
git push -u origin main
```

Se o repositório ainda estiver vazio no GitHub, crie-o antes (New repository, nome `calculadora-solar-fusion`, **sem** marcar "Add a README"). Depois rode os comandos acima.

## Licença

ISC.
