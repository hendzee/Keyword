import React, { Component } from 'react';
import { View, Image, Text, StatusBar, ScrollView, Alert } from 'react-native';
import { CommonPage, HeaderButton, RowBox, DetailList, Footer, GreenButton } from '../components';
import Realm from 'realm';

class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            listTableData: []
        };    
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData = () => {
        const { params } = this.props.navigation.state;

        Realm.open(databaseOptions).then(realm => {
            let dataTable = realm.objects('list_table').filtered('id_main = $0', params.dataReview);

            this.setState({ listTableData: dataTable });
        });
    }

    extractData = () => {
        let keyword = '';

        this.state.listTableData.map(data => 
            keyword += data.abbrevation
        );

        return keyword;
    }

    extractAbbrevation = () => {
        const { styIcon, styText } = styles;

        return this.state.listTableData.map(data => 
            <DetailList key={ data.id_list }>                                    
                <RowBox>         
                    <Image 
                        source={require('../img/dot.png')}
                        style={ styIcon } 
                    />                              
                    <Text style={styText}>{ data.abbrevation + " - " + data.meaning }</Text>                                                
                </RowBox>
            </DetailList>
        )
    }

    static navigationOptions = ({ navigation }) =>{                
        return{
            headerLeft: (
                <HeaderButton onPress={() => navigation.navigate('home')}>
                    <Image 
                        source={require('../img/back.png')} 
                        style={{ width: 33, height: 33, tintColor: '#f8fcf6' }}                                             
                    />
                </HeaderButton>
            )
        }
    }

    render(){  
        const { styContent, stySubtitle, styIcon, styText } = styles;

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#317256' />
                <CommonPage>
                    <ScrollView>
                        <Text style={ stySubtitle }>
                            Keyword
                        </Text>
                        <DetailList>                                    
                            <RowBox>                        
                                <Image 
                                    source={require('../img/key.png')}
                                    style={ styIcon } 
                                />                              
                                <Text style={styText}>{ this.extractData() }</Text>                            
                            </RowBox>
                        </DetailList>
                        <Text style={ stySubtitle }>
                            Abbrevation
                        </Text> 
                        { this.extractAbbrevation() }
                    </ScrollView>
                </CommonPage>
            </View>
        )
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
    styIcon: {
        height: 19,
        width: 19,
        marginRight: 35,
        tintColor: '#747d8c'
    },
    styText: {
        flex: 0, 
        height: 21, 
        justifyContent: 'center', 
        color: '#747d8c',
        fontFamily: 'quicksand',
    },    
}

//Realm Database
const mainTable = {
    name: 'main_table',
    properties: {
        id_main: 'int',
        title: 'string',
        category: 'string',
        status: 'string'
    }
}

const listTable = {
    name: 'list_table',
    properties: {
        id_main: 'int',
        id_list: 'int',
        abbrevation: 'string',
        meaning: 'string'
    }
}

const databaseOptions = {
    schema: [mainTable, listTable]
}

export { Review }