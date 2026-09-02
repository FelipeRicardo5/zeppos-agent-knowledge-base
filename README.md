# Zepp OS Agent Knowledge Base

## Contexto e arquitetura da v0

O projeto nasce da constatação de que a documentação oficial do Zepp OS existe, mas não está no formato ideal para ser consumida por agentes de IA que desenvolvem software. O objetivo da v0 não é replicar a documentação, e sim criar uma camada intermediária estruturada entre as fontes oficiais — o repositório de documentação `zepp-health/zeppos-docs`, o repositório de exemplos `zepp-health/zeppos-samples`, o comportamento do Zeus CLI e o conteúdo já preparado para LLMs em `static/llms` — e o agente que vai efetivamente escrever código.

A decisão central desta fase é que a extração dessas fontes será **scriptada desde o início**, em vez de a base de conhecimento ser populada manualmente. Isso obriga a definir um padrão e um schema de extração logo de cara, evitando que o projeto vire uma coleção de markdowns inconsistentes escritos à mão. A execução desse pipeline será **local e sob demanda** — não um job agendado em CI, ao menos nesta fase — o que simplifica bastante a v0, já que não é preciso se preocupar com infraestrutura de agendamento, apenas com um pipeline que roda quando o desenvolvedor decide rodar.

A arquitetura fica organizada em um pipeline de estágios sequenciais, cada um com responsabilidade única e output inspecionável isoladamente, o que permite reexecutar qualquer estágio sem precisar refazer os anteriores.

### Estágios do pipeline

1. **Fetch** — responsável por clonar ou atualizar localmente os repositórios oficiais de documentação e de samples, guardando esse conteúdo bruto em uma pasta de cache local que não é versionada no git — já que é conteúdo de terceiros, facilmente reobtido.

2. **Parse** — lê esse conteúdo bruto e extrai informação estruturada dele. Três frentes:
   - Parser dedicado a arquivos Markdown/MDX da documentação, capaz de ler frontmatter e seções de forma estruturada.
   - Parser específico para o conteúdo já formatado para LLMs em `static/llms`, aproveitando o trabalho que a própria Zepp Health já fez de estruturação.
   - Parser de samples, que varre os projetos de exemplo oficiais (arquivos como `app.json`, páginas JS, etc.) para extrair padrões de implementação real, não apenas descrição textual da API.

3. **Enrich** — responsável por inferir e normalizar os metadados que são o coração conceitual do projeto: API_LEVEL mínimo exigido, runtime/contexto de execução em que a API está disponível (Device App, App-side, Side Service, Settings, Watchface, Workout Extension), a fonte da informação e o nível de confiança associado a ela — distinguindo explicitamente entre conteúdo OFFICIAL, OBSERVED, RECOMMENDED, COMMUNITY e INFERRED.

4. **Render** — pega o conhecimento já normalizado e gera os arquivos markdown finais da base de conhecimento, organizados nas pastas conceituais: `concepts/`, `api/`, `runtimes/`, `patterns/`, `examples/`, `compatibility/`, `tools/`. Esse markdown é o que a Skill efetivamente vai ler e usar como referência.

### Fonte de verdade: JSON, não Markdown

Uma decisão arquitetural importante é que **o JSON estruturado gerado no estágio de parse/enrich é a fonte de verdade do projeto, não o markdown**. O markdown é tratado como uma visão derivada desse JSON, gerada automaticamente. Isso importa por dois motivos:

1. Permite gerar múltiplas representações da mesma informação no futuro (markdown para leitura humana e para a Skill, JSON para um eventual sistema de retrieval ou servidor MCP) sem duplicar a lógica de extração.
2. Torna o versionamento muito mais útil, já que um diff em JSON estruturado mostra claramente o que mudou semanticamente (por exemplo, o API_LEVEL mínimo de uma função) em vez do ruído textual que um diff de markdown geraria.

Cada registro individual desse JSON carrega metadados como:
- identificador do símbolo (módulo + nome, por exemplo `@zos/router.launchApp`)
- tipo do símbolo
- API_LEVEL mínimo exigido
- runtimes em que é válido
- fonte
- nível de confiança
- caminho do arquivo original de onde foi extraído
- data de extração

Esse conjunto de metadados alimenta diretamente o conceito de **compatibilidade multi-eixo** que é central ao projeto: um agente não deve apenas saber que uma API existe, mas se ela está disponível no runtime e no API_LEVEL alvo daquele desenvolvimento específico.

### Manifesto de sincronização

Para controlar o estado da extração, existe um arquivo de manifesto que registra:
- a data do último sync
- o commit exato de cada repositório oficial que foi usado como fonte
- a contagem de registros extraídos

Esse manifesto resolve de forma automática o campo de "última verificação" de cada entrada de conhecimento, já que ele deriva diretamente do commit e da data do sync, sem precisar ser preenchido manualmente.

### Fluxo de uso

Na prática, o fluxo se resume a comandos que disparam o pipeline:
- Um comando de **sincronização** que executa fetch, parse e enrich, atualizando o JSON estruturado.
- Um comando de **renderização** que regenera o markdown final a partir desse JSON.

Ambos podem ser executados separadamente ou em conjunto, e como cada estágio é idempotente, o desenvolvedor pode rodar apenas a renderização novamente (por exemplo, se tiver ajustado o gerador de markdown) sem precisar reclonar ou reparsear nada.

### Agent Skill

Além do pipeline de extração, a v0 inclui uma Agent Skill (`skills/zepp-os/SKILL.md`), que não contém a documentação em si, mas ensina o agente a **usar** a base de conhecimento, instruindo-o a:
- identificar o runtime alvo
- identificar o API_LEVEL alvo
- verificar compatibilidade antes de sugerir uma API
- preferir documentação e exemplos oficiais
- não assumir que APIs de browser ou Node.js existem no runtime do Zepp OS
- explicitar incerteza quando a documentação disponível for insuficiente

## Decisões

1. **Linguagem do extrator: Node/TypeScript.** Acesso nativo a um parser MDX real, alinhamento com o ecossistema do Zepp OS (samples já são JS) e mesmo runtime da Skill/futuro servidor MCP. TypeScript sobre JS puro para tipar o schema dos registros JSON e pegar erros de formato já no parse/enrich.

## Pontos em aberto (a fechar antes da implementação)

1. **Granularidade dos registros JSON**: um arquivo por símbolo de API vs. símbolos de um mesmo módulo agrupados em um único arquivo.
2. **Markdown gerado vs. versionado**: se edições manuais na pasta de markdown final devem ser sempre sobrescritas no próximo `render` (JSON como única fonte de verdade), ou se deve existir um mecanismo de anotação manual que sobrevive à regeneração, para cobrir casos que o parser não capturou corretamente.
