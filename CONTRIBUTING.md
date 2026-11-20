# Contributing an official Mandala plugin

## Submit the package

1. Open a pull request in `maktub-ai/mandala-plugins` with your manifest at `plugins/<id>/mandala-plugin.json` and the JSON files it declares. Put new plugin files together under `plugins/<id>/`. The Arabic starter keeps its existing payload under `packages/`.
2. Use the [public plugin interface](docs/plugin-api.md) and set the minimum Mandala version for the contributions you use. Package paths start at the repository root. Compute the SHA-256 of each payload's exact bytes and put it in the manifest. The manifest and its payloads together must fit within 4 MiB.
3. Keep package data and previews free of credentials, personal data and private project content. Test with a synthetic project. Maintainers with a Mandala checkout can also validate the payload formats against the application parser:

```sh
node --import tsx scripts/validate-data-plugin.ts /path/to/mandala-plugins plugins/arabic-starter/mandala-plugin.json
```

## Publish the release

1. After the package lands on `main`, open a catalog pull request in this repository. Add or update the entry in [the full catalog](catalogs/v2/catalog.json). Use the landed 40-character commit for `package.revision`, `maktub-ai/mandala-plugins` for `package.repository` and the manifest's repository-relative path for `package.path`. Put the SHA-256 of the committed manifest in `package.sha256`.
2. Keep the id, name, description, version, minimum App version and contribution kinds consistent with the manifest. Keep existing plugin and contribution IDs across updates. Give each changed release a new `x.y.z` version, pinned commit and checksums.
3. From a full clone with the official repository as `origin`, refresh its main branch and run the local catalog check. Include the result in your pull request.

```sh
git fetch origin main
node scripts/check-catalog.mjs
```

Maintainers review locally. After publication, verify anonymous downloads and install the plugin in an isolated Mandala profile. The market needs no publisher credentials to download a package.

## Compatibility

The [root catalog](catalog.json) serves older clients. Keep compatible theme, language and pet releases there. Library tabs require the full catalog and Mandala 0.1.3 or later. Keep the Arabic starter's legacy language ID and payload link in [the language catalog](catalogs/languages.json). See the [language pack guide](docs/languages.md) for translation conventions.

Use English for documentation and reviews. Preserve native language names and translation source keys.
