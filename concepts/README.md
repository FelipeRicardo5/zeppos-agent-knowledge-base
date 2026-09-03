# Concepts

Notas de estudo sobre a stack de retrieval (RAG, embeddings, vector stores, MCP)
e como cada peça se relaciona com este projeto.

Estas notas **não** fazem parte da base de conhecimento gerada. Elas ficam aqui de
propósito: `render` nunca escreve em `concepts/`, então este diretório é seguro para
conteúdo curado e mantido à mão — ao contrário de `api/` e `compatibility/`, que são
regenerados a partir de `data/symbols/` e não devem ser editados.

## Mapa de documentos

| Documento | O que cobre |
| --- | --- |
| [retrieval.md](retrieval.md) | Por que uma camada de retrieval, e retrieval vs. consultas diretas sobre o JSON |
| [embeddings.md](embeddings.md) | Como texto vira vetor, e quando embeddings importam |
| [vector-stores.md](vector-stores.md) | Bancos de vetores: o que agregam, e quando este projeto não precisa de um |
| [rag-architecture.md](rag-architecture.md) | O pipeline completo de retrieval-augmented generation, mapeado para este repo |
| [mcp.md](mcp.md) | Expor a base de conhecimento como ferramentas chamáveis via MCP |
| [glossario.md](glossario.md) | Índice dos termos usados nas notas |

## Ordem de leitura sugerida

Se você é novo no assunto, leia os documentos na ordem acima. Se quer a versão
curta, leia [rag-architecture.md](rag-architecture.md) por último — ele amarra todos
os outros de volta a este projeto.

## O resumo em uma frase para este projeto

Esta base de conhecimento já entrega dados **estruturados** (`minApiLevel`,
`runtimes`, `confidence`) em `data/symbols/`. A maioria das perguntas de consumo é
**estruturada**, respondível diretamente do JSON, sem embeddings. A stack de
retrieval só vale a pena quando o consumo passar a ser de perguntas **não
estruturadas, em linguagem natural**. Leia [retrieval.md](retrieval.md) para o
raciocínio.
