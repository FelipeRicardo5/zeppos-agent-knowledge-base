import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { coverageCounts, type CoverageCounts } from "./readme.js";
import type { SyncManifest } from "../types.js";

// The landing page: what this project is, for a reader who has not cloned it.
//
// It is a render view like any other, and it is one for the same reason the
// README's coverage block is: a page that explains the base by quoting figures
// at it goes stale the first time the base moves, and this repository has
// shipped that bug five times. So every number here is computed from `data/` by
// the same call the README uses, and `site/` joins the reproducibility check in
// CI — a page claiming a count the data does not support now fails the build.
//
// No framework, and no client-side JavaScript. The content is static, the repo
// carries no runtime dependency beyond the MCP SDK, and a toolchain whose only
// job is to produce two HTML files would be the largest thing in the tree.
//
// The logo is *not* copied in here. The Pages workflow stages `assets/` beside
// the page at deploy time, so the tree keeps one copy of the binary.

const SITE_DIR = "site";
const STYLE_FILE = "style.css";
const REPO = "https://github.com/FelipeRicardo5/zeppos-agent-knowledge-base";

/**
 * Getting a readable base, in the fewest lines that actually work.
 *
 * No `npm run sync` here on purpose. `data/` and the rendered pages are both
 * committed, so a clone answers questions immediately; putting `sync` in the
 * first block would teach a reader that the base needs a network round trip and
 * tens of megabytes of cache before it says anything, which is not true.
 *
 * Shell, so it is the same text in both translations.
 */
const SETUP = [`git clone ${REPO}.git`, "cd zeppos-agent-knowledge-base", "npm install"].join("\n");

/** Upstream repos, so a manifest commit renders as a link a reader can open. */
const SOURCE_REPOS: Record<string, string> = {
  "zeppos-docs": "https://github.com/zepp-health/zeppos-docs",
  "zeppos-samples": "https://github.com/zepp-health/zeppos-samples",
};

type Language = "en" | "pt";

/** One page per translation, mirroring `README.md` / `README.pt-BR.md`. */
const PAGES: { language: Language; file: string; other: string }[] = [
  { language: "en", file: "index.html", other: "pt-BR.html" },
  { language: "pt", file: "pt-BR.html", other: "index.html" },
];

interface Copy {
  lang: string;
  otherLanguage: string;
  /**
   * The short name, in the header and as the headline. Same in both
   * translations — a name is not a word to be translated.
   */
  name: string;
  /**
   * What the name stands for, kept beside it rather than replaced by it. A
   * reader arriving from a search has no way to know what "ZoaK" is, and the
   * expansion is the one line that says so.
   */
  expansion: string;
  title: string;
  description: string;
  tagline: string;
  statSymbols: string;
  statModules: string;
  statDevices: string;
  statExamples: string;
  statsNote: string;
  problemHeading: string;
  problemLead: string;
  problemBody: string;
  valuesHeading: string;
  values: [string, string][];
  pipelineHeading: string;
  pipelineStages: [string, string][];
  consumersLead: string;
  consumers: [string, string][];
  pipelineNote: string;
  usageHeading: string;
  usageLead: string;
  setupNote: string;
  waysLead: string;
  ways: { title: string; command: string; body: string }[];
  verdictHeading: string;
  verdictStatus: string;
  verdictMeaning: string;
  verdict: [string, string][];
  verdictNote: string;
  coverageHeading: string;
  coverageLead: string;
  coverageMetric: string;
  coverageCount: string;
  honestyHeading: string;
  honesty: [string, string][];
  repoLink: string;
  version: string;
  lastSync: string;
  sources: string;
  generated: string;
}

