import { IJWT, RolTipo } from 'src/app/interface/interface.model';

export class Usuario implements IJWT {
  //constants
  public static readonly allowedUserRoles = [
    RolTipo.Administrador,
    RolTipo.Operador,
    RolTipo.Participante,
    RolTipo.Visitante,
  ];
  //props
  nombreUsuario: string;
  rol: RolTipo;
  token?: string;
  imagen?: string;

  constructor() {
    this.nombreUsuario = '';
    this.rol = RolTipo.Visitante;
    this.token = '';
    this.imagen = '';
  }
}
