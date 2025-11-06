import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HomeScreenProps {
  onAnalyzePress: () => void;
}

export default function HomeScreen({ onAnalyzePress }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identificador de Remédios</Text>
      
      <TouchableOpacity style={styles.analyzeButton} onPress={onAnalyzePress}>
        <Text style={styles.buttonText}>📷 Analisar Remédio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  analyzeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
