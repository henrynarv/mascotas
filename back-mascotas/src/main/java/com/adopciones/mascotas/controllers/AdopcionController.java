package com.adopciones.mascotas.controllers;

import com.adopciones.mascotas.entities.Adopcion;
import com.adopciones.mascotas.services.IAdopcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/adopciones")
public class AdopcionController {
    @Autowired
    private IAdopcionService adopcionService;

    @GetMapping
    public ResponseEntity<?> listarAdopciones(){
        try {
            List<Adopcion> adopciones = adopcionService.listarAdopciones();
            return ResponseEntity.ok(adopciones);
        }catch (Exception e){
            String mensaje = "Error al listar las adopciones ";
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje+" "+e.getMessage());
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<?> obtenerAdopcionPorId(@PathVariable Long id){
        try {

            Optional<Adopcion> buscarAdopcion = adopcionService.buscarPorId(id);

            if(buscarAdopcion.isPresent()){
                Adopcion adopcion = buscarAdopcion.get();
                return ResponseEntity.ok().body(adopcion);
            }
            else{
                String mensaje = "No se encontro la adopcion con ID: "+id;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
        }catch (Exception e){
            String mensaje = "Error al buscar adopcion con ID: "+id;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje+" "+e.getMessage());
        }
    }

    /**
     @PostMapping
     public ResponseEntity<?> guardarAdopcion(@RequestBody Adopcion adopcion){
     try {
     Adopcion nuevaAdopcion = adopcionService.guardarAdopcion(adopcion);
     return ResponseEntity.ok(nuevaAdopcion);
     }catch (Exception e){
     String mensaje = "Error al guardar adopcioon ";
     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
     .body(mensaje+" "+e.getMessage());
     }
     }
     */

    @PostMapping
    public ResponseEntity<?> guardarAdopcion(@RequestBody Adopcion adopcion){
        try {
            if(adopcion.getUsuario() == null || adopcion.getMascotas() == null
               || adopcion.getMascotas().isEmpty()){
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Faltan datos requeridos para la adopcion");
            }

            Adopcion nuevaAdopcion = adopcionService.guardarAdopcion(adopcion);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaAdopcion);
        }catch (Exception e){
            String mensaje = "Error al guardar adopcioon ";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje+" "+e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> eliminarAdocion(@PathVariable Long id){
        try {
            if(adopcionService.buscarPorId(id).isPresent()){
                adopcionService.eliminarAdopcion(id);
                String mensaje = "La adopcion con ID "+ id +" fue eliminada";
                return  ResponseEntity.ok(mensaje);
            }else{
                String mensaje = "No se encuentra la adopcion para eliminar con ID "+ id;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
        }catch (Exception e){
            String mensaje = "Error al eliminar adopcion con ID: "+id;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }



    }
}
