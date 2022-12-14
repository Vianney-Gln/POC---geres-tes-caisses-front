// import react hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import style css
import './index.css';
// import components
import App from './components/App/App';
// import context
import { ContextArticlesProvider } from './context/ContextArticles';
import { ContextStockProvider } from './context/ContextStock';
import { ContextBundleProvider } from './context/ContextBundles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextBundleProvider>
      <ContextStockProvider>
        <ContextArticlesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContextArticlesProvider>
      </ContextStockProvider>
    </ContextBundleProvider>
  </React.StrictMode>
);
