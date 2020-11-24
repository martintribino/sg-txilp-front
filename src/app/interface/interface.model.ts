//const
export const MSGTIME = 2000;
//enums
export enum RolTipo {
  Administrador = 'ADMINISTRADOR',
  Operador = 'OPERADOR',
  Participante = 'PARTICIPANTE',
  Visitante = 'VISITANTE',
}
export enum ActionTipo {
  crear = 'crear',
  editar = 'editar',
  borrar = 'borrar',
}
export enum EspacioEstadoTipo {
  Abierto = 'ABIERTO',
  Cerrado = 'CERRADO',
}
export enum AvatarTipo {
  avatar1 = 'avatar1',
  avatar2 = 'avatar2',
  avatar3 = 'avatar3',
  avatar4 = 'avatar4',
  avatar5 = 'avatar5',
  avatar6 = 'avatar6',
}
//interface
export interface IAvatarBody {
  nombreUsuario: string;
  imagen: string;
}
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
  id: number;
  nombreUsuario: string;
  rol: RolTipo;
  token: string;
  avatar: string;
}
export interface IUsuario {
  id: number;
  nombreUsuario: string;
  clave: string;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  rol: IRol;
  direccion: IDireccion;
  telefono: number;
  avatar: string;
}
export interface IArtistaObra {
  id: number;
  artista: IArtista;
  obra: IObra;
}
export interface IArtista {
  id: number;
  nombre: string;
  apellido: string;
  apodo: string;
  fotos: Array<string>;
  etiquetas: Array<IEtiqueta>;
  obras?: Array<IObra>;
  usuariosFav: Array<IUsuario>;
}
export interface IActividad {
  id: number;
  nombre: string;
  descripcion: string;
  desde: Date;
  hasta: Date;
  entradasVendidas: number;
  obra?: IObra;
  espacio?: IEspacio;
  edicion?: IEdicion;
}
export interface IImagen {
  b64str: string;
  extension: string;
  width: number;
  height: number;
}
export interface IEtiqueta {
  id: number;
  nombre: string;
  artistas?: Array<IArtista>;
  espacios?: Array<IEspacio>;
  obras?: Array<IObra>;
  usuariosFav: Array<IUsuario>;
}
export interface IObra {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number;
  fotos: Array<string>;
  artistas: Array<IArtista>;
  etiquetas: Array<IEtiqueta>;
  usuariosFav: Array<IUsuario>;
}
export interface IEdicion {
  id: number;
  nombre: string;
  descripcion: string;
  desde: Date;
  hasta: Date;
  fotos: Array<string>;
  actividades?: Array<IActividad>;
}
export interface IEspacio {
  id: number;
  nombre: string;
  descripcion: string;
  capacidad: number;
  condicion: EspacioEstadoTipo;
  direccion: IDireccion;
  etiquetas: Array<IEtiqueta>;
}
export interface IDireccion {
  id: number;
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
export interface IDialogConfirmBody {
  titulo: string;
  subtitulo: string;
}
export interface IDialogBody<T> {
  action?: ActionTipo;
  path?: string;
  ediciones?: Array<IEdicion>;
  espacios?: Array<IEspacio>;
  obras?: Array<IObra>;
  component?: string;
  data: T;
}
export interface IFiltroBody {
  filtro: string;
  campos: Array<string>;
}
