package config

import (
	"log"

	"gorm.io/driver/sqlite" // Você pode usar outro driver, como Postgres, MySQL, etc.
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	var err error

	// Configuração do banco (exemplo: SQLite)
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Erro ao conectar ao banco de dados:", err)
	}

	log.Println("Banco de dados conectado com sucesso!")
}
