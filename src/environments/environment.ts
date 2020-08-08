export const environment = {
  production: false,
  port: 4200,
  baseLocalUrl: 'http://localhost:4200/',
  baseApiUrl: 'http://localhost:8080/festivales/rest',
  endpoints: {
    //publicos - sin /api
    login: 'http://localhost:8080/festivales/rest/login/',
    //privados - con /api/
    artistas: 'http://localhost:8080/festivales/rest/api/artistas/',
    usuarios: 'http://localhost:8080/festivales/rest/api/usuarios/',
    checkToken: 'http://localhost:8080/festivales/rest/api/check-token/',
  },
};
