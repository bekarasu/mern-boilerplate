import 'react-router-config';
declare module 'react-router-config' {
  export interface RouteConfig {
    loadData?: (store: any, match: any) => Promise<any>;
  }
}