const COPY: Record<Language, Copy> = {
  en: {
    lang: "en",
    otherLanguage: "Português",
    name: "ZoaK",
    expansion: "Zepp OS Agent Knowledge Base",
    title: "ZoaK — Zepp OS Agent Knowledge Base",
    description:
      "A compatibility-aware knowledge base between the official Zepp OS sources and the AI agents that write Zepp OS code.",
    tagline:
      "A compatibility-aware layer between the official Zepp OS sources and the AI agents that write Zepp OS code.",
    statSymbols: "symbols",
    statModules: "modules",
    statDevices: "devices",
    statExamples: "sample apps read as code",
    statsNote: "Computed from data/ on every render, never typed by hand.",
    problemHeading: "The question it exists to answer",
    problemLead:
      "This is not a documentation mirror. The official docs exist, but they are not in a shape an agent can consume reliably when the question is “can I call this API, in this runtime, at this API_LEVEL?” This project extracts those sources into a structured layer where that question has a checkable answer.",
    problemBody:
      "The specific failure it prevents is an agent producing plausible Zepp OS code it cannot justify. Every evaluation run so far finished its task and none was blocked — they failed on vouching, delivering code the base could not back with a citation. That is the problem being solved, not ignorance.",
    valuesHeading: "What the sources do not carry",
    values: [
      [
        "Compatibility as an axis",
        "Which symbol runs at which minimum API_LEVEL, joined to the devices that state one.",
      ],
      [
        "Runtime attribution",
        "Which of the five runtimes a symbol is valid in, taken from the source path, never from page text.",
      ],
      [
        "Contradiction between sources",
        "Where the docs and the shipped samples disagree, stated rather than silently resolved.",
      ],
      [
        "Reverse lookup",
        "Symbols, members, enum values and shape properties keyed by what you would type, not by where they sit.",
      ],
    ],
    pipelineHeading: "How it works",
    pipelineStages: [
      ["fetch", "clone or update the official repos into a local cache"],
      ["parse", "ten fronts, each reading one shape of source"],
      ["enrich", "merge the fronts into one record per symbol"],
      ["store", "write the JSON source of truth, one file per module"],
      ["render", "generate the Markdown an agent reads"],
    ],
    consumersLead: "And three things that consume it:",
    consumers: [
      ["verify", "ask the rendered base real questions and check the answers"],
      ["check", "score an app directory against the base"],
      ["mcp", "serve the base over MCP, so an agent queries it instead of reading it"],
    ],
    pipelineNote:
      "JSON in data/ is the source of truth; the Markdown tree is derived and reproducible. CI re-renders and fails on any diff, so a hand-edited page cannot survive.",
    usageHeading: "How to use it",
    usageLead:
      "Everything runs locally. Clone the repo and install — there is nothing to sync first, because data/ and the rendered pages are committed:",
    setupNote:
      "npm run sync is only needed to move the base forward against upstream; a fresh clone is already readable. It clones the official repos into .cache/ and rewrites data/.",
    waysLead: "Three ways in, in order of how much the consumer has to read.",
    ways: [
      {
        title: "Query it by name",
        command: "npm run mcp",
        body: "Sixteen read-only tools over stdio. Call get_freshness first: a report that cannot name the version it read cannot be compared with another. Nothing to authenticate, and no request leaves the host.",
      },
      {
        title: "Score an app against it",
        command: "npm run check -- path/to/an/app",
        body: "Checks a directory under four rules — runtime, permission, API_LEVEL and manifest — and returns a verdict per line rather than a pass or a fail.",
      },
      {
        title: "Read the rendered Markdown",
        command: "api/  compatibility/  runtimes/  patterns/  …",
        body: "Committed, so cloning is enough. This is what the Agent Skill in skills/zepp-os/SKILL.md reads: it carries no documentation of its own, only how to use this base.",
      },
    ],
    verdictHeading: "What check answers",
    verdictStatus: "Status",
    verdictMeaning: "Meaning",
    verdict: [
      ["VOUCHED", "This base can point at the record that backs it"],
      ["UNVERIFIABLE", "Not covered here. Never evidence that the symbol does not exist"],
      ["VIOLATION", "This base contradicts it"],
    ],
    verdictNote:
      "No violation is not approval. Every report ships a notChecked list, because a checker that listed only what it found would teach a reader that silence is approval — the exact reading this project exists to prevent.",
    coverageHeading: "What is in it",
    coverageLead:
      "Generated from data/ on every render. What each number means is the part worth reading; how big it is today is in the table.",
    coverageMetric: "What",
    coverageCount: "Count",
    honestyHeading: "What keeps it honest",
    honesty: [
      [
        "A reproducible render",
        "data/ and the rendered pages are both committed, so CI re-renders from a plain checkout and fails on a diff — the “JSON is the source of truth” rule, made enforceable.",
      ],
      [
        "Questions, not coverage",
        "verify asks the rendered pages a fixed set of questions a developer would actually ask, and fails naming the one that stopped being answerable. Every question carries why it is in the set.",
      ],
      [
        "A weekly sync that opens a PR",
        "Every parser bug here has been an upstream format change that made an extraction silently smaller. A count that went down is the thing to look at, and a reviewable diff is the only form in which those have ever been caught.",
      ],
    ],
    repoLink: "Read the source on GitHub",
    version: "Base version",
    lastSync: "Last sync",
    sources: "Sources at",
    generated: "This page is generated by npm run render from data/.",
  },
  pt: {
    lang: "pt-BR",
    otherLanguage: "English",
    name: "ZoaK",
    expansion: "Zepp OS Agent Knowledge Base",
    title: "ZoaK — Zepp OS Agent Knowledge Base",
    description:
      "Uma base de conhecimento ciente de compatibilidade entre as fontes oficiais do Zepp OS e os agentes de IA que escrevem código para Zepp OS.",
    tagline:
      "Uma camada ciente de compatibilidade entre as fontes oficiais do Zepp OS e os agentes de IA que escrevem código para Zepp OS.",
    statSymbols: "símbolos",
    statModules: "módulos",
    statDevices: "dispositivos",
    statExamples: "apps de exemplo lidos como código",
    statsNote: "Calculado a partir de data/ a cada render, nunca digitado à mão.",
    problemHeading: "A pergunta que ela existe para responder",
    problemLead:
      "Isto não é um espelho da documentação. A documentação oficial existe, mas não está no formato que um agente consegue consumir de forma confiável quando a pergunta é “posso chamar esta API, neste runtime, neste API_LEVEL?” Este projeto extrai essas fontes para uma camada estruturada em que essa pergunta tem resposta verificável.",
    problemBody:
      "A falha específica que ela evita é um agente produzir código Zepp OS plausível que não consegue justificar. Todas as avaliações feitas até aqui terminaram a tarefa e nenhuma ficou bloqueada — elas falharam em comprovar, entregando código que a base não conseguia sustentar com uma citação. É esse o problema, não o desconhecimento.",
    valuesHeading: "O que as fontes não carregam",
    values: [
      [
        "Compatibilidade como eixo",
        "Qual símbolo roda em qual API_LEVEL mínimo, cruzado com os dispositivos que declaram um.",
      ],
      [
        "Atribuição de runtime",
        "Em qual dos cinco runtimes um símbolo é válido, tirado do caminho da fonte, nunca do texto da página.",
      ],
      [
        "Contradição entre fontes",
        "Onde a documentação e os samples publicados discordam, declarada em vez de resolvida em silêncio.",
      ],
      [
        "Busca reversa",
        "Símbolos, membros, valores de enum e propriedades de shape indexados pelo que você digitaria, não por onde eles moram.",
      ],
    ],
    pipelineHeading: "Como funciona",
    pipelineStages: [
      ["fetch", "clonar ou atualizar os repositórios oficiais em um cache local"],
      ["parse", "dez frentes, cada uma lendo um formato de fonte"],
      ["enrich", "fundir as frentes em um registro por símbolo"],
      ["store", "gravar o JSON fonte de verdade, um arquivo por módulo"],
      ["render", "gerar o Markdown que o agente lê"],
    ],
    consumersLead: "E três coisas que consomem isso:",
    consumers: [
      ["verify", "fazer perguntas reais à base renderizada e checar as respostas"],
      ["check", "pontuar um diretório de app contra a base"],
      ["mcp", "servir a base por MCP, para o agente consultar em vez de ler"],
    ],
    pipelineNote:
      "O JSON em data/ é a fonte de verdade; a árvore Markdown é derivada e reproduzível. O CI re-renderiza e falha em qualquer diferença, então uma página editada à mão não sobrevive.",
    usageHeading: "Como usar",
    usageLead:
      "Tudo roda localmente. Clone o repositório e instale — não há nada para sincronizar antes, porque data/ e as páginas renderizadas estão commitadas:",
    setupNote:
      "npm run sync só é necessário para mover a base contra o upstream; um clone novo já é legível. Ele clona os repositórios oficiais em .cache/ e reescreve data/.",
    waysLead: "Três formas de entrar, na ordem de quanto quem consome precisa ler.",
    ways: [
      {
        title: "Consultar por nome",
        command: "npm run mcp",
        body: "Dezesseis tools somente-leitura sobre stdio. Chame get_freshness primeiro: um relatório que não consegue nomear a versão que leu não pode ser comparado com outro. Nada para autenticar, e nenhuma requisição sai da máquina.",
      },
      {
        title: "Pontuar um app contra a base",
        command: "npm run check -- caminho/para/um/app",
        body: "Confere um diretório sob quatro regras — runtime, permissão, API_LEVEL e manifest — e devolve um veredito por linha, em vez de um passou ou não passou.",
      },
      {
        title: "Ler o Markdown renderizado",
        command: "api/  compatibility/  runtimes/  patterns/  …",
        body: "Está commitado, então clonar basta. É isto que a Agent Skill em skills/zepp-os/SKILL.md lê: ela não carrega documentação própria, só como usar esta base.",
      },
    ],
    verdictHeading: "O que o check responde",
    verdictStatus: "Status",
    verdictMeaning: "Significado",
    verdict: [
      ["VOUCHED", "Esta base consegue apontar o registro que sustenta aquilo"],
      ["UNVERIFIABLE", "Não coberto aqui. Nunca evidência de que o símbolo não existe"],
      ["VIOLATION", "Esta base contradiz aquilo"],
    ],
    verdictNote:
      "Ausência de violação não é aprovação. Todo relatório traz uma lista notChecked, porque um checador que listasse só o que encontrou ensinaria o leitor a ler silêncio como aprovação — exatamente a leitura que este projeto existe para evitar.",
    coverageHeading: "O que tem dentro",
    coverageLead:
      "Gerado a partir de data/ a cada render. O que cada número significa é a parte que vale ler; o tamanho de hoje está na tabela.",
    coverageMetric: "O quê",
    coverageCount: "Quantidade",
    honestyHeading: "O que mantém a base honesta",
    honesty: [
      [
        "Um render reproduzível",
        "data/ e as páginas renderizadas estão ambas commitadas, então o CI re-renderiza de um checkout limpo e falha em qualquer diferença — a regra “JSON é a fonte de verdade”, tornada verificável.",
      ],
      [
        "Perguntas, não cobertura",
        "O verify faz às páginas renderizadas um conjunto fixo de perguntas que um desenvolvedor faria de verdade, e falha nomeando a que deixou de ter resposta. Cada pergunta carrega o motivo de estar no conjunto.",
      ],
      [
        "Um sync semanal que abre PR",
        "Todo bug de parser aqui foi uma mudança de formato upstream que deixou a extração silenciosamente menor. Contagem que caiu é o que se olha, e um diff revisável é a única forma em que esses já foram pegos.",
      ],
    ],
    repoLink: "Ver o código no GitHub",
    version: "Versão da base",
    lastSync: "Último sync",
    sources: "Fontes em",
    generated: "Esta página é gerada por npm run render a partir de data/.",
  },
};

