package controllers

import (
	"back/config"
	"back/models"

	"github.com/gofiber/fiber/v2"
)

func GetLista(c *fiber.Ctx) error {
	var listas []models.Item
	config.DB.Find(&listas)
	return c.JSON(listas)
}

func CreateLista(c *fiber.Ctx) error {
	lista := new(models.Item)
	if err := c.BodyParser(lista); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}
	config.DB.Create(&lista)
	return c.JSON(lista)
}
func DeleteLista(c *fiber.Ctx) error {
	id := c.Params("id")
	config.DB.Delete(&models.Item{}, id)
	return c.JSON(fiber.Map{"message": "Item deleted successfully"})
}
func UpdateLista(c *fiber.Ctx) error {
	id := c.Params("id")
	lista := new(models.Item)
	if err := c.BodyParser(lista); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}
	config.DB.Model(&models.Item{}).Where("id = ?", id).Updates(&lista)
	return c.JSON(fiber.Map{"message": "Item updated successfully"})
}
