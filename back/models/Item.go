package models

type Item struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Titulo    string `json:"titulo"`
	Descricao string `json:"descricao"`
	Usuario   string `json:"usuario"`
}
