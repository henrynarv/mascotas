package com.adopciones.mascotas.services;

import com.adopciones.mascotas.entities.Adopcion;

import java.util.List;
import java.util.Optional;

public interface IAdopcionService {
    List<Adopcion> listarAdopciones();
    Optional<Adopcion> buscarPorId(Long id);
    Adopcion guardarAdopcion(Adopcion adopcion);

    void eliminarAdopcion(Long id);
}
