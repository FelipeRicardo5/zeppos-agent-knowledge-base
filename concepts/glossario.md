# Glossário

Índice conciso dos termos usados ao longo [destas notas](README.md).

### Domínio da aplicação

| Termo | Significado | Nota |
| --- | --- | --- |
| Símbolo | Coisa nomeada que o código de um app chama; id `<módulo>.<símbolo>` | Ver [simbolos.md](simbolos.md) |
| Módulo | O que se importa: `@zos/router`. Pseudo-id sem `@` quando a API é global | Ver [simbolos.md](simbolos.md) |
| Runtime | Onde o código executa; cinco deles, e um símbolo de um não existe no outro | Ver [runtimes.md](runtimes.md) |
| Ponto de entrada | Chave de `app.json` que liga um runtime (`app-side`, `setting`) | Não é o mesmo que runtime |
| Frente (*front*) | Leitor especializado num formato de fonte; oito no `parse` | Ver [dominio.md](dominio.md) |
| `API_LEVEL` | Versão da API do JS SDK; o eixo de compatibilidade que funciona | Ver [api-level.md](api-level.md) |
| `not stated` | Nenhuma fonte declara um mínimo | **Não** significa "qualquer nível" |
| `deviceSource` | Id numérico de um modelo de hardware, usado em `targets` | Ver [api-level.md](api-level.md) |
| `configVersion` | Versão do formato do `app.json` (`v2`, `v3`) | Não é `API_LEVEL` |
| Assinatura / shape | O contrato declarado, e as tabelas de propriedade a que se refere | Ver [simbolos.md](simbolos.md) |
| Pattern | Uma tarefa (não um símbolo), extraída de um guia de boas práticas | Ver [`patterns/`](../patterns/) |
| Proveniência | `originalPath` + arquivo e linha em cada excerto citado | Ver [confianca.md](confianca.md) |

### Stack de retrieval

| Termo | Significado | Nota |
| --- | --- | --- |
| Retrieval | Recuperar a fatia relevante de um corpo de conhecimento para um pedido | Ver [retrieval.md](retrieval.md) |
| RAG | Retrieval-augmented generation: recupera trechos, injeta no prompt e gera respostas fundamentadas | Ver [rag-architecture.md](rag-architecture.md) |
| Embedding | Um vetor que representa o significado de um texto | Ver [embeddings.md](embeddings.md) |
| Similaridade de cosseno | Medida de distância entre dois vetores; a métrica usual de embeddings | Maior = mais similar |
| Vector store / banco de vetores | Persiste embeddings e responde busca top-k por vizinho mais próximo | Ver [vector-stores.md](vector-stores.md) |
| ANN | Approximate nearest neighbor; busca de similaridade rápida em escala | O motor por trás dos bancos de vetores reais |
| Chunk / chunking | Divisão do corpus em unidades indexáveis | Ver [embeddings.md](embeddings.md) |
| MCP | Model Context Protocol; padrão para expor ferramentas e dados a agentes de IA | Ver [mcp.md](mcp.md) |
| Tool (MCP) | Uma função chamável que um agente invoca (ex.: `check_compatibility`) | Ver [mcp.md](mcp.md) |
| Pergunta estruturada vs. não estruturada | Perguntas de campo exato vs. perguntas em linguagem natural | Define se embeddings são necessários; ver [retrieval.md](retrieval.md) |
| Fonte de verdade | O JSON em `data/symbols/`, do qual tudo o mais deriva | Ver [README](../README.md) |
| Confidence | Nível `OFFICIAL` / `OBSERVED` de cada registro de símbolo | Nunca deve ser inferido; ver [confianca.md](confianca.md) |
