package com.example.tshirtbackend.Controller;

import com.example.tshirtbackend.entity.Produit;
import com.example.tshirtbackend.Repository.ProduitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "*")
public class ProduitController {

    private final ProduitRepository produitRepository;

    public ProduitController(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    
    @GetMapping
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    
    @GetMapping("/categorie/{categorieId}")
    public List<Produit> getProduitsByCategorie(@PathVariable Long categorieId) {
        return produitRepository.findByCategorieId(categorieId);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        return produitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
