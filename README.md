# Premium Java Developer Portfolio

A premium, responsive developer portfolio built with **Spring Boot + HTML + CSS + JavaScript**.

## Highlights
- Premium dark neon / glassmorphism UI inspired by the supplied design
- Responsive mobile navigation
- Animated hero section with developer tech orbit
- About section with Java/Spring Boot code terminal
- Interactive skills tabs
- Project cards with GitHub/demo links
- Experience timeline
- Education & certifications section
- Animated achievement counters
- Contact form connected to a Spring Boot REST endpoint
- Dark/light theme toggle with localStorage
- Scroll reveal animations and active navigation state

## Run

Requirements: Java 17+ and Maven.

```bash
mvn spring-boot:run
```

Open `http://localhost:8080`.

## Customize before publishing

Edit `src/main/resources/templates/index.html` and replace:
- `your-email@example.com`
- GitHub URL
- LinkedIn URL
- Phone number
- Education/college details
- Project demo and GitHub links
- Certification details

The `/api/contact` endpoint is currently a demo response. For production, connect it to an email service or MySQL database.
