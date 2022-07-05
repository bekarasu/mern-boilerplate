import { RouteConfig } from 'react-router-config';
import HomePage from '../../client/app/pages/HomePage';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
];

export default routes;
