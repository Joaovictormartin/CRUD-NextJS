# Boas-vindas ao projeto CRUD-NextJS-TS

O projeto **CRUD-NextJS-TS** é uma plataforma que permite aos usuários cadastrar, visualizar, atualizar e deletar seus clientes.

---

## Overview do Projeto

O **CRUD-NextJS-TS** oferece as seguintes funcionalidades principais:

- **Cadastro, visualização, edição e remoção de clientes**
- **Interface moderna e responsiva**
- **Autenticação segura com NextAuth**

<div align="center">
    <img src="./banner/screenshot.gif" height="500" alt="screenshot gif">
</div>

---

## Como executar o projeto

Para executar o **CRUD-NextJS-TS**, siga os passos abaixo:

### **1. Clonando o Repositório**

```bash
# Clone o repositório
git clone https://github.com/Joaovictormartin/CRUD-NextJS-TS.git

# Acesse o diretório do projeto
cd CRUD-NextJS-TS

#Abra o projeto no Visual Studio Code
code .
```

### **2. Instalando Dependências**

```bash
yarn install
```

### **3. Configurando Variáveis de Ambiente**

Na raiz do projeto, existe um arquivo `.env.example` que contém todas as variáveis de ambiente necessárias para o funcionamento da aplicação.

1. Copie o arquivo `.env.example` e renomeie para `.env`.
2. Preencha os valores necessários, como chaves da API do Google para autenticação.
3. Salve o arquivo antes de iniciar o projeto.

Crie um arquivo `.env.local` e adicione suas credenciais necessárias, como chaves da API do Google para autenticação.

### **4. Executando o Projeto**

```bash
yarn dev
```

Acesse o projeto em `http://localhost:3000`.

---

## Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- **Next.js**
- **TypeScript**
- **ShadCN**
- **Tailwind CSS**
- **NextAuth (Google OAuth)**
