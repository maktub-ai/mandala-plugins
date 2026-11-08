# Mandala Plugins

The unified catalog for Mandala data-only plugins: themes, language packs and pets. Requires Mandala 0.1.2 or later. A plugin can contain several contributions, installed and updated together and applied individually. Executable plugins are not supported.

See the [authoring protocol](https://github.com/MaktubCN/open-mana/blob/main/docs/market-ui-extensions.md#unified-plugin-protocol-mandala-012) and [pet format](https://github.com/MaktubCN/open-mana/blob/main/docs/market-ui-extensions.md#pets). Documentation access is restricted while Mandala remains private.

The Arabic starter language plugin and [English reference dictionary](messages.en.json) live here. See the [language contribution guide](docs/languages.md) and [Arabic manifest](plugins/arabic-starter/mandala-plugin.json). Translation bytes are unchanged; the starter is partial and has not been reviewed by a native Arabic speaker.

The [legacy language catalog](catalogs/languages.json) preserves existing language IDs and points to the same payload. The [old language repository](https://github.com/maktub-ai/mandala-language-packs) remains an entry point for older Apps and fixed commit links. Do not delete it until those consumers are retired. Existing [theme](https://github.com/maktub-ai/mandala-themes) and [pet](https://github.com/maktub-ai/mandala-pets) catalogs remain compatible sources.

## Contributing

Prepare a `mandala-plugin.json` manifest and existing-format JSON payloads in your package repository. Run Mandala's local `scripts/validate-data-plugin.ts` check, commit the files, then submit a catalog-only PR here with the real 40-character commit and exact SHA-256 checksums. See [CONTRIBUTING.md](CONTRIBUTING.md).

Review checks cover data-only content, valid contributions, matching metadata, checksums, minimum App version and a 4 MiB combined manifest/payload limit. No package scripts are run, and this repository does not enable automatic cloud CI/CD.

This repository and the package sources remain private during launch preparation. Market uses anonymous reads, so private catalogs cannot be browsed or installed through Market until explicitly made public. Never put access credentials in a catalog or package.
