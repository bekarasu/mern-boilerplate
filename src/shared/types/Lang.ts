export interface Language {
  forms: {
    login: string;
    logout: string;
    username: string;
    password: string;
  };
  sidebar: {
    greetings: string;
  };
  general: {
    notFound: string;
  };
  resource: {
    management: string;
    add: string;
    list: string;
    edit: string;
    update: string;
    show: string;
    delete: string;
    filter: string;
    dataNotFound: string;
    recordDeleted: string;
    countRecordsFound: string;
    actions: string;
    fetching: string;
  };
  db: {
    name: string;
    createdAt: string;
    updatedAt: string;
    images: string;
    status: string;
    count: string;
    title: string;
  };
  models?: {
    app: string;
    playground: string;
  };
  panel: {
    dashboard: string;
  };
}

export type LanguageGroup = {
  [key: string]: Language;
};

export type TranslateParams = {
  [key: string]: string;
};
