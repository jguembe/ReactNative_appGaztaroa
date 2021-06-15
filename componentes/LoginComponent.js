import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';
import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
import firebase from 'firebase/app';
import auth from 'firebase/auth';


function showAlert(title, text){
  Alert.alert(
    title,
    text,
    [
      {
        text: "OK",
        style: "cancel"
      },
    ],
    {cancelable: true}
  )
};

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          initializing: true,
          user: null,
          email: '',
          password: '',
          password2: '',
          signin: false,
      }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        console.log("LOGED");
        this.setState({ user: user });
      }else{
        console.log("NOT LOGUED");
      }
    });
  }

    handleLogin = () => {
      if(this.state.signin){
        this.setState({signin: false});

      }else{
        const { email, password } = this.state;

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(error =>{ console.log(error); showAlert("Error",error.message)});
      }

    };

    handleSignIn = () => {
      console.log(this.state.signin);
      if(!this.state.signin){
        this.setState({ signin: true });
      }else{
        if(this.state.password==this.state.password2){
          firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
              console.log('User registered successfully!')
              this.setState({
                user: res.user,
              });
              showAlert("Exito!","Cuenta registrada correctamente!");
            })
            .catch(error =>{ console.log(error); showAlert("Error",error.message)});

        }else{
          showAlert("Error","Las contraseñas no coinciden");
        }
      }
    };

    render() {
      if (this.state.user){

        return(
          <View style={styles.container}>
          <Text style={styles.logintext}> Ongi etorri {this.state.user.email} !</Text>
          <Button  style={styles.logout}
            onPress={() => firebase.auth().signOut().then(() => {
                              console.log("SignOut successful.");
                            }).catch((error) => {
                              console.log("SignOut error.");
                            })}
            title="Salir"
            color="#f70000" />
            </View>
        )

      }else if(this.state.signin){
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password2}
                    onChangeText={password2 => this.setState({ password2 })}
                    placeholder='Repetir contraseña'
                    secureTextEntry={true}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleSignIn}>
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button2}
                  onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>

            </View>
        )
      }else{
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />

                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Acceder</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button2}
                  onPress={this.handleSignIn}>
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>

            </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 5,
        padding: 10,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        width: '85%',
        alignItems: 'center',
        backgroundColor: colorGaztaroaOscuro,
        borderColor: colorGaztaroaClaro,
        borderWidth: 1,
        borderRadius: 5,
    },
    button2: {
        marginTop: 20,
        marginBottom: 20,
        width: '85%',
        alignItems: 'center',
        backgroundColor: colorGaztaroaClaro,
        borderColor: colorGaztaroaClaro,
        borderWidth: 1,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    logintext: {
        marginBottom: 30,
        fontSize: 18,
        fontWeight: 'bold',
    },

})

export default Login;
