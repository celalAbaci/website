package com.erka.backend.config;

import com.erka.backend.model.Category;
import com.erka.backend.model.Product;
import com.erka.backend.model.User;
import com.erka.backend.repository.CategoryRepository;
import com.erka.backend.repository.ProductRepository;
import com.erka.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initData(CategoryRepository categoryRepository,
                                      ProductRepository productRepository,
                                      UserRepository userRepository,
                                      PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Categories
            if (categoryRepository.count() == 0) {
                Category cat1 = Category.builder().name("Kaba İnşaat").description("Temel inşaat malzemeleri").imageUrl("https://example.com/kaba.jpg").build();
                Category cat2 = Category.builder().name("Boya").description("İç ve dış cephe boyaları").imageUrl("https://example.com/boya.jpg").build();
                Category cat3 = Category.builder().name("Yalıtım").description("Isı ve ses yalıtım malzemeleri").imageUrl("https://example.com/yalitim.jpg").build();

                categoryRepository.saveAll(Arrays.asList(cat1, cat2, cat3));

                // Seed Products
                Product p1 = Product.builder().name("Portland Çimento").description("50kg Çimento").price(new BigDecimal("150.00")).stock(100).imageUrl("cement.jpg").category(cat1).build();
                Product p2 = Product.builder().name("Demir").description("İnşaat Demiri").price(new BigDecimal("5000.00")).stock(50).imageUrl("iron.jpg").category(cat1).build();

                Product p3 = Product.builder().name("Beyaz Tavan Boyası").description("20kg Boya").price(new BigDecimal("800.00")).stock(30).imageUrl("paint.jpg").category(cat2).build();

                Product p4 = Product.builder().name("Taş Yünü").description("5cm Taş Yünü").price(new BigDecimal("120.00")).stock(200).imageUrl("wool.jpg").category(cat3).build();

                productRepository.saveAll(Arrays.asList(p1, p2, p3, p4));
            }

            // Seed Users
            if (!userRepository.existsByEmail("admin@erka.com")) {
                User admin = User.builder()
                        .email("admin@erka.com")
                        .password(passwordEncoder.encode("admin123"))
                        .fullName("Admin User")
                        .role(User.Role.ADMIN)
                        .build();
                userRepository.save(admin);
            }

            if (!userRepository.existsByEmail("user@erka.com")) {
                User user = User.builder()
                        .email("user@erka.com")
                        .password(passwordEncoder.encode("user123"))
                        .fullName("Normal User")
                        .role(User.Role.USER)
                        .build();
                userRepository.save(user);
            }
        };
    }
}
