# Wallet Test - Carteira Virtual

Uma aplicação de carteira virtual desenvolvida em React Native com Expo Router, permitindo cadastrar e listar cartões de crédito.

## 🚀 Funcionalidades

- ✅ Listagem de cartões existentes
- ✅ Cadastro de novos cartões
- ✅ Animações fluidas entre cartões
- ✅ Integração com API REST (JSON Server)
- ✅ Gerenciamento de estado com Context API
- ✅ Interface responsiva e moderna
- ✅ Validação de formulários

## 🛠 Tecnologias

- React Native
- Expo Router
- TypeScript
- Context API (gerenciamento de estado)
- JSON Server (API mock)
- Expo Linear Gradient
- Expo Google Fonts

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI

## 🔧 Instalação e Configuração

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd wallet
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o JSON Server**
```bash
# Instale o json-server globalmente
npm install -g json-server

# Execute o servidor (em um terminal separado)
json-server --watch db.json --port 3000
```

4. **Execute a aplicação**
```bash
# Inicie o projeto Expo
npm start

# Ou para plataformas específicas
npm run android  # Para Android
npm run ios      # Para iOS
```

## 📱 Como usar

1. **Tela inicial**: Escolha entre "meus cartões" ou "cadastrar cartão"
2. **Cadastrar cartão**: Preencha os dados do cartão e salve
3. **Listar cartões**: Visualize todos os cartões, selecione um e use as animações



## 🧪 Testes

```bash
# Execute os testes
npm test

# Execute com coverage
npm run test:coverage
```



## 🔄 API Endpoints

- `GET /cards` - Lista todos os cartões
- `POST /cards` - Cria um novo cartão

