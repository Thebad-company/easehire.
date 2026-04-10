const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'backend', 'src');

function getImports(file) {
  const content = fs.readFileSync(file, 'utf8');
  const imports = [];
  const regex = /from ['"](.+?)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let importPath = match[1];
    if (importPath.startsWith('.')) {
      let absolutePath = path.resolve(path.dirname(file), importPath);
      if (!absolutePath.endsWith('.js')) absolutePath += '.js';
      imports.push(absolutePath);
    }
  }
  return imports;
}

function findCycle(current, visited = new Set(), path = []) {
  if (path.includes(current)) {
    console.log('CYCLE DETECTED:', [...path, current].join(' -> '));
    return true;
  }
  if (visited.has(current)) return false;

  visited.add(current);
  const imports = getImports(current);
  for (const imp of imports) {
    const tsFile = imp.replace(/\.js$/, '.ts');
    if (fs.existsSync(tsFile)) {
      if (findCycle(tsFile, visited, [...path, current])) return true;
    }
  }
  return false;
}

const entryPoint = path.join(srcDir, 'server.ts');
if (!findCycle(entryPoint)) {
  console.log('No cycles found starting from server.ts');
}
