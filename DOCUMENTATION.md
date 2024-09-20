
# Sistema de Gestão de Pizzaria com API em Laravel

Este projeto é uma API backend construída em **Laravel** para gerenciar pedidos de uma pizzaria. O sistema inclui recursos para gerenciar usuários e pizzas, com autenticação via **Laravel Passport** (OAuth2). As operações incluem o CRUD (criar, ler, atualizar e deletar) tanto para **usuários** quanto para **pizzas**.

## Funcionalidades

- **Autenticação** via **Laravel Passport** (OAuth2).
- Gerenciamento de **usuários** com CRUD (criar, listar, atualizar, deletar).
- Gerenciamento de **pizzas** com CRUD (criar, listar, atualizar, deletar).
- Paginação de resultados para melhorar o desempenho em listas grandes.
- Validação robusta com **Form Requests** personalizados.

## Requisitos

- PHP >= 8.0
- Composer
- MySQL
- Laravel 9.x
- Laravel Passport (OAuth2)

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/suaprojeto.git
   ```

2. Instale as dependências via Composer:
   ```bash
   composer install
   ```

3. Configure o arquivo `.env` com as informações do banco de dados e do Passport:
   ```bash
   cp .env.example .env
   ```

4. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```

5. Execute as migrações do banco de dados:
   ```bash
   php artisan migrate
   ```

6. Instale o Passport para gerenciar a autenticação via OAuth2:
   ```bash
   php artisan passport:install
   ```

7. Inicie o servidor:
   ```bash
   php artisan serve
   ```

## Uso

### Autenticação

#### Login

- **POST** `/api/login`
  
  Exemplo de payload:
  ```json
  {
    "email": "exemplo@dominio.com",
    "password": "senha"
  }
  ```
  Resposta:
  ```json
  {
    "status": 200,
    "message": "Usuário logado com sucesso",
    "usuario": { "id": 1, "name": "Exemplo", "token": "..." }
  }
  ```

#### Logout

- **POST** `/api/logout`
  
  Requer o token de autorização (Bearer Token).

### Gerenciamento de Usuários

#### Listar Usuários

- **GET** `/api/user`
  
  Requer o token de autorização.

#### Criar Usuário

- **POST** `/api/cadastrar`
  
  Exemplo de payload:
  ```json
  {
    "name": "Novo Usuário",
    "email": "novo@dominio.com",
    "password": "Senha123!",
    "password_confirmation": "Senha123!"
  }
  ```

### Gerenciamento de Pizzas

#### Listar Pizzas

- **GET** `/api/pizza`
  
  Retorna uma lista de pizzas cadastradas.

#### Cadastrar Pizza

- **POST** `/api/pizza/cadastrar`
  
  Exemplo de payload:
  ```json
  {
    "name": "Pizza de Calabresa",
    "description": "Deliciosa pizza de calabresa",
    "size": "media",
    "format": "quadrada",
    "price": 39.99
  }
  ```

#### Atualizar Pizza

- **PUT** `/api/pizza/atualizar/{id}`
  
  Exemplo de payload:
  ```json
  {
    "name": "Pizza de Calabresa Atualizada",
    "description": "Descrição atualizada",
    "size": "grande",
    "format": "redonda",
    "price": 49.99
  }
  ```

#### Deletar Pizza

- **DELETE** `/api/pizza/deletar/{id}`
  
  Exclui uma pizza existente pelo ID.

## Estrutura de Código

O projeto segue o padrão **MVC (Model-View-Controller)**. Aqui estão alguns dos principais arquivos do projeto:

- `AuthController.php`: Gerencia as funcionalidades de login e logout com Laravel Passport.
- `PizzaController.php`: Gerencia o CRUD das pizzas.
- `UserController.php`: Gerencia o CRUD dos usuários.
- `PizzaRequest.php`: Validação das requisições para cadastro e atualização de pizzas.
- `UserCreateRequest.php` e `UserUpdateRequest.php`: Validação das requisições para cadastro e atualização de usuários.
- `auth.php`: Configurações de autenticação e guardas no Laravel.
- `api.php`: Definições das rotas da API.

## Tecnologias Utilizadas

- **Laravel Passport**: Autenticação via OAuth2.
- **Eloquent ORM**: Interação com o banco de dados de forma orientada a objetos.
- **Laravel Form Requests**: Para validação de dados.

## Autor

- **Ruan Moreira** - [GitHub](https://github.com/Moreira-Ruan)

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
