# Identificador de Remédios

Um aplicativo React Native que utiliza a câmera do dispositivo e inteligência artificial (Google Gemini) para identificar medicamentos através de fotos de seus rótulos.

## Funcionalidades

- 📷 Captura de foto usando a câmera do dispositivo
- 🤖 Análise automática da imagem usando Google Gemini AI
- 💊 Identificação do medicamento e descrição de seu uso
- 📱 Interface simples e intuitiva

## Como configurar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar a API do Google Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma conta ou faça login
3. Gere uma nova API key
4. Abra o arquivo `config.ts` no projeto
5. Substitua `'SUA_CHAVE_API_AQUI'` pela sua chave API real

```typescript
export const GEMINI_API_KEY = 'sua_chave_api_real_aqui';
```

### 3. Executar o projeto
```bash
npm start
```

## Como usar

1. Abra o aplicativo
2. Toque no botão "📷 Analisar Remédio"
3. Permita o acesso à câmera quando solicitado
4. Tire uma foto do rótulo do medicamento
5. Aguarde a análise da IA
6. Visualize as informações sobre o medicamento

## Permissões necessárias

- **Câmera**: Para capturar fotos dos medicamentos
- **Internet**: Para comunicação com a API do Google Gemini

## Tecnologias utilizadas

- React Native
- Expo
- Expo Camera
- Google Gemini AI
- TypeScript

## Notas importantes

- Certifique-se de que o rótulo do medicamento esteja bem visível e legível na foto
- A precisão da identificação depende da qualidade da imagem e da clareza do rótulo
- Este aplicativo é apenas para fins informativos e não substitui o conselho médico profissional

## Solução de problemas

- **"Configuração necessária"**: Verifique se você configurou corretamente sua chave API no arquivo `config.ts`
- **Permissão de câmera negada**: Vá nas configurações do seu dispositivo e permita o acesso à câmera para o aplicativo
- **Erro de conexão**: Verifique sua conexão com a internet
