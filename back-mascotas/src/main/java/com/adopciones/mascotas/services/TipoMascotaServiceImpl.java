package com.adopciones.mascotas.services;

import com.adopciones.mascotas.entities.Mascota;
import com.adopciones.mascotas.entities.TipoMascota;
import com.adopciones.mascotas.repositories.ITipoMascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoMascotaServiceImpl implements ITipoMascotaService{
    @Autowired
    private ITipoMascotaRepository tipoMascotaRepository;
    @Override
    public List<TipoMascota> listarMascotas() {
        return tipoMascotaRepository.findAll();
    }

    @Override
    public Optional<TipoMascota> buscarPorId(Long id) {
        return tipoMascotaRepository.findById(id);
    }

    @Override
    public TipoMascota guardarMascota(TipoMascota tipoMascota) {
        return tipoMascotaRepository.save(tipoMascota);
    }

    @Override
    public void eliminarMascota(Long id) {
        tipoMascotaRepository.deleteById(id);
    }
}
