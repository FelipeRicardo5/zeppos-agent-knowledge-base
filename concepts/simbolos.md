# Símbolos

Um **símbolo** é uma coisa nomeada que o código de um app pode chamar: uma função,
uma constante ou um valor exportado por um módulo do Zepp OS. É a unidade menor
desta base — 409 delas em 42 módulos, no último sync.

## O id

O id de um símbolo é `<módulo>.<símbolo>`:

```
@zos/router.push
@zos/ui.createWidget
@zos/sensor.HeartRate
```

O id é **o que se digita no código**, não um identificador inventado por este
repositório. É por isso que o módulo é lido da linha de `import` da própria página,
e não do nome do diretório: `transfer-file/TransferFile.mdx` importa de
`@zos/ble/TransferFile`, um submódulo que o diretório não consegue expressar.

Nem todo símbolo tem `import`. Os runtimes do celular (Side Service, Settings App)
são inteiramente globais — `fetch`, `settingsStorage`, `messaging.peerSocket` não se
importam de lugar nenhum. Para esses, o agrupamento da própria doc entra no lugar do
módulo, e o id sai sem `@`: `fetch.fetch`, `settings-storage.setItem`.

> **Esses ids são localizadores dentro desta base, não coisa para digitar no
> código.** A distinção está em [`api/`](../api/) e vale checar antes de citar um.

## O que um registro carrega

Definição completa em [`src/types.ts`](../src/types.ts) (`SymbolRecord`).

| Campo | O que é | Ausência significa |
| --- | --- | --- |
| `id` / `module` / `symbol` | O identificador e suas partes | — |
| `type` | `function`, `constant` ou `value` | — |
| `description` | A prosa da página, só ela | Nenhuma fonte escreveu uma |
| `minApiLevel` | O `API_LEVEL` mínimo declarado | **Não declarado**, nunca "qualquer um" |
| `signature` | A assinatura literal, como a doc escreve | A doc não declara nenhuma |
| `shapes` | As tabelas de propriedade a que a assinatura se refere | — |
| `runtimes` | Em quais runtimes vale | — |
| `confidence` | `OFFICIAL` ou `OBSERVED` | — |
| `originalPath` | O arquivo de origem, relativo ao cache | — |

**Nada é fabricado.** Um campo ausente é ausência de evidência, e as visões
renderizadas dizem isso com todas as letras (`not stated`, nunca `any`).

## `type` é fraco — não confie nele

`type` sai de heurísticas diferentes por frente:

- na página de referência, é `function` se o texto contém `function <nome>`;
- no arquivo `llms`, é sempre `function`;
- em código de sample, é `constant` se o nome está todo em maiúsculas.

Por isso a distribuição sai 192 `function`, 112 `constant`, 105 `value` — e por isso
**um `type` não diz como chamar o símbolo**. Quem responde isso é `signature`, e
quando ela falta, código de sample.

## Assinatura e shape

Ambos os runs de avaliação acharam a mesma lacuna raiz: a base registrava que um
símbolo existe e nunca **como chamá-lo**. Duas coisas fecham isso, e elas falham em
direções opostas:

| Fonte | O que dá | Onde |
| --- | --- | --- |
| `signature` + `shapes` | O contrato que a doc **declara** | [`api/`](../api/), seção *Symbols in detail* |
| Código de sample | Uma chamada que **roda de verdade** | [`examples/`](../examples/) |

Uma assinatura sozinha muitas vezes não basta: `(props: Props) => RenderFunc` não
diz nada sem a tabela `Props`. Por isso `shapes` guarda cada tabela de propriedade
nomeada da página, com o nome do cabeçalho acima dela — 147 símbolos carregam
shapes, 1157 propriedades no total.

O que ainda falta aí são os **membros de enum**: `align.CENTER_H`, `text_style.WRAP`
e afins estão documentados upstream numa tabela `Value | Description` que nenhuma
frente lê. Código de sample é a única fonte deles hoje.

No último sync, **178 de 409 símbolos têm assinatura**. O resto não declara nenhuma
upstream. Para esses, código de sample é a única resposta que existe.

## Como um símbolo chega até aqui

```
frente 1 (página de referência) ─┐
frente 2 (llms)                 ├─► enrich ─► um SymbolRecord
frente 3 (imports de sample)    ─┘
frente 6 (runtimes do celular)  ─┘
```

O `enrich` agrupa as observações por id e reconcilia. Duas regras importam:

1. **Prioridade de fonte para campos em conflito:** `docs-reference` > `llms` >
   `sample`. Documentação vence código, porque código não declara contrato.
2. **`runtimes` é união, não prioridade.** Um símbolo documentado no Device App e
   visto num sample de watchface vale nos dois — as duas observações são evidência.
   20 símbolos estão em mais de um runtime.

## O que a ausência significa

Esta é a regra mais importante de consumo, e a mais fácil de errar.

**Um símbolo que você não acha aqui é `não coberto`, nunca `não existe`.**

A base é incompleta por construção. O caso mais gritante: a API `hm*` de watchface
(`hmUI`, `hmFS`, `hmSensor`, `hmSetting`) — 93 páginas upstream, nenhuma parseada.
Os 3 símbolos de Watchface aqui são chamadas `@zos/*` vistas em código de sample de
watchface, não a API `hm*`.

Também não são registrados os métodos alcançados por um objeto retornado
(`DownloadTask.cancel`, `Onbox.enqueFile`): são API real, mas chamados por uma
instância, e arquivá-los ao lado dos símbolos de módulo distorceria como se chamam.

Ver [confianca.md](confianca.md) para o outro eixo dessa mesma questão.
