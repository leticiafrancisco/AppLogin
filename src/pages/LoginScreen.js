import React from 'react';
import {StyleSheet, View,TextInput,Button, Alert} from 'react-native';
//IMPORT DO FIREBASE
import firebase from 'firebase';


//CLASS COMPONENTE DA TELA DE LOGIN
export default class LoginScreen extends React.Component{
   
    /*RECEBER OS DADOS DIGITADOS DE EMAIL E SENHA
 
        1º CRIAR UMA STATE PARA GUARDAR OS DADOS DE EMAIL E SENHA
        2º CRIAR O METODOS DE CAPTURA DE EMAIL E SENHA
        3º FAZER A CHAMADA DOS MÉTODOS DE CAPTURA DE EMAIL E SENHA NOS CAMPOS DE TEXTO
        4º ESTABELECER A CONEXÃO COM O FIREBASE
        5º PROGRAMAR O MÉTODO DE LOGIN
        6º CHAMADA DO MÉTODO DE LOGIN DO BOTÃO
        7º IMPLEMENTANDO A PRIMEIRA VERSÃO DO LOGIN NO MÉTODO trylogin
        8º IMPLEMENTAMOS A CRIAÇÃO DE USUÁRIOS NÃO EXISTENTES
        9º NAVEGAR PARA TELA DE HOME DO APLICATIVO
    */
 
    //CONSTRUTOR DA CLASSE
    constructor(props){
 
        //PASSA A PROPS DE LOGINSCREEN PARA O CONSTRUTOR DE COMPONENT
        super(props);
    
        //CRIAÇÃO DA STATE QUE RECEBE OS DADOS DE EMAIL E SENHA
        this.state = {
    
            email: '',
            password: ''
        }
    }

    // MÉTODO DE CAPTURA DE E-MAIL
    onChangeEmail(value){
        this.setState({
            email:value
        })
    }


    //MÉTODO DE CAPTURA DE SENHA
    onChangePassword(value){
        this.setState({
            password:value
        })
    }
    
    //MÉTODO DE LOGIN NO FIREBASE (TESTE DE STATE)
     tryLogin(){
        //TESTE DE STATE
        console.log(this.state);

        //IMPLEMENTAÇÃO DO CÓDIGO DE TENTATIVA DE LOGIN
        //TENTA REALIZAR O LOGIN NO FIREBASE (TRY=TENTATIVA)
        try{
 
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
            
                console.log('USUÁRIO AUTENTICADO -> ', response.user);
                //NAVEGAÇÃO PARA A TELA DE LOGADO
                //this.props.navigation.navigate('Home')
                //sem a setinha
                this.props.navigation.replace('Home')
            
            }).catch(error => {
                console.log('ERRO DE AUTENTICAÇÃO', error.code)
                //TRATAMENTO DE ERRO DE USUARIO NÃO ENCONTRADO
                if(error.code === 'auth/user-not-found')
                {
                    /*
                        PARAMENTROS DO MÉTODO alert DO COMPONENT ALERT
                        1º PARAMETRO -> TITULO DA CAIXA DE ALERTA
                        2º PARAMETRO -> MENSAGEM DA CAICA DE ALERTA
                        3º PARAMETRO ->ARRAY CONTENDO OS BOTÕES DE OPÇÃO, 
                                        BOTÕES DE OPÇÃO DA CAIXA DE ALERTA DEVEM SER PRESENTADOS POR
                                        OBJETOS DE NOTAÇÃO JSON -> {atributo: valor}
                        4º PARAMETRO ->
                    */
                   Alert.alert
                   (
                       'USUÁRIO NÃO ENCONTRADO',
                       'DESEJA CRIAR UM NOVO USUARIO COM OS DADOS INFORMADOS?',
                       [    
                           {
                               text:'NÃO',
                               onPress:()=> {
                                   console.log('CLICOU NO NÃO')
                                
                                }
                            },
                            
                           {//INICIO DO JSON DO BOTÃO SIM 
                               text: 'SIM',
                               onPress: () => {//INICIO DA ARROW DE CRIAÇAO DO USUÁRIO
                                    console.log('CLICOU NO SIM!');
                                    firebase
                                    .auth()
                                    .createUserWithEmailAndPassword( this.state.email, this.state.password)
                                    .then( user => {
                                
                                        console.log('USUÁRIO CRIADO COM SUCESSO->', user)
                                        //NAVEGAÇÃO PARA A TELA DE LOGADO
                                        this.props.navigation.replace('Home')
                                
                                    }).catch(error => {
                                
                                        console.log('ERRO AO CRIAR USUÁRIO->', error)
                                        Alert.alert( 
               
                                            'ALERTA!',
                                            'ERRO AO CRIAR USUÁRIO',
                                             [
                                                 {
                                                     text:'OK',
                                                     onPress:()=> {
                                                         console.log('CLICOU EM OK')
                                                      
                                                     }
                                                 }
                                             ]    
                                        )
                                         
                                
                                    })
                                }
                            }//FIM DO JSON DO BOTÃO SIM 
                       ]
                    );
                }
            })
        }    
        //TRATA UM ERRO DE TENTATIVA DE LOGIN (CATCH = PEGA)
        catch(error){
            console.log('ERRO NO TRY ->', error)
           Alert.alert( 
               
               'ALERTA',
               'ERRO NO SERVIDOR DE LOGIN',
                [
                    {
                        text:'OK',
                        onPress:()=> {
                            console.log('CLICOU EM OK')
                         
                        }
                    }
                ]    
           )
            
        }
    
    }
    //INICIALIZAR A CONEXÃO DO FIREBAS
    /* A IMPORTANCIA DO COMPONENTDIDMOUNT COMO O SERVIDOR DE DADOS É EXTERNO ELE PASSA AS INFORMAÇÕES
    *   PARA OS LUGARES ESPECIFICOS ENQUANTO AGUARDA A RESPOSTA ENQUANTO ISSO O SEU APP SE MANTEM FUNCIONANDO
    */
    componentDidMount(){
        //DADOS PARA CONECTAR NO SERVIDOR
        const firebaseConfig = {
            apiKey: "AIzaSyDkic_IVcv8ToVBbCUoWggmUAncx_oty3w",
            authDomain: "pam1-leticiafrancisco.firebaseapp.com",
            projectId: "pam1-leticiafrancisco",
            storageBucket: "pam1-leticiafrancisco.appspot.com",
            messagingSenderId: "613632107447",
            appId: "1:613632107447:web:86f5d2a4625d9bf9b1be32",
            measurementId: "G-24TQJE9EW1"
        };
        //TESTE DE SEGURANÇA
        if(firebase.apps.length ===0)
        {
            firebase.initializeApp(firebaseConfig);
        }
        
        //console.log(firebase);
    }

    render(){

        return(
            <View>
 
                <TextInput 
                    placeholder="seuemail@gmail.com" 
                    style={styles.input}
                    /* O onChangeText será executado toda vez que o usuário digitar no front-end 
                        e passa as informações para value que chama o this.onChangeEmail que faz
                        um copia das informações passando ela pra state e salvando as informações
                    */
                    onChangeText={value =>
                        {
                            this.onChangeEmail(value) 
                            //TESTE DE RECEBIMENTO DE DADOS DA APLICAÇÃO
                            //console.log(value);
                        }
                    }
                />
                <TextInput 
                    placeholder="********" secureTextEntry 
                    style={styles.input}
                    onChangeText={value => 
                        { 
                            this.onChangePassword(value);
              ;              //console.log(value);
                        } 
                    }
                />

                <Button title="ENTRAR" 
                    onPress={()=>{this.tryLogin()}}
                />
 
            </View>

        )
    }
}

const styles = StyleSheet.create({
 
    input:{
        padding: 10,
        borderBottomWidth:2,
    },

    caixatexto:{

    }
    
})