# La Bottega — Online Grocery Store

La Bottega is a full-stack e-commerce project designed to simulate an online grocery store. The application allows users to browse products, explore categories, view special offers, manage a shopping cart, and proceed through the checkout flow.

The project is being developed to practice full-stack web development, REST API integration, and relational database management.

## Features

- Product catalog with category navigation
- Product search and filtering
- Special offers section
- Shopping cart management
- Checkout flow
- User account page
- Contact page
- Responsive user interface
- REST API integration between frontend and backend
- Product and order management

## Technologies

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven

**Database**
- MySQL

## Project Structure

```text
La-Bottega/
├── la-bottega-frontend/
│   ├── INDEX.HTML
│   ├── CATALOGO.HTML
│   ├── CARRELLO.HTML
│   ├── CHECKOUT.html
│   ├── ACCOUNT.html
│   ├── CONTATTI.HTML
│   ├── OFFERTE.html
│   ├── STYLE.CSS
│   ├── COMPONENTI.css
│   ├── RESPONSIVE.css
│   └── JavaScript files and images
│
└── la-bottega-backend/
    ├── src/main/java/
    │   └── La/Bottega/
    │       ├── ProductController.java
    │       ├── ProductService.java
    │       ├── OrderController.java
    │       ├── OrderService.java
    │       ├── entity/
    │       └── repository/
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

## Getting Started

### Prerequisites

- Java JDK compatible with the version configured in `pom.xml`
- MySQL
- A web browser
- Git

### Database Configuration

1. Create a MySQL database named `la_bottega`.
2. Configure the database credentials using environment variables:
   - `DB_USERNAME`
   - `DB_PASSWORD`
3. Check the database connection settings in `application.properties`.

### Run the Backend

From the project root, open a terminal and run:

```bash
cd la-bottega-backend
./mvnw spring-boot:run
```

On Windows, use:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on `http://localhost:8080` with the default Spring Boot configuration.

### Run the Frontend

Open `la-bottega-frontend/INDEX.HTML` in a browser, or use the VS Code Live Server extension.

Make sure the backend and MySQL database are running for API-dependent features.

## Future Improvements

- Improve validation and error handling
- Add automated tests for core features
- Enhance authentication and account management
- Deploy the application online
- Improve documentation and setup instructions

## Author

Developed as a personal portfolio project to practice Java, Spring Boot, MySQL, and frontend web development.
