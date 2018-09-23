import React, { Component } from 'react';
import { Text, View, TextInput, Image, ScrollView, StatusBar, Alert } from 'react-native';
import { HeaderButton, CommonPage, InputBox, RowBox, PrimaryButton, SecondaryButton, GreenButton, Separator, Footer } from '../components'
import { NavigationActions } from 'react-navigation'
import Realm from 'realm';

class AddItems extends Component{
    constructor(props){
        super(props);
        this.state = { 
            id_main: 0,
            title: '',
            category: '',
            tempAbbr: '',
            abbrAndMeaning: [],
            tempMeaning: '',   
            numberKey: 0,
            status: '',
        };
    }    

    static navigationOptions = ({ navigation }) => {                

        return({
            headerLeft: (
                <HeaderButton onPress={() => navigation.navigate('home')}>
                    <Image 
                        source={require('../img/back.png')} 
                        style={{ width: 33, height: 33, tintColor: '#f8fcf6' }}                                             
                    />
                </HeaderButton>
            )   
        })        
    }

    componentWillMount(){
        this.setState({ status: 'OPEN' });
    }

    createIdMain = () => {
        let temp = Math.floor((Math.random() * 100) + 1);

        Realm.open(databaseOptions).then(realm => {                            
            while(true){
                temp = Math.floor((Math.random() * 100) + 1);

                let searchId = realm.objects('main_table').filtered('id_main = $0', temp);                    
                
                if(searchId.length == 0){                
                    break;
                }
            }                            

            this.setState({ id_main: temp });            
        });        
    }

    createIdList = () => {
        let temp = Math.floor((Math.random() * 100) + 1);
        
        Realm.open(databaseOptions).then(realm => {
            while(true){
                temp = Math.floor((Math.random() * 100) + 1);

                let searchId = realm.objects('list_table').filtered('id_list = $0', temp);                    
                
                if(searchId.length == 0){                
                    break;
                }
            }            
        });

        return temp;
    }

    insertState = () => {
        let tempOne = this.state.tempAbbr;
        let tempTwo = this.state.tempMeaning;

        if(tempOne !== null && tempOne !== '' && tempTwo !== null && tempTwo !== ''){
            this.setState({
                abbrAndMeaning: [...this.state.abbrAndMeaning, { abbrData: tempOne, meaningData: tempTwo }]                    
            }, () => {
                this.setState({ tempAbbr: '' });
                this.setState({ tempMeaning: '' });
                this.setState({ numberKey: this.state.numberKey + 1 });
            });                        
        }
    }   

    deleteState = () => {
        this.setState({ tempAbbr: '' });
        this.setState({ tempMeaning: '' });
    }

    saveData = () => {
        this.createIdMain();
        
        Realm.open(databaseOptions).then(realm => {
            
            realm.write(() => {
                realm.create('main_table', {
                    id_main: this.state.id_main,
                    title: this.state.title,
                    category: this.state.category,
                    status: this.state.status
                })
            });

            this.state.abbrAndMeaning.map(data => {
                let tempIdList = this.createIdList();
                let abbrVal = data.abbrData;
                let meaningVal = data.meaningData;
                
                realm.write(() => {                                                    
                    realm.create('list_table', {
                        id_main: this.state.id_main,
                        id_list: tempIdList,
                        abbrevation: abbrVal,
                        meaning: meaningVal
                    });
                });                        
            });
            
            this.cleanState();
            Alert.alert('data saved');
        });
    }

    cleanState = () => {
        this.setState({
            id_main: 0,
            title: '',
            category: '',
            tempAbbr: '',
            abbrAndMeaning: [],
            tempMeaning: '',   
            numberKey: 0,
        })
    }

    render(){
        const { styContent, styInput, styIcon, stySubtitle, styButtonText } = styles;

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#317256' />                
                <CommonPage>
                    <Text style={ stySubtitle }>
                        Description
                    </Text>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/create.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input title'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#dfe4ea'
                            maxLength={ 25 }
                            onChangeText={(text) => this.setState({ title: text })}
                            value={ this.state.title }
                        />
                    </InputBox>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/label.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input category'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#dfe4ea'
                            maxLength={ 15 }
                            onChangeText={(text) => this.setState({ category: text })}
                            value={ this.state.category }
                        />
                    </InputBox>                   
                    <Text style={ stySubtitle }>
                        Keyword { '(' + this.state.numberKey + ')' }
                    </Text>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/key.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input abbrevation'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#dfe4ea'
                            maxLength={ 15 }
                            onChangeText={(text) => this.setState({ tempAbbr: text })}
                            value={ this.state.tempAbbr }
                        />
                    </InputBox>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/eye.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input meaning'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#dfe4ea'
                            maxLength={ 15 }
                            onChangeText={(text) => this.setState({ tempMeaning: text })}
                            value={ this.state.tempMeaning }
                        />
                    </InputBox>
                    <RowBox>  
                        <SecondaryButton onPress={ this.deleteState }>
                            <Text style={ styButtonText }> Cancel </Text>
                        </SecondaryButton>                            
                        <Separator />
                        <SecondaryButton onPress={ () => this.props.navigation.navigate(
                                'preview', 
                                { 
                                    id_main: this.state.id_main,
                                    title: this.state.title,
                                    category: this.state.category,
                                    abbrAndMeaning: this.state.abbrAndMeaning,
                                    numberKey: this.state.numberKey,
                                    status: this.state.status
                                }) }>
                            <Text style={ styButtonText }> Preview </Text>
                        </SecondaryButton>
                        <Separator />
                        <PrimaryButton onPress={ this.insertState }>
                            <Text style={ styButtonText }> Add </Text>
                        </PrimaryButton>
                    </RowBox>                                       
                    <Footer>
                        <GreenButton onPress={ this.saveData }>
                            <Text style={ styButtonText }>Save</Text>
                        </GreenButton>
                    </Footer>                      
                </CommonPage>                                                       
            </View>
        );
    }    
}

const styles = {
    styContent: {
        flex: 1,                
    },
    styInput: {
        flex:1,        
        height: 45,
        color: '#747d8c',
        fontFamily: 'quicksand',
        paddingTop: 10
    },
    styIcon: {        
        height: 17,
        width: 17,   
        marginLeft: 15,
        marginTop: 15,               
        marginRight: 15,      
        marginBottom: 15,
        tintColor: '#747d8c'
    },
    stySubtitle: {
        color: '#a4b0be',                             
        marginTop: 15,
        fontFamily: 'quicksand'
    },
    styButtonText: {
        color: '#fff', 
        fontFamily: 'quicksand'
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

export { AddItems };