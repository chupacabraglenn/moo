import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { withAnchorPoint } from 'react-native-anchor-point';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button, Pressable, Animated, Easing } from 'react-native';

export const Level1 = ({setLevel}) => {

    // console.log("We are in Level1");

    const Level1Styles = StyleSheet.create({
        main: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
        },
        bgImage: {
            // width: '100%'
            width: 900,
            height: 400,
            resizeMode: 'stretch',
            position: 'relative',
        },
        game: {
            height: 100,
            width: 100,
            borderWidth: 2,
            borderColor: "#fff",
            // outline: 2
            position: 'relative',
        },
        character: {
            // padding: 10,
            // outline: 1,
            // alignSelf: 'center',
        },
    
        ball: {
            width: 163,
            height: 163,
            top: 200,
            position: "absolute",
            // ballSpeed: 0,
            // ballPosition: 0
            // top: 150
        },
        
        buttonRight: {
            width: 120,
            height: 40,
            padding: 10,
            borderWidth: 10,
            left: 600,
            bottom: 150,
            position: 'absolute',
            backgroundColor: "#fc5c65",
            marginVertical: 50,
        },

        buttonLeft: {
            width: 120,
            height: 40,
            padding: 10,
            borderWidth: 10,
            left: 25,
            bottom: 150,
            position: 'absolute',
            backgroundColor: "#fc5c65",
            marginVertical: 50,
        },
    
        container: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: 'center',
        },

        milk: {
            width: 60,
            height: 120,
            left: 750,
            bottom: 50,
            position: 'absolute'
        }
    });

    const [ballProps, setBallProps] = useState({
        posX: 0,
        velocityX: 0,
        accelerationX: 0
    });
    const ballPosRef = useRef(new Animated.Value(0));
    const ballAngleRef = useRef(new Animated.Value(0));
  
    const chooseRotationInterpolate = () => {
      let newInterpolate = null;

      if (ballProps.velocityX > 0) {
          newInterpolate = ballAngleRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
          })
      }
      else if (ballProps.velocityX < 0) {
          newInterpolate = ballAngleRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['360deg', '0deg'],
          })
      }
      else {
          newInterpolate = ballAngleRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '0deg'],
          });    
      }
      return newInterpolate;
  }

    const ballRotationInterpolate = chooseRotationInterpolate();
    const ballRotationStyle = [{
      transform: [
          {rotate: ballRotationInterpolate},
      ],
    }];
  
    const choosePositionInterpolate = () => {
      const startX = ballProps.posX;
      const endX = startX + ballProps.velocityX;
      console.log("choosePositionInterpolate", startX, endX);
      const result = ballPosRef.current.interpolate({
          inputRange: [0, 1],
          outputRange: [startX, endX],
      });   
      return result;
  }
    const ballPositionInterpolate = choosePositionInterpolate();
    const ballPositionStyle = {
      transform: [
          {translateX: ballPositionInterpolate},
      ]
    };

    const updateBallPosX = () => {
        setBallProps((oldVal) => {
            return {...oldVal, posX: oldVal.posX + oldVal.velocityX};
        });
    }

    const handlePressRight = () => {
        setBallProps({...ballProps, velocityX: 10, accelerationX: 1});
    }

    const handlePressLeft = () => {
        setBallProps({...ballProps, velocityX: -10, accelerationX: -1});
    }

    const handlePressOut = () => {
        // if (velocity > 0) {
        //     velocity = Math.max(0, velocity - 0.01);
        //     handlePressOut();
        // }
        // else if (velocity < 0) {
        //     velocity = Math.min(1, velocity + 0.01);
        //     handlePressOut();
        // }
        // acceleration = 0;
    //     if (velocityX == 0) {
    //         acceleration = 0;
    //     }
    //     else if (velocity > 0) {
    //         acceleration = -0.5;

    //         const decelerate = setInterval(() => {
    //             if (velocity <= 0) {
    //                 acceleration = 0;
    //                 clearInterval(decelerate);
    //             }
    //         }, 100);
    //     }
    //     else if (velocity < 0) {
    //         acceleration = 0.5;
    
    //         const decelerate = setInterval(() => {
    //             if (velocity >= 0) {
    //                 acceleration = 0;
    //                 clearInterval(decelerate);
    //             }
    //         }, 100);
    //     }
    }

    const milkContact = () => {

        const cowSpace = {
            left: ballPosRef.current,
            right: ballPosRef.current + 163,
            bottom: 37,
            top: 200 // + ballLeft.y
        }

        const milkSpace = {
            left: 750,
            right: 810,
            bottom: 50,
            top: 170
        }

        if (cowSpace.right >= milkSpace.left  && cowSpace.left <= milkSpace.right &&
            cowSpace.bottom <= milkSpace.top && cowSpace.top >= milkSpace.bottom) {
            //setLevel(2);
        }
    }

    const rotationAnim = Animated.loop(Animated.timing(ballAngleRef.current, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
    }));

    const posAnim = Animated.loop(Animated.timing(ballPosRef.current, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
    }));

    const startRotationAnimation = () => {
        rotationAnim.start(
            () => {}
        );    
    }

    const startPosAnimation = () => {
        posAnim.start(
            () => {}
        );    
    }

    useEffect(() => {
        startPosAnimation();
        startRotationAnimation();

        const animationInterval = setInterval(() => {
            updateBallPosX();
        }, 1000);

        return () => {
            clearInterval(animationInterval);
        }
    }, []);

    return (
        <>
        <View style = {Level1Styles.main}>
            <Image
                style = {Level1Styles.bgImage}
                source = {require('../assets/gameBackground.png')}
            />
        </View>
      
        <Animated.View style={[Level1Styles.ball, ballPositionStyle]}>
            <Animated.View style={ballRotationStyle}>
                <Image
                    style = {Level1Styles.character}
                    source = {require('../assets/mooCharacter.png')}
                />
            </Animated.View>
        </Animated.View>

        <Image
            style = {Level1Styles.milk}
            source = {require('../assets/MilkBottle.png')}
        />

        <View style = {Level1Styles.container}>
  
        <TouchableOpacity onPressIn = {handlePressRight} onPressOut = {handlePressOut} style = {Level1Styles.buttonRight}>
  
        </TouchableOpacity>

        <TouchableOpacity onPressIn = {handlePressLeft} onPressOut = {handlePressOut} style = {Level1Styles.buttonLeft}>
  
        </TouchableOpacity>
  
        </View>

        </>
    )
}