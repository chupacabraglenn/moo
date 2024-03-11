import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Animated, Easing } from 'react-native';

export const Ball = ({ballProps, setBallProps}) => {

    const BallStyles = StyleSheet.create({
    
        ball: {
            width: 163,
            height: 163,
            top: 200,
            position: "absolute",
            // ballSpeed: 0,
            // ballPosition: 0
            // top: 150
        },
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
      console.log("choosePositionInterpolate", startX, endX, new Date().getTime());
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

    const rotationAnim = Animated.loop(Animated.timing(ballAngleRef.current, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
    }));

    const posAnim = Animated.loop(Animated.timing(ballPosRef.current, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
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
      
        <Animated.View style={[BallStyles.ball, ballPositionStyle]}>
            <Animated.View style={ballRotationStyle}>
                <Image
                    // style = {BallStyles.character}
                    source = {require('../assets/mooCharacter.png')}
                />
            </Animated.View>
        </Animated.View>

        </>
    )
}