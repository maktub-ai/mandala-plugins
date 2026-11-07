# Mandala Plugins

The unified catalog for Mandala data-only plugins: themes, language packs and pets. Requires Mandala 0.1.2 or later. A plugin can contain several contributions, installed and updated together and applied individually. Executable plugins are not supported.

See the [authoring protocol](https://github.com/MaktubCN/open-mana/blob/main/docs/market-ui-extensions.md#unified-plugin-protocol-mandala-012) and [pet format](https://github.com/MaktubCN/open-mana/blob/main/docs/market-ui-extensions.md#pets). Documentation access is restricted while Mandala remains private.

The catalog starts empty. Existing packages remain in the compatible [theme](https://github.com/maktub-ai/mandala-themes), [language](https://github.com/maktub-ai/mandala-language-packs) and [pet](https://github.com/maktub-ai/mandala-pets) catalogs, preserving installed identities and older clients. Do not duplicate those releases here under new identities.

## Contributing

Prepare a `mandala-plugin.json` manifest and existing-format JSON payloads in your package repository. Run Mandala's local `scripts/validate-data-plugin.ts` check, commit the files, then submit a catalog-only PR here with the real 40-character commit and exact SHA-256 checksums. See [CONTRIBUTING.md](CONTRIBUTING.md).

Review checks cover data-only content, valid contributions, matching metadata, checksums, minimum App version and a 4 MiB combined manifest/payload limit. No package scripts are run, and this repository does not enable automatic cloud CI/CD.

This repository and the package sources remain private during launch preparation. Market uses anonymous reads, so private catalogs cannot be browsed or installed through Market until explicitly made public. Never put access credentials in a catalog or package.
