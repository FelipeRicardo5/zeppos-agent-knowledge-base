# Retrieval

Recuperar a fatia certa de um corpo de conhecimento para um dado pedido, em vez de
entregar tudo. Esta nota explica por que uma camada de retrieval importa e — mais
importante para este repositório — quando ela não importa.

## Retrieval vs. consultas diretas

Retrieval não é uma técnica única. É um espectro, e a ferramenta certa depende do
formato da pergunta sendo feita:

| Formato da pergunta | Exemplo | Mecanismo adequado |
| --- | --- | --- |
| Estruturada (campos exatos) | "`@zos/ui.createWidget` existe no API_LEVEL 4?" | Consulta direta sobre o JSON |
| Estruturada, multi-eixo | "Quais APIs de timer funcionam em watchface no API_LEVEL 3?" | Filtro/mapa sobre o JSON |
| Não estruturada (linguagem natural) | "Como eu agendo algo no meu relógio?" | Busca semântica / embeddings |

Os registros de `data/symbols/*.json` carregam campos explícitos `minApiLevel`,
`runtimes` e `confidence`. Isso significa que as **duas primeiras linhas são
respondidas por uma consulta direta** — sem embeddings, sem banco de vetores,
barato e exato. O retrieval-augmented generation (RAG) só entra em cena na terceira
linha, em que a pergunta é vaga o bastante para o casamento lexical sozinho não ser
confiável.

## Quando o retrieval agrega valor

- O corpus é **grande demais** para caber na janela de contexto de um modelo.
- As perguntas são **parafraseadas ou difusas** ("preciso de um jeito de acender a
  tela" em vez do nome literal do símbolo `setWakeUpEnable`).
- A resposta exige **síntese entre várias fontes**, não um único lookup.

Nosso corpus (276 símbolos) é pequeno e as perguntas do caminho feliz são
estruturadas, então um RAG cru hoje seria over-engineering. O valor de uma camada de
retrieval existe de verdade, mas deveria ser uma camada de **consulta direta**
primeiro, com busca semântica adicionada apenas se o padrão de acesso se tornar
conversacional.

## Consequência de design para este projeto

O design JSON-first compensa aqui. Como `data/symbols/` é a única fonte de verdade,
toda estratégia de retrieval abaixo pode ser construída em cima dele sem duplicação:

- **Motor exato**: uma pequena API de lookup sobre o JSON (ver [mcp.md](mcp.md)).
- **Motor semântico (futuro)**: um índice de embeddings construído a partir do mesmo JSON.

Ambos compartilham uma fonte, então nunca divergem.

## Fontes de estudo

- Anthropic — docs de "Retrieval": <https://docs.anthropic.com/en/docs/agents-and-tools/retrieval>
- Pinecone — centro de aprendizado "Retrieval-Augmented Generation": <https://www.pinecone.io/learn/retrieval-augmented-generation/>
- Databricks — "What is Retrieval-Augmented Generation?": <https://www.databricks.com/glossary/retrieval-augmented-generation-rag>
