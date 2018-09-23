import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, Image } from 'react-native';
import { HeaderButton, CommonPage } from '../components';
import { NavigationActions } from 'react-navigation';

class Preview extends Component{    
    constructor(props){    
        super(props) 

        this.state = {
            id_main: 0,
            title: '',
            category: '',
            abbrAndMeaning: [],
            numberKey: 0,            
        }        
    }

    componentWillMount(){
        this.insertState();
    }

    //extract data abbr and meaning
    extractData = () => {
        return this.state.abbrAndMeaning.map(data =>        
            <Text key={ data.abbrData }>{ data.abbrData + " - " + data.meaningData }</Text>
        )
    }

    setKeyword = () => {
        let temp = '';

        this.state.abbrAndMeaning.map(data => {
            temp += data.abbrData
        });

        return temp;
    }

    insertState = () =>{
        const { params } = this.props.navigation.state;

        this.setState({ id_main: params.id_main });
        this.setState({ title: params.title });
        this.setState({ category: params.category });
        this.setState({ abbrAndMeaning: params.abbrAndMeaning });
        this.setState({ numberKey: params.numberKey });        
    }

    static navigationOptions = ({ navigation }) => {                

        return({
            headerLeft: (
                <HeaderButton onPress={() => navigation.dispatch(NavigationActions.back())}>
                    <Image 
                        source={require('../img/back.png')} 
                        style={{ width: 33, height: 33, tintColor: '#f8fcf6' }}                                             
                    />
                </HeaderButton>
            )   
        })        
    }    

    render(){
        const { styContent, stySubtitle } = styles;        

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#317256' />
                <ScrollView>
                    <CommonPage>                
                        <Text style={ stySubtitle }>Title</Text>
                        <Text>{ this.state.title }</Text>
                        <Text style={ stySubtitle }>Category</Text>
                        <Text>{ this.state.category }</Text>
                        <Text style={ stySubtitle }>Total Key</Text>
                        <Text>{ this.state.numberKey }</Text>
                        <Text style={ stySubtitle }>Keyword</Text>
                        <Text>{ this.setKeyword() }</Text>
                        <Text style={ stySubtitle }>Keyword List</Text>
                        { this.extractData() }
                    </CommonPage>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    styContent: {
        flex: 1,                
        backgroundColor: '#dfe4ea'
    },
    stySubtitle: {
        color: '#a4b0be',                             
        marginTop: 15,
        fontFamily: 'quicksand',
    },
}

export { Preview }