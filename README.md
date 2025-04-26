# Desapega Vendas – Dashboard Financeiro

Dashboard para controle e visualização de transações financeiras a partir de arquivos OFX, com backend em Fastify e frontend em Angular.

## ✅ Funcionalidades (RFs)

- [x] Upload de arquivos .OFX
- [x] Extração e persistência de transações no banco de dados
- [x] Listagem de transações no painel
- [ ] Filtros por data, tipo (débito/crédito) e conta
- [ ] Marcar transações como conciliadas
- [ ] Edição de transações (nome, categoria etc.)
- [ ] Geração de relatórios/exportação CSV

## 🔐 Regras de negócio (RNs)

- [ ] Arquivos OFX inválidos devem ser rejeitados
- [ ] Transações duplicadas (mesma data, valor, nome) não devem ser cadastradas novamente
- [ ] Tipos de transação devem ser normalizados (CREDITO/DEBITO)
- [ ] Todas transações devem estar associadas a uma conta

## 🛠️ Tecnologias

- Backend: Fastify + Prisma + PostgreSQL
- Frontend: Angular + Angular Material (ou Fuse Components)
- Parsing de OFX: ofx-js
- Autenticação: JWT
- Upload de arquivos: @fastify/multipart

## 🧪 Testes

- [X] Testes de unidade para parse de OFX
- [ ] Testes de integração para rotas de upload e listagem
- [ ] Testes e2e no frontend

## 📦 Requisitos não-funcionais (RNFs)

- [x] Banco de dados PostgreSQL
- [x] Suporte a múltiplas contas e múltiplos arquivos
- [x] Identificação do usuário com JWT
- [x] Padrão RESTful nas rotas