import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//IMPORT DA TELA DE LOGIN
import LoginScreen from './src/pages/LoginScreen';

//IMPORT DA TELA DE HOME
import TelaHomeApp from './src/pages/TelaHomeApp';

//PILHA DE NAVEGAÇÃO
const AppNavigator = createStackNavigator({
  //PRIMEIRO ELEMENTO DA PILHA DE NAVEGAÇÃO
  'Login':{

    screen: LoginScreen,
    navigationOptions:{
      title: 'TELA DE LOGIN'
    }
  },
  //SEGUNDA ELEMENTO DA PILHA DE NAVEGAÇÃO 
  'Home':{

    screen: TelaHomeApp,
    navigationOptions:{
      title: 'HOME- USUÁRIO LOGADO'
    }
  }

},{
  defaultNavigationOptions: {

    // ESTILIZAÇÃO GLOBAL DOS CABEÇALHOS DE NAVEGAÇÃO
    headerStyle:{
      backgroundColor:'#9498EF',
      borderBottomColor:'#c5c5c5',
    },
    headerTitleStyle:{
      color: '#fff',
      fontSize: 30
    }
  } 
})


const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
