import React from 'react';
import ReactDOM from 'react-dom';
import { AntD } from './index';

const uuid = '4b623b46f11b45e9bb091171eaa5af83';

interface DemoLogoProps {}

export const DemoLogo = (props: DemoLogoProps): React.ReactElement => {
  return <AntD />;
};

DemoLogo.defaultProps = {};

if (document.getElementById(uuid)) {
  ReactDOM.render(<DemoLogo />, document.getElementById(uuid));
}
