package models

import (
	"time"
)

type Item struct {
	ID           uint      `gorm:"primaryKey"`
	Title        string    `gorm:"type:varchar(255);not null"`
	Text         string    `gorm:"type:text;not null"`
	Creator      string    `gorm:"type:varchar(255);not null"`
	Date         time.Time `gorm:"type:date;not null"`
	DateToFinish time.Time `gorm:"type:date;not null"`
}
