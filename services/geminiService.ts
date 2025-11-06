import * as FileSystem from 'expo-file-system/legacy';
import { GEMINI_API_KEY, GEMINI_API_URL } from '../config';

export interface AnalysisResult {
  success: boolean;
  text?: string;
  error?: string;
}

export const analyzeImage = async (imageUri: string): Promise<AnalysisResult> => {
  try {
    // Converter imagem para base64
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: 'base64',
    });

    // Fazer requisição para Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: "Analise esta imagem de um rótulo de remédio. Identifique o nome do medicamento, 'retorne Nome do medicamento: 'nome do remédio'' e forneça uma descrição breve de 2 linhas sobre para que serve este medicamento. Se não conseguir identificar um medicamento na imagem, informe que não foi possível identificar."
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64
              }
            }
          ]
        }]
      }),
    });

    const data = await response.json();

    // Extrair texto da resposta
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      let text = '';

      // Gemini 2.0 - nova estrutura
      if (candidate.content && Array.isArray(candidate.content) && candidate.content[0]?.text) {
        text = candidate.content[0].text;
      }
      // Gemini 1.5 - estrutura antiga
      else if (candidate.content?.parts && candidate.content.parts[0]?.text) {
        text = candidate.content.parts[0].text;
      }

      if (text) {
        return { success: true, text };
      }
    }

    return { success: false, error: 'Não foi possível processar a resposta da API.' };
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
};
