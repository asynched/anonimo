export const resolveStatic = (path: string) =>
  path.startsWith('/')
    ? import.meta.env.VITE_ENV_API_URL + '/uploads' + path
    : import.meta.env.VITE_ENV_API_URL + '/uploads/' + path
