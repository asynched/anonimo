export const saveToken = (token: string | null) =>
  localStorage.setItem('@auth:token', JSON.stringify(token))

export const getToken = () =>
  JSON.parse(localStorage.getItem('@auth:token') || 'null')
