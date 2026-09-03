# MCP — Model Context Protocol

MCP (Model Context Protocol) é um padrão para expor ferramentas e dados a agentes
de IA. É a forma mais direta de tornar esta base de conhecimento *chamável* hoje,
sem necessidade de embeddings ou banco de vetores.

## O que é MCP

Um protocolo aberto (Anthropic, 2024) que permite a um host (Claude Desktop, um IDE,
um runtime de agente como o opencode) conectar-se a **servidores** que expõem
**ferramentas** e **recursos**. Em vez de o agente ler todos os arquivos, ele chama
uma ferramenta específica:

```
check("createWidget", { apiLevel: 4 })
-> { id: "@zos/ui.createWidget", minApiLevel: 4, confidence: "OFFICIAL", ok: true }
```

## Por que o MCP se encaixa neste repo melhor que o RAG hoje

Nossa proposta de valor são **respostas de compatibilidade verificáveis**. As
perguntas naturais são estruturadas:

- "Qual API_LEVEL `@zos/router.launchApp` exige?"
- "Quais símbolos de `@zos/timer` rodam no API_LEVEL 3?"
- "`@zos/ui.createWidget` é OFFICIAL ou apenas OBSERVED?"

Elas são respondidas por uma **consulta direta sobre `data/symbols/*.json`** — exata,
determinística, custo zero de LLM, e pode carregar o fato "verificado no commit
`<sha>`" vindo do [manifest](../data/manifest.json). Esse é o sinal de confiança mais
forte que este projeto pode oferecer, e é grátis.

O RAG se torna relevante apenas se o padrão de acesso mudar para perguntas
conversacionais; nesse momento o índice semântico pode ser colocado por cima sem
mudar o contrato das ferramentas (ver [rag-architecture.md](rag-architecture.md)).

## Superfície de ferramentas proposta (rascunho)

| Ferramenta | Pergunta que responde |
| --- | --- |
| `get_symbol(id)` | Registro completo de um `@zos/...symbol` |
| `check_compatibility(id, apiLevel, runtime)` | Existe? nível mínimo? confidence? |
| `list_module(module)` | Símbolos e metadados de um módulo |
| `list_by_api_level(level)` | Tudo que é válido em um dado API_LEVEL |

O design JSON-first torna isso trivial: cada ferramenta é um filtro sobre a mesma
fonte de verdade, então não há duplicação nem divergência.

## Local vs. remoto

- **Servidor local**: o cliente roda `npx zeppos-knowledge serve` e as ferramentas
  leem o próprio `data/symbols/`. Mesma distribuição de copiar o repo de hoje.
- **Servidor remoto**: um endpoint hospedado serve as mesmas ferramentas; o cliente
  instala apenas um cliente fino. Este é o caminho para um serviço, e é onde o
  retrieval semântico/RAG viveria no servidor, se um dia for necessário.

De qualquer forma, o **contrato das ferramentas é idêntico**, então passar de local
para remoto não exige re-arquitetura.

## Fontes de estudo

- Docs oficiais do MCP: <https://modelcontextprotocol.io/>
- Anthropic — anúncio do "Model Context Protocol": <https://www.anthropic.com/news/model-context-protocol>
- Model Context Protocol — SDK TypeScript: <https://github.com/modelcontextprotocol/typescript-sdk>
- opencode — docs de MCP/plugins (host relevante para este repo): <https://opencode.ai/docs/mcp/>
