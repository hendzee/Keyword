import { Home, AddItems, Preview, Review, Test } from './page';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({    
    home: {
        screen: Home,
        navigationOptions: {
            title: 'KeyWord',
            headerStyle: {
                backgroundColor: '#52bf90',
                shadowOpacity: 0,                
                elevation: 0
            },
            headerTitleStyle: {                
                color: '#f8fcf6'
            },
            headerLeft: null
        }
    },
    additems: {
        screen: AddItems,
        navigationOptions: {
            title: 'New',
            headerStyle: {
                backgroundColor: '#52bf90',
                shadowOpacity: 0,                
                elevation: 0
            },
            headerTitleStyle: {                
                color: '#f8fcf6'
            },            
        }
    },
    preview: {
        screen: Preview,
        navigationOptions: {
            title: 'Preview',
            headerStyle: {
                backgroundColor: '#52bf90',
                shadowOpacity: 0,                
                elevation: 0,                
            },
            headerTitleStyle: {
                color: '#f8fcf6',                
            }
        },          
    },
    review: {
        screen: Review,
        navigationOptions: {
            title: 'Review',
            headerStyle: {
                backgroundColor: '#52bf90',
                shadowOpacity: 0,                
                elevation: 0
            },
            headerTitleStyle: {                
                color: '#f8fcf6'
            },            
        }
    },
});

export default App;