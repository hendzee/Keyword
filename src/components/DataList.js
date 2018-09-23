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
                    <WordList>
                        <Text style={ styWordSum }>
                            { this.props.data.status }
                        </Text>                                
                    </WordList>                        
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
        fontWeight: '800',
        fontSize: 19,
        color: '#747d8c'
    },
    stySubTitle: {
        color: '#747d8c'
    },
    styWordSum: {       
        fontSize: 13.5,
        fontWeight: '900',
        color: '#52bf90'    
    },  
    styCheckbox: {
        marginRight: 5
    } 
}

export { DataList };