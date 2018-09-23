import React, { Component } from 'react';
import { View } from 'react-native';

const RowBox = (props) =>{
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            { props.children }
        </View>
    );
}

const styles = {
    styContent: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    }
}

export { RowBox }