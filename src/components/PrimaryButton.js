import React, { COmponent } from 'react';
import { View, TouchableOpacity } from 'react-native';

const PrimaryButton = (props) => {
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
        borderRadius: 30,
        height: 45,
        backgroundColor: '#1e90ff',        
    }
}

export { PrimaryButton }