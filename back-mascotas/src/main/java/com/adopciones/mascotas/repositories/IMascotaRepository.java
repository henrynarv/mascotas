package com.adopciones.mascotas.repositories;

import com.adopciones.mascotas.entities.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMascotaRepository extends JpaRepository<Mascota, Long> {
}
