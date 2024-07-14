export const ROUTES = {
  LOGIN: '/login',
  ARTICLES: {
    INDEX: '/articles',
    CREATE: '/articles/edit',
    EDIT: (slug: string) => `/articles/edit/${slug}`,
  },
  CATEGORIES: '/categories',
  USERS: '/users',
};
