# Contributing

1. Follow the [Mandala data plugin specification](https://github.com/MaktubCN/open-mana/blob/main/docs/market-ui-extensions.md). Use `execution: "data"`, schema version 1, and `minAppVersion` of at least `0.1.2`. Use existing theme, language and pet payload formats.
2. Validate every declared JSON file locally. No executable entries, hooks, HTML, arbitrary CSS, remote assets, credentials, personal data or private organization content may be included. Use synthetic previews only; never submit real user screenshots.
3. Review both author and committer metadata before uploading package history. Commit the manifest and payloads before referencing them. Pin a real 40-character commit, hash the manifest's exact bytes in the catalog, and hash each payload in the manifest. All files must come from that same repository and commit and total at most 4 MiB.
4. Submit a PR editing `catalog.json`. Keep `format: "mandala-plugin-catalog"`, `version: 1` and `items`. Each item has `id`, `name`, `description`, `version`, `publisher`, `minAppVersion`, `kinds`, and `package` (`repository`, `revision`, `path`, `sha256`). Metadata and kinds must match the manifest.
5. Keep release versions in `x.y.z` form. Each changed release needs a new version, revision and checksums. Do not move an installed identity to a different package repository without an explicit migration decision.

Maintainers validate locally and review contributions before merging. A publisher label is attribution, not a trust guarantee. Preserve the existing legacy catalogs and IDs; do not republish them as duplicate language providers. Documentation and review text use English; native language names and translation source keys retain their required spelling.

Keep the repository private until its owner explicitly approves publication. Do not enable automatic cloud CI/CD.
