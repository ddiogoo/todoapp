# TodoApp

Este é um projeto de uma aplicação de lista de tarefas (Todo App) com backend em Rust utilizando Actix-web e frontend em React. A aplicação permite criar, visualizar, editar e excluir tarefas.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Rust** (versão 1.63 ou superior)
- **Cargo** (gerenciador de pacotes do Rust)

### Passos para Rodar o Backend

1. Navegue até o diretório do backend:
   ```bash
   cd ./todo_backend
   ```
2. Instale as dependências do Rust:
   ```bash
    cargo build
    ```
3. Execute o servidor:
   ```bash
   cargo run
   ```

### Passos para Rodar o Frontend
1. Navegue até o diretório do frontend:
   ```bash
   cd ./todo_frontend
   ```
2. Instale as dependências do Node.js:
   ```bash
    npm i
    ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run start
   ```

## Decisões de Técnicas e Arquitetura

### Backend

- **Rust**: Escolhi Rust pela sua segurança de memória e desempenho. Mas principalmente por que nunca havia usado antes e queria aprender.
- **Actix-web**: Um framework leve e rápido para construir APIs em Rust. Assim como o Rust, nunca havia usado antes e queria aprender.
- **Persistência de Dados**: Estou usando estruturas de dados em memória para armazenar as tarefas. Para persistência real, considere usar um banco de dados como PostgreSQL ou SQLite.
- **Bicliotecas utilizadas**:
    - `actix-web`: Para construir a API.
    - ``actix-cors``: Para lidar com CORS.
    - `serde`: Para serialização e desserialização de dados.
    - `uuid`: Para gerar IDs únicos para as tarefas.
    - ``chrono``: Para manipulação de datas e horas.

### Frontend

- **JavaScript**: Escolhi JavaScript por ser uma linguagem amplamente utilizada para desenvolvimento web e por ser a linguagem padrão para o React.
- **React**: Uma biblioteca popular para construir interfaces de usuário.
- **Bicliotecas utilizadas**:
    - `axios`: Para fazer requisições HTTP para a API.

### Integração

O backend e o frontend se comunicam através de requisições HTTP. O frontend faz chamadas para a API do backend para criar, ler, atualizar e excluir tarefas. O backend libera o CORS para tudo o domínio, permitindo que o frontend acesse a API sem problemas de CORS. Atenção: isso não é recomendado para produção, onde você deve restringir o acesso apenas ao domínio do frontend.

### Arquitetura

Esse projeto em si é bem simples, não há necessidade de arquitetura complexas ou padrões de design. Hoje em dia é comum fazer um **Over Engineering** de projetos pequenos, o que aumenta muito a complexidade e o tempo de desenvolvimento.

Não sou contra a aplicações de microsserviços, CQRS, Event Sourcing, etc. Mas para esse projeto em específico, não há necessidade de usar essas técnicas. O projeto é pequeno e simples, e uma arquitetura mais simples é mais fácil de entender e manter.

Caso futuramente o projeto cresça e se torne mais complexo, podemos considerar a adoção de uma arquitetura mais robusta. Por enquanto, a simplicidade é a principal característica.

## Uso de IA no desenvolvimento

A IA foi utilizada para gerar o código de configuração do CORS no backend e para gerar a seção de "Como Rodar o Projeto" no README. Além disso, a IA foi utilizada para gerar o código de exemplo para o frontend, o restante eu escrevi manualmente com base em documentações que encontrei na internet.
