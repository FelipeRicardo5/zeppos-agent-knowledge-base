# Zepp OS Agent Knowledge Base

[English](README.md) · **Português**

Uma base de conhecimento ciente de compatibilidade, posicionada entre as fontes oficiais do Zepp OS e os agentes de IA que escrevem código para Zepp OS.

Isto **não** é um espelho da documentação. A documentação oficial existe, mas não está no formato que um agente consegue consumir de forma confiável quando a pergunta é *"posso chamar esta API neste runtime, neste API_LEVEL?"*. Este projeto extrai essas fontes para uma camada estruturada em que essa pergunta tem resposta verificável.

Fontes: [`zepp-health/zeppos-docs`](https://github.com/zepp-health/zeppos-docs) (páginas de referência e o conteúdo preparado para LLMs em `static/llms`) e [`zepp-health/zeppos-samples`](https://github.com/zepp-health/zeppos-samples) (uso real nos aplicativos de exemplo oficiais).

## Status — v0, em desenvolvimento

| Estágio | Situação |
| --- | --- |
| `fetch` — clonar/atualizar os repositórios oficiais em um cache local | implementado |
| `parse` — extrair observações brutas de docs, `static/llms` e samples | implementado |
| `enrich` — fundir as três frentes em um registro por símbolo | implementado |
| `store` — gravar o JSON fonte de verdade, um arquivo por módulo | implementado |
| `render` — gerar o Markdown final da base de conhecimento | não implementado |

Retrato do último sync (números atualizados em [`data/manifest.json`](data/manifest.json)):

- **328 símbolos** em **40 módulos**, vindos de 222 páginas de referência + 226 entradas de `static/llms` + 622 imports em samples
- 299 `OFFICIAL`, 29 `OBSERVED`
- 272 símbolos têm `API_LEVEL` mínimo; 153 têm descrição

## Cobertura e limites

Leia isto antes de confiar em qualquer resposta saída desta base.

- **Apenas a API de Device App está coberta.** O parser se apoia na linha `import { x } from '@zos/...'` que as páginas de referência carregam. As páginas de `side-service-api` e `app-settings-api` usam outro formato, sem essa linha, e a API de watchface (`hmUI`, `hmFS`, `hmSensor`, `hmSetting`) vive em uma árvore separada. Todas são ignoradas hoje.
- **O eixo de runtime está vazio.** Todo registro sai com `runtimes: []`. Como só a documentação de um runtime é parseada, esse campo ainda não distingue nada e é deixado vazio em vez de preenchido com um valor constante.
- **Um símbolo ausente significa "não coberto", não "não existe."** Com um runtime parseado de seis, a ausência não diz nada sobre a plataforma real.
- **`API_LEVEL` é o único eixo que funciona hoje.** É lido literalmente da linha oficial `Start from API_LEVEL`, nunca inferido.
- **Ainda não há testes.** Todo bug de parser encontrado até agora apareceu na leitura manual do output, e todos foram a mesma falha: um formato de origem que parecia regular no primeiro arquivo e não era. Um registro errado é indistinguível de um correto lá na frente.

## Início rápido

```bash
npm install
npm run sync       # fetch -> parse -> enrich -> grava data/
npm run typecheck
```

`sync` clona os repositórios oficiais em `.cache/` (não versionado, dezenas de MB) e reescreve `data/`. É idempotente: rodar duas vezes seguidas não gera diff.

`npm run render` existe como comando, mas ainda não está implementado.

## Como funciona

Quatro estágios, cada um idempotente e inspecionável isoladamente, de modo que qualquer um pode ser reexecutado sem refazer os anteriores. A execução é local e sob demanda — não há job agendado em CI na v0.

1. **fetch** — clona ou atualiza os repositórios oficiais em `.cache/` e registra o commit exato de cada um. Conteúdo de terceiros, nunca versionado aqui.
2. **parse** — três frentes independentes sobre o cache bruto:
   - **docs-reference** — `docs/reference/**/*.mdx`, um arquivo por símbolo. O módulo é resolvido a partir da linha de import no exemplo da própria página, porque o nome do diretório não corresponde de forma confiável ao id do módulo.
   - **llms** — `static/llms/@zos-*.md`, um arquivo por módulo, aproveitando a estruturação que a própria Zepp Health já fez para consumo por LLMs.
   - **samples** — todo import `@zos/*` nos aplicativos de exemplo oficiais. Evidência de uso real, não uma afirmação da documentação.
3. **enrich** — agrupa as observações por id de símbolo e normaliza os metadados que são o coração do projeto: `API_LEVEL` mínimo, runtime, fonte e nível de confiança. A prioridade por campo é `docs-reference` > `llms` > `sample`.
4. **render** — gera o Markdown final em `concepts/`, `api/`, `runtimes/`, `patterns/`, `examples/`, `compatibility/` e `tools/`. É o que a Agent Skill lê.

## Modelo de dados

### O JSON é a fonte de verdade, o Markdown é derivado

O JSON estruturado produzido por parse/enrich é a fonte de verdade. O Markdown é uma visão gerada a partir dele. Dois motivos:

1. Permite gerar múltiplas representações do mesmo conhecimento no futuro (Markdown para leitura humana e para a Skill, JSON para um sistema de retrieval ou um servidor MCP) sem duplicar a lógica de extração.
2. Torna o versionamento muito mais útil — um diff em JSON estruturado mostra o que mudou semanticamente (o `API_LEVEL` mínimo de uma função, por exemplo) em vez do ruído textual de um diff de Markdown.

### `SymbolRecord`

| Campo | Significado |
| --- | --- |
| `id` | Identificador canônico do símbolo, módulo + nome — `@zos/router.launchApp` |
| `module` / `symbol` | As duas metades do id, mantidas separadas para o agrupamento não depender de manipulação de string |
| `type` | `function`, `constant` ou `value` |
| `description` | Descrição curta, quando alguma fonte declara uma |
| `minApiLevel` | `API_LEVEL` mínimo. Ausente quando nenhuma fonte declara — nunca inventado |
| `runtimes` | Runtimes em que o símbolo é válido (ver *Cobertura e limites*) |
| `source` | De qual frente o registro foi construído primariamente |
| `confidence` | Ver abaixo |
| `originalPath` | Arquivo de onde o registro foi extraído, normalizado para posix |
| `extractedAt` | Data da extração |

### Níveis de confiança

| Nível | Significado |
| --- | --- |
| `OFFICIAL` | Declarado pela documentação oficial (`docs-reference` ou `llms`) |
| `OBSERVED` | Visto em código de exemplo oficial, sem entrada na documentação |
| `RECOMMENDED`, `COMMUNITY`, `INFERRED` | Reservados. Não deriváveis das três frentes automatizadas; ficam para uma futura passagem de curadoria |

### Manifesto de sincronização

[`data/manifest.json`](data/manifest.json) registra a data do último sync, o commit exato de cada repositório de origem e a contagem de registros. É o que torna o campo de "última verificação" de cada entrada derivável, em vez de mantido à mão.

## Estrutura do repositório

```
src/
  fetch/    estágio 1 — clonar/atualizar os repositórios oficiais
  parse/    estágio 2 — três frentes de extração
  enrich/   estágio 3 — fundir e normalizar em SymbolRecord
  store/    gravar o JSON fonte de verdade + manifesto
  render/   estágio 4 — geração de Markdown (não implementado)
  cli.ts    comandos sync / render
data/
  manifest.json   estado do sync: data, commits das fontes, contagens
  symbols/        o JSON fonte de verdade, um arquivo por módulo
skills/
  zepp-os/SKILL.md   a Agent Skill
.cache/     repositórios oficiais clonados (não versionado)
```

O Markdown gerado vai para `concepts/`, `api/`, `runtimes/`, `patterns/`, `examples/`, `compatibility/` e `tools/` — vazios enquanto `render` não existir.

## Decisões de projeto

1. **A extração é scriptada desde o início.** Popular a base à mão viraria uma coleção de markdowns inconsistentes; scriptar obriga a definir um schema e um padrão de extração logo de cara.
2. **Linguagem do extrator: Node/TypeScript.** Acesso nativo a um parser MDX real, alinhamento com o ecossistema do Zepp OS (os samples já são JS) e o mesmo runtime da Skill e de um eventual servidor MCP. TypeScript em vez de JS puro para tipar o schema dos registros e pegar dados malformados já na fronteira parse/enrich.
3. **O JSON é a fonte de verdade, não o Markdown** (ver acima).
4. **Um arquivo JSON por módulo**, em `data/symbols/<slug-do-módulo>.json`. Cada arquivo carrega o id canônico do módulo e seus símbolos; o nome do arquivo é apenas um slug derivado (`@zos/router` → `zos-router.json`). Com ~40 módulos e ~330 símbolos, um arquivo por símbolo geraria centenas de arquivos minúsculos e um diff de sync ilegível. Agrupar por módulo mantém o diff no nível em que a mudança de fato acontece — *o que mudou em `@zos/router`* — e ainda deixa cada arquivo pequeno o bastante para ser lido inteiro.
   - A gravação reescreve o diretório inteiro, então um módulo que desaparece na origem desaparece aqui também.
   - `originalPath` é normalizado para posix, para o JSON versionado não depender do sistema operacional de quem rodou o sync.

## Pontos em aberto

1. **Markdown gerado vs. versionado** — edições manuais nos diretórios de Markdown renderizado devem ser sempre sobrescritas no próximo `render` (JSON como única fonte de verdade), ou deve existir um mecanismo de anotação que sobrevive à regeneração, para cobrir o que o parser não capturou corretamente?

## Agent Skill

[`skills/zepp-os/SKILL.md`](skills/zepp-os/SKILL.md) não contém documentação em si. Ela ensina o agente a *usar* esta base de conhecimento:

- identificar primeiro o runtime alvo e o `API_LEVEL` alvo
- verificar compatibilidade antes de sugerir uma API
- preferir documentação e exemplos oficiais
- não assumir que APIs de browser ou Node.js existem no runtime do Zepp OS
- explicitar quando a documentação disponível for insuficiente

Dados os limites de cobertura acima, a Skill também precisa declarar o que esta base *não* cobre, para que o agente responda "não coberto" em vez de "não existe".
