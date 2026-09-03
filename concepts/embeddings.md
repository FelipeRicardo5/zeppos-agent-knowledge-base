# Embeddings

Embeddings transformam texto em vetores — listas de números que capturam
*significado* em vez de grafia exata. É o mecanismo por trás da busca semântica
(difusa).

## O que é um embedding

Um texto passa por um modelo de embedding e produz um vetor de tamanho fixo
(ex.: 384 ou 1536 dimensões). A propriedade-chave: textos **semanticamente
semelhantes** ficam **próximos** no espaço de vetores, medidos pela similaridade de
cosseno. "De nada" e "you're welcome" podem estar perto um do outro mesmo sem
compartilhar caracteres; "maçã" e "uva" ficam perto, "maçã" e "bateria" mais longe.

## Como são gerados

Um modelo de embedding (ex.: OpenAI `text-embedding-3-small`, Cohere `embed-*`,
Hugging Face `sentence-transformers`, ou a família open-source `BAAI/bge-*`) é
executado uma vez por trecho de texto para produzir o vetor. Ele então é
armazenado.

Dois custos importantes:

- **Custo de computação/API**: gerar embeddings custa dinheiro (ou GPU local) a cada
  execução.
- **Qualidade do modelo**: um modelo treinado para um domínio pode embedar mal outro,
  então a escolha do modelo é uma decisão real, não um detalhe.

## Quando embeddings importam para este repo

Nossos símbolos são **identificadores nomeados** — `@zos/ui.createWidget`. Modelos
de embedding foram treinados em prosa, não em caminhos de pacote. Duas consequências:

1. Embedar a string bruta do símbolo costuma ter desempenho *ruim* para casar uma
   pergunta em prosa com um símbolo, porque "criar um widget" e `createWidget`
   compartilham uma raiz, mas o modelo pode não conectá-los sem a descrição ao redor.
2. O **campo de descrição** é o mecanismo de recuperação: embed
   `"createWidget — Cria um widget e o adiciona à tela..."` em vez do nome puro.
   Os registros que carregam `description` são, portanto, a unidade natural de
   indexação; símbolos sem descrição indexam mal e são mais bem atendidos por lookup
   exato.

## Chunking

A qualidade do retrieval depende do que você embeda. Um chunk grande demais (um
módulo inteiro) dilui a resposta; pequeno demais (um nome de símbolo puro) perde
semântica. Registros por símbolo com sua descrição são um tamanho de chunk quase
ideal para este domínio.

## Fontes de estudo

- OpenAI — guia de "Embeddings": <https://platform.openai.com/docs/guides/embeddings>
- Hugging Face — "How to Get Started with Embedding Models": <https://huggingface.co/blog/getting-started-with-embeddings>
- Cohere — "What are embeddings?": <https://cohere.com/blog/what-are-embeddings>
- Stanford CS224N — material sobre word/context embeddings (base teórica).
