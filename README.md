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

## 🏗 Arquitetura

```
wallet/
├── app/                    # Páginas da aplicação (Expo Router)
│   ├── _layout.tsx        # Layout raiz com providers
│   ├── index.tsx          # Tela inicial
│   ├── cadastro.tsx       # Formulário de cadastro
│   ├── cartoes.tsx        # Lista de cartões
│   └── sucesso.tsx        # Tela de sucesso
├── components/            # Componentes reutilizáveis
│   ├── LayoutContainer.tsx
│   └── TopBar.tsx
├── contexts/              # Context API para estado global
│   └── CardsContext.tsx
├── services/              # Serviços de API
│   └── api.ts
├── assets/                # Imagens e recursos
└── db.json               # Banco de dados JSON Server
```

## 🧪 Testes

```bash
# Execute os testes
npm test

# Execute com coverage
npm run test:coverage
```

## 📦 Build

```bash
# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Design

O design foi implementado seguindo fielmente o layout do Figma, incluindo:
- Gradientes personalizados
- Animações suaves entre cartões
- Transições de tela fluidas
- Tipografia consistente
- Cores e espaçamentos precisos

## 🔄 API Endpoints

- `GET /cards` - Lista todos os cartões
- `POST /cards` - Cria um novo cartão
- `DELETE /cards/:id` - Remove um cartão

## 🚀 Próximos passos

- [ ] Implementar testes unitários e de integração
- [ ] Adicionar autenticação
- [ ] Implementar persistência offline
- [ ] Adicionar mais validações de cartão
- [ ] Implementar edição de cartões

## 📄 Licença

Este projeto está sob licença MIT.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
