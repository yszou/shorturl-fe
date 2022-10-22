import React from 'react';
import ReactDOM from 'react-dom';
import { Index } from './index';

const uuid = '8c0075ddfc2f4eecbf4db40cc3f5af61';

interface DemoIndexProps {}

export const DemoIndex = (props: DemoIndexProps): React.ReactElement => {
  return <Index />;
};

DemoIndex.defaultProps = {};

if (document.getElementById(uuid)) {
  ReactDOM.render(<DemoIndex />, document.getElementById(uuid));
}
