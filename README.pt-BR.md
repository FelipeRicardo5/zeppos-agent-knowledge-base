<img src="assets/logo.png" alt="Zepp OS Agent Knowledge Base" width="96" />

# Zepp OS Agent Knowledge Base

[English](README.md) · **Português**

Uma base de conhecimento ciente de compatibilidade, posicionada entre as fontes oficiais do Zepp OS e os agentes de IA que escrevem código para Zepp OS.

Isto **não** é um espelho da documentação. A documentação oficial existe, mas não está no formato que um agente consegue consumir de forma confiável quando a pergunta é *"posso chamar esta API neste runtime, neste API_LEVEL?"*. Este projeto extrai essas fontes para uma camada estruturada em que essa pergunta tem resposta verificável.

Fontes: [`zepp-health/zeppos-docs`](https://github.com/zepp-health/zeppos-docs) (páginas de referência e o conteúdo preparado para LLMs em `static/llms`) e [`zepp-health/zeppos-samples`](https://github.com/zepp-health/zeppos-samples) (uso real nos aplicativos de exemplo oficiais).

## Status — v0, em desenvolvimento

| Estágio | Situação |
| --- | --- |
| `fetch` — clonar/atualizar os repositórios oficiais em um cache local | implementado |
| `parse` — nove frentes: páginas de referência, os runtimes do celular, a árvore `hm*` de watchface, `static/llms`, imports dos samples, apps de exemplo, guias, lista de dispositivos, `app.json` | implementado |
| `enrich` — fundir as frentes de símbolo em um registro por símbolo | implementado |
| `store` — gravar o JSON fonte de verdade, um arquivo por módulo | implementado |
| `render` — gerar o Markdown final da base de conhecimento | implementado (api/, compatibility/, runtimes/, patterns/, examples/, manifest/, conflicts/) |

Testes baseados em fixtures cobrem as nove frentes de parse, a atribuição de runtime, a extração de forma de chamada e de conjuntos de valores, a fusão do enrich e todas as visões do render: `npm test` (225 passando, nenhum `todo`). Eles provam que o extrator não regride; não provam que a base *responde bem*, e é para isso que existe [`eval/`](eval/README.md).

Retrato do último sync (números atualizados em [`data/manifest.json`](data/manifest.json)):

- **513 símbolos** em **50 módulos**, vindos de todas as 241 páginas de referência + 36 entradas dos runtimes do celular + **89 páginas `hm*` de watchface** + 443 de `static/llms` + 785 observações em samples
- 496 `OFFICIAL`, 17 `OBSERVED`
- 353 símbolos têm `API_LEVEL` mínimo; 367 têm descrição; **178 têm assinatura de chamada e 147 têm tabelas de propriedades** — 1157 propriedades, 591 delas com nível mínimo próprio
- **27 conjuntos de valores** em 24 símbolos — 196 membros, 124 deles declarando nível mínimo próprio. 146 vêm de uma tabela documentada e 50 de código de sample, marcados membro a membro
- **257 membros de instância** em 46 símbolos — o que se chama sobre um valor em vez de importar: `new HeartRate().getCurrent()`, `localStorage.getItem(...)`. Todos carregam assinatura e prosa, 44 declaram nível mínimo próprio, e 60 das shapes e 10 dos conjuntos de valores acima pertencem a um membro, não ao símbolo
- **todo runtime está coberto**: 375 Device App, **105 Watchface**, 21 Settings App, 20 Side Service, 12 Workout Extension — 20 símbolos válidos em mais de um
- **11 patterns** vindos dos guias de boas práticas, 32 abordagens, usando 17 símbolos distintos — todos os 17 cobertos pelos registros de símbolo
- **41 dispositivos**: 29 rodando Zepp OS com `API_LEVEL` declarado, 5 em Zepp OS 1.0 sem nenhum, 7 que não rodam Mini Program
- **como fazer o build para cada um deles**: os seletores de tela `st`/`sr` que um manifest v3 exige, derivados da tela do próprio dispositivo, ao lado dos números `deviceSource` que um v2 exige — mais o índice reverso e um diff nos dois sentidos contra o que os 33 samples de fato constroem
- **33 apps de exemplo** lidos como código, rendendo 592 excertos citados e a forma de 33 `app.json` que funcionam
- **15 conflitos** que as fontes não sabem que têm: uma descrição que duas páginas oficiais declaram de formas diferentes, um id de widget escrito de um jeito no código e documentado de outro, e 13 chamadas de método cujo nome resolve para mais de uma coisa dentro do runtime do próprio sample. `conflicts/index.md` cita os dois lados de cada um
- **o schema do `app.json`**: 20 chaves documentadas com suas tabelas de propriedades, 3 chaves que a página de referência nomeia e nunca descreve, e um diff nos dois sentidos contra os 33 manifests reais — 48 caminhos de chave que apps reais usam e a página jamais menciona, 12 chaves documentadas que nenhum sample usa, e 38 strings de permissão ligadas aos símbolos que as declaram

## Cobertura e limites

Leia isto antes de confiar em qualquer resposta saída desta base.

- **A API `hm*` de watchface não declara `API_LEVEL` em lugar nenhum.** Nenhuma das suas 89 páginas de referência traz badge, então seus 102 símbolos respondem "isso existe" e nunca "desde quando" — a mesma forma de lacuna que o Settings App e o Side Service têm. Nada em `compatibility/` consegue atestar um símbolo de watchface num dispositivo específico.
- **O id de um símbolo de watchface é um caminho global, não um import.** `hmUI.widget.TEXT`, `hmSensor.id.HEART`, `hmFS.open` — é assim que o código os escreve, e não há linha de `import` alguma na árvore. O módulo vem do exemplo da própria página, com o diretório como fallback: `hmUI/widget/data_type.mdx` está no diretório de widget e o código escreve `hmUI.data_type`.
- **O `app.json` documentado é incompleto, e a base diz onde.** A página de referência não nomeia nenhuma chave de `module` que alcance o runtime Workout Extension, e mesmo assim seis samples são um — usam uma chave `data-widget` que a página nunca menciona. `manifest/index.md` reporta o diff nos dois sentidos em vez de apresentar a árvore documentada como se fosse o schema inteiro. Linhas documentadas são `OFFICIAL`; caminhos observados são `OBSERVED`, e 33 apps também não são a superfície inteira.
- **Membro de instância é campo, nunca símbolo.** `getCurrent` é alcançado por um valor (`new BloodOxygen().getCurrent()`), então vive no registro dono e não como `@zos/sensor.getCurrent`, um id que nada importa. 12 sensores documentam um `getCurrent` e eles retornam 12 formas diferentes, e é por isso que o dono faz parte da identidade. Um membro declara `API_LEVEL` mínimo próprio, e o do símbolo não o implica: `BloodOxygen` é 2.0 enquanto seus `start` e `stop` são 2.1.
- **Nem todo cabeçalho sob `Methods` é um membro.** `ui/widget/SYSTEM_KEYBOARD.mdx` lista `deleteKeyboard()` ali e o próprio exemplo o importa — é função de módulo documentada ao lado do widget. Um caso em 257, pego por esse import e não por uma regra sobre nomes.
- **O eixo de runtime está populado, de forma desigual.** Todo runtime agora tem símbolos, mas 375 de 411 são Device App. Os 21 do Settings App e os 20 do Side Service **não têm `API_LEVEL` algum** — nenhuma página das duas árvores declara um — então respondem "isso existe aqui" mas não "desde quando".
- **Um símbolo ausente significa "não coberto", não "não existe."** Isso vale com mais força no eixo de runtime: um símbolo ausente de `runtimes/settings.md` não diz nada sobre o Settings App poder usá-lo, porque nada foi extraído para aquele runtime.
- **O runtime é inferido do caminho da fonte, nunca do texto da página.** Nenhuma página ou sample declara seu runtime; os dois repositórios oficiais separam os runtimes por diretório, então o diretório é a evidência. As regras e o documento que ancora cada uma vivem em [`src/parse/runtime.ts`](src/parse/runtime.ts). É o eixo mais exposto a uma reorganização upstream, e a razão de ter arquivo de teste próprio.
- **`API_LEVEL` é o único eixo que funciona hoje.** É lido literalmente do blockquote de badge de cada página (`Start from API_LEVEL`, ou `Supported since API_LEVEL` — as duas redações ocorrem), nunca inferido.
- **44 de 411 símbolos não têm descrição.** 14 são avistamentos `OBSERVED` só de nome em código de sample, que não carrega prosa — 11 desses são `@zeppos/zml`, uma biblioteca auxiliar e não API de plataforma. O resto são páginas sem nada entre título e primeira seção, mais os símbolos de enum cujas páginas documentam os membros e nunca descrevem o conjunto.
- **Os membros de um enum são documentados nas páginas que o usam, não na dele.** `align` é definido em `ui/widget/TEXT.mdx` e em `ui/widget/PAGE_INDICATOR.mdx`, então seus membros são a *união* do que várias páginas declaram — o único campo que esta base funde por união em vez de por prioridade de fonte. Um membro ausente de toda página que por acaso mencionou o enum está ausente aqui também.
- **`widget` é o único conjunto de valores que a documentação declara incompleto, e ela diz isso.** A página de referência lista um único id de widget e então diz que "o resto dos valores não está listado"; os outros 24 são `OBSERVED`, lidos do código de sample. Nenhuma das duas fontes é o conjunto inteiro, e `api/zos-ui.md` declara isso em vez de apresentar 25 como a resposta.
- **Membros lidos de código de sample são escopados ao que o arquivo importa.** `align.CENTER_H` conta porque o arquivo diz `import { align } from '@zos/ui'` acima. É também por isso que samples de watchface não contribuem nenhum: eles usam os globais `hm*`, então o `widget.X` deles é outro `widget`.
- **Bugs de parser são o principal risco, e todos até agora foram a mesma falha**: um formato de origem que parecia regular no primeiro arquivo e não era. Cada um está agora fixado por um teste de fixture construído a partir do arquivo real que o quebrou, então uma regressão falha a suíte em vez de produzir registros errados silenciosamente.
- **Fixtures fixam regressões; não provam cobertura.** Dois bugs sobreviveram a uma suíte verde porque as fixtures foram escritas a partir dos arquivos já lidos. Os dois foram achados rodando o pipeline real e olhando as contagens agregadas: um checkout CRLF (ver abaixo) descartou silenciosamente 188 constantes documentadas, e uma regra de caminho arquivou 10 símbolos no runtime errado porque um diretório da documentação tem o mesmo nome de um diretório de app. Agregue a saída de uma frente nova antes de acreditar nela.
- **A chave `targets` do `app.json` não é um identificador de dispositivo, e a base diz isso.** O upstream a chama de "nomeada arbitrariamente" — ela só precisa casar com um subdiretório de `assets/`. Quem seleciona hardware é `targets.*.platforms[]`: números `deviceSource` sob configVersion v2, forma e largura de tela (`st`, `sr`) sob v3. Os 33 samples se dividem exatamente nessa linha, 14 contra 19, e nenhum mistura os dois.
- **O `st` e o `sr` de um dispositivo são derivados aqui, não citados.** Nenhuma fonte os declara por dispositivo; são a forma e a largura de tela da própria lista, reescritas no formato que `platforms[]` usa. O `deviceSource` é literal.
- **Onde duas fontes discordam, esta base escolhe por prioridade e a página resultante não diz nada sobre a perdedora.** É para isso que existe [`conflicts/index.md`](conflicts/index.md). Descrições são comparadas depois de normalizar pontuação e a nota `permission code:` — cruas, 147 símbolos "discordam" e todos por causa de um ponto final. `API_LEVEL` e assinaturas nunca discordam. `kind` discorda 98 vezes e é deliberadamente omitido: é palpite deste extrator, não afirmação de fonte alguma.
- **Uma chamada de método vista em código de sample é casada por nome, nunca por tipo resolvido**, e restringida aos runtimes do sample onde foi vista. Quando sobra mais de um candidato, a linha diz `ambiguous` e nomeia todos em vez de escolher. Antes de existirem membros de instância a base nem enxergava o melhor candidato e reportava `.getItem()` como `settings-storage.getItem`, do Settings App, em seis samples de Device App onde é `localStorage.getItem`.
- **Só 24 códigos de permissão estão documentados, e os 33 manifests de sample declaram 34.** A sobreposição é parcial nos dois sentidos: `event:os.*`, `device:os.ble` e `gps` são declarados por samples publicados e exigidos por símbolo nenhum que esta base conheça. Então permissão ausente do registro de um símbolo é *não coberta*, nunca *não necessária*. `manifest/index.md` junta os dois lados.
- **As permissões que um pattern exige são derivadas, não citadas.** União sobre os símbolos que o código do próprio guia usa — o guia não declara nenhuma. `multi-screen-adaption` precisa de `data:os.device.info` e nunca diz isso.
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
2. **parse** — oito frentes independentes sobre o cache bruto:
   - **docs-reference** — `docs/reference/**/*.mdx`, um arquivo por símbolo. O módulo vem da linha de import no exemplo da própria página; quando a página não tem nenhuma — ela documenta um global do runtime como `setTimeout` ou `console`, então não há o que importar — cai para o diretório `newAPI/<dir>`. Medido: 221 das 222 páginas que *têm* import concordam com o diretório, e a exceção é um submódulo (`@zos/ble/TransferFile`), então o import continua primário.
   - **runtimes do celular** — `docs/reference/side-service-api/**` e `docs/reference/app-settings-api/**`. Essas APIs são globais (`fetch`, `settings.settingsStorage`, `messaging.peerSocket`) ou componentes do Settings App, então não há import para se apoiar e a frente docs-reference as ignora. Nas 22 páginas elas assumem quatro formas — página-como-símbolo, `##`-como-símbolo, `##`-como-módulo com símbolos em `###` (sinalizado pelo título terminando na palavra `module`), e sem heading algum — então a forma é detectada, não presumida.
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
   - `examples/` — uma página por app de exemplo, indexado por símbolo

   Símbolo sem mínimo documentado é rotulado `not stated`, nunca `any` — ausência de nível é ausência de evidência, não afirmação de compatibilidade. `runtimes/` gera página para **todo** runtime, inclusive os sem símbolo algum, porque uma página ausente se lê como "este runtime não existe" enquanto uma página declarando "0 símbolos cobertos" se lê como a lacuna de cobertura que é. `concepts/` e `tools/` são os dois diretórios em que o `render` não escreve: `concepts/` é escrito à mão por decisão, e `tools/` espera uma frente. É o que a Agent Skill lê.

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
| `signature` | A assinatura de chamada que a página declara, **literal**. `(props: Props) => result: RenderFunc` não é TypeScript válido, então normalizar perderia informação ou inventaria uma forma que a documentação nunca declarou |
| `shapes` | Toda tabela de propriedade nomeada da página, com o nome do cabeçalho acima dela — `Props`, `SelectOption`, `Options`, `DownloadTask`. Uma assinatura é inutilizável sem elas, e o `options` de `Select` é inutilizável sem `SelectOption` |
| `enums` | Os conjuntos de valores que o símbolo *é* ou *retorna*. `@zos/ui.align` guarda os próprios membros, escritos como o código os escreve; `@zos/sensor.BloodOxygen` guarda `retCode`, o domínio de um valor que ele retorna. Cada membro pode declarar `API_LEVEL` e confiança próprios, e `partial` marca um conjunto que a própria documentação chama de incompleto. É o único campo fundido por **união** entre fontes em vez de por prioridade — ver *Cobertura e limites* |
| `permissions` | Códigos de permissão que o `app.json` precisa declarar para o símbolo funcionar. É campo, e não frase dentro de `description`, porque permissão não declarada falha em **runtime**, não no build — e porque deixá-la na prosa fazia 35 símbolos parecerem discordar do `static/llms`, que omite a nota |
| `members` | O que pode ser chamado sobre um valor que este símbolo produz ou é — `getCurrent`, `getItem`, `setSource`. É campo e não registro, porque todo id aqui é algo importável e `@zos/sensor.getCurrent` não é. Cada um carrega assinatura e prosa próprias e, quando a página declara, `API_LEVEL`, shapes e conjuntos de valores próprios |
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

### `AppJsonRecord`

[`data/app-json.json`](data/app-json.json), um registro para a página
`reference/app-json.mdx` inteira. `app.json` não é um símbolo — é uma árvore de
chaves de configuração, cada uma com sua tabela de propriedades — e está no
caminho crítico de todo Mini Program: um `targets` errado, um ponto de entrada
faltando em `module` ou uma permissão não declarada quebram o build ou a
instalação antes de qualquer API importar.

| Campo | Significado |
| --- | --- |
| `sections` | Uma por chave documentada: `path` pontilhado, `parent`, sua tabela de propriedades, seus exemplos literais e o `runtime` que ela liga quando a fonte declara |
| `gaps` | Chaves tipadas `object` numa tabela e sem seção alguma na página — `targets.module.app-service`, o interruptor do Background Service, é uma delas |
| `completeExample` | O exemplo do arquivo inteiro com que a página encerra, citado à sua linha |

Uma propriedade aqui carrega `minConfigVersion`, não `apiLevel`: a última coluna
da página se chama *Minimum Version* e guarda `v2`/`v3`, que é a configVersion do
arquivo, não um `API_LEVEL`. Reaproveitar `PropSpec` teria arquivado `v3` como
nível 3 — por isso esta frente tem seu próprio tipo de linha.

O aninhamento é derivado de **pertencimento de linha, não de profundidade de
título**. `### module: object` é filho de `targets` escrito na mesma profundidade
que o próprio `targets`, enquanto `#### platforms` é irmão dele um nível abaixo —
ler o `#` arquivaria `module` na raiz. Uma seção é filha da tabela mais recente
que tenha uma linha com o nome dela.

### Manifesto de sincronização

[`data/manifest.json`](data/manifest.json) registra a data do último sync, o commit exato de cada repositório de origem e a contagem de registros. É o que torna o campo de "última verificação" de cada entrada derivável, em vez de mantido à mão.

## Estrutura do repositório

```
src/
  fetch/    estágio 1 — clonar/atualizar os repositórios oficiais
  parse/    estágio 2 — quatro frentes de extração
    devices.ts   a frente da lista de dispositivos (colunas por nome de cabeçalho)
    patterns.ts  a frente dos guias de boas práticas
    examples.ts  os apps de exemplo lidos como código, com excertos citados
    manifest.ts  o schema do app.json, aninhado por pertencimento de linha
    spec.ts      assinaturas e tabelas de propriedades, colunas por cabeçalho
    phone.ts     a frente Side Service + Settings App (quatro formas de página)
    runtime.ts   regras caminho -> runtime, com o doc que ancora cada uma
    util.ts      caminhada de diretório + a leitura que normaliza para LF
  enrich/   estágio 3 — fundir e normalizar em SymbolRecord / PatternRecord
  store/    gravar o JSON fonte de verdade + manifesto
  render/   estágio 4 — geração de Markdown
    examples.ts  a visão de examples: símbolo -> código, método -> símbolo provável
    manifest.ts  a visão de app.json: chave -> runtime, documentado vs. observado
    patterns.ts  a visão de patterns e seu join contra os símbolos
    shared.ts    helpers com que todas as visões concordam
  cli.ts    comandos sync / render
data/
  manifest.json   estado do sync: data, commits das fontes, contagens
  devices.json    a lista de dispositivos: API_LEVEL, versão do OS, tela, deviceSource
  app-json.json   o schema do app.json: árvore de chaves, tabelas, lacunas
  symbols/        o JSON fonte de verdade, um arquivo por módulo
  patterns/       um arquivo por guia de boas práticas
  examples/       um arquivo por app de exemplo: manifesto, arquivos, excertos
skills/
  zepp-os/SKILL.md   a Agent Skill
concepts/
  README.md          índice de notas, em dois blocos
  dominio.md         o modelo de domínio: unidades, pipeline, o que é uma "frente"
  simbolos.md        símbolo, id, módulo, assinatura, shape
  runtimes.md        os cinco runtimes e como são inferidos
  api-level.md       os quatro números de versão que não são intercambiáveis
  confianca.md       OFFICIAL vs. OBSERVED, proveniência, documentado != completo
test/
  fixtures/cache/    excertos reduzidos das fontes reais, no layout do cache
  *.test.ts          testes dos parsers e do enrich
eval/
  task-*.md          tarefas que um agente tenta usando so a base renderizada
  results/           um relatorio por rodada: as lacunas encontradas, por custo
.cache/     repositórios oficiais clonados (não versionado)
assets/     a logo deste repositório — não é o `assets/` de um app Zepp OS
```

O Markdown gerado vai para `api/`, `compatibility/`, `runtimes/`, `patterns/`, `examples/` e `manifest/`.
`concepts/` guarda notas escritas à mão em dois blocos: **o modelo de domínio** — o que é
um símbolo, o que é um runtime, qual dos quatro números de versão responde o quê, o que uma
tier de confiança promete — e a stack de retrieval (RAG, embeddings, vector stores, MCP) e
sua relação com o projeto. Comece por [concepts/dominio.md](concepts/dominio.md); índice em
[concepts/README.md](concepts/README.md). `tools/` permanece vazio até existir uma frente
para preenchê-lo — o material bruto já está em `.cache/` (`guides/tools/` + `guides/version-info/`),
então é trabalho de parsing, não de curadoria.

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
9. **Descrição é a prosa da página, e só ela.** São páginas MDX, então o extrator precisa saber o que não é prosa: o blockquote do badge de `API_LEVEL`, imports de componente MDX, ilustrações — escritas em markdown numa página e como tag JSX multi-linha em outra, e é por isso que as tags são removidas como unidade e não por linha — e os marcadores `:::info`, cujo *conteúdo* é mantido porque é ali que o código de permissão aparece. Termina no primeiro `## ` ou cerca de código depois do título, para uma página sem seções não engolir o próprio exemplo.
10. **Título de seção nunca é símbolo.** `Constants`, `Overview`, `Usage`, `Submodules` e `Import` intitulam partes de um documento; um título com espaço (`Widget Animation`, `keyboard API`) intitula um grupo de símbolos que o próprio `### Import` nomeia. Os dois estavam sendo arquivados como símbolo, inventando ids como `@zos/ui.Submodules` que nada consegue importar. Uma página chamada `overview`, `index` ou `readme` fica fora do fallback por diretório pelo mesmo motivo.
11. **Um id de pseudo-módulo para API sem import.** Os runtimes do celular são globais, então não há módulo a ler. O agrupamento do próprio doc faz esse papel: o diretório que contém a página quando ela está em um (`ui/button.mdx` → `ui`, a família de que `Settings.render` se serve), senão o nome do arquivo. O nome da árvore é descartado de propósito, então as páginas `settings-storage` das duas árvores mapeiam para um id, o enrich as funde, e o registro sai válido nos **dois** runtimes — que é o que as fontes declaram, já que `app-settings-api/settings-storage.mdx` é literalmente um re-export MDX da página do Side Service. Esses ids são localizadores nesta base, não algo para digitar em código.
12. **Código de sample é fonte, não acervo de citação.** A frente de samples lia 33 mil linhas de JavaScript que funciona apenas pelos *nomes* nas linhas de import e descartava o resto. Ler os mesmos arquivos como código responde o que assinatura nenhuma responde — o que passar — e alcança API que não tem linha de import. Os excertos são citados literalmente com arquivo e linha em vez de resumidos, porque o valor está em o código rodar.
13. **Cinco runtimes, não seis.** `guides/architecture/arc.mdx` nomeia três partes de um Mini Program — Device App, Settings App, Side Service — e `guides/architecture/folder-structure.mdx` mostra que `app-side/` **é** o diretório do Side Service. "App-side" e "Side Service" eram o mesmo runtime com dois nomes, então só um foi mantido. Shortcut Card (`app-widget/`) e SecondaryWidget (`secondary-widget/`) são pontos de entrada extras, não runtimes extras: executam no relógio como o Device App, e são atribuídos a ele.

14. **`app.json` ganha diretório próprio, e suas lacunas são conteúdo.** Não é símbolo nem runtime, então não cabe em `api/` nem em `runtimes/`; `manifest/` é dono do próprio diretório pelo mesmo motivo que `compatibility/` é dono de `devices.md` — `prepareOutDir` limpa o diretório, então dois escritores não podem dividir um. Seu valor são quatro joins que a fonte não faz: chave do manifest → runtime (nada upstream liga os dois, então *"que chave entrega um Side Service"* é senão irrespondível), a árvore documentada comparada **nos dois sentidos** com 33 manifests reais, string de permissão → os símbolos cuja documentação a declara, e as chaves que a página tipa como objeto e nunca descreve. Uma página que renderizasse só a árvore documentada seria cópia da página upstream.

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
