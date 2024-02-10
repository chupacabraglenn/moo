import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { withAnchorPoint } from 'react-native-anchor-point';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button, Pressable, Animated, Easing } from 'react-native';

export const Level2 = ({setLevel}) => {

    console.log("in level 2");
    let velocity = 0;
    let acceleration = 0;

    const Level2Styles = StyleSheet.create({
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
            top: 85,
            position: "absolute",
            // ballSpeed: 0,
            // ballPosition: 0
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
        },

        hay: {
            width: 100,
            height: 100,
            left: 50,
            bottom: 50,
            position: 'absolute'
        }
    });

    
    let ballPos = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    let ballAngle = useRef(new Animated.Value(0)).current;
    
    // ballAngle.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg'],
    // })

    let decelerationInterval = null;

    const handlePressRight = () => {
        acceleration = 1;
        if (decelerationInterval) {
            clearInterval(decelerationInterval);
        }
    }

    const handlePressLeft = () => {
        acceleration = -1;
        if (decelerationInterval) {
            clearInterval(decelerationInterval);
        }
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

            decelerationInterval = setInterval(() => {
                // if (velocity <= 0) {
                if (velocity == 0) {
                    acceleration = 0;
                    clearInterval(decelerationInterval);
                }
            }, 100);
        }
        else if (velocity < 0) {
            acceleration = 0.5;
    
            decelerationInterval = setInterval(() => {
                // if (velocity >= 0) {
                if (velocity == 0) {
                    acceleration = 0;
                    clearInterval(decelerationInterval);
                }
            }, 100);
        }
    }

    const milkContact = () => {

        const cowSpace = {
            left: ballPos.x._value,
            right: ballPos.x._value + 163,
            bottom: ballPos.y._value + 37,
            top: ballPos.y._value + 200
        }

        const milkSpace = {
            left: 750,
            right: 810,
            bottom: 50,
            top: 170
        }

        if (cowSpace.right >= milkSpace.left  && cowSpace.left <= milkSpace.right &&
            cowSpace.bottom <= milkSpace.top && cowSpace.top >= milkSpace.bottom) {
            setLevel(2);
        }
    }

    const groundContact = (x, y) => {

        const cowSpace = {
            left: x,
            right: x + 163,
            bottom: y,
            top: y - 163
        }

        const haySpace = {
            left: 0,
            right: 50,
            bottom: 75,
            top: 0
        }

        if (y >= 95) {
            return 95;
        }

        if (cowSpace.right >= haySpace.left  && cowSpace.left <= haySpace.right &&
            cowSpace.bottom >= haySpace.top) {
            return haySpace.top;
        }

        return -100000;
    }

    // Animated.loop(
    //     Animated.parallel([

    //     ]);
    // ).start();

    const chooseInterpolate = (v) => {
        if (v > 0) {
            return ballAngle.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
            })
        }
        else if (v < 0) {
            return ballAngle.interpolate({
                inputRange: [0, 1],
                outputRange: ['360deg', '0deg'],
            })
        }
        else {
            return ballAngle.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '0deg'],
            })
        }
    }

    const startPositionAnimation = (x, v, a, y, yVelocity, setVelocity) => {

        chooseInterpolate(v);

        let groundY = groundContact(x, y + yVelocity);

        if (groundY > -100000) {
            yVelocity = 0;
            y = groundY;
        }
        else {
            yVelocity = yVelocity + 2;
        }

        ballPos.setValue({
            x: x,
            y: y,
        });

        setVelocity(v + a);

        // console.log(ballAngle._value, v, (ballAngle._value + v * 12) % 360);
        // ballAngle.setValue((ballAngle._value + v * 12));
        // ballAngle.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [ballAngle._value + 'deg', (ballAngle._value + v * 12) + 'deg'],
        // })
        // console.log(ballAngle._value, v, (ballAngle._value + v * 12));


        Animated.timing(ballPos, {
            toValue: {
                x: x + v,
                y: y + yVelocity
            },
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(
            () => startPositionAnimation(x + v, velocity, acceleration, y + yVelocity, yVelocity, setVelocity)
        );
        milkContact();
        groundContact();
    }
    startPositionAnimation(0, velocity, acceleration, -200, 0, (newVelocity) => velocity = newVelocity);

    // const startRotationAnimation = (velocity) => {
    //     // console.log(ballAngle._value, velocity);
    //     ballAngle.setValue(0);

    //     Animated.timing(ballAngle, {
    //         // toValue: ballAngle._value + velocity,
    //         // duration: 100,
    //         toValue: 1,
    //         duration: 1000,
    //         easing: Easing.linear,
    //         useNativeDriver: true
    //     }).start();
    //         // startRotationAnimation(velocity)
    // };
    // startRotationAnimation(velocity);

    Animated.loop(
        Animated.timing(ballAngle, {
            // toValue: ballAngle._value + velocity,
            // duration: 100,
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        })
    ).start();

    const trans = {
        translateX: ballPos.x,
        translateY: ballPos.y
    }

    const ballInterpolate = ballAngle.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const ballRotationStyle = [{
        transform: [
            {rotate: ballInterpolate},
        ],
      }];

    const ballPositionStyle = [{
        transform: [
            {translateX: ballPos.x},
            {translateY: ballPos.y}
        ]
    }];

    return (
        <>
        <View style = {Level2Styles.main}>
            <Image
                style = {Level2Styles.bgImage}
                source = {require('../assets/gameBackground.png')}
            />
        </View>
      
        <Animated.View style={[Level2Styles.ball, ballPositionStyle]}>
            <Animated.View style={(ballRotationStyle)}>
                <Image
                    style = {Level2Styles.character}
                    source = {require('../assets/mooCharacter.png')}
                />
            </Animated.View>
        </Animated.View>

        <Image
            style = {Level2Styles.milk}
            source = {require('../assets/MilkBottle.png')}
        />

        <Image
            style = {Level2Styles.hay}
            source = {require('../assets/hayBale.jpeg')}
        />

        <View style = {Level2Styles.container}>
  
        <TouchableOpacity onPressIn = {handlePressRight} onPressOut = {handlePressOut} style = {Level2Styles.buttonRight}>
  
        </TouchableOpacity>

        <TouchableOpacity onPressIn = {handlePressLeft} onPressOut = {handlePressOut} style = {Level2Styles.buttonLeft}>
  
        </TouchableOpacity>
  
        </View>

        </>
    )
}