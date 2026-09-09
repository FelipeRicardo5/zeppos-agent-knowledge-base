# Confiança e proveniência

Todo registro desta base carrega dois campos que dizem **de onde ele veio** e
**quanto peso ele tem**: `originalPath` e `confidence`. Eles não são metadado
decorativo — são a razão de a base existir. Sem eles, isto seria um espelho de
documentação, e um agente não teria como verificar nada.

## As tiers

Definidas em [`src/types.ts`](../src/types.ts). Duas estão em uso; três estão
reservadas.

| Tier | Significa | Em uso |
| --- | --- | --- |
| `OFFICIAL` | A documentação oficial declara isto | 385 símbolos |
| `OBSERVED` | Visto em código oficial que roda, sem entrada na doc | 24 símbolos |
| `RECOMMENDED` | — | reservada |
| `COMMUNITY` | — | reservada |
| `INFERRED` | — | reservada |

As três reservadas não são deriváveis das frentes automatizadas. Ficam para uma
eventual passada de curadoria manual, e enquanto isso **nenhum registro sai com
elas** — uma tier vazia é mais honesta que uma tier chutada.

## `OFFICIAL` ≠ verdadeiro, `OBSERVED` ≠ inseguro

Esta é a parte que se erra por instinto. As duas tiers falham em **direções
opostas**, e é por isso que as duas ficam.

| | `OFFICIAL` | `OBSERVED` |
| --- | --- | --- |
| Prova | Que existe um contrato declarado | Que uma chamada funciona |
| Falha quando | A doc está desatualizada, incompleta ou nunca cobriu o caso | O código é idiossincrático, antigo, ou 33 apps não são a superfície inteira |
| Carrega | Descrição, nível, assinatura | Só o nome — sem descrição, sem nível, sem assinatura |

**Toda a tier `OBSERVED` é nome e nada mais.** Leia como *"isto existe"* e nada além
disso.

E documentado não quer dizer completo. O diff que a frente de `app.json` faz nos dois
sentidos mostra isso em números: **48 caminhos de chave que apps reais usam e a
página de referência nunca menciona**, contra 12 chaves documentadas que nenhum
sample usa. A doc oficial descreve um `app.json` que não é o `app.json` que os
próprios samples oficiais escrevem.

Quando descrição e sample discordam sobre como algo se chama — uma mostrando função
de módulo, o outro método de instância — **o sample é código que roda**. Prefira
ele, e sinalize o conflito.

## Como a tier é decidida

No `enrich`, a partir de quais frentes viram o símbolo:

- visto por `docs-reference` **ou** `llms` (as duas vêm do repositório oficial de
  documentação, ou seja, são afirmação documentada) → `OFFICIAL`;
- visto **só** em código de sample → `OBSERVED`.

Quando duas frentes discordam de um campo, a prioridade é
`docs-reference` > `llms` > `sample`.

Fontes por registro, no último sync: 241 `docs-reference`, 116 `llms`, 28
`docs-phone-api`, 24 `sample`.

## Proveniência: `originalPath`

Todo registro guarda o caminho do arquivo de origem, relativo ao cache, e
**normalizado para posix**. A normalização não é estética: um sync no Windows
gravaria `zeppos-docs\docs\...` e um no Linux `zeppos-docs/docs/...`, e o mesmo
commit produziria JSON diferente.

Nos excertos de código isso vai mais fundo — cada trecho citado carrega arquivo
**e linha**, para que um leitor possa ir conferir. Não é ilustração; é a prova.

## O `manifest.json` de sync

[`data/manifest.json`](../data/manifest.json) guarda a data do último sync, o
**commit exato** de cada repositório de origem, e as contagens de registro. É o que
torna "última verificação" derivável em vez de afirmado à mão.

Cite-o quando a atualidade da resposta importar.

## O que dizer quando não se sabe

A regra de consumo, e ela é curta:

> Se a base não cobre um símbolo, ou a resposta não está clara, **diga isso
> explicitamente** em vez de chutar.

Isso é o oposto do comportamento padrão de um modelo, que é preencher a lacuna com
algo plausível. A base foi construída para tornar a lacuna **visível** — páginas são
geradas até para casos sem cobertura, declarando "0 símbolos cobertos", porque
página ausente se lê como "isto não existe" enquanto página vazia se lê como a
lacuna que é.

Ver também [simbolos.md](simbolos.md#o-que-a-ausência-significa) e
[api-level.md](api-level.md#not-stated-não-é-any).
