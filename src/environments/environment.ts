export const environment = {
  production: false,
  port: 4200,
  baseLocalUrl: 'http://localhost:8080/',
  baseApiUrl: 'http://localhost:8080/jyaa2020_grupo12/rest/',
  baseApiPrivateUrl: 'http://localhost:8080/jyaa2020_grupo12/rest/api/',
  endpoints: {
    //publicos - sin /api
    login: 'http://localhost:8080/jyaa2020_grupo12/rest/login/',
    //privados - con /api/
    archivos: 'http://localhost:8080/jyaa2020_grupo12/rest/api/archivos/',
    artistas: 'http://localhost:8080/jyaa2020_grupo12/rest/api/artistas/',
    actividades: 'http://localhost:8080/jyaa2020_grupo12/rest/api/actividades/',
    ediciones: 'http://localhost:8080/jyaa2020_grupo12/rest/api/ediciones/',
    espacios: 'http://localhost:8080/jyaa2020_grupo12/rest/api/espacios/',
    etiquetas: 'http://localhost:8080/jyaa2020_grupo12/rest/api/etiquetas/',
    obras: 'http://localhost:8080/jyaa2020_grupo12/rest/api/obras/',
    perfil: 'http://localhost:8080/jyaa2020_grupo12/rest/api/perfil/',
    usuarios: 'http://localhost:8080/jyaa2020_grupo12/rest/api/usuarios/',
    checkToken: 'http://localhost:8080/jyaa2020_grupo12/rest/api/check-token/',
  },
};
