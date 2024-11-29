package main

import (
	"back/config"
	"back/models"
	"back/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	config.ConnectDatabase()

	// Realizar migrações
	if err := config.DB.AutoMigrate(&models.User{}); err != nil {
		log.Fatal("Erro ao migrar modelos:", err)
	}
	if err := config.DB.AutoMigrate(&models.Item{}); err != nil {
		log.Fatal("Erro ao migrar modelos:", err)
	}

	app := fiber.New()

	// Configurar CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", // URL do Vite
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	routes.UserRoutes(app)
	routes.ListaRoutes(app)

	app.Listen(":8080")
}
