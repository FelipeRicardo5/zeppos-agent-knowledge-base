# Concepts

Notas curadas em dois blocos:

- **O modelo de domínio** — os termos desta aplicação. O que é um símbolo, o que é
  um runtime, o que `API_LEVEL` versiona, o que uma tier de confiança promete.
  Comece aqui se você está entendendo o repositório.
- **A stack de retrieval** — RAG, embeddings, vector stores, MCP, e como cada peça
  se relaciona com este projeto.

Estas notas **não** fazem parte da base de conhecimento gerada. Elas ficam aqui de
propósito: `render` nunca escreve em `concepts/`, então este diretório é seguro para
conteúdo curado e mantido à mão — ao contrário de `api/` e `compatibility/`, que são
regenerados a partir de `data/symbols/` e não devem ser editados.

## Mapa de documentos

### Modelo de domínio

| Documento | O que cobre |
| --- | --- |
| [dominio.md](dominio.md) | As cinco unidades de conhecimento, o pipeline, o que é uma "frente" |
| [simbolos.md](simbolos.md) | Símbolo, id, módulo, assinatura, shape, e o que a ausência significa |
| [runtimes.md](runtimes.md) | Os cinco runtimes, por que cinco, e como são inferidos do caminho |
| [api-level.md](api-level.md) | Os quatro números de versão que não são intercambiáveis |
| [confianca.md](confianca.md) | `OFFICIAL` vs. `OBSERVED`, proveniência, e por que documentado ≠ completo |

### Stack de retrieval

| Documento | O que cobre |
| --- | --- |
| [retrieval.md](retrieval.md) | Por que uma camada de retrieval, e retrieval vs. consultas diretas sobre o JSON |
| [embeddings.md](embeddings.md) | Como texto vira vetor, e quando embeddings importam |
| [vector-stores.md](vector-stores.md) | Bancos de vetores: o que agregam, e quando este projeto não precisa de um |
| [rag-architecture.md](rag-architecture.md) | O pipeline completo de retrieval-augmented generation, mapeado para este repo |
| [mcp.md](mcp.md) | Expor a base de conhecimento como ferramentas chamáveis via MCP |
| [glossario.md](glossario.md) | Índice dos termos usados nas notas |

## Ordem de leitura sugerida

Para entender **o repositório**: [dominio.md](dominio.md) primeiro, depois as outras
três notas de domínio na ordem que a pergunta pedir. [confianca.md](confianca.md) é
a que mais muda como se *responde* usando a base.

Para entender **a stack de retrieval**: leia na ordem da tabela, deixando
[rag-architecture.md](rag-architecture.md) por último — ele amarra os outros de
volta a este projeto.

## O resumo em uma frase para este projeto

Esta base de conhecimento já entrega dados **estruturados** (`minApiLevel`,
`runtimes`, `confidence`) em `data/symbols/`. A maioria das perguntas de consumo é
**estruturada**, respondível diretamente do JSON, sem embeddings. A stack de
retrieval só vale a pena quando o consumo passar a ser de perguntas **não
estruturadas, em linguagem natural**. Leia [retrieval.md](retrieval.md) para o
raciocínio.
