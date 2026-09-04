# Zepp OS Agent Knowledge Base

[English](README.md) · **Português**

Uma base de conhecimento ciente de compatibilidade, posicionada entre as fontes oficiais do Zepp OS e os agentes de IA que escrevem código para Zepp OS.

Isto **não** é um espelho da documentação. A documentação oficial existe, mas não está no formato que um agente consegue consumir de forma confiável quando a pergunta é *"posso chamar esta API neste runtime, neste API_LEVEL?"*. Este projeto extrai essas fontes para uma camada estruturada em que essa pergunta tem resposta verificável.

Fontes: [`zepp-health/zeppos-docs`](https://github.com/zepp-health/zeppos-docs) (páginas de referência e o conteúdo preparado para LLMs em `static/llms`) e [`zepp-health/zeppos-samples`](https://github.com/zepp-health/zeppos-samples) (uso real nos aplicativos de exemplo oficiais).

## Status — v0, em desenvolvimento

| Estágio | Situação |
| --- | --- |
| `fetch` — clonar/atualizar os repositórios oficiais em um cache local | implementado |
| `parse` — extrair observações brutas de docs, `static/llms`, samples, guias e da lista de dispositivos | implementado |
| `enrich` — fundir as frentes de símbolo em um registro por símbolo | implementado |
| `store` — gravar o JSON fonte de verdade, um arquivo por módulo | implementado |
| `render` — gerar o Markdown final da base de conhecimento | implementado (api/, compatibility/, runtimes/, patterns/) |

Testes baseados em fixtures cobrem as cinco frentes de parse, a atribuição de runtime, a fusão do enrich e todas as visões do render: `npm test` (97 passando, 1 `todo`).

Retrato do último sync (números atualizados em [`data/manifest.json`](data/manifest.json)):

- **383 símbolos** em **34 módulos**, vindos de 222 páginas de referência + 445 entradas de `static/llms` + 622 imports em samples
- 359 `OFFICIAL`, 24 `OBSERVED`
- 354 símbolos têm `API_LEVEL` mínimo; 265 têm descrição
- todo símbolo é atribuído a pelo menos um runtime: 375 Device App, 12 Workout Extension, 5 Side Service, 3 Watchface, 0 Settings App — 12 deles a mais de um
- **11 patterns** vindos dos guias de boas práticas, 32 abordagens, usando 17 símbolos distintos — todos os 17 cobertos pelos registros de símbolo
- **41 dispositivos**: 29 rodando Zepp OS com `API_LEVEL` declarado, 5 em Zepp OS 1.0 sem nenhum, 7 que não rodam Mini Program

## Cobertura e limites

Leia isto antes de confiar em qualquer resposta saída desta base.

- **A superfície de API documentada é a do Device App.** O parser se apoia na linha `import { x } from '@zos/...'` que as páginas de referência carregam. As páginas de `side-service-api` e `app-settings-api` não têm essa linha — esses runtimes usam globais (`fetch`, `settingsStorage`, `Settings.render`), não módulos `@zos` — e a API de watchface (`hmUI`, `hmFS`, `hmSensor`, `hmSetting`) vive em uma árvore separada. Todas seguem ignoradas pelas frentes de docs.
- **O eixo de runtime está populado, de forma desigual.** Todo símbolo carrega ao menos um runtime, mas 267 de 276 são Device App. Os 5 do Side Service e os 3 do Watchface vêm de código de sample, não de uma entrada de documentação, e o Settings App não tem **nenhum** — ver [`runtimes/index.md`](runtimes/index.md), que declara essa lacuna em vez de omitir o runtime.
- **Um símbolo ausente significa "não coberto", não "não existe."** Isso vale com mais força no eixo de runtime: um símbolo ausente de `runtimes/settings.md` não diz nada sobre o Settings App poder usá-lo, porque nada foi extraído para aquele runtime.
- **O runtime é inferido do caminho da fonte, nunca do texto da página.** Nenhuma página ou sample declara seu runtime; os dois repositórios oficiais separam os runtimes por diretório, então o diretório é a evidência. As regras e o documento que ancora cada uma vivem em [`src/parse/runtime.ts`](src/parse/runtime.ts). É o eixo mais exposto a uma reorganização upstream, e a razão de ter arquivo de teste próprio.
- **`API_LEVEL` é o único eixo que funciona hoje.** É lido literalmente do blockquote de badge de cada página (`Start from API_LEVEL`, ou `Supported since API_LEVEL` — as duas redações ocorrem), nunca inferido.
- **A descrição está ausente na maioria dos símbolos.** 94 páginas de referência trazem o título no frontmatter em vez de um H1, e o extrator de descrição só lê o texto sob um H1. Registrado como teste `todo` em `test/parse.test.ts`.
- **Bugs de parser são o principal risco, e todos até agora foram a mesma falha**: um formato de origem que parecia regular no primeiro arquivo e não era. Cada um está agora fixado por um teste de fixture construído a partir do arquivo real que o quebrou, então uma regressão falha a suíte em vez de produzir registros errados silenciosamente.
- **Fixtures fixam regressões; não provam cobertura.** Dois bugs sobreviveram a uma suíte verde porque as fixtures foram escritas a partir dos arquivos já lidos. Os dois foram achados rodando o pipeline real e olhando as contagens agregadas: um checkout CRLF (ver abaixo) descartou silenciosamente 188 constantes documentadas, e uma regra de caminho arquivou 10 símbolos no runtime errado porque um diretório da documentação tem o mesmo nome de um diretório de app. Agregue a saída de uma frente nova antes de acreditar nela.
- **A lista de dispositivos é um retrato dos níveis *mais recentes*, não um histórico.** Ela declara o maior `API_LEVEL` que cada dispositivo alcança hoje, então a contagem de símbolos disponíveis pressupõe o dispositivo atualizado. Não diz nada sobre qual firmware um usuário específico está rodando.
- **As quebras de linha são normalizadas na leitura.** `git clone` entrega um cache CRLF no Windows e LF nos outros sistemas, e regexes ancoradas com `$` pararam de casar sem gerar erro — um sync no Windows produzia uma base materialmente menor que o mesmo commit sincronizado no Linux. `readSource` em `src/parse/util.ts` normaliza para LF, então a saída do parse depende apenas do commit.

## Início rápido

```bash
npm install
npm run sync       # fetch -> parse -> enrich -> grava data/
npm test           # testes de fixture dos parsers e da fusão do enrich
npm run typecheck
```

`sync` clona os repositórios oficiais em `.cache/` (não versionado, dezenas de MB) e reescreve `data/`. É idempotente: rodar duas vezes seguidas não gera diff.

`npm run render` reescreve `api/`, `compatibility/`, `runtimes/` e `patterns/` a partir do JSON fonte de verdade. Cada diretório recebe um `index.md` (a lista de módulos; a visão inversa — quais módulos um dado `API_LEVEL` libera e quais dispositivos o alcançam; a tabela de cobertura por runtime; e a lista de patterns com um índice símbolo-para-patterns). `compatibility/` recebe também `devices.md`. Um `README.md` escrito à mão em qualquer um deles é preservado; todo outro `.md` ali é gerado e sobrescrito.

## Como funciona

Quatro estágios, cada um idempotente e inspecionável isoladamente, de modo que qualquer um pode ser reexecutado sem refazer os anteriores. A execução é local e sob demanda — não há job agendado em CI na v0.

1. **fetch** — clona ou atualiza os repositórios oficiais em `.cache/` e registra o commit exato de cada um. Conteúdo de terceiros, nunca versionado aqui.
2. **parse** — cinco frentes independentes sobre o cache bruto:
   - **docs-reference** — `docs/reference/**/*.mdx`, um arquivo por símbolo. O módulo é resolvido a partir da linha de import no exemplo da própria página, porque o nome do diretório não corresponde de forma confiável ao id do módulo.
   - **llms** — `static/llms/@zos-*.md`, um arquivo por módulo, aproveitando a estruturação que a própria Zepp Health já fez para consumo por LLMs. O id do módulo vem das linhas de import dentro do arquivo, não do H1: `@zos/ui` é dividido em vários arquivos cujo H1 diz `@zos/ui-methods`, `@zos/ui-widget-basic` etc., e esses ids não são importáveis.
   - **samples** — todo import `@zos/*` nos aplicativos de exemplo oficiais. Evidência de uso real, não uma afirmação da documentação.
   - **guides** — `docs/guides/best-practice/**.mdx`, um arquivo por tarefa. Só as partes com formato fixo são lidas: título do frontmatter, seções `##`, blocos de código cercados e as páginas de referência que o guia linka. Nada é inferido da prosa.
   - **lista de dispositivos** — `docs/reference/related-resources/device-list.mdx`, a única fonte que liga um `API_LEVEL` ao hardware. Um arquivo, duas tabelas com colunas *diferentes*, então as colunas são resolvidas por nome de cabeçalho e uma ausente lança erro.

   Cada frente também atribui um **runtime** a partir do caminho de onde leu a unidade, já que nenhum conteúdo declara um: `docs/reference/device-app-api/` é o Device App, `zeppos-samples/watchface/` é um Watchface, `app-side/` dentro de qualquer app de exemplo é o Side Service. Um caminho que nenhuma regra cobre não recebe runtime, em vez de receber um padrão.
3. **enrich** — agrupa as observações por id de símbolo e normaliza os metadados que são o coração do projeto: `API_LEVEL` mínimo, runtime, fonte e nível de confiança. A prioridade por campo é `docs-reference` > `llms` > `sample` — exceto `runtimes`, que é **unido** em vez de resolvido por prioridade, porque cada frente observa um runtime diferente em vez de fazer uma afirmação concorrente sobre o mesmo. Um símbolo documentado na API de Device App e também visto em um sample de watchface é válido nos dois.
4. **render** — gera quatro visões, mais um `index.md` em cada:
   - `api/` — símbolos por módulo
   - `compatibility/` — agrupados por `API_LEVEL` mínimo, mais `devices.md`
   - `runtimes/` — uma página por runtime
   - `patterns/` — uma página por guia de boas práticas

   Símbolo sem mínimo documentado é rotulado `not stated`, nunca `any` — ausência de nível é ausência de evidência, não afirmação de compatibilidade. `runtimes/` gera página para **todo** runtime, inclusive os sem símbolo algum, porque uma página ausente se lê como "este runtime não existe" enquanto uma página declarando "0 símbolos cobertos" se lê como a lacuna de cobertura que é. Os demais diretórios do README (`concepts/`, `examples/`, `tools/`) guardam conhecimento que as frentes automatizadas ainda não alcançam, então não são gerados. É o que a Agent Skill lê.

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
| `runtimes` | Runtimes para os quais o símbolo tem evidência, vindos do caminho da fonte. Um de `device-app`, `side-service`, `settings`, `watchface`, `workout-extension` (ver *Cobertura e limites*) |
| `source` | De qual frente o registro foi construído primariamente |
| `confidence` | Ver abaixo |
| `originalPath` | Arquivo de onde o registro foi extraído, normalizado para posix |
| `extractedAt` | Data da extração |

### Níveis de confiança

| Nível | Significado |
| --- | --- |
| `OFFICIAL` | Declarado pela documentação oficial (`docs-reference` ou `llms`) |
| `OBSERVED` | Visto em código de exemplo oficial, sem entrada na documentação |
| `RECOMMENDED`, `COMMUNITY`, `INFERRED` | Reservados. Não deriváveis das frentes automatizadas; ficam para uma futura passagem de curadoria |

### `PatternRecord`

Um pattern é uma tarefa ("comunicar entre páginas", "adaptar a uma tela redonda"), não um símbolo, então recebe registro próprio e seu próprio `data/patterns/<id>.json`.

| Campo | Significado |
| --- | --- |
| `id` / `title` | Slug do nome do arquivo do guia, e o título do frontmatter |
| `summary` | A prosa de abertura do guia, ou a da primeira seção quando ele começa direto em `## Introduction` |
| `approaches` | Uma por seção `##`: título, os símbolos que o código dela importa, e seus blocos de código literais |
| `symbols` / `modules` | União sobre as abordagens. `modules` guarda imports de namespace (`import * as ble from '@zos/ble'`), que não nomeiam símbolo |
| `runtimes` | Só o que os títulos de fence do próprio guia declaram (`title=app-side/index.js` é o Side Service). Os runtimes dos símbolos usados são resolvidos no render, para os dois não divergirem |
| `referencePages` | Páginas de referência que o guia linka, resolvidas para caminhos relativos ao cache |

**O que torna um pattern verificável em vez de uma cópia do guia** é o join que o `render` faz contra os registros de símbolo:

- **o `API_LEVEL` mínimo que o pattern inteiro exige** — o maior mínimo entre os símbolos que seu código usa, já que todos precisam estar disponíveis. Nenhuma página upstream declara isso. `Data Persistence` sai como `>= 3` sem o guia mencionar nível algum.
- **quais desses símbolos esta base não tem registro**, para a lacuna ficar visível em vez de o pattern parecer totalmente verificado.
- **o índice inverso** em `patterns/index.md`: dado um símbolo, quais patterns o mostram em uso. Os guias linkam para as páginas de referência; nada upstream linka de volta.

### `DeviceRecord`

`data/devices.json` — um arquivo só, porque a fonte é uma única tabela de 41 linhas e um arquivo por dispositivo daria 41 arquivos minúsculos e um diff de sync ilegível.

| Campo | Significado |
| --- | --- |
| `name` | Literal. Upstream é inconsistente com o prefixo `Amazfit`, então normalizar inventaria nomes que não batem com nenhum documento oficial |
| `latestApiLevel` | Maior nível que o dispositivo alcança. **Ausente quando a tabela diz `-`**, o que vale para todo dispositivo Zepp OS 1.0: a API 2.0 que esta base documenta não roda neles. `-` é *não declarado*, nunca nível 0 |
| `latestOsVersion` | Versão do Zepp OS, ex. `5.0` |
| `deviceSources` | Os ids de `deviceSource`, com `mainlandChina` vindo do sufixo `*` upstream |
| `screen` | `shape` (`round`, `square` ou `band`), `radius` (só quadrado e band), `width`/`height` |
| `physicalKeys`, `watchfacePreview`, `secondaryWidget` | Cada um ausente onde a tabela declara `-` em vez de um valor |
| `runsZeppOs` | `false` para as linhas sob *Non-Zepp OS Devices* — hardware que aceita watchface mas não roda Mini Program |

**Por que esta frente é a que mais aproxima a base de responder a pergunta real.** `compatibility/` diz que um símbolo exige `>= 4.2`. Essa não é a pergunta do dev; *"roda num Bip 6?"* é. `compatibility/devices.md` junta os dois e responde, e o índice de compatibilidade agora nomeia o hardware que alcança cada nível. O join também produz uma **contagem de símbolos disponíveis por dispositivo** que não existe em nenhum lugar upstream — um Amazfit Bip 5 (`API_LEVEL 2.1`) alcança 205 dos 354 símbolos com mínimo declarado; um Balance 3 (`4.4`) alcança todos os 354.

A contagem é um piso, de propósito: os 29 símbolos sem mínimo declarado ficam de fora em vez de assumidos disponíveis, e um dispositivo sem nível declarado conta zero símbolos e sai numa seção própria dizendo isso.

### Manifesto de sincronização

[`data/manifest.json`](data/manifest.json) registra a data do último sync, o commit exato de cada repositório de origem e a contagem de registros. É o que torna o campo de "última verificação" de cada entrada derivável, em vez de mantido à mão.

## Estrutura do repositório

```
src/
  fetch/    estágio 1 — clonar/atualizar os repositórios oficiais
  parse/    estágio 2 — quatro frentes de extração
    devices.ts   a frente da lista de dispositivos (colunas por nome de cabeçalho)
    patterns.ts  a frente dos guias de boas práticas
    runtime.ts   regras caminho -> runtime, com o doc que ancora cada uma
    util.ts      caminhada de diretório + a leitura que normaliza para LF
  enrich/   estágio 3 — fundir e normalizar em SymbolRecord / PatternRecord
  store/    gravar o JSON fonte de verdade + manifesto
  render/   estágio 4 — geração de Markdown
    patterns.ts  a visão de patterns e seu join contra os símbolos
    shared.ts    helpers com que todas as visões concordam
  cli.ts    comandos sync / render
data/
  manifest.json   estado do sync: data, commits das fontes, contagens
  devices.json    a lista de dispositivos: API_LEVEL, versão do OS, tela, deviceSource
  symbols/        o JSON fonte de verdade, um arquivo por módulo
  patterns/       um arquivo por guia de boas práticas
skills/
  zepp-os/SKILL.md   a Agent Skill
concepts/
  README.md          índice de notas (estudo de retrieval/RAG/MCP)
test/
  fixtures/cache/    excertos reduzidos das fontes reais, no layout do cache
  *.test.ts          testes dos parsers e do enrich
.cache/     repositórios oficiais clonados (não versionado)
```

O Markdown gerado vai para `api/`, `compatibility/`, `runtimes/` e `patterns/`. `concepts/` guarda notas curadas
sobre retrieval/RAG/MCP e suas relações com o projeto (ver [concepts/README.md](concepts/README.md)).
`examples/` e `tools/` permanecem vazios até existir uma frente para preenchê-los — o material
bruto dos dois já está em `.cache/` (os 33 apps de exemplo, e `guides/tools/` + `guides/version-info/`),
então são trabalho de parsing, não de curadoria.

## Decisões de projeto

1. **A extração é scriptada desde o início.** Popular a base à mão viraria uma coleção de markdowns inconsistentes; scriptar obriga a definir um schema e um padrão de extração logo de cara.
2. **Linguagem do extrator: Node/TypeScript.** Acesso nativo a um parser MDX real, alinhamento com o ecossistema do Zepp OS (os samples já são JS) e o mesmo runtime da Skill e de um eventual servidor MCP. TypeScript em vez de JS puro para tipar o schema dos registros e pegar dados malformados já na fronteira parse/enrich.
3. **O JSON é a fonte de verdade, não o Markdown** (ver acima).
4. **Um arquivo JSON por módulo**, em `data/symbols/<slug-do-módulo>.json`. Cada arquivo carrega o id canônico do módulo e seus símbolos; o nome do arquivo é apenas um slug derivado (`@zos/router` → `zos-router.json`). Com ~40 módulos e ~330 símbolos, um arquivo por símbolo geraria centenas de arquivos minúsculos e um diff de sync ilegível. Agrupar por módulo mantém o diff no nível em que a mudança de fato acontece — *o que mudou em `@zos/router`* — e ainda deixa cada arquivo pequeno o bastante para ser lido inteiro.
   - A gravação reescreve o diretório inteiro, então um módulo que desaparece na origem desaparece aqui também.
   - `originalPath` é normalizado para posix, para o JSON versionado não depender do sistema operacional de quem rodou o sync.
5. **O runtime é lido do caminho da fonte, em um único lugar.** Nenhuma página ou sample declara a que runtime pertence, mas os dois repositórios oficiais separam os runtimes por diretório, então o caminho carrega o fato. Todas as regras vivem em `src/parse/runtime.ts` junto com o documento que ancora cada uma, em vez de espalhadas pelas frentes que as usam. Um caminho que não casa com nenhuma regra não gera runtime — o mesmo contrato de "nunca fabricar" que `minApiLevel` já tem.
6. **Um pattern é registro próprio, e seu valor é o join.** Guias de boas práticas são prosa, então extrair "o pattern" como texto tornaria isto um espelho de documentação. O que se extrai é a parte estruturada — título, seções `##`, blocos de código, os imports `@zos` dentro deles — e o `render` faz o join desses ids contra os registros de símbolo. Isso produz o `API_LEVEL` mínimo que uma tarefa inteira exige e o índice símbolo-para-patterns, nenhum dos dois existente upstream. Só a direção derivada é computada no render; o JSON do pattern continua sendo o registro de um guia.
7. **`devices.md` mora em `compatibility/`, e esse diretório tem um dono só.** Hardware é a outra metade do eixo de compatibilidade, não um eixo separado, então a página fica ali em vez de num `devices/` próprio. Isso obriga o `render` a ser dono do diretório inteiro: `prepareOutDir` limpa o diretório, então uma segunda função escrevendo ali teria sua página apagada por quem rodasse depois. O join de dispositivos também alimenta o índice de compatibilidade, então o estágio precisa dos registros de qualquer forma.
8. **As leituras normalizam quebras de linha, uma vez, na fronteira.** `git clone` produz um cache CRLF no Windows e LF em todo o resto, então uma regex de parse ancorada com `$` casava em uma máquina e não na outra, sem erro em nenhuma das duas. Toda frente lê via `readSource`, então a saída do parse depende do commit da fonte e de nada mais — a mesma garantia de portabilidade que `originalPath` dá ao JSON persistido.
9. **Cinco runtimes, não seis.** `guides/architecture/arc.mdx` nomeia três partes de um Mini Program — Device App, Settings App, Side Service — e `guides/architecture/folder-structure.mdx` mostra que `app-side/` **é** o diretório do Side Service. "App-side" e "Side Service" eram o mesmo runtime com dois nomes, então só um foi mantido. Shortcut Card (`app-widget/`) e SecondaryWidget (`secondary-widget/`) são pontos de entrada extras, não runtimes extras: executam no relógio como o Device App, e são atribuídos a ele.

## Pontos em aberto

1. **Markdown gerado vs. versionado** — edições manuais nos diretórios de Markdown renderizado devem ser sempre sobrescritas no próximo `render` (JSON como única fonte de verdade), ou deve existir um mecanismo de anotação que sobrevive à regeneração, para cobrir o que o parser não capturou corretamente?

## Agent Skill

[`skills/zepp-os/SKILL.md`](skills/zepp-os/SKILL.md) não contém documentação em si. Ela ensina o agente a *usar* esta base de conhecimento:

- identificar primeiro o runtime alvo e o `API_LEVEL` alvo, consultando `runtimes/index.md`
- verificar os dois eixos — `runtimes/` e `compatibility/` — antes de sugerir uma API
- recorrer a `patterns/` quando a pergunta é uma tarefa, não um símbolo
- responder pergunta de hardware por `compatibility/devices.md`, nunca por um nível sozinho
- preferir documentação e exemplos oficiais
- não assumir que APIs de browser ou Node.js existem no runtime do Zepp OS
- explicitar quando a documentação disponível for insuficiente

Dados os limites de cobertura acima, a Skill também precisa declarar o que esta base *não* cobre, para que o agente responda "não coberto" em vez de "não existe".
