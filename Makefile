.PHONY: dev backend frontend

# Executa o backend e o frontend simultaneamente
dev: backend frontend

# Roda o backend
backend:
	cd back && go run main.go

# Roda o frontend
frontend:
	cd vite-project && npm run dev
