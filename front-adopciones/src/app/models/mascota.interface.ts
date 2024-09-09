import { TipoMascotaModel } from "./tipo-mascota.model";

export interface Mascota {

  id: number;
  nombre: string;
  edad: number;
  tipoMascota: TipoMascotaModel;
  adoptado: boolean;
  imageUrl?: string;

}
