package com.adopciones.mascotas.controllers;

import com.adopciones.mascotas.entities.Mascota;
import com.adopciones.mascotas.entities.TipoMascota;
import com.adopciones.mascotas.services.ITipoMascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tipos-mascota")
@CrossOrigin(origins = "http://localhost:4200")
public class TipoMascotaController {

    @Autowired
    private ITipoMascotaService tipoMascotaService;

    @GetMapping
    public ResponseEntity<?> listarTiposMascota(){
        try {
            List<TipoMascota> tipos = tipoMascotaService.listarMascotas();
            return ResponseEntity.ok(tipos);
        }catch (Exception e){
            String mensaje = "Error al listar tipos de mascosota ";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje.concat(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerTipoMascotaPorId(@PathVariable Long id){
        try {
            Optional<TipoMascota> buscarTipoMascota = tipoMascotaService.buscarPorId(id);

            if(buscarTipoMascota.isPresent()) {
                TipoMascota tipoMascota = buscarTipoMascota.get();
                String mensaje = "Tipo de mascota encontrado con ID: " + id;
                return ResponseEntity.ok().body(tipoMascota);
            }
            else{
                String mensaje = "No se encuentra el Tipo de mascota con ID: " + id;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
        }catch (Exception e){
            String mensaje = "Error al obtener tipo de mascota  con ID: "+id;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);

        }

    }


    @PostMapping
    public ResponseEntity<?> guardarTipoMascota(@RequestBody TipoMascota tipoMascota){
        try {
            TipoMascota nuevoTipoMascota = tipoMascotaService.guardarMascota(tipoMascota);
            return ResponseEntity.ok(nuevoTipoMascota);
        }catch (Exception e){
            String mensaje = "Error al guardad tipo de mascota ";
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje+" "+e.getMessage());
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<?> actualizaTipoDeMascota(@PathVariable Long id, @RequestBody TipoMascota tipoMascota){
        try {
            Optional<TipoMascota> tipoMascotaOpctional = tipoMascotaService.buscarPorId(id);
            if(tipoMascotaOpctional.isPresent()){
                TipoMascota tipoMascotaActual = tipoMascotaOpctional.get();
                tipoMascotaActual.setTipo(tipoMascota.getTipo());
                tipoMascotaActual.setDescripcion(tipoMascota.getDescripcion());

                TipoMascota tipoMascotaActulizada = tipoMascotaService.guardarMascota(tipoMascotaActual);
                return ResponseEntity.ok().body(tipoMascotaActulizada);

            }else{
                String mensaje = "El tipo de mascota con ID " + id + "no esiste";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
        }catch (Exception e){
            String mensaje = "Error al actualizar tipo de mascota con ID " + id;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje + " " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> eliminarTipoMascota(@PathVariable Long id){
        try {
            Optional<TipoMascota> tipoMascota = tipoMascotaService.buscarPorId(id);
            if(tipoMascota.isPresent()){
                tipoMascotaService.eliminarMascota(id);
                return ResponseEntity.ok().build();
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El tipo de mascota no encotrado  con ID :" + id);

            }


        }catch (Exception e){
            String mensaje  = "Error al emininar tipo de mascota con ID: ";
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje+" "+e.getMessage());
        }
    }
}
