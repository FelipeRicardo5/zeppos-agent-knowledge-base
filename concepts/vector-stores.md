# Bancos de Vetores (Vector Stores)

Um banco de vetores persiste embeddings e responde "quais dos meus vetores estão
mais próximos do vetor da consulta?". É a camada de armazenamento por baixo da busca
semântica.

## O que eles fazem

Dado um embedding de consulta, um banco de vetores retorna os *k* vetores armazenados
mais próximos — isso é busca de **vizinho mais próximo aproximado (ANN)** em escala.
Opções conhecidas: Pinecone, Weaviate, Qdrant, ChromaDB, Milvus e extensões do
Postgres como `pgvector`.

Dois eixos que os distinguem:

- **Métrica de similaridade**: a maioria usa similaridade de cosseno por padrão
  (apropriada para embeddings; ver [embeddings.md](embeddings.md)).
- **Escala + latência**: a ANN troca um pouco de precisão por velocidade em milhões
  de vetores.

## O que agregam além do armazenamento simples

- Busca top-k por similaridade eficiente, sem varredura linear.
- **Filtragem por metadados** opcional (ex.: só vetores cujo `confidence` é
  `OFFICIAL`), que pode ser combinada com a busca por similaridade.

## Quando este projeto não precisa de um

Um banco de vetores só vale o que vale o problema de busca que resolve. Hoje:

- **276 símbolos** é um corpus minúsculo — uma varredura linear em memória calcula
  similaridade de cosseno em microssegundos. Nenhum índice é necessário.
- A maioria das perguntas é **estruturada**, respondida diretamente do JSON (ver
  [retrieval.md](retrieval.md)).

Adicionar um banco de vetores agora seria sobrecarga operacional (subir um serviço,
gerir embeddings, pagar por armazenamento) para um problema que a memória resolve.
Se e quando o corpus crescer para milhares de símbolos *e* o acesso se tornar
conversacional, `pgvector` ou um armazenamento em processo (ex.: ChromaDB) é a rampa
de entrada leve — porque o JSON continua sendo a fonte de verdade e os vetores são
derivados dele.

## Fontes de estudo

- Pinecone — "Vector Database" (glossário + o que iniciou a onda de bancos de vetores): <https://www.pinecone.io/learn/vector-database/>
- Qdrant — "What is a Vector Database?": <https://qdrant.tech/documentation/concepts/>
- pgvector no GitHub (extensão do Postgres, boa opção "mantenha local"): <https://github.com/pgvector/pgvector>
- Docs do ChromaDB (em processo, simples): <https://docs.trychroma.com/>
