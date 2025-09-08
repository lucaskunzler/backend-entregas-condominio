# Backend Entregas Condomínio

Este projeto é uma API Node.js para gestão de entregas em condomínios, utilizando Express e MongoDB.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [MongoDB](https://www.mongodb.com/) instalado e em execução localmente

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/lucaskunzler/backend-entregas-condominio.git
   cd backend-entregas-condominio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados

- Certifique-se de que o MongoDB está rodando localmente na porta padrão (`mongodb://localhost:27017`).
- O banco utilizado será criado automaticamente com o nome `entregas`.

## Executando o Projeto

```bash
node server.js
```
Ou, para desenvolvimento com reinício automático:
```bash
npx nodemon server.js
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

## Rotas Principais

- **POST /api/login**  
  Body: `{ "email": "...", "senha": "..." }`  
  Retorna: `{ "token": "...", "role": "porteiro|morador" }`

- **POST /api/register**  
  Body: `{ "email": "...", "senha": "...", "role": "morador|porteiro" }`  
  Retorna: `{ "token": "...", "role": "..." }`

- **GET /api/dashboard/porteiro**  
  Header: `Authorization: Bearer <token>`  
  Retorna dados do painel do porteiro

- **GET /api/dashboard/morador**  
  Header: `Authorization: Bearer <token>`  
  Retorna dados do painel do morador

## Observações

- Altere o segredo JWT em `middleware/auth.js` para um valor seguro em produção.
- Para customizar a conexão do MongoDB, edite `config/db.js`.
