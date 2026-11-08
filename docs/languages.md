# Contributing language packs

## Language package format

Create `packages/fr.mandala-language.json`, for example:

```json
{
  "format": "mandala-language",
  "version": 1,
  "locale": "fr",
  "name": "Français",
  "direction": "ltr",
  "messages": {
    "市场": "Marché",
    "安装 {name}": "Installer {name}"
  }
}
```

This is a minimal format example, not a complete French translation. The Chinese keys are App identifiers, while the values are French. Start with the keys you can translate confidently, or copy entries from [`messages.en.json`](../messages.en.json). That file is a dictionary, **not** an installable pack: wrap your translated dictionary in the `messages` field above.

- Use a canonical BCP 47 locale such as `fr`, `pt-BR`, or `ar`. Built-in `en` and `zh-CN` cannot be overridden.
- Use a recognizable native language name. Set `direction` to `rtl` for right-to-left languages and `ltr` otherwise. This describes text reading direction; it does not mirror the sidebar, drawers, control order, or layout alignment.
- Keep every source key unchanged. Preserve the exact placeholder names, including braces; you may reorder them within a sentence.
- Omit untranslated entries so the App can fall back to English. Empty translation strings are invalid.
- Values are plain text; HTML, CSS, and JavaScript are not interpreted.
- The dictionary must contain 1–10,000 entries. Source keys are limited to 4,000 characters and values to 8,000 characters. The entire file must fit within 4 MiB.
- Describe coverage and native-speaker review honestly. Verify punctuation, numbers, and mixed-direction text; code and terminals remain left-to-right. Compare navigation, settings rows, and Market details before and after switching languages, including narrow windows and a restart.

There is currently no local language-file import or visual translation editor. Run the parser check below before a PR; report linguistic review separately. The maintainer verifies the installation/application flow after catalog publication in an isolated profile. A partial pack is acceptable if its scope is explicit.

To refresh the English reference, maintainers run this from the current open-mana checkout after installing dependencies:

```sh
node --import tsx scripts/export-language-template.ts /absolute/path/to/mandala-plugins/messages.en.json
```

Some dynamically constructed sentences do not yet have stable template keys. The template is not a promise of complete coverage of every UI string.

## Submit a language plugin

1. Submit language payloads under `packages/` in this repository, along with a `mandala-plugin.json` manifest under `plugins/<id>/`. Use a `languagePacks` contribution, a stable contribution ID, a repository-relative payload path and the exact payload SHA-256. Do not introduce a second provider for an existing locale.
2. Follow [CONTRIBUTING.md](../CONTRIBUTING.md) for local validation and the two-commit publication process. All package files must be committed before `catalog.json` pins their 40-character commit and checksums. Manifest and payload downloads together must fit within 4 MiB.
3. Install into an isolated Mandala profile, explicitly apply the language, restart, and check translations and fallback in light/dark and narrow layouts. Never submit personal data or real-user screenshots. Record native-speaker review separately from parser and UI checks.

## Arabic starter and compatibility

The [Arabic payload](../packages/ar.mandala-language.json) is copied byte-for-byte from the existing starter; translation coverage has not changed. It is partial and has not been reviewed by a native Arabic speaker. Its original MIT notice is preserved in [arabic-starter-LICENSE.txt](../packages/arabic-starter-LICENSE.txt), which also covers the migrated English reference dictionary.

The plugin release is `arabic-starter` 1.0.1. Its language contribution also uses `arabic-starter`. New installations use the unified plugin catalog. `catalogs/languages.json` keeps the old `language:arabic-starter` update interface and minimum legacy App version; it references the same pinned payload. Keep this compatibility file and the old repository's catalog synchronized when releasing an update.

A migration-aware App can explicitly replace the official legacy Arabic installation with this plugin, without changing the selected locale. It must validate the official source and all bytes first. Older Apps without that migration still use the legacy catalog. The old repository remains necessary for their catalog requests and historical fixed commit links; do not delete it solely because the payload has moved.

Private repositories are not readable by Market's anonymous downloader. Keep everything private until the owner separately approves publication; do not add credentials to enable downloads.
