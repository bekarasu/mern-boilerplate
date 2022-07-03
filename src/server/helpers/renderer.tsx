import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../client/app/App';
import { Store } from 'redux';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

export default (url: string, store: Store | null): string => {
  console.log(1);
  const app = renderToString(
    store ? (
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    ) : (
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    ),
  );

  const helmet = Helmet.renderStatic();

  const html = `
    <html>
        <head>
          <link rel="stylesheet" href="/assets/css/app.css">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
            <div id="app">${app}</div>
            <script>
              ${store ? 'window.INITIAL_STATE = ' + serialize(store.getState()) : null}
            </script>
            <script src="/app.js"></script>
        </body>
    </html>
  `;
  return html;
};
