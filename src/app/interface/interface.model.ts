//enums
export enum RolTipo {
  Administrador = 'ADMINISTRADOR',
  Operador = 'OPERADOR',
  Participante = 'PARTICIPANTE',
  Visitante = 'VISITANTE',
}
//interface
export interface IDictionary<T> {
  [key: string]: T;
}
export interface IPaginatorEv {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
export interface IUsuario {
  nombreUsuario: string;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  rol: IRol;
  direccion: IDireccion;
  telefono: number;
  token?: string;
  imagen?: string;
}
export interface IDireccion {
  calle: string;
  ciudad: string;
  estado: string;
  cp: number;
  longitud: number;
  latitud: number;
}
export interface IRol {
  nombre: string;
  descripcion: string;
  tipo: RolTipo;
}
