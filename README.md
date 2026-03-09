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

## Endpoints

> 🔒 = requer `Authorization: Bearer <token>`

### Auth
| Método | Rota | Body |
|--------|------|------|
| POST | `/api/login` | `{ email, senha }` |
| POST | `/api/register` | `{ email, senha, role: "morador\|porteiro" }` |

### Dashboard 🔒
| Método | Rota |
|--------|------|
| GET | `/api/dashboard/porteiro` |
| GET | `/api/dashboard/morador` |

### Entregas
| Método | Rota | Auth |
|--------|------|------|
| POST | `/api/deliveries` | — |
| GET | `/api/deliveries` | — |
| GET | `/api/deliveries/my-deliveries` | 🔒 |

### Usuários
| Método | Rota |
|--------|------|
| GET | `/api/users/residents` |

## Observações

- Altere o segredo JWT em `middleware/auth.js` para um valor seguro em produção.
- Para customizar a conexão do MongoDB, edite `config/db.js`.
