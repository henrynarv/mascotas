import { Mascota } from "./mascota.interface";
import { TipoMascotaModel } from "./tipo-mascota.model";

export class MascotaModel implements Mascota {
  id: number;
  nombre: string;
  edad: number;
  tipoMascota: TipoMascotaModel;
  adoptado: boolean;
  imageUrl?: string | undefined;

  constructor(id: number, nombre: string, edad: number, tipoMascota: TipoMascotaModel,
    adoptado: boolean = false, imageUrl?: string) {

    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.tipoMascota = tipoMascota
    this.adoptado = adoptado;
    this.imageUrl = imageUrl;
  }


  adoptar() {
    this.adoptado = true;
  }

}
