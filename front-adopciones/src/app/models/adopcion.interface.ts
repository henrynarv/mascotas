import { EstadoAdopcion } from "./estado-adopcion.enum";
import { Mascota } from "./mascota.interface";
import { Usuario } from "./usuario.interface";

export interface Adopcion {
  id: number;
  usuario: Usuario;
  mascotas: Mascota[];
  fechaAdopcion: string; // en formato ISO 8601
  estado: EstadoAdopcion;
}
