# Glossário

Índice conciso dos termos usados ao longo [destas notas](README.md).

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
| Confidence | Nível `OFFICIAL` / `OBSERVED` de cada registro de símbolo | Nunca deve ser inferido; ver [README](../README.md) |
