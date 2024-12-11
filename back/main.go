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

	if err := config.DB.AutoMigrate(&models.User{}); err != nil {
		log.Fatal("Erro ao migrar modelos:", err)
	}
	if err := config.DB.AutoMigrate(&models.Item{}); err != nil {
		log.Fatal("Erro ao migrar modelos:", err)
	}

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	routes.UserRoutes(app)
	routes.ListaRoutes(app)

	app.Listen(":8080")
}