/** Free-form strings reach the markup, and one `<` would end the document early. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * The date only, never the time.
 *
 * `lastSyncAt` is an instant; rendering it through a locale or a zone would make
 * the page's bytes depend on where the render ran, and the reproducibility check
 * in CI would fail on a machine in another timezone rather than on a real diff.
 */
export function syncDate(lastSyncAt: string): string {
  return lastSyncAt.slice(0, 10);
}

/** The counts the hero states, in the order a reader meets the project. */
function stats(counts: CoverageCounts, copy: Copy): [number, string][] {
  return [
    [counts.symbols, copy.statSymbols],
    [counts.modules, copy.statModules],
    [counts.devices, copy.statDevices],
    [counts.examples, copy.statExamples],
  ];
}

/**
 * The same rows the README's table carries, as HTML.
 *
 * The labels are restated rather than imported from `readme.ts`, because those
 * are Markdown — a label there may carry backticks, and a cell may carry an
 * escaped pipe. Sharing the strings would put Markdown syntax in the page; what
 * is shared is the computation, which is where a wrong number would come from.
 */
function coverageRows(counts: CoverageCounts, language: Language): [string, string][] {
  const en = language === "en";

  return [
    [en ? "Symbols" : "Símbolos", `<strong>${counts.symbols}</strong>`],
    [en ? "Modules" : "Módulos", `${counts.modules}`],
    ["<code>OFFICIAL</code> / <code>OBSERVED</code>", `${counts.official} / ${counts.observed}`],
    [
      en
        ? "Symbols stating a minimum <code>API_LEVEL</code>"
        : "Símbolos que declaram <code>API_LEVEL</code> mínimo",
      `${counts.apiLevel}`,
    ],
    [en ? "Symbols with a description" : "Símbolos com descrição", `${counts.described}`],
    [
      en ? "Symbols with a call signature" : "Símbolos com assinatura de chamada",
      `${counts.signature}`,
    ],
    [
      en
        ? "Symbols with a property table, and properties in them"
        : "Símbolos com tabela de propriedades, e propriedades nelas",
      `${counts.shapes}, ${counts.properties}`,
    ],
    [
      en
        ? "Types declared under a heading with no name column"
        : "Tipos declarados sob um heading sem coluna de nome",
      `${counts.declares}, ${counts.declarations}`,
    ],
    [
      en ? "Value sets, and members in them" : "Conjuntos de valores, e membros neles",
      `${counts.enums}, ${counts.enumMembers}`,
    ],
    [en ? "Instance members" : "Membros de instância", `${counts.members}`],
    [
      en ? "By runtime" : "Por runtime",
      counts.byRuntime.map(([runtime, n]) => `${escapeHtml(runtime)} ${n}`).join(", "),
    ],
    [
      en
        ? "Devices, of which run Zepp OS with a stated level"
        : "Dispositivos, dos quais rodam Zepp OS com nível declarado",
      `${counts.devices}, ${counts.devicesWithLevel}`,
    ],
    [en ? "Best-practice patterns" : "Padrões de boas práticas", `${counts.patterns}`],
    [en ? "Sample apps read as code" : "Apps de exemplo lidos como código", `${counts.examples}`],
  ];
}

