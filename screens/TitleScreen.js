import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { View, StyleSheet, Animated, Text, TouchableOpacity, Image, SafeAreaView, Button, Pressable } from 'react-native';

export const TitleScreen = ({setLevel}) => {

  state = {
    animation: new Animated.Value(100)
  }

  handlePress = () => {
    Animated.spring(this.state.animation, {
      toValue: 250,
      duration: 2000,
      friction: 2,
      tension: 20,
      useNativeDriver: true
    }).start();
  }

    const trans = {
      transform: [
        {translateY: this.state.animation}
      ]
    }
  
//     return (
//      <>

      // <Animated.View style = {[styles.ball, trans]}>
    
      // </Animated.View>

      // <View style = {styles.container}>
    
      //   <TouchableOpacity onPress = {this.handlePress} style = {styles.button}>
    
      //   </TouchableOpacity>
  
    
      //   </View>
  
//       </>
//     );
//   }

  return (
    <>
      
    {/* <Animated.View style = {[styles.ball, trans]}>
    
    </Animated.View> */}

    {/* <View style = {styles.container}>
  
      <TouchableOpacity onPress = {this.handlePress} style = {styles.button}>
  
      </TouchableOpacity>
  
    </View> */}
    

    <View style = {titleStyles.main}>
        <Image source = {require('../assets/mooTitle.png')} />
        <View style = {titleStyles.titleView}>
            <Text style = {titleStyles.title}>
                Moo!
            </Text>
        </View>
        <Pressable 
            onPress={() => setLevel(1)}
            style = {titleStyles.playButton}>
            <Image
                style = {titleStyles.playButton}
                source = {require('../assets/playButton.png')}
            />
        </Pressable>
    </View>

    </>
  );
}

const titleStyles = StyleSheet.create({
  main: {
    position: 'relative'
  },
  playButton: {
    width: 50,
    height: 20,
    resizeMode: 'stretch',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{translateX: -25}, {translateY: -10}]
  },
  
  titleView: {
    width: '100%',
    position: 'absolute',
    textAlign: 'center'
  },

  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30
  },
});