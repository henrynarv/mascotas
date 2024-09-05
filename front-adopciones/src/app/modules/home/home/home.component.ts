import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { Mascota } from 'src/app/models/mascota.interface';
import { TiposMascotaService } from 'src/app/services/tipos-mascota.service';
import { TipoMascotaModel } from '../../../models/tipo-mascota.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mascotas: Mascota[] = [];
  tipoMascotas: string[] = [];

  constructor(private homeService: HomeService, private tiposMascotaService: TiposMascotaService) { }

  ngOnInit(): void {
    this.listarMascotas();
    this.listarTipoMascota();
  }

  listarMascotas() {
    this.homeService.getMascotas().subscribe({
      next: (response => {
        this.mascotas = response;
        console.log(this.mascotas);
      })
    })
  }

  listarTipoMascota() {
    this.tiposMascotaService.getTiposDeMascota().pipe(
      map(tipos => tipos.map(tipo => tipo.tipo))
    ).subscribe(result => {
      this.tipoMascotas = result
      console.log('this.tipoMascotas', this.tipoMascotas);
    })
  }
}