/** Each upstream source as a linked short commit, or plain text if unmapped. */
function sourceLinks(manifest: SyncManifest): string {
  return Object.entries(manifest.sources)
    .map(([name, { commit }]) => {
      const label = `${escapeHtml(name)} <code>${escapeHtml(commit.slice(0, 7))}</code>`;
      const repo = SOURCE_REPOS[name];

      return repo === undefined
        ? label
        : `<a href="${repo}/commit/${escapeHtml(commit)}">${label}</a>`;
    })
    .join(" · ");
}

/** One translation of the page, as a complete HTML document. */
export function sitePage(
  counts: CoverageCounts,
  manifest: SyncManifest,
  language: Language,
): string {
  const copy = COPY[language];
  const page = PAGES.find((p) => p.language === language);
  const self = page?.file ?? "index.html";
  const other = page?.other ?? "pt-BR.html";

  const list = (items: [string, string][], render: (a: string, b: string) => string): string =>
    items.map(([a, b]) => `      ${render(a, b)}`).join("\n");

  const card = (title: string, body: string): string =>
    `<li><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></li>`;

  const step = (stage: string, body: string): string =>
    `<li><code>${escapeHtml(stage)}</code><span>${escapeHtml(body)}</span></li>`;

  return `<!doctype html>
<!-- Generated by \`npm run render\` from data/. Do not edit by hand — CI re-renders and fails on a diff. -->
<html lang="${copy.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(copy.title)}</title>
<meta name="description" content="${escapeHtml(copy.description)}">
<link rel="icon" href="assets/logo.png">
<link rel="stylesheet" href="${STYLE_FILE}">
</head>
<body>
<header class="top">
  <a class="brand" href="${self}">
    <img src="assets/logo.png" alt="" width="40" height="40">
    <span>${escapeHtml(copy.name)}</span>
  </a>
  <nav>
    <a href="${other}">${escapeHtml(copy.otherLanguage)}</a>
    <a href="${REPO}">GitHub</a>
  </nav>
</header>

<main>
  <section class="hero">
    <h1>${escapeHtml(copy.name)}</h1>
    <p class="expansion">${escapeHtml(copy.expansion)}</p>
    <p class="tagline">${escapeHtml(copy.tagline)}</p>
    <ul class="stats">
${list(
  stats(counts, copy).map(([value, label]) => [String(value), label] as [string, string]),
  (value, label) =>
    `<li><span class="value">${value}</span><span class="label">${escapeHtml(label)}</span></li>`,
)}
    </ul>
    <p class="note">${escapeHtml(copy.statsNote)}</p>
  </section>

  <section>
    <h2>${escapeHtml(copy.problemHeading)}</h2>
    <p class="lead">${escapeHtml(copy.problemLead)}</p>
    <p>${escapeHtml(copy.problemBody)}</p>
  </section>

  <section>
    <h2>${escapeHtml(copy.valuesHeading)}</h2>
    <ul class="cards">
${list(copy.values, card)}
    </ul>
  </section>

  <section>
    <h2>${escapeHtml(copy.pipelineHeading)}</h2>
    <ol class="pipeline">
${list(copy.pipelineStages, step)}
    </ol>
    <p class="consumers-lead">${escapeHtml(copy.consumersLead)}</p>
    <ul class="consumers">
${list(copy.consumers, step)}
    </ul>
    <p class="note">${escapeHtml(copy.pipelineNote)}</p>
  </section>

  <section>
    <h2>${escapeHtml(copy.usageHeading)}</h2>
    <p class="lead">${escapeHtml(copy.usageLead)}</p>
    <pre><code>${escapeHtml(SETUP)}</code></pre>
    <p class="note">${escapeHtml(copy.setupNote)}</p>

    <p class="ways-lead">${escapeHtml(copy.waysLead)}</p>
    <ol class="ways">
${copy.ways
  .map(
    ({ title, command, body }) =>
      `      <li>
        <h3>${escapeHtml(title)}</h3>
        <pre><code>${escapeHtml(command)}</code></pre>
        <p>${escapeHtml(body)}</p>
      </li>`,
  )
  .join("\n")}
    </ol>

    <h3 class="sub">${escapeHtml(copy.verdictHeading)}</h3>
    <div class="scroll">
      <table class="table">
        <thead>
          <tr><th>${escapeHtml(copy.verdictStatus)}</th><th>${escapeHtml(copy.verdictMeaning)}</th></tr>
        </thead>
        <tbody>
${copy.verdict
  .map(
    ([status, meaning]) =>
      `          <tr><td><code>${escapeHtml(status)}</code></td><td>${escapeHtml(meaning)}</td></tr>`,
  )
  .join("\n")}
        </tbody>
      </table>
    </div>
    <p class="note">${escapeHtml(copy.verdictNote)}</p>
  </section>

  <section>
    <h2>${escapeHtml(copy.coverageHeading)}</h2>
    <p class="lead">${escapeHtml(copy.coverageLead)}</p>
    <div class="scroll">
      <table class="table coverage">
        <thead>
          <tr><th>${escapeHtml(copy.coverageMetric)}</th><th>${escapeHtml(copy.coverageCount)}</th></tr>
        </thead>
        <tbody>
${coverageRows(counts, language)
  .map(([what, value]) => `          <tr><td>${what}</td><td>${value}</td></tr>`)
  .join("\n")}
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h2>${escapeHtml(copy.honestyHeading)}</h2>
    <ul class="cards">
${list(copy.honesty, card)}
    </ul>
    <p class="cta"><a class="button" href="${REPO}">${escapeHtml(copy.repoLink)}</a></p>
  </section>
</main>

<footer>
  <p>
    ${escapeHtml(copy.version)} <code>${escapeHtml(manifest.version)}</code> ·
    ${escapeHtml(copy.lastSync)} ${escapeHtml(syncDate(manifest.lastSyncAt))} ·
    ${escapeHtml(copy.sources)} ${sourceLinks(manifest)}
  </p>
  <p class="note">${escapeHtml(copy.generated)}</p>
</footer>
</body>
</html>`;
}

