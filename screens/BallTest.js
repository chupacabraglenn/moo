import React, {Component} from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';

export default class Bounce extends Component {
    
    render() {
        return (
        <View style = {styles.container}>

            <Animated.View> style = {styles.ball}

            </Animated.View>

            <TouchableOpacity style = {styles.button}>

            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create( {
    ball: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "tomato",
        position: "absolute",
        left: 160,
        top: 150,
    },
    button: {
        width: 15,
        height: 70,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fc5c65",
        marginVertical: 50,
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    }
});