//const
export const MSGTIME = 2000;
//enums
export enum RolTipo {
  Administrador = "ADMINISTRADOR",
  Operador = "OPERADOR",
  Participante = "PARTICIPANTE",
  Visitante = "VISITANTE",
}
export enum ActionTipo {
  crear = "crear",
  editar = "editar",
  borrar = "borrar",
}
export enum EspacioEstadoTipo {
  Abierto = "ABIERTO",
  Cerrado = "CERRADO",
}
//interface
export interface IDictionary<T> {
  [key: string]: T;
}
export interface INumberDictionary<T> {
  [key: number]: T;
}
export interface IPaginatorEv {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
export interface IJWT {
  nombreUsuario: string;
  rol: RolTipo;
  token?: string;
  imagen?: string;
}
export interface IUsuario {
  id: number;
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
export interface IArtista {
  id: number;
  nombre: string;
  apellido: string;
  apodo: string;
  fotos?: Array<string>;
}
export interface IActividad {
  id: number;
  nombre: string;
  descripcion: string;
  desde: Date;
  hasta: Date;
  vendidas: number;
  obra: IObra;
  espacio: IEspacio;
  edicion: IEdicion;
}
export interface IImagen {
  b64str: string;
  extension: string;
  width: number;
  height: number;
}
export interface IEtiqueta {
  nombre: string;
  descripcion: string;
  artistas?: Array<IArtista>;
  espacios?: Array<IEspacio>;
  obras?: Array<IObra>;
}
export interface IObra {
  nombre: string;
  descripcion: string;
  duracion: number;
  fotos?: Array<string>;
}
export interface IEdicion {
  id: number;
  nombre: string;
  descripcion: string;
  desde: Date;
  hasta: Date;
  fotos?: Array<string>;
  actividades?: Array<IActividad>;
}
export interface IEspacio {
  id: number;
  nombre: string;
  descripcion: string;
  capacidad: number;
  condicion: EspacioEstadoTipo;
  direccion: IDireccion;
}
export interface IDireccion {
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: number;
  longitud: number;
  latitud: number;
}
export interface ICoordinadas {
  longitud: number;
  latitud: number;
}
export interface IRol {
  nombre: string;
  tipo: RolTipo;
}
export interface ILoginBody {
  nombreUsuario: string;
  clave: string;
  confirmar_clave?: string;
  nombre_usuario_viejo?: string;
}
export interface IDialogBody<T> {
  action: ActionTipo;
  data: T;
}
