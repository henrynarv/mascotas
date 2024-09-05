package com.adopciones.mascotas.repositories;

import com.adopciones.mascotas.entities.TipoMascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITipoMascotaRepository extends JpaRepository<TipoMascota, Long> {
}
