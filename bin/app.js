const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const CURRENT = path.resolve(__dirname);
const join = path.join;

class App {
  constructor(name) {
    this.srcDir = path.resolve(join(CURRENT, '..', 'src', 'components'));
    this.uuid = uuid.v4().replace(/-/g, '');
    this.name = name;
  }

  create() {
    const name = this.name;
    const dir = join(this.srcDir, name);
    if (fs.existsSync(dir)) {
      console.error(`${name} has existed in the src directory.`);
      return;
    }
    fs.mkdirSync(dir);
    fs.writeFileSync(join(dir, 'demo.html'), this.getHtml());
    fs.writeFileSync(join(dir, 'demo.tsx'), this.getDemoTsx());
    fs.writeFileSync(join(dir, 'index.less'), this.getLess());
    fs.writeFileSync(join(dir, 'index.tsx'), this.getTsx());
    fs.writeFileSync(join(dir, 'index.md'), this.getDocMarkdown());
  }

  getTsx() {
    const name = this.name;

    const text = `import React from 'react';
import './index.less';
import { getClassName, noop } from '../Base';

interface ${name}Props {}

export const ${name} = (props: ${name}Props): React.ReactElement => {
  return <div className={getClassName('${name}')}>
    ${name}
  </div>;
};
`;
    return text;
  }

  getLess() {
    const name = this.name;
    const text = `@import '../Base/index';

.@{PREFIX}${name}{
}
`;
    return text;
  }

  getHtml() {
    const name = this.name;
    const uuid = this.uuid;

    const text = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${name}</title>
  </head>
  <body>
    <div id="${uuid}"></div>
    <script src="/build/app.mix.js"></script>
  </body>
</html>
`;
    return text;
  }

  getDemoTsx() {
    const name = this.name;
    const uuid = this.uuid;

    const text = `import React from 'react';
import ReactDOM from 'react-dom';
import { ${name} } from './index';

const uuid = '${uuid}';

export default function Demo${name}(): React.ReactElement {
  return <${name} />;
}

if (document.getElementById(uuid)) {
  ReactDOM.render(<Demo${name} />, document.getElementById(uuid));
}
`;
    return text;
  }

  getDocMarkdown() {
    const name = this.name;
    const text = `
# ${name}

<code src="./demo.tsx"></code>
<API></API>
`;
    return text;
  }
}

function main() {
  const argv = process.argv;
  if (argv.length !== 3) {
    console.log(`Usage: node app.js AppName`);
    return;
  }
  const app = new App(argv[2]);
  app.create();
}

if (module === require.main) {
  main();
}
