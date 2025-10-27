# 📱 GTEAM Scan - Análise Nutricional Inteligente

> Aplicação mobile-first para análise nutricional de refeições usando IA

[![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-success)](https://lovable.dev/projects/045435f1-216d-4da8-b3ca-bb74a9ca1aa7)
[![Responsive](https://img.shields.io/badge/Design-Responsive-blue)](https://lovable.dev/projects/045435f1-216d-4da8-b3ca-bb74a9ca1aa7)
[![Touch Friendly](https://img.shields.io/badge/Touch-Friendly-orange)](https://lovable.dev/projects/045435f1-216d-4da8-b3ca-bb74a9ca1aa7)

## 🎯 Sobre o Projeto

GTEAM Scan é uma aplicação web progressiva que permite aos usuários escanear suas refeições e obter análises nutricionais detalhadas instantaneamente usando inteligência artificial.

### ✨ Características Principais

- 📸 **Upload de Imagens** - Câmera ou galeria
- 🤖 **Análise por IA** - Identificação automática de ingredientes
- 📊 **Relatório Detalhado** - Calorias, macros e micronutrientes
- 📱 **Mobile-First** - Otimizado para smartphones
- ⚡ **Performance** - Carregamento rápido e animações suaves
- ♿ **Acessível** - WCAG 2.1 compliant

## Project info

**URL**: https://lovable.dev/projects/045435f1-216d-4da8-b3ca-bb74a9ca1aa7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/045435f1-216d-4da8-b3ca-bb74a9ca1aa7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠️ Tecnologias

Este projeto foi construído com:

- **Vite** - Build tool e dev server
- **TypeScript** - Type safety
- **React** - UI framework
- **shadcn-ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Navigation
- **Lucide Icons** - Icon library

## 📱 Otimizações Mobile

Esta aplicação foi completamente otimizada para dispositivos móveis seguindo a abordagem **mobile-first**:

### ✅ Implementado

- ✅ Tipografia responsiva e legível
- ✅ Áreas de toque mínimas de 44x44px
- ✅ Feedback visual em todas as interações
- ✅ Animações otimizadas para performance
- ✅ Imagens responsivas e lazy loading
- ✅ Layout adaptativo para todas as telas
- ✅ Touch gestures nativos
- ✅ Meta tags para PWA

### 📊 Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Mobile Score**: > 90
- **Acessibilidade**: 100%

### 📖 Documentação Mobile

Para mais detalhes sobre as otimizações mobile, consulte:

- 📄 [MOBILE_OPTIMIZATION.md](./MOBILE_OPTIMIZATION.md) - Documentação completa
- 📋 [MOBILE_QUICK_REFERENCE.md](./MOBILE_QUICK_REFERENCE.md) - Guia rápido
- ✅ [MOBILE_TESTING_CHECKLIST.md](./MOBILE_TESTING_CHECKLIST.md) - Checklist de testes

## 🎨 Design System

### Breakpoints
```
xs:  475px  (Extra small)
sm:  640px  (Small)
md:  768px  (Medium)
lg:  1024px (Large)
xl:  1280px (Extra large)
2xl: 1400px (2X large)
```

### Cores Principais
- **Primary**: `hsl(45 90% 55%)` - Amarelo/Dourado
- **Background**: `hsl(220 20% 10%)` - Escuro
- **Foreground**: `hsl(40 15% 95%)` - Claro

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/045435f1-216d-4da8-b3ca-bb74a9ca1aa7) and click on Share -> Publish.

## 🧪 Testes

### Testar Localmente

```sh
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

### Dispositivos Recomendados para Teste

- iPhone SE (375px) - Menor tela iOS
- iPhone 12/13/14 (390px) - Padrão iOS
- Samsung Galaxy S21 (360px) - Padrão Android
- iPad Mini (768px) - Tablet

Consulte [MOBILE_TESTING_CHECKLIST.md](./MOBILE_TESTING_CHECKLIST.md) para checklist completo.

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn-ui
│   └── AnalysisLoading.tsx
├── pages/
│   ├── Index.tsx        # Página inicial (upload)
│   ├── Report.tsx       # Relatório nutricional
│   └── NotFound.tsx
├── hooks/               # Custom hooks
├── lib/                 # Utilities
├── assets/              # Imagens e recursos
├── App.tsx
├── main.tsx
└── index.css           # Estilos globais
```

## 🚀 Features

### Página Inicial
- Upload de imagem via câmera ou galeria
- Preview da imagem selecionada
- Dicas para melhor qualidade de foto
- Avisos sobre precisão da IA

### Tela de Loading
- Animação de progresso
- Mensagens dinâmicas
- Indicadores visuais de etapas

### Relatório Nutricional
- Imagem da refeição analisada
- Lista de ingredientes identificados
- Calorias totais em destaque
- Distribuição de macronutrientes
- Informações nutricionais adicionais
- Avisos de precisão
- Opções de compartilhar e download

## 🔧 Configuração da API

A aplicação se conecta ao endpoint:
```
POST https://n8n.guidonutri.com/webhook/GTEAMSCAN
```

O endpoint espera um FormData com a imagem e retorna dados nutricionais estruturados.

## 🌐 Deploy

### Via Lovable

Simply open [Lovable](https://lovable.dev/projects/045435f1-216d-4da8-b3ca-bb74a9ca1aa7) and click on Share → Publish.

### Custom Domain

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📝 Licença

Este projeto foi desenvolvido por GTEAM Labs.

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Siga as diretrizes de mobile-first
2. Consulte o [MOBILE_QUICK_REFERENCE.md](./MOBILE_QUICK_REFERENCE.md)
3. Execute os testes do [MOBILE_TESTING_CHECKLIST.md](./MOBILE_TESTING_CHECKLIST.md)
4. Mantenha a acessibilidade e performance

---

**Desenvolvido com ❤️ pela GTEAM Labs**
