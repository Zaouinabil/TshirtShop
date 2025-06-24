package com.example.tshirtbackend.service;

import com.example.tshirtbackend.entity.Utilisateur;
import com.example.tshirtbackend.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;

    public AuthService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public Utilisateur updateUtilisateur(Long id, Utilisateur newData) {
    Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

    utilisateur.setNom(newData.getNom());
    utilisateur.setPrenom(newData.getPrenom());
    utilisateur.setEmail(newData.getEmail());
    utilisateur.setMotDePasse(newData.getMotDePasse());

    return utilisateurRepository.save(utilisateur);
}

    public Utilisateur register(Utilisateur utilisateur) {
    if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
        throw new RuntimeException("Email déjà utilisé");
    }
    return utilisateurRepository.save(utilisateur);
}


    public Utilisateur login(String email, String motDePasse) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByEmail(email);
        if (utilisateurOpt.isPresent()) {
            Utilisateur utilisateur = utilisateurOpt.get();
            if (utilisateur.getMotDePasse().equals(motDePasse)) {
                return utilisateur;
            }
        }
        throw new RuntimeException("Email ou mot de passe incorrect");
    }
}
