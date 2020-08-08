export const environment = {
  production: true,
  port: 4200,
  baseLocalUrl: 'http://java.linti.unlp.edu.ar/',
  baseApiUrl: 'http://java.linti.unlp.edu.ar/jyaa20_g12_en5et2/rest',
  endpoints: {
    //publicos - sin /api
    login: 'http://java.linti.unlp.edu.ar/jyaa20_g12_en5et2/rest/login/',
    //privados - con /api/
    artistas:
      'http://java.linti.unlp.edu.ar/jyaa20_g12_en5et2/rest/api/artistas/',
    usuarios:
      'http://java.linti.unlp.edu.ar/jyaa20_g12_en5et2/rest/api/usuarios/',
    checkToken:
      'http://java.linti.unlp.edu.ar/jyaa20_g12_en5et2/rest/api/check-token/',
  },
};
