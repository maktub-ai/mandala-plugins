# Mandala Plugins

This repository hosts the official Mandala plugin market. Each plugin has a manifest at `plugins/<id>/mandala-plugin.json`. The catalog, manifests and JSON payloads are all published here. Mandala reads the contributions declared in the manifest when a user installs a plugin.

Authors can contribute themes, language packs, pets and Library tabs through the [public plugin interface](docs/plugin-api.md). The current interface accepts declarative JSON. A plugin can group several contributions in one release.

Project blueprints are built into Mandala and use the Omino plan format.

The Arabic starter language plugin and [English reference dictionary](messages.en.json) live here. See the [language contribution guide](docs/languages.md) and [Arabic manifest](plugins/arabic-starter/mandala-plugin.json). Translation bytes are unchanged; the starter is partial and has not been reviewed by a native Arabic speaker.

Mandala 0.1.3 and later read the [full catalog](catalogs/v2/catalog.json). The [root catalog](catalog.json) retains the contribution kinds understood by 0.1.2. The [legacy language catalog](catalogs/languages.json) preserves existing language IDs and points to the same payload. The [old language repository](https://github.com/maktub-ai/mandala-language-packs) remains an entry point for older Apps and fixed commit links. Do not delete it until those consumers are retired. Existing [theme](https://github.com/maktub-ai/mandala-themes) and [pet](https://github.com/maktub-ai/mandala-pets) catalogs remain compatible sources.

## Contributing

Submit the manifest and payloads to this repository. Once the files are on `main`, submit the catalog entry pinned to that commit and run `node scripts/check-catalog.mjs`. See the [contribution guide](CONTRIBUTING.md).

Review checks cover data-only content, valid contributions, matching metadata, checksums, minimum App version and a 4 MiB combined manifest/payload limit. No package scripts are run, and this repository does not enable automatic cloud CI/CD.

This catalog is public. Market downloads catalogs and pinned package files anonymously. Never put access credentials in a catalog or package.
