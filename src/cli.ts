const command = process.argv[2];

switch (command) {
  case "sync":
    // fetch -> parse -> enrich -> write data/symbols/*.json
    console.log("sync: not implemented");
    break;
  case "render":
    // read data/symbols/*.json -> render markdown
    console.log("render: not implemented");
    break;
  default:
    console.error(`Unknown command: ${command}. Use "sync" or "render".`);
    process.exit(1);
}
