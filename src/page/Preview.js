import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, Image } from 'react-native';
import { HeaderButton, CommonPage, RowBox, DetailList } from '../components';
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
        const { styText } = styles;

        return this.state.abbrAndMeaning.map(data =>        
            <DetailList key={ data.abbrData }>                                    
                <RowBox>                                   
                    <Text style={styText}>{ data.abbrData + " - " + data.meaningData }</Text>                                                
                </RowBox>
            </DetailList>
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

        this.setState({ id_main: params.id_main,
            title: params.title,
            category: params.category,
            abbrAndMeaning: params.abbrAndMeaning,
            numberKey: params.numberKey});
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

    topContent = () => {
        const {styTopContent, styTopText, styTopSub, styBadge, styBDText} = styles;

        let title = <Text style={styTopText}>Title not set</Text>;
        let keyword = <Text style={styTopSub}>Keyword not set</Text>;

        if (this.state.title != null && this.state.title != ''){
            title = <Text style={styTopText}>{this.state.title}</Text>
        }

        if (this.state.numberKey > 0){
            keyword = <Text style={styTopSub}>{ this.setKeyword()}</Text>
        }

        return (
            <View style={styTopContent}>
                {title}
                {keyword}
                <View style={styBadge}>
                    <Text style={styBDText}>{ this.state.numberKey }</Text>
                </View>
            </View>
        );
    }

    getMainContent = () => {
        let content = null;
        const { styEmptyList, styThin, styBold, imgInfo } = styles;

        if (this.state.numberKey > 0){
            content = (
                content = this.extractData()             
            );
        }else {
            content = (
                <View style={styEmptyList}>
                    <Image style={imgInfo} source={require('../img/empty_list.png')} />
                    <Text style={styBold}>LIST IS EMPTY</Text>
                    <Text style={styThin}>Create min 1 abbrevation</Text>
                </View>
            );
        }

        return content;
    }

    render(){
        const { styContent, stySubtitle} = styles;    

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#317256' />
                {this.topContent()} 
                <ScrollView>
                    <CommonPage>   
                        {this.getMainContent()}
                    </CommonPage>
                </ScrollView>                  
            </View>
        );
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
    },
    styText: {
        flex: 0, 
        height: 21, 
        justifyContent: 'center', 
        color: '#747d8c',
        fontFamily: 'quicksand',
    },
    styBadge: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginTop: 5,
    },
    styBDText: {
        color: '#52BF90',
        fontFamily: 'quicksand_medium'
    },
    styEmptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    styThin: {
        fontFamily: 'quicksand'
    },
    styBold: {
        fontSize: 19,
        fontFamily: 'quicksand-medium'
    },
    imgInfo: {
        marginBottom: 5
    }  
}

export { Preview }