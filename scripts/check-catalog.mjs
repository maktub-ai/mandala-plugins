import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const repository = 'maktub-ai/mandala-plugins';
const contributionKinds = { themes: 'theme', languagePacks: 'language', pets: 'pet', librarySections: 'library-section' };
const maxBytes = 4 * 1024 * 1024;

function readPinned(revision, { path, sha256 }) {
  if (typeof path !== 'string' || !/^(?:[A-Za-z0-9_-][A-Za-z0-9_.-]*\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]*\.json$/.test(path))
    throw Error('invalid repository-relative JSON path');
  const bytes = execFileSync('git', ['cat-file', 'blob', revision + ':' + path], { maxBuffer: maxBytes });
  if (createHash('sha256').update(bytes).digest('hex') !== sha256) throw Error('checksum mismatch for ' + path);
  return { json: JSON.parse(bytes), size: bytes.length };
}

function checkEntry(entry, legacyLanguage, compatibilityCatalog) {
  const { revision, path } = entry.package;
  if (entry.package.repository !== repository) throw Error('package.repository must be ' + repository);
  if (!/^[a-f0-9]{40}$/.test(revision) || execFileSync('git', ['cat-file', '-t', revision], { encoding: 'utf8' }).trim() !== 'commit')
    throw Error('package.revision must identify a commit');
  try { execFileSync('git', ['merge-base', '--is-ancestor', revision, 'refs/remotes/origin/main']); }
  catch { throw Error('package revision must be on origin/main; fetch the official main branch before checking'); }
  if (!legacyLanguage && path !== 'plugins/' + entry.id + '/mandala-plugin.json') throw Error('manifest must be in plugins/<id>/');

  const { json, size } = readPinned(revision, entry.package);
  if (legacyLanguage) {
    if (json.format !== 'mandala-language') throw Error('expected a language pack');
    return;
  }

  if (json.format !== 'mandala-plugin' || json.schemaVersion !== 1 || json.execution !== 'data') throw Error('expected a data plugin manifest');
  for (const key of ['id', 'name', 'description', 'version', 'minAppVersion']) {
    if (json[key] !== entry[key]) throw Error('manifest and catalog disagree on ' + key);
  }
  let total = size;
  const kinds = [];
  for (const [key, refs] of Object.entries(json.contributes)) {
    if (!Object.hasOwn(contributionKinds, key) || !Array.isArray(refs) || !refs.length) throw Error('invalid contribution group: ' + key);
    kinds.push(contributionKinds[key]);
    for (const ref of refs) total += readPinned(revision, ref).size;
  }
  if (!kinds.length || !Array.isArray(entry.kinds) || kinds.sort().join() !== [...entry.kinds].sort().join()) throw Error('contribution kinds do not match');
  if (compatibilityCatalog && kinds.includes('library-section')) throw Error('the 0.1.2 catalog cannot include Library sections');
  if (total > maxBytes) throw Error('package exceeds 4 MiB');
}

try {
  for (const path of ['catalogs/v2/catalog.json', 'catalog.json', 'catalogs/languages.json']) {
    const legacyLanguage = path === 'catalogs/languages.json';
    const catalog = JSON.parse(readFileSync(path, 'utf8'));
    if (catalog.format !== (legacyLanguage ? 'mandala-catalog' : 'mandala-plugin-catalog') || catalog.version !== 1 ||
        !Array.isArray(catalog.items) || (legacyLanguage && catalog.kind !== 'language')) throw Error('invalid catalog: ' + path);
    for (const entry of catalog.items) {
      try { checkEntry(entry, legacyLanguage, path === 'catalog.json'); }
      catch (error) { throw Error(path + ' [' + entry.id + ']: ' + error.message); }
    }
    console.log(path + ' OK (' + catalog.items.length + ' entries)');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
