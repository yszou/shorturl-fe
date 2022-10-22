import React, { useState } from 'react';
import './index.less';
import { getClassName, noop } from '../Base';
import { Input, Button, message } from '../AntD';
import { ShortUrlCreate } from '../../api/resource';

interface PageDemoProps {}

export const PageDemo = (props: PageDemoProps): React.ReactElement => {
  const [val, setVal] = useState('');
  const [code, setCode] = useState('');
  const [lastVal, setLastVal] = useState('');

  const disableGen = val === lastVal;

  const gen = () => {
    if (!val) {
      message.warn('please input a url');
      return;
    }

    ShortUrlCreate({ origin: val })
      .call()
      .then((response) => {
        if (response.data) {
          setCode(response.data.code);
          setLastVal(val);
        }
      });
  };

  const getUrl = (code: string) => {
    const scheme = location.protocol;
    const host = location.host;
    return `${scheme}//${host}/u/${code}`;
  };

  const copy = () => {
    const url = getUrl(code);
    navigator.clipboard.writeText(url);
    message.success('Copied');
  };

  return (
    <div className={getClassName('PageDemo')}>
      <div className="wrapper">
        <div className="inner">
          <div className="title">Short URL</div>
          <div className="input">
            <Input size="large" onChange={(e) => setVal(e.target.value)} />
          </div>
          <div className="btn">
            <Button type="primary" onClick={gen} disabled={disableGen}>
              Generate Shorturl
            </Button>
          </div>
          <div className="output">{code ? getUrl(code) : null}</div>
          <div className="btn">
            <Button type="default" onClick={copy} disabled={!code}>
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