/**
 * The stylesheet, written beside the pages.
 *
 * Both translations share it, and it carries no build step: one file, custom
 * properties for the palette, and a dark variant behind `prefers-color-scheme`.
 */
export function siteStyles(): string {
  return `/* Generated by \`npm run render\`. Edit src/render/site.ts, not this file. */
:root {
  color-scheme: light dark;
  --bg: #fbfaf8;
  --panel: #ffffff;
  --ink: #1a1a1c;
  --muted: #5d5d66;
  --line: #e2e0dc;
  --accent: #0b6b5e;
  --code-bg: #f1efeb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #131315;
    --panel: #1b1b1e;
    --ink: #eceae6;
    --muted: #a0a0aa;
    --line: #2c2c31;
    --accent: #5fd0bd;
    --code-bg: #232327;
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font: 16px/1.65 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

code {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.9em;
  background: var(--code-bg);
  border-radius: 4px;
  padding: 0.1em 0.35em;
}

a {
  color: var(--accent);
}

.top {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  max-width: 62rem;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 650;
  color: var(--ink);
  text-decoration: none;
}

.top nav {
  display: flex;
  gap: 1.25rem;
  font-size: 0.925rem;
}

main {
  max-width: 62rem;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

section {
  padding: 2.5rem 0;
  border-top: 1px solid var(--line);
}

.hero {
  border-top: 0;
  padding-top: 1.5rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 2.9rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem;
}

/* What the name stands for. A short name tells a first-time reader nothing on
   its own, so the expansion sits directly under it rather than in a footer. */
.expansion {
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 0.9rem;
}

h2 {
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  margin: 0 0 1rem;
}

h3 {
  font-size: 1rem;
  margin: 0 0 0.4rem;
}

.tagline {
  font-size: 1.2rem;
  color: var(--muted);
  max-width: 44rem;
  margin: 0 0 2rem;
}

p {
  max-width: 48rem;
}

.lead {
  font-size: 1.05rem;
}

.note {
  color: var(--muted);
  font-size: 0.875rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: 1rem;
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
}

.stats li {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 1rem 1.1rem;
}

.stats .value {
  display: block;
  font-size: 1.9rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.stats .label {
  display: block;
  color: var(--muted);
  font-size: 0.85rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cards li {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 1.1rem 1.2rem;
}

.cards p {
  color: var(--muted);
  font-size: 0.925rem;
  margin: 0;
}

.pipeline,
.consumers {
  display: grid;
  gap: 0.75rem;
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
}

.pipeline {
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  counter-reset: stage;
}

/* The stages are ordered, and on a narrow screen the grid wraps them onto
   several rows — where left-to-right stops saying so. The number does. */
.pipeline li {
  counter-increment: stage;
}

.pipeline code::before {
  content: counter(stage) ". ";
  color: var(--muted);
  font-weight: 400;
}

.consumers {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.pipeline li,
.consumers li {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.9rem 1rem;
}

.pipeline li {
  border-left: 3px solid var(--accent);
}

.pipeline code,
.consumers code {
  display: inline-block;
  margin-bottom: 0.35rem;
  background: none;
  padding: 0;
  font-weight: 650;
  color: var(--accent);
}

.pipeline span,
.consumers span {
  display: block;
  color: var(--muted);
  font-size: 0.875rem;
}

.consumers-lead {
  margin-top: 0;
}

pre {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  margin: 0 0 0.75rem;
  max-width: 48rem;
  overflow-x: auto;
}

pre code {
  background: none;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.7;
}

.ways-lead {
  margin: 2rem 0 1rem;
}

.ways {
  display: grid;
  gap: 1rem;
  list-style: none;
  margin: 0 0 2.5rem;
  padding: 0;
  counter-reset: way;
}

.ways li {
  counter-increment: way;
  background: var(--panel);
  border: 1px solid var(--line);
  border-left: 3px solid var(--accent);
  border-radius: 10px;
  padding: 1.1rem 1.2rem;
}

.ways h3::before {
  content: counter(way) ". ";
  color: var(--muted);
  font-weight: 400;
}

/* Inside a card the block already has a ground, so the command reads as the
   line you would type rather than as a second panel stacked on the first. */
.ways pre {
  background: var(--code-bg);
  border: 0;
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
  margin: 0 0 0.6rem;
}

.ways p {
  color: var(--muted);
  font-size: 0.925rem;
  margin: 0;
}

.sub {
  margin: 0 0 0.75rem;
}

.scroll {
  overflow-x: auto;
}

.table {
  border-collapse: collapse;
  width: 100%;
  min-width: 26rem;
  font-size: 0.925rem;
}

.table th,
.table td {
  text-align: left;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
}

.table th {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Only the counts. The verdict table's second column is prose, and would be
   dragged off the side of the page by a nowrap meant for a number. */
.coverage td:last-child {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.cta {
  margin-top: 1.5rem;
}

.button {
  display: inline-block;
  background: var(--accent);
  color: var(--bg);
  border-radius: 8px;
  padding: 0.6rem 1.1rem;
  font-weight: 600;
  text-decoration: none;
}

footer {
  max-width: 62rem;
  margin: 0 auto;
  padding: 1.5rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.875rem;
}

footer p {
  margin: 0.35rem 0;
  max-width: none;
}
`;
}

/** Write both translations and the stylesheet under `site/`. */
export async function renderSite(dataDir: string, outDir: string): Promise<{ pages: string[] }> {
  const counts = await coverageCounts(dataDir);
  const manifest: SyncManifest = JSON.parse(
    await readFile(path.join(dataDir, "manifest.json"), "utf-8"),
  );

  const dir = path.join(outDir, SITE_DIR);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, STYLE_FILE), siteStyles(), "utf-8");

  const pages: string[] = [];
  for (const { language, file } of PAGES) {
    await writeFile(path.join(dir, file), `${sitePage(counts, manifest, language)}\n`, "utf-8");
    pages.push(file);
  }

  return { pages };
}
