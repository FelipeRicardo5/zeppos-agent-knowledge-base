# Runtimes

Um **runtime** é *onde o código executa*. Um Mini Program do Zepp OS não é um
programa só: partes dele rodam no relógio e partes rodam dentro do app Zepp no
celular, e **um símbolo de um runtime não existe no outro**.

É o eixo que mais gera erro silencioso: importar `fetch` num arquivo de página do
relógio compila e falha em execução.

## Os cinco

| Runtime | Onde roda | Diretório num app | Símbolos |
| --- | --- | --- | --- |
| `device-app` | No relógio | `page/`, `app.js`, `app-widget/`, `secondary-widget/` | 373 |
| `settings` | No app Zepp, no celular | `setting/` | 21 |
| `side-service` | No app Zepp, no celular | `app-side/` | 20 |
| `watchface` | No relógio, como mostrador | árvore `watchface/` | 3 |
| `workout-extension` | No relógio, durante um treino | árvore `workout-extensions/` | 12 |

Um Mini Program completo usa **três** deles ao mesmo tempo: Device App no relógio,
Settings App e Side Service no celular.

## Por que cinco, e não seis

`guides/architecture/arc.mdx` nomeia três partes de um Mini Program — Device App,
Settings App, Side Service — e `guides/architecture/folder-structure.mdx` mostra que
`app-side/` **é** o diretório do Side Service. "App-side" e "Side Service" eram o
mesmo runtime com dois nomes; só um foi mantido.

**Shortcut Card (`app-widget/`) e SecondaryWidget (`secondary-widget/`) não são
runtimes**, são pontos de entrada extras: executam no relógio como o Device App e
são atribuídos a ele. A distinção importa — ponto de entrada é o que se liga no
`app.json`; runtime é qual API existe.

## Nenhuma fonte declara o runtime

Nenhuma página e nenhum sample dizem a qual runtime pertencem. **O diretório é a
evidência**, porque os dois repositórios oficiais separam os runtimes por diretório.

Todas as regras vivem num módulo só, [`src/parse/runtime.ts`](../src/parse/runtime.ts),
com o documento que ancora cada uma. Elas são de dois tipos:

- **prefixo, na doc** — `docs/reference/side-service-api/` é o Side Service;
- **segmento, nos samples** — um `app-side/` ou `setting/` em qualquer lugar da
  árvore de um app é do celular, seja o app um Device App ou um workout extension.

A ordem importa: os diretórios do celular são checados **antes** da árvore do tipo
de app, porque valem para todo tipo. Um workout extension pode ter Side Service.

E o inverso quase deu errado: na doc, um diretório é nome de **módulo**.
`docs/reference/device-app-api/newAPI/settings/` é o módulo `@zos/settings` do
relógio — nada a ver com o Settings App. Por isso a árvore da doc casa por prefixo,
e nunca por segmento solto.

> Um caminho que não casa com regra nenhuma sai **sem runtime**, nunca com um
> padrão. Árvore desconhecida vira eixo vazio, não resposta errada com cara de
> certa. É o mesmo contrato que `minApiLevel` tem — ver [confianca.md](confianca.md).

Este é o eixo mais exposto a uma reorganização upstream, e por isso tem arquivo de
teste próprio.

## Como se liga um runtime: o `app.json`

Saber que o Side Service existe não adianta se o app não o declara. O ponto de
entrada de cada runtime é uma chave dentro de `targets.<alvo>.module`:

| Chave | Liga |
| --- | --- |
| `page` | Device App |
| `app-side` | Side Service |
| `setting` | Settings App |
| `watchface` | Watchface |
| `app-widget`, `secondary-widget` | Device App (pontos de entrada extras) |

**Nada upstream conecta chave de manifesto a runtime** — a doc do `app.json` e a doc
das APIs não se falam. Essa tabela é um join desta base, e vive em
[`manifest/index.md`](../manifest/index.md).

Duas coisas que esse join revelou e que valem como aviso:

- **Nenhuma chave documentada de `module` alcança o Workout Extension**, e mesmo
  assim seis samples são um: eles declaram uma chave `data-widget` que a página de
  referência nunca menciona.
- `app-service` (Background Service) e `app-event` são tipadas `object` na tabela e
  **nunca descritas** em lugar nenhum da página.

## O eixo é desigual, e isso muda a resposta

373 dos 409 símbolos são Device App. Todo runtime tem cobertura, mas:

- Settings App (21) e Side Service (20) **não têm `API_LEVEL` nenhum** — nenhuma
  página das duas árvores declara um. Eles respondem *"isto existe aqui?"*, não
  *"desde quando?"*.
- Watchface tem 3, e são chamadas `@zos/*` vistas em sample de watchface. A API
  `hm*` de verdade não está coberta.

Ausência de símbolo num runtime **não** diz que o runtime não pode usá-lo. Ver
[simbolos.md](simbolos.md#o-que-a-ausência-significa).
