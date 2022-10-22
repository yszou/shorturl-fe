import React from 'react';
import ReactDOM from 'react-dom';
import { PageDemo } from './index';

const uuid = 'd50ffca2f2b54045a71e726a108ea132';

export default function DemoPageDemo(): React.ReactElement {
  return <PageDemo />;
}

if (document.getElementById(uuid)) {
  ReactDOM.render(<DemoPageDemo />, document.getElementById(uuid));
}
