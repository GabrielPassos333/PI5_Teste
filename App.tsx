import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultModal from './components/ResultModal';
import { analyzeImage } from './services/geminiService';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultText, setResultText] = useState('');
  const [showResultModal, setShowResultModal] = useState(false);

  // Abrir câmera
  const handleOpenCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera');
        return;
      }
    }
    setShowCamera(true);
  };

  // Fechar câmera
  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  // Processar foto capturada
  const handlePhotoCapture = async (uri: string) => {
    setShowCamera(false);
    setIsAnalyzing(true);

    const result = await analyzeImage(uri);

    setIsAnalyzing(false);

    if (result.success && result.text) {
      setResultText(result.text);
      setShowResultModal(true);
    } else {
      Alert.alert('Erro', result.error || 'Não foi possível analisar a imagem');
    }
  };

  // Fechar modal de resultado
  const handleCloseResult = () => {
    setShowResultModal(false);
    setResultText('');
    setShowCamera(false);
    setIsAnalyzing(false);
  };

  // Nova análise
  const handleNewAnalysis = () => {
    setShowResultModal(false);
    setResultText('');
    setShowCamera(false);
    setIsAnalyzing(false);
    setTimeout(() => handleOpenCamera(), 300);
  };

  // Renderizar tela apropriada
  if (showCamera) {
    return <CameraScreen onClose={handleCloseCamera} onCapture={handlePhotoCapture} />;
  }

  if (isAnalyzing) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <HomeScreen onAnalyzePress={handleOpenCamera} />
      
      <ResultModal
        visible={showResultModal}
        resultText={resultText}
        onClose={handleCloseResult}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
