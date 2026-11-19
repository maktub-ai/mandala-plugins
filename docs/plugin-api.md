# Mandala data plugin API

A plugin is a JSON manifest and one or more JSON payloads. Mandala reads the declared contributions and implements their behavior. Version 1 supports the following four contribution types. Package installation runs no plugin code.

| Manifest key | Catalog kind | Payload format (version 1) |
| --- | --- | --- |
| `themes` | `theme` | `mandala-theme`. Export a theme from Mandala Settings to generate the `theme`, `appearance` and `background` objects. |
| `languagePacks` | `language` | `mandala-language`. Supply a locale, display name, text direction and message dictionary. Preserve the source keys and their placeholders. [Language guide](languages.md) · [Arabic example](../packages/ar.mandala-language.json) |
| `pets` | `pet` | `mandala-pet`. Supply a `name` and a `states` object containing inline base64 image data URIs for `idle`, `working`, `waiting` and `error`. Optional states are `thinking`, `unknown`, `done` and `sleep`. Optional `tint: true` renders the image as a mask. |
| `librarySections` | `library-section` | `mandala-library-section`. Declare a tab for local project HTML documents. [Omino example](../plugins/omino/section.json) |

## Manifest

Place the manifest at `plugins/<plugin-id>/mandala-plugin.json` in this repository. A handbook plugin could use the following manifest and workspace section. The example digest covers the section below, including its final newline.

```json
{
  "format": "mandala-plugin",
  "schemaVersion": 1,
  "execution": "data",
  "id": "handbook",
  "name": "Project Handbook",
  "description": "Read each project's handbook in the Library.",
  "version": "1.0.0",
  "minAppVersion": "0.1.3",
  "contributes": {
    "librarySections": [
      { "id": "handbook", "path": "plugins/handbook/section.json", "sha256": "43f0ae8db7418eb5014fe7e9a5175a2349f49da71ab57d732b2809bbe57e3236" }
    ]
  }
}
```

Use `x.y.z` release versions. Library sections require Mandala 0.1.3 or later. Other contribution types are available from 0.1.2. A manifest accepts 1–50 contributions, including at most one Library section. Plugin and contribution IDs match `[a-z0-9][a-z0-9-]{0,59}`. Contribution IDs are unique within their type. Every path is unique and points to a JSON file relative to the repository root. Hash the exact file bytes with SHA-256 and use the 64 lowercase hexadecimal digits. The manifest and all its payloads together must fit within 4 MiB. Unknown manifest and section fields are rejected.

## Library documents

Save the following section as `plugins/handbook/section.json`. Once installed, its tab groups existing handbooks by Mandala Project. A project with one matching document opens it directly.

```json
{
  "format": "mandala-library-section",
  "version": 1,
  "type": "project-files",
  "label": { "zh": "手册", "en": "Handbook" },
  "icon": "book",
  "source": { "kind": "workspace", "file": "docs/handbook.html" }
}
```

A `workspace` source reads the declared relative HTML path within each local workspace. Each path component starts with an ASCII letter or digit and may contain letters, digits, periods, underscores and hyphens. The path must end in `.html`. The section may use the icons `book`, `file`, `folder` or `target`. Optional `emptyText` and `updateText` messages take the same `zh` and `en` keys as `label`.

For a tool that stores documents outside the workspace, replace the `source` object with a `collection` declaration. This example reads `~/.reports/projects/<id>/report.html`. An absolute `REPORTS_HOME` overrides `~/.reports`.

```json
{
  "kind": "collection",
  "namespace": "reports",
  "file": "report.html",
  "summary": {
    "file": "summary.json", "format": "report-summary", "version": 1,
    "title": "name", "badgeItems": "requests", "closedField": "state", "closedValue": "closed"
  }
}
```

The namespace matches `[a-z][a-z0-9]{0,31}`. Collection HTML and summary files use plain visible filenames. For each workspace, Mandala checks a `.<namespace>.json` marker with a `project` ID up to the Git root, then a `<namespace>-project` file in the shared Git directory if the workspace is the repository root. The fallback matches the workspace against absolute directory keys in each collection's `.paths.json`. Collection IDs allow lowercase letters, digits, dots, underscores and hyphens, excluding `.` and `..`.

The optional `summary` maps top-level fields of a matching JSON format and version. The example uses `name` as the document title and counts entries in the `requests` array for its badge. A `state` of `closed` suppresses the count. Missing or incompatible summary metadata still allows reading the HTML.

The HTML belongs to the workspace or collection. Mandala opens it in a sandbox that allows inline scripts and styles and blocks network requests by default. A section that needs to reach a local service can declare `"loopback": true` at the section root to allow HTTP connections to `127.0.0.1`.

To publish, commit the package files here and register their fixed commit and checksums in the official catalog. [Contribution workflow](../CONTRIBUTING.md) · [Current catalog](../catalogs/v2/catalog.json)
