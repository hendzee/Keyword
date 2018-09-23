import React, { Component } from 'react';
import { View } from 'react-native';

const DescList = (props) => {
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
        flexDirection: 'column',
        marginLeft: 7.5,
        marginTop: 2.5,
        marginRight: 5,
        marginBottom: 2.5,
        height: 75,
        justifyContent: 'center', 
    }
}

export { DescList };