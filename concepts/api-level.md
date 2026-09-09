# `API_LEVEL`, dispositivo e versão

Existem **quatro** números de versão diferentes circulando pelo Zepp OS, e eles não
são intercambiáveis. Confundir dois é a forma mais rápida de dar uma resposta de
compatibilidade errada com cara de certa.

| Número | O que versiona | Formato | Onde vive |
| --- | --- | --- | --- |
| `API_LEVEL` | A API do JS SDK | `2.0`, `3.5`, `4.2` | Badge no topo de cada página de referência |
| Versão do Zepp OS | O firmware do relógio | `1.0`, `3.0`, `5.0` | Lista de dispositivos |
| `configVersion` | O formato do `app.json` | `v1`, `v2`, `v3` | O próprio `app.json` |
| `deviceSource` | Um modelo de hardware | `229`, `8913152` | `app.json`, `targets.*.platforms` |

## `API_LEVEL` — o eixo que funciona

É o único eixo de compatibilidade confiável hoje. Sai **literalmente** do
blockquote de badge de cada página, nunca inferido:

```
> Start from API_LEVEL `4.0`
> Supported since API_LEVEL `3.0`
```

As duas redações ocorrem, então a extração casa o blockquote, não uma frase.

353 dos 409 símbolos declaram um mínimo. Uma propriedade dentro de uma tabela pode
declarar o **seu próprio** mínimo — **um símbolo que você pode chamar pode ter uma
propriedade que você não pode**. 484 propriedades carregam nível próprio.

### `not stated` não é `any`

Quando nenhuma fonte declara um mínimo, o campo fica ausente e as páginas escrevem
`not stated`. Isso significa **ausência de evidência**, não disponibilidade
universal. Um símbolo sem nível declarado **não pode ser certificado para
dispositivo nenhum**.

Isso pega duro: `@zos/ui.widget`, `align`, `text_style` e `prop` são `OBSERVED` — sem
nível, sem descrição — e nenhuma UI de Device App compila sem eles. Ao montar uma
UI, diga na cara que o nível dos primitivos não é verificável, em vez de reportar a
contagem de *Symbols available* de um dispositivo como se cobrisse.

## Dispositivo — a pergunta que alguém realmente faz

`API_LEVEL >= 4.2` não é a pergunta de ninguém. *"Roda num Bip 6?"* é.

[`compatibility/devices.md`](../compatibility/devices.md) faz o join, e ele tem três
seções — **em qual delas o dispositivo está muda a resposta**:

| Seção | Significa |
| --- | --- |
| Dispositivos rodando Zepp OS | Tem `API_LEVEL` declarado. Símbolo disponível se o mínimo dele for menor ou igual |
| Dispositivos Zepp OS 1.0 | A lista **não declara nível**. Isso não é nível 0: **nenhum símbolo desta base roda nesse hardware**, porque a API 2.0 não roda lá |
| Não rodam Zepp OS | Aceitam mostrador, não rodam Mini Program. Nada de [`api/`](../api/) se aplica |

41 dispositivos: 29 com nível declarado, 5 em Zepp OS 1.0, 7 que não rodam Mini
Program.

Duas ressalvas que precisam ser ditas junto com qualquer resposta:

- A lista guarda o nível **mais recente** de cada dispositivo, então a resposta
  assume aparelho atualizado. Ela não diz nada sobre o firmware em que um usuário
  específico está.
- A contagem de *Symbols available* é um **piso**: ela exclui todo símbolo sem
  mínimo declarado em vez de assumi-lo disponível, e essa exclusão é grande.

## `deviceSource` — o número que vai no build

`targets.<alvo>.platforms[].deviceSource` recebe um id de hardware. Um mesmo
dispositivo costuma ter vários — versão da China continental e internacional são ids
diferentes (o `*` na lista marca a da China).

É onde um build quebra em silêncio: id errado, e o app simplesmente não instala
naquele modelo. Os ids, por dispositivo, estão em
[`compatibility/devices.md`](../compatibility/devices.md).

## `configVersion` — não é `API_LEVEL`

A tabela do `app.json` tem uma coluna *Minimum Version* cujos valores são `v2` e
`v3`. Isso é a versão do **formato do arquivo**, não da API.

Por isso o registro do manifesto tem campo próprio, `minConfigVersion`, e não
reaproveita `apiLevel`: reaproveitar teria arquivado `v3` como nível 3 e afirmado que
`appId` precisa de `API_LEVEL 2`. Ver [`manifest/`](../manifest/).

## Resumo prático

Antes de recomendar uma API, cheque **os dois eixos**:

1. **Runtime** — o símbolo existe onde este código roda? Ver [runtimes.md](runtimes.md).
2. **Nível** — e desde quando? E o dispositivo alvo alcança?

Um eixo sozinho não é resposta.
