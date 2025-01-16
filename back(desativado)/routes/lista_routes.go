package routes

import (
	"back/controllers"

	"github.com/gofiber/fiber/v2"
)

func ListaRoutes(app *fiber.App) {
	api := app.Group("/api/lista")
	api.Get("/", controllers.GetLista)
	api.Post("/", controllers.CreateLista)
	api.Delete("/:id", controllers.DeleteLista)
	api.Put("/:id", controllers.UpdateLista)
}
