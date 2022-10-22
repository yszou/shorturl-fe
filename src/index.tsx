import React from 'react';
import ReactDOM from 'react-dom/client';
import { Index } from './components/Index';

const ROOT_DOM_ID = 'app-shorturl';

if (document.getElementById(ROOT_DOM_ID)) {
  const root = ReactDOM.createRoot(document.getElementById(ROOT_DOM_ID) as Element);
  root.render(<Index />);
}
