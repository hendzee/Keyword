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
        const { styContent, stySubtitle, styIcon, styText, styTopContent,
            styTopText, styTopSub } = styles;

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#317256' />
                <View style={styTopContent}>
                    <Text style={ styTopText }>
                        Keyword
                    </Text>                                   
                    <Text style={styTopSub}>{ this.extractData() }</Text>                                            
                </View>
                <CommonPage>
                    <ScrollView>
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
        backgroundColor: '#ffffff'
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
    styTopContent: {
        width: '100%',
        height: 150,
        backgroundColor: '#52BF90',
        alignItems: 'center',
        justifyContent: 'center'
    },
    styTopText: {
        fontFamily: 'quicksand_medium',
        fontSize: 19,
        color: '#fff'
    },
    styTopSub: {
        fontFamily: 'quicksand',
        fontSize: 12,
        color: '#fff'
    }
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