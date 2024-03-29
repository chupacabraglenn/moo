import React, { useRef, useState } from 'react';
import { Ball } from './Ball';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button, Pressable, Animated, Easing } from 'react-native';

export const Level2 = ({setLevel}) => {

    const [ballProps, setBallProps] = useState({
        posX: 0,
        velocityX: 0,
        accelerationX: 0
    });

    const handlePressRight = () => {
        setBallProps({...ballProps, velocityX: 30, accelerationX: 1});
    }

    const handlePressLeft = () => {
        setBallProps({...ballProps, velocityX: -30, accelerationX: -1});
    }

    const handlePressOut = () => {
        return false;
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

    const isTouchingFloor = () => {
        return true;
        // if (ballProps.posY == 50) {

        // }
    }

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

    const milkContact = () => {

        const cowSpace = {
            left: ballProps.posX,
            right: ballProps.posX + 163,
            bottom: 37,
            top: 200 // + ballLeft.y
        }

        const milkSpace = {
            left: 600,
            right: 650,
            bottom: 50,
            top: 170
        }

        if (cowSpace.right >= milkSpace.left  && cowSpace.left <= milkSpace.right &&
            cowSpace.bottom <= milkSpace.top && cowSpace.top >= milkSpace.bottom) {
            setLevel(1);
        }
    }

    milkContact();
    
    return (
        <>
        <View style = {Level2Styles.main}>
            <Image
                style = {Level2Styles.bgImage}
                source = {require('../assets/gameBackground.png')}
            />
        </View>
      
        <Ball ballProps = {ballProps} setBallProps = {setBallProps} isTouchingFloor = {isTouchingFloor}/>

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