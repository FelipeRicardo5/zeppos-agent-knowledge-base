# O modelo de domínio

O que esta base é feita, e como uma pergunta atravessa ela. Leia esta nota antes das
outras do bloco de domínio — as demais aprofundam um termo de cada vez.

## A ideia em uma frase

A base **não é um espelho da documentação**. É uma camada consultável entre as
fontes oficiais do Zepp OS e um agente que escreve código, na qual toda afirmação
renderizada traça de volta para um registro extraído com o caminho do arquivo de
origem. Se um agente não consegue verificar uma frase, ela não deveria estar aqui.

## As cinco unidades de conhecimento

Cada uma tem um tipo de registro próprio em [`src/types.ts`](../src/types.ts) e um
diretório próprio em `data/`. Nenhuma é forçada dentro de outra.

| Unidade | Registro | Onde vive | Responde |
| --- | --- | --- | --- |
| **Símbolo** | `SymbolRecord` | `data/symbols/<módulo>.json` | *existe? em qual runtime? desde qual nível? como se chama?* |
| **Pattern** | `PatternRecord` | `data/patterns/<guia>.json` | *como faço esta tarefa?* |
| **Dispositivo** | `DeviceRecord` | `data/devices.json` | *roda num Bip 6?* |
| **Exemplo** | `ExampleRecord` | `data/examples/<app>.json` | *como isso é usado de verdade?* |
| **Manifesto** | `AppJsonRecord` | `data/app-json.json` | *o que vai no `app.json`?* |

Um símbolo é a unidade menor, mas raramente é onde uma pergunta real começa. Quem
está **construindo** entra por exemplo ou pattern e usa símbolo como verificação —
é o que a [Agent Skill](../skills/zepp-os/SKILL.md) manda fazer.

## O pipeline: cinco estágios

```
fetch  ->  parse  ->  enrich  ->  store  ->  render
clone     frentes    fusão      JSON      Markdown
```

| Estágio | O que faz | Código |
| --- | --- | --- |
| `fetch` | Clona `zeppos-docs` e `zeppos-samples` num cache local, e anota o commit exato | [`src/fetch/`](../src/fetch/) |
| `parse` | Oito **frentes** independentes leem o cache bruto e emitem observações | [`src/parse/`](../src/parse/) |
| `enrich` | Agrupa as observações por id e reconcilia numa versão por símbolo | [`src/enrich/`](../src/enrich/) |
| `store` | Escreve o JSON, que é a **fonte de verdade** | [`src/store/`](../src/store/) |
| `render` | Gera o Markdown final a partir do JSON | [`src/render/`](../src/render/) |

`npm run sync` roda de `fetch` a `store`. `npm run render` roda o último estágio.

## O que é uma "frente"

Uma **frente** (*front*) é um leitor especializado num formato de fonte. Cada uma
sabe de um jeito só de extrair, e nenhuma sabe da outra. São oito:

| # | Frente | Fonte | Emite |
| --- | --- | --- | --- |
| 1 | páginas de referência | `docs/reference/**/*.mdx` | símbolos |
| 2 | `static/llms` | `static/llms/@zos-*.md` | símbolos e constantes |
| 3 | imports de samples | `zeppos-samples/**/*.js` | símbolos observados |
| 4 | guias | `docs/guides/best-practice/` | patterns |
| 5 | lista de dispositivos | `reference/related-resources/device-list.mdx` | dispositivos |
| 6 | runtimes do celular | `side-service-api/`, `app-settings-api/` | símbolos globais |
| 7 | apps de exemplo | os 33 samples lidos **como código** | exemplos com excertos citados |
| 8 | `app.json` | `reference/app-json.mdx` | o schema do manifesto |

Frentes diferentes veem o mesmo símbolo. `@zos/router.push` aparece na página de
referência, no arquivo `llms` e em código de sample — três observações, um registro
só depois do `enrich`.

**A separação existe porque os formatos brigam entre si.** As tabelas do Device App
e as do Settings App usam nomes e ordens de coluna diferentes; os runtimes do
celular são globais e não têm linha de `import` para ancorar. Uma frente única teria
que tratar tudo por exceção — ver a seção sobre irregularidade de formato, mais
abaixo.

## JSON é a fonte de verdade, Markdown é derivado

`render` **reescreve** os diretórios que gera (`api/`, `compatibility/`,
`runtimes/`, `patterns/`, `examples/`, `manifest/`). Editar um `.md` ali é perder a
edição no próximo `render`.

Este diretório, `concepts/`, é a exceção deliberada: nenhuma visão de render é dona
dele, então é o lugar seguro para nota escrita à mão. É por isso que estas notas
estão aqui e não em `api/`.

O motivo é a proposta de valor inteira: prosa escrita à mão dentro da árvore gerada
seria indistinguível de fato extraído, e envelheceria em silêncio quando a fonte
mudasse.

## Armadilha: o formato de origem é irregular

Toda vez que uma frente pareceu simples, ela estava errada em algum arquivo que
ainda não tinha sido lido. Dois casos reais:

- Um checkout com CRLF no Windows fazia regex ancorada em `$` parar de casar **sem
  erro nenhum** — a base saía menor no Windows que no Linux, no mesmo commit. Por
  isso todo arquivo é lido por `readSource`, que normaliza para LF.
- Uma regra de caminho arquivava 10 símbolos no runtime errado porque um diretório
  da doc tem o mesmo nome de um diretório de app.

A lição está registrada e vale para qualquer frente nova: **fixture verde não prova
cobertura**. Rode o pipeline de verdade e olhe os números agregados antes de
acreditar numa frente.

## Onde continuar

| Nota | Termo |
| --- | --- |
| [simbolos.md](simbolos.md) | símbolo, id, módulo, assinatura, shape |
| [runtimes.md](runtimes.md) | os cinco runtimes e como são inferidos |
| [api-level.md](api-level.md) | `API_LEVEL`, dispositivo, `deviceSource`, `configVersion` |
| [confianca.md](confianca.md) | `OFFICIAL`, `OBSERVED`, e por que documentado ≠ verdadeiro |
