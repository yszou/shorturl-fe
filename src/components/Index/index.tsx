import React, { useState } from 'react';
import './index.less';
import { getClassName, noop } from '../Base';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PageDemo } from '../PageDemo';

interface IndexProps {}

export const Index = (props: IndexProps): React.ReactElement => {
  return (
    <div className={getClassName('Index')}>
      <HashRouter>
        <Routes>
          <Route path="*" element={<PageDemo />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

Index.defaultProps = {};
