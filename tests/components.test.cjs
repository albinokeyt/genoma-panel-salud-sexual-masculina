const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../app/static/app.js'), 'utf8');
const report = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
const context = vm.createContext({
  document: { addEventListener() {}, getElementById: id => id === 'report' ? report : null },
  requestAnimationFrame: () => 0, cancelAnimationFrame() {},
  BirthDate: { age: () => '' }, console,
});
vm.runInContext(source.replace(/bootstrap\(\);\s*$/, ''), context);
vm.runInContext('collectBasicState = () => {}; state = makeEmptyState();', context);
for (let mask = 1; mask < 16; mask++) {
  const components = Object.fromEntries(['its', 'bacteria', 'fungi', 'vph'].map((key, i) => [key, Boolean(mask & (1 << i))]));
  vm.runInContext(`state.components = ${JSON.stringify(components)}; state.results.fungi.candida_albicans = 'high'; state.vph['16'] = '18'; renderReport();`, context);
  const html = report.innerHTML;
  for (const [key, heading] of Object.entries({its:'Panel de infecciones de transmisión sexual', bacteria:'Bacterias uropatógenas', fungi:'Hongos y levaduras', vph:'Carga viral y tipificación de VPH'})) {
    assert.equal(html.includes(heading), components[key], `${mask}: ${key} visibility`);
  }
  const expectedRows = (components.its ? 14 : 0) + (components.bacteria ? 8 : 0) + (components.fungi ? 14 : 0) + (components.vph ? 1 : 0);
  assert.equal((html.match(/<tr><td>/g) || []).length, expectedRows, `${mask}: row count`);
  if (!components.fungi) assert.equal(html.includes('candida_albicans'), false);
  assert.equal(vm.runInContext('detectedFor(FUNGI_MARKERS, "fungi").length', context), components.fungi ? 1 : 0);
  assert.equal(vm.runInContext('vphRows().length', context), components.vph ? 28 : 0);
}
vm.runInContext('state = deepMerge(makeEmptyState(), {patientName:"Legacy"});', context);
assert.equal(vm.runInContext('Object.values(state.components).every(Boolean)', context), true);
vm.runInContext('state.components.fungi = false; state = deepMerge(makeEmptyState(), JSON.parse(JSON.stringify(state)));', context);
assert.equal(vm.runInContext('state.components.fungi', context), false);
console.log('15 combinations, excluded results, legacy defaults and saved selection: OK');
