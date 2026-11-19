# Mandala Plugins

The unified catalog for Mandala data-only plugins: themes, language packs, pets and Library tabs. Each plugin declares its minimum Mandala version. A plugin can contain several contributions, installed and updated together and applied individually. Executable plugins are not supported.

See the [authoring protocol](https://github.com/MaktubCN/open-mana/blob/main/docs/market-ui-extensions.md#unified-plugin-protocol-mandala-012) and [pet format](https://github.com/MaktubCN/open-mana/blob/main/docs/market-ui-extensions.md#pets). Documentation access is restricted while Mandala remains private.

[Omino](plugins/omino/mandala-plugin.json) adds a **Plan** tab to the Library in Mandala 0.1.3 or later. Install Omino from the Market to browse plans for your Mandala projects. Opening a plan displays the HTML that Omino generated. The plugin contains two JSON files.

The Arabic starter language plugin and [English reference dictionary](messages.en.json) live here. See the [language contribution guide](docs/languages.md) and [Arabic manifest](plugins/arabic-starter/mandala-plugin.json). Translation bytes are unchanged; the starter is partial and has not been reviewed by a native Arabic speaker.

Mandala 0.1.3 and later read the [full catalog](catalogs/v2/catalog.json). The [root catalog](catalog.json) retains the contribution kinds understood by 0.1.2. The [legacy language catalog](catalogs/languages.json) preserves existing language IDs and points to the same payload. The [old language repository](https://github.com/maktub-ai/mandala-language-packs) remains an entry point for older Apps and fixed commit links. Do not delete it until those consumers are retired. Existing [theme](https://github.com/maktub-ai/mandala-themes) and [pet](https://github.com/maktub-ai/mandala-pets) catalogs remain compatible sources.

## Contributing

Prepare a `mandala-plugin.json` manifest and existing-format JSON payloads in your package repository. Run Mandala's local `scripts/validate-data-plugin.ts` check, commit the files, then submit a catalog-only PR here with the real 40-character commit and exact SHA-256 checksums. See [CONTRIBUTING.md](CONTRIBUTING.md).

Review checks cover data-only content, valid contributions, matching metadata, checksums, minimum App version and a 4 MiB combined manifest/payload limit. No package scripts are run, and this repository does not enable automatic cloud CI/CD.

This catalog is public. Market downloads catalogs and pinned package files anonymously. Never put access credentials in a catalog or package.
