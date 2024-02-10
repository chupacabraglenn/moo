import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { TitleScreen } from "./screens/TitleScreen.js"
import { Level1 } from "./screens/Level1.js"
import { Level2 } from "./screens/Level2.js"

export default function App() {
  let [level, setLevel] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      {
        level === 0 && <TitleScreen setLevel={setLevel}/>
      }
      {
        level === 1 && <Level1 setLevel={setLevel}/>
      }
      {
        level == 2 && <Level2 setLevel={setLevel}/>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  oldContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    paddingTop: 50,
    height: "100%",
    width: "100%"
  },
});