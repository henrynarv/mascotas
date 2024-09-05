package com.adopciones.mascotas.services;

import com.adopciones.mascotas.entities.Mascota;
import com.adopciones.mascotas.entities.TipoMascota;

import java.util.List;
import java.util.Optional;

public interface ITipoMascotaService {
    List<TipoMascota> listarMascotas();
    Optional<TipoMascota> buscarPorId(Long id);

    TipoMascota guardarMascota(TipoMascota tipoMascota);

    void eliminarMascota(Long id);

 }
