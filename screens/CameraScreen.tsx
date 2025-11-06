import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

interface CameraScreenProps {
  onClose: () => void;
  onCapture: (uri: string) => void;
}

export default function CameraScreen({ onClose, onCapture }: CameraScreenProps) {
  const cameraRef = useRef<CameraView>(null);

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        skipProcessing: true,
        shutterSound: false,
      });

      if (photo?.uri) {
        onCapture(photo.uri);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture}>
          <Text style={styles.captureButtonText}>📷</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  captureButton: {
    backgroundColor: '#007AFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonText: {
    fontSize: 32,
  },
});
