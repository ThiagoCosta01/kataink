
# Visão Geral do Sistema

**Nome do Projeto:** KataInk

**Última Versão Lançada:** Em desenvolvimento

**Versão em Desenvolvimento:** 0.0.1

**Descrição:** Projeto desenvolvido para o curso de ADS, da Uninter

**Principais Tecnologias:** React, TypeScript, Fabric.js

## Links Úteis

[Documentação Jira](https://thiago10lscbf-1780589979319.atlassian.net/wiki/spaces/SCRUM/pages/98435/Documenta+o?atlOrigin=eyJpIjoiOTQ5MWZhNjY2NTQyNDBjZWFkODI1MzBmMTg3MWI3ZGEiLCJwIjoiaiJ9)

[Design Figma](https://www.figma.com/design/qBSfiBJQ0ZGomvaO2k4DU7/Pessoais?node-id=0-1&p=f&t=NpM7mz0B3C3y427y-0)

---
## 📑 Sumário

- [01 Arquitetura](#01-arquitetura)
- [02 Desenvolvimento](#02-desenvolvimento)
- [03 Estrutura De Pastas](#03-estrutura-de-pastas)
- [04 Ambiente](#04-ambiente)
- [05 Ops](#05-ops)
- [06 Notas](#06-notas)


---
<a id="01-arquitetura"></a>
<details>
  <summary>📌 01 Arquitetura</summary>

# Arquitetura

## Descrição

React foi escolhido para construção da interface e TypeScript para fornecer tipagem estática e maior segurança durante o desenvolvimento.

</details>

---
<a id="02-desenvolvimento"></a>
<details>
  <summary>📌 02 Desenvolvimento</summary>

# Práticas Para Desenvolvimento do Sistema

## Segurança

- Caso uso de `variáveis de Ambiente`, `senhas` ou `arquivos confidenciais`, devem ser adicionadas ao `.gitignore`

## Commits

- Seguir Conventional Commits
  - `<tipo>(<escopo opcional>): <descrição curta>`
  - De preferência em `Inglês` e na `3ª pessoa do singular` para padronização

- Exemplos:
  - feat(auth): add login OAuth
  - fix(api): correct validation bug
  - docs: update doc file x

</details>

---
<a id="03-estrutura-de-pastas"></a>
<details>
  <summary>📌 03 Estrutura De Pastas</summary>

# Estrutura de Pastas

## Raíz do Repositório

```bash
Project-Root/
├─ src/ # Código fonte
├─ docs/ # Documentação do Repositório
├─ infra/ # scripts de apoio
├─ .github/workflows/ # Scripts de CI/CD
├─ .gitignore # Arquivos a serem ignorados em todos commits
├─ README.md # Documentação integral feita a partir dos arquivos de /docs
```

</details>

---
<a id="04-ambiente"></a>
<details>
  <summary>📌 04 Ambiente</summary>

# Preparação do Ambiente

## Ambiente de Desenvolvimento

 **npm run dev:** roda a aplicação no localhost.

## Ambiente de Deploy

A aplicação é enviada ao github pages por meio de merge na branch main (deve passar pela branch develop antes.)

</details>

---
<a id="05-ops"></a>
<details>
  <summary>📌 05 Ops</summary>

# Pipeline DevOps

## CI

**Descrição**: Processos que ocorrem durante a integração e atualização de código do repositório (commits)

**Processos**:

- Atualizar README.md principal automaticamente
  - Arquivo: `generate_readme.yml`
  - Funcionalidade: atualiza o README.md da raíz do repositório sempre que algum arquivo localizado em `readme_files/` for alterado
  - Branches: todas, com exceção da principal

  ## CD

- Deploy do build automaticamente
  - Arquivo: `deploy_ghpages_vite.yml`
  - Funcionalidade: gera o build em dist/ e envia para o github pages
  - Branches: somente na principal

</details>

---
<a id="06-notas"></a>
<details>
  <summary>📌 06 Notas</summary>

# Notas

 **Descrição:** Notas e informativos úteis para a documentação, como decisões arquiteturais e opiniões.

  **Formato:** [- data - nome do autor - descrição]. Em ordem descendente por data

## Conteúdo

- 01/06/2025 - Thiago Costa - Nota inicial de exemplo

## A fazer (Extras Futuros)

- Bug de traço que gira (ocorre ao desenhar traços retos)
- Instruções sobre como jogar (em about)
- Refatorar
- i18n
- documentação
- adicionar áudio (menu shippuden)
- modo sem símbolo (desenhar com base nos nomes dos Katakanas)
- Mandar configurações para o local storage
- Mudar estilo da pincelada (Perfect)
- Adicionar multiplicação na pontuação para dificuldades e se tiver direção dos traço

</details>
