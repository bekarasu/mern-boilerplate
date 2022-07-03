import { RouteConfig } from 'react-router-config';
import AboutUsPage from '../../client/app/pages/AboutUsPage';
import HomePage from '../../client/app/pages/HomePage';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/about-us',
    component: AboutUsPage,
    exact: true,
  },
];

export default routes;
