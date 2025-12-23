# MySQL com Docker + DBeaver

Este guia explica como subir um banco de dados **MySQL 8.0** utilizando **Docker** e como se conectar a ele usando o **DBeaver**.

---

## 📦 Pré-requisitos

- Docker instalado  
  👉 https://www.docker.com/
- DBeaver instalado  
  👉 https://dbeaver.io/

---

### Subindo o MySQL com Docker

Execute o comando abaixo no terminal:

```bash
docker run -d --name mysql-teste -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=estoque -p 3306:3306 mysql:8.0
```

### Acessar o banco de dados no dbeaver
 - Abra o DBeaver
 - Clique em New Database Connection
 - Selecione MySQL
 - Preencha os dados de conexão:

| Campo    | Valor     |
| -------- | --------- |
| Host     | localhost |
| Port     | 3306      |
| Database | estoque   |
| Username | root      |
| Password | root      |
