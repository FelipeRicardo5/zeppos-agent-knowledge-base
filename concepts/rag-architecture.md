# RAG — Retrieval-Augmented Generation

O RAG combina uma etapa de retrieval com um modelo generativo, de modo que o modelo
responde usando **sua** base de conhecimento em vez de apenas os pesos do
treinamento. Esta nota percorre o pipeline e mapeia cada estágio para este repo.

## O pipeline

1. **Ingestão** — dividir o corpus em trechos e embedar cada um (ver
   [embeddings.md](embeddings.md); armazenar em um [banco de vetores](vector-stores.md)).
2. **Consulta** — embedar a pergunta do usuário.
3. **Recuperação** — retornar os *k* trechos mais similares (muitas vezes combinados
   com filtros de metadados, ex.: `confidence = OFFICIAL`).
4. **Aumento (augment)** — injetar esses trechos no prompt do modelo como contexto.
5. **Geração** — o modelo escreve a resposta fundamentada nesse contexto.

O termo "augmented" é o ponto: os trechos são buscados *no momento da consulta*, então
a resposta reflete o estado atual da base de conhecimento, não um corte datado.

## Quando o RAG é a ferramenta certa

- O corpus é grande demais para a janela de contexto.
- As respostas precisam citar dados atuais e específicos da versão.
- As consultas chegam em linguagem natural, não como identificadores exatos.

## Mapeando o RAG para este projeto

| Estágio do RAG | Neste repo | Situação |
| --- | --- | --- |
| Ingestão | `sync` + embedar opcional de `data/symbols/*.json` | parcial (JSON estruturado existe; embeddings são passo futuro) |
| Consulta | Uma solicitação conversacional do cliente | futura |
| Recuperação | Busca por similaridade sobre os registros de símbolos | futura |
| Aumento | Campos do registro (`description`, `minApiLevel`, `runtime`, `confidence`) colocados no prompt do agente | futura |
| Geração | Agente/LLM escreve a resposta | futura (os agentes são o consumidor pretendido) |

### Por que o RAG completo é um passo futuro aqui

O caminho padrão de consumo é **estruturado**: um agente (ou ferramenta MCP) pergunta
"`createWidget` funciona no API_LEVEL 4?" e o JSON responde exatamente. A vantagem do
RAG entra só nas perguntas **não estruturadas** ("como acendo a tela?") em que o
símbolo é descoberto pelo significado, não pelo nome. Ambos podem coexistir: primeiro
lookup exato, depois retrieval semântico como fallback para perguntas difusas. Como
`data/symbols/` é a única fonte de verdade, o índice semântico é barato de construir
e permanece em sincronia.

### Uma troca que vale rastrear

O RAG introduz **latência** (embedar consulta + buscar) e **custo** (embedar + gerar)
e pode retornar um quase-acerto que uma consulta direta nunca cometeria. Para uma
verificação de compatibilidade, "talvez essa API funcione" é pior que "não — aqui
está o nível mínimo exato". Então a camada de retrieval deve sempre **relatar a
incerteza** em vez de chutar — a mesma regra que a [Agent Skill](../skills/zepp-os/SKILL.md)
já impõe para os limites de cobertura da base.

## Fontes de estudo

- Anthropic — insight de engenharia sobre "RAG": <https://docs.anthropic.com/en/docs/build-with-claude/rag>
- Pinecone — centro de aprendizado "RAG" (abrangente): <https://www.pinecone.io/learn/retrieval-augmented-generation/>
- LangChain — guia conceitual "Retrieval-Augmented Generation (RAG)": <https://python.langchain.com/docs/concepts/rag/>
- arXiv — Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (o paper original, 2020): <https://arxiv.org/abs/2005.11401>
