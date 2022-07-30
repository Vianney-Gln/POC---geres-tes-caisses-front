// import react hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
// import style css
import './index.css';
// import components
import App from './components/App/App';
// import context
import { ContextArticlesProvider } from './context/ContextArticles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextArticlesProvider>
      <App />
    </ContextArticlesProvider>
  </React.StrictMode>
);
