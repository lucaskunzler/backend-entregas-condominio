# Modelo Físico do Banco de Dados

**SGBD:** MongoDB  
**Banco:** `entregas`  
**Conexão:** `mongodb://localhost:27017/entregas`  
**ODM:** Mongoose

---

## Coleção: `users`

Armazena os usuários do sistema (moradores e porteiros).

| Campo  | Tipo     | Restrições                         | Padrão     |
|--------|----------|------------------------------------|------------|
| `_id`  | ObjectId | PK, gerado automaticamente         | —          |
| `nome` | String   | —                                  | —          |
| `email`| String   | —                                  | —          |
| `senha`| String   | —                                  | —          |
| `role` | String   | enum: `porteiro` \| `morador`      | `morador`  |

---

## Coleção: `deliveries`

Armazena os registros de entregas recebidas na portaria.

| Campo         | Tipo     | Restrições                          | Padrão       |
|---------------|----------|-------------------------------------|--------------|
| `_id`         | ObjectId | PK, gerado automaticamente          | —            |
| `descricao`   | String   | —                                   | —            |
| `resident`    | ObjectId | FK → `users._id`, obrigatório       | —            |
| `dataEntrega` | Date     | —                                   | `Date.now()` |
| `status`      | String   | enum: `pendente` \| `entregue`      | `pendente`   |

---

## Relacionamentos

```
users (1) ──── (N) deliveries
           resident → users._id
```

Um usuário (morador) pode ter várias entregas associadas a ele.
