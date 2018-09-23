import React, { Component } from 'react';
import { View } from 'react-native';

const DetailList = (props) => {
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            {props.children}
        </View>
    );
}

const styles = {    
    styContent: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .9,
        borderBottomColor: '#ced6e0',                       
        height: 75,         
    }
}

export { DetailList };