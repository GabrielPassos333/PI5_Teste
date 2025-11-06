# 📁 Estrutura do Projeto - Identificador de Remédios

## 🗂️ Organização de Pastas

```
my-app/
├── screens/              # Telas da aplicação
│   ├── HomeScreen.tsx    # Tela inicial com botão de análise
│   ├── CameraScreen.tsx  # Tela da câmera
│   └── LoadingScreen.tsx # Tela de carregamento/análise
│
├── components/           # Componentes reutilizáveis
│   └── ResultModal.tsx   # Modal com resultado da análise
│
├── services/             # Lógica de negócio
│   └── geminiService.ts  # Integração com API do Gemini
│
├── App.tsx              # Componente principal (orquestrador)
├── config.ts            # Configurações (API keys)
└── index.ts             # Entry point
```

## 📄 Descrição dos Arquivos

### **Screens (Telas)**

#### `HomeScreen.tsx`
- Tela inicial do app
- Exibe título e botão "Analisar Remédio"
- Props: `onAnalyzePress` (callback ao clicar no botão)

#### `CameraScreen.tsx`
- Interface da câmera
- Captura foto do medicamento
- Props:
  - `onClose` - Fechar câmera
  - `onCapture(uri)` - Callback com URI da foto

#### `LoadingScreen.tsx`
- Tela de carregamento
- Exibida durante análise da imagem
- Mostra loading spinner + texto

### **Components (Componentes)**

#### `ResultModal.tsx`
- Modal que exibe resultado da análise
- Mostra informações do medicamento
- Botões: "Fechar" e "Nova Análise"
- Props:
  - `visible` - Controla visibilidade
  - `resultText` - Texto do resultado
  - `onClose` - Fechar modal
  - `onNewAnalysis` - Nova análise

### **Services (Serviços)**

#### `geminiService.ts`
- Integração com API do Google Gemini
- Função `analyzeImage(uri)`:
  - Converte imagem para base64
  - Envia para API
  - Processa resposta
  - Retorna `{ success, text?, error? }`

### **App.tsx**
- Componente orquestrador principal
- Gerencia estados globais:
  - `showCamera` - Exibir câmera
  - `isAnalyzing` - Em análise
  - `showResultModal` - Exibir resultado
- Controla fluxo entre telas
- Gerencia permissões da câmera

## 🔄 Fluxo da Aplicação

```
1. HomeScreen
   ↓ (clica "Analisar Remédio")
   
2. CameraScreen
   ↓ (tira foto)
   
3. LoadingScreen
   ↓ (API processa)
   
4. HomeScreen + ResultModal
   ↓ (opções)
   
5a. Fechar → HomeScreen
5b. Nova Análise → CameraScreen
```

## 🎯 Benefícios da Organização

✅ **Separação de responsabilidades**
- Cada arquivo tem uma função clara
- Fácil de encontrar e modificar código

✅ **Reutilização**
- Componentes podem ser usados em outras partes
- Services isolados e testáveis

✅ **Manutenibilidade**
- Código organizado e legível
- Fácil de adicionar novas features

✅ **Escalabilidade**
- Estrutura pronta para crescer
- Fácil adicionar novas telas/componentes

## 🚀 Como Adicionar Novas Features

### Adicionar nova tela:
1. Criar arquivo em `screens/NomeDaTela.tsx`
2. Importar em `App.tsx`
3. Adicionar lógica de navegação

### Adicionar novo componente:
1. Criar arquivo em `components/NomeDoComponente.tsx`
2. Importar onde for usar
3. Passar props necessárias

### Adicionar novo serviço:
1. Criar arquivo em `services/nomeDoServico.ts`
2. Exportar funções
3. Importar em componentes que precisam

## 📦 Dependências por Arquivo

```typescript
// HomeScreen.tsx
- React Native (View, Text, TouchableOpacity)

// CameraScreen.tsx  
- React Native (View, Text, TouchableOpacity)
- expo-camera (CameraView)

// LoadingScreen.tsx
- React Native (View, ActivityIndicator, Text)

// ResultModal.tsx
- React Native (Modal, View, Text, ScrollView, TouchableOpacity)

// geminiService.ts
- expo-file-system/legacy
- config.ts (API keys)

// App.tsx
- Todas as screens
- Todos os components
- expo-camera (permissões)
- geminiService
```

## 🔐 Segurança

- `config.ts` está no `.gitignore`
- Chaves API não vão para o repositório
- Services isolam lógica sensível
