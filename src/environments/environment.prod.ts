export const environment = {
  production: true,
  port: 4200,
  baseLocalUrl: "http://java.linti.unlp.edu.ar/",
  baseApiUrl: "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/",
  baseApiPrivateUrl: "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/api/",
  endpoints: {
    //publicos - sin /api
    login: "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/login/",
    //privados - con /api/
    archivos:
      "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/api/archivos/",
    artistas:
      "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/api/artistas/",
    actividades:
      "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/api/actividades/",
    espacios:
      "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/api/espacios/",
    usuarios:
      "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/api/usuarios/",
    checkToken:
      "http://java.linti.unlp.edu.ar/jyaa2020_grupo12/rest/api/check-token/",
  },
};
