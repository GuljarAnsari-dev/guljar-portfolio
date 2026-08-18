package com.portfolio.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Portfolio API is running");
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactResponse> contact(@Valid @RequestBody ContactRequest request) {
        // Demo endpoint. Connect this method to email/DB persistence for production.
        return ResponseEntity.ok(new ContactResponse(
                true,
                "Thanks " + request.name() + "! Your message has been received."
        ));
    }

    public record ContactRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            String subject,
            @NotBlank String message
    ) {}

    public record ContactResponse(boolean success, String message) {}
}
