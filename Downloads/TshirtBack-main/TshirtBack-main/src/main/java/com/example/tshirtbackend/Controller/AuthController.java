package com.example.tshirtbackend.controller;

import com.example.tshirtbackend.entity.Utilisateur;
import com.example.tshirtbackend.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Utilisateur register(@RequestBody Utilisateur utilisateur) {
        return authService.register(utilisateur);
    }

    @PostMapping("/login")
    public Utilisateur login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String motDePasse = credentials.get("motDePasse");
        return authService.login(email, motDePasse);
    }
    
    @PutMapping("/utilisateurs/{id}")
public Utilisateur updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
    return authService.updateUtilisateur(id, utilisateur);
}

}
