import React, { COmponent } from 'react';
import { View, TouchableOpacity } from 'react-native';

const GreenButton = (props) => {
    const { styContent, styBtn } = styles;

    return(
        <View style={ styContent }>
            <TouchableOpacity
                style={ styBtn }                                 
                onPress={ props.onPress } 
            >               
            { props.children }
            </TouchableOpacity> 
        </View>
    );
}

const styles = {
    styContent: {
        flex: 1
    },
    styBtn: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        height: 45,
        backgroundColor: '#52bf90',        
    }
}

export { GreenButton }