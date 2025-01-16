package routes

import (
	"back/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	api := app.Group("/api/users")
	api.Get("/", controllers.GetUsers)
	api.Post("/", controllers.CreateUser)
}
