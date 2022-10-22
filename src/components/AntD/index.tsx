import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { getClassName, noop } from '../Base';

import ConfigProvider from 'antd/lib/config-provider';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import Select from 'antd/lib/select';
import 'antd/lib/select/style';
import Button, { ButtonType } from 'antd/lib/button';
import 'antd/lib/button/style';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import message from 'antd/lib/message';
import 'antd/lib/message/style';

export { ConfigProvider, enUS, zhCN, Input, Select, Button, Modal, message };

export type { ButtonType };

interface AntDProps {}

export const AntD = (props: AntDProps): React.ReactElement => {
  return <div className={getClassName('AntD')}>Hello AntD</div>;
};

AntD.defaultProps = {};
