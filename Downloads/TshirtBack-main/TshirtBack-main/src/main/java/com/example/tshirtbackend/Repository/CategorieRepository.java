package com.example.tshirtbackend.repository;

import com.example.tshirtbackend.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}
