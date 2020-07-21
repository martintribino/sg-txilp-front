export const environment = {
  production: true,
  port: 4200,
  baseLocalUrl: 'http://localhost:4200/',
  baseApiUrl: 'http://localhost:8080/festivales/api',
  endpoints: {
    //publicos - sin /api
    //por ahora todos
    usuarios: 'http://localhost:8080/festivales/api/usuarios/',
    //privados - con /api/
    //por ahora ninguno
  },
};
