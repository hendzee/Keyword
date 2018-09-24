import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, CheckBox } from 'react-native';
import { DetailList, ImageList, DescList, WordList } from '../components';

class DataList extends Component{    
    constructor(props){
        super(props);
    }    
    render(){
        const { styList, styTitle, stySubTitle, styWordSum, styCheckbox } = styles;                

        return(            
            <TouchableOpacity key={ this.props.data.id_main } onPress={this.props.onPress}>
                <DetailList>
                    <CheckBox 
                        value={this.props.CBoxValue}
                        onValueChange={this.props.onChangeCheck} 
                        style={styCheckbox}
                    />  
                    <DescList>                  
                        <Text style={ styTitle }>{ this.props.data.title }</Text>                        
                        <Text style={ stySubTitle }>{ this.props.data.category }</Text>
                    </DescList>                      
                </DetailList>                                
            </TouchableOpacity>
        );
    }
}

const styles = {   
    styList: {
        flex: 1,        
        marginLeft: 5,
        marginTop: 5,
        marginRight: 5,
        marginBottom: 5,        
    },       
    styTitle: {
        fontSize: 19,
        color: '#747d8c',
        fontFamily: 'quicksand_medium'
    },
    stySubTitle: {
        color: '#747d8c',
        fontFamily: 'quicksand'
    },
    styWordSum: {       
        fontSize: 13.5,
        fontWeight: '900',
        color: '#52bf90',
        fontFamily: 'quicksand'    
    },  
    styCheckbox: {
        marginRight: 5
    } 
}

export { DataList };