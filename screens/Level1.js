import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { withAnchorPoint } from 'react-native-anchor-point';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button, Pressable, Animated, Easing } from 'react-native';

export const Level1 = ({setLevel}) => {

    console.log("We are in Level1");

    let velocity = 0;
    let acceleration = 0;

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

    
    let ballPos = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    let ballAngleRef = useRef(new Animated.Value(0));


    let ballInterpolate = ballAngleRef.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    let [ballRotationStyle, setBallRotationStyle] = useState([{
        transform: [
            {rotate: ballInterpolate},
        ],
      }]);

    const [ballPositionStyle, setBallPositionStyle] = useState([{
        transform: [
            {translateX: ballPos.x},
        ]
    }]);

    const handlePressRight = () => {
        stopRotationAnimation();
        acceleration = 1;
        setBallRotationStyle ([{
            transform: [
                {rotate: chooseInterpolate(acceleration)},
            ],
          }]);
        startRotationAnimation();
    }

    const handlePressLeft = () => {
        stopRotationAnimation();
        acceleration = -1;
        setBallRotationStyle ([{
            transform: [
                {rotate: chooseInterpolate(acceleration)},
            ],
          }]);
        startRotationAnimation();
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
        if (velocity == 0) {
            acceleration = 0;
        }
        else if (velocity > 0) {
            acceleration = -0.5;

            const decelerate = setInterval(() => {
                if (velocity <= 0) {
                    acceleration = 0;
                    clearInterval(decelerate);
                }
            }, 100);
        }
        else if (velocity < 0) {
            acceleration = 0.5;
    
            const decelerate = setInterval(() => {
                if (velocity >= 0) {
                    acceleration = 0;
                    clearInterval(decelerate);
                }
            }, 100);
        }
    }

    const milkContact = () => {

        const cowSpace = {
            left: ballPos.x._value,
            right: ballPos.x._value + 163,
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

    const chooseInterpolate = (v) => {
        let newInterpolate = null;

        if (v > 0) {
            newInterpolate = ballAngleRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
            })
        }
        else if (v < 0) {
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

    const startPositionAnimation = (x, v, a) => {
        ballPos.setValue({
            x: x,
            y: 0,
            a: a,
        })
        velocity = v + a;
        Animated.timing(ballPos, {
            toValue: {
                x: x + v,
                y: 0
            },
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(
            () => startPositionAnimation(x + v, velocity, acceleration)
        );
        milkContact();
    }
    startPositionAnimation(0, velocity, acceleration);
    const anim = Animated.loop(Animated.timing(ballAngleRef.current, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
    }));

    const startRotationAnimation = () => {
        anim.start(
            () => {}
        );    
    }
    const stopRotationAnimation = () =>{
        ballAngleRef.current.setValue(0);
        anim.stop();
    }
        
    return (
        <>
        <View style = {Level1Styles.main}>
            <Image
                style = {Level1Styles.bgImage}
                source = {require('../assets/gameBackground.png')}
            />
        </View>
      
        <Animated.View style={[Level1Styles.ball]}>
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