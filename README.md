
# Visão Geral do Sistema

**Nome do Projeto:** KataInk

**Última Versão Lançada:** Em desenvolvimento 

**Versão em Desenvolvimento:** 0.0.1

**Descrição:** Projeto desenvolvido para o curso de ADS, da Uninter

**Principais Tecnologias:** React, TypeScript, Fabric.js

# Links Úteis:

**Documentação:** 
https://thiago10lscbf-1780589979319.atlassian.net/wiki/spaces/SCRUM/pages/98435/Documenta+o?atlOrigin=eyJpIjoiOTQ5MWZhNjY2NTQyNDBjZWFkODI1MzBmMTg3MWI3ZGEiLCJwIjoiaiJ9

**Tasks**:
https://thiago10lscbf-1780589979319.atlassian.net/jira/software/projects/SCRUM/boards/1

**Design:**
https://www.figma.com/design/qBSfiBJQ0ZGomvaO2k4DU7/Pessoais?node-id=0-1&p=f&t=NpM7mz0B3C3y427y-0



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

</details>

---
<a id="02-desenvolvimento"></a>
<details>
  <summary>📌 02 Desenvolvimento</summary>

# Práticas Para Desenvolvimento do Sistema

# Segurança
- Caso uso de `variáveis de Ambiente`, devem ser adicionadas ao `.gitignore`


# Convenções de Desenvolvimento

## Commits
- Seguir Conventional Commits
    - `<tipo>(<escopo opcional>): <descrição curta>`
    - De preferência em `Inglês` e na `3ª pessoa do singular` (it does), para padronização

- Exemplos:
  - feat(auth): adds login OAuth
  - fix(api): corrects validation bug
  - docs: updates doc file x

## Padrões

### Linguagem:
</details>

---
<a id="03-estrutura-de-pastas"></a>
<details>
  <summary>📌 03 Estrutura De Pastas</summary>

# Estrutura de Pastas

## Raíz do Repositório

```
Project-Root/
├─ apps/ # Aplicativos do Repositório
├─ docs/ # Documentação do Repositório
├─ infra/ # Arquivos de configuração, preparação do ambiente e scripts de apoio
├─ .github/workflows/ # Scripts de CI/CD
├─ .gitignore # Arquivos a serem ignorados em todos commits
├─ README.md # Documentação integral feita a partir dos arquivos de /docs
```

## Apps
```
apps/(nome do app)
├── src/ # Código-fonte principal

```
</details>

---
<a id="04-ambiente"></a>
<details>
  <summary>📌 04 Ambiente</summary>

# Preparação do Ambiente

## Ambiente de Desenvolvimento:

1. **npm run dev** 



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
    - Arquivo: `generate_readme[version].yml`
    - Funcionalidade: atualiza o README.md da raíz do repositório sempre que algum arquivo localizado em `readme_files/` for alterado
    - Branches: todas, com exceção da principal
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

## A fazer: 
- Bug de desfazer

## A fazer (Extras Futuros):
- Bug de traço que gira (ocorre ao desenhar traços retos)
- Instruções sobre como jogar (em about)
- Refatorar
- i18n
- documentação
- adicionar áudio (menu shippuden) 
- modo sem símbolo (desenhar com base nos nomes dos Katakanas)
- Mandar configurações para o local storage 
- Mudar estilo da pincelada (Perfect)
- Adicionar multiplicação na pontuação para dificuldades e se tiver direção dos traços
</details>
