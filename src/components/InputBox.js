import React, { Component } from 'react';
import { View } from 'react-native';

const InputBox = (props) => {
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            { props.children }
        </View>
    );
}

const styles = {
    styContent: {
        flex: 0,
        height: 45,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center',        
        backgroundColor: '#f1f2f6',       
        marginTop: 13,
        marginBottom: 13
    }
}

export { InputBox }