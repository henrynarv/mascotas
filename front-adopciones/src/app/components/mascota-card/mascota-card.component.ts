import { Component, Input } from '@angular/core';
import { Mascota } from 'src/app/models/mascota.interface';

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.css']
})
export class MascotaCardComponent {

  @Input() mascota!: Mascota
}
