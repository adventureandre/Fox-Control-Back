# Documentação da API – Desapega Vendas

## Visão Geral

Esta API faz parte do sistema Desapega Vendas, um dashboard financeiro para controle e visualização de transações a partir de arquivos OFX. O backend é desenvolvido em Node.js com Fastify, Prisma e PostgreSQL.

## Autenticação
- JWT obrigatório para rotas protegidas.
- Realize login via `/sessions` para obter o token.

## Endpoints Principais

### Usuários
- `POST /users` – Cadastro de usuário
- `POST /sessions` – Login
- `GET /me` – Perfil do usuário (JWT)
- `POST /users/avatar` – Upload de avatar
- `POST /users/update` – Atualização de dados
- `PATCH /token/refresh` – Refresh token

### Categorias
- `GET /categories` – Listar categorias
- `GET /categories/:code` – Buscar categoria por código

### Transações
- `GET /transactions` – Listar transações
- `POST /transactions` – Criar transação
- `PUT /transactions/:id` – Atualizar transação
- `DELETE /transactions` – Remover transação
- `POST /transactions/upload` – Upload de arquivo OFX

### Fazendas (Farms)
- `GET /farms` – Listar fazendas
- `GET /farms/:id` – Detalhar fazenda
- `GET /producers/:producerId/farms` – Listar fazendas por produtor
- `POST /farms` – Criar fazenda
- `PUT /farms/:id` – Atualizar fazenda
- `PATCH /farms/:id/active` – Ativar/desativar fazenda
- `DELETE /farms/:id` – Remover fazenda

### Produtores
- `GET /producers` – Listar produtores
- `GET /producers/:id` – Detalhar produtor
- `POST /producers` – Criar produtor
- `PUT /producers/:id` – Atualizar produtor
- `DELETE /producers/:id` – Remover produtor

### Contas de Produtor
- `GET /producer-accounts` – Listar contas
- `GET /producer-accounts/:id` – Detalhar conta
- `GET /producer-accounts/:producer_id/by-producer` – Contas por produtor
- `GET /producer-accounts/:account_id/balance` – Saldo da conta
- `POST /producer-accounts` – Criar conta
- `PUT /producer-accounts/:id` – Atualizar conta
- `DELETE /producer-accounts/:id` – Remover conta

### Clientes
- `GET /customers` – Listar clientes
- `POST /customers` – Criar cliente
- `DELETE /customers/:id` – Remover cliente

### Fornecedores
- `GET /suppliers` – Listar fornecedores
- `GET /suppliers/:id` – Detalhar fornecedor
- `POST /suppliers` – Criar fornecedor
- `PUT /suppliers/:id` – Atualizar fornecedor
- `DELETE /suppliers/:id` – Remover fornecedor

## Observações
- Todas as rotas (exceto login/cadastro) exigem autenticação JWT.
- Uploads de arquivos devem ser enviados como `multipart/form-data`.
- Para detalhes de payloads e respostas, consulte os controllers ou implemente Swagger/OpenAPI.

---

> Para rodar o projeto, siga as instruções do README principal.
