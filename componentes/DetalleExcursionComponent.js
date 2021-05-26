import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button, Linking, Alert} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
import * as ImagePicker from "expo-image-picker";

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      comentarios: state.comentarios,
      favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

function RenderExcursion(props) {

    const excursion = props.excursion;

        if (excursion != null) {

            const shareMail = async () =>{
                await Linking.openURL('mailto:?subject=[AppGaztaroa] ' + excursion.nombre + '&body=' + excursion.descripcion);
            };

            const shareWhatsapp = async () =>{
                await Linking.openURL("whatsapp://send?text=*[AppGaztaroa] " + excursion.nombre + '* \r\n' + excursion.descripcion );
            };

            const shareTwitter = async () =>{
                await Linking.openURL("twitter://post?message=[AppGaztaroa] " + excursion.nombre + " " + excursion.descripcion);
            };

            const showAlert = (item) =>{
                Alert.alert(
                  "",
                  null,
                  [
                    {
                      text: "Cámara",
                      onPress: () => props.pickImage2()
                    },
                    { text: "Imágenes guardadas",
                      onPress:() => props.pickImage1()
                    }
                  ],
                  {cancelable: true}
                )
            };


            return(
            <Card>
              <Card.Image source = {{ uri: props.newimage ? props.newimage : excursion.imagen}}>
                <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
              </Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <View style={styles.formRow}>
                  <Icon
                    raised
                    reverse
                    name={ props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                  />
                  <Icon
                      raised
                      reverse
                      name='pencil'
                      type='font-awesome'
                      color={colorGaztaroaOscuro}
                      onPress={() => props.onPressComentario()}
                  />
                  <Icon
                      raised
                      reverse
                      name='camera'
                      type='font-awesome'
                      color={colorGaztaroaOscuro}
                      onPress={showAlert}
                  />
              </View>
              <Card.Divider/>
              <View style={styles.formRow}>
                  <Icon
                      raised
                      reverse
                      name='envelope'
                      type='font-awesome'
                      color={colorGaztaroaClaro}
                      onPress={shareMail}
                  />
                  <Icon
                      raised
                      reverse
                      name='whatsapp'
                      type='font-awesome'
                      color={colorGaztaroaClaro}
                      onPress={shareWhatsapp}
                  />
                  <Icon
                      raised
                      reverse
                      name='twitter'
                      type='font-awesome'
                      color={colorGaztaroaClaro}
                      onPress={shareTwitter}
                  />
              </View>

            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;

  const renderCommentarioItem = ({item, index}) => {

      return (
          <View key={index} style={{margin: 10}}>
              <Text style={{fontSize: 14}}>{item.comentario}</Text>
              <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
              <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia} </Text>
          </View>
      );
  };

  return (
      <Card>
        <Card.Title>Comentarios</Card.Title>
        <Card.Divider/>
        <FlatList
            data={comentarios}
            renderItem={renderCommentarioItem}
            keyExtractor={item => item.id.toString()}
            />
      </Card>
  );
}


class DetalleExcursion extends Component {

  constructor(props) {
      super(props);
      this.state = {
          autor: '',
          comentario: '',
          puntuacion: 3,
          showModal: false,
          image: ''
      }
  }

  pickImage1 = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media permissions to make this work!');
        }else{

          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
          });

          if (!result.cancelled) {
              this.setState({
                  image: result.uri
              });
          }
        }
      }
  };

  pickImage2 = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }else{
            let result =  await ImagePicker.launchCameraAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[4,3],
              quality:0.7
            })
            if(!result.cancelled){
                this.setState({
                    image: result.uri
                });
            }
        }
      }
  };

  toggleModal() {
      this.setState({showModal: !this.state.showModal});
  }

  gestionarComentario(excursionId){
      console.log(this.state);
      this.props.postComentario(excursionId, this.state.puntuacion, this.state.autor, this.state.comentario);
      this.resetForm();
  }

  resetForm() {
      this.setState({
          autor: '',
          comentario: '',
          puntuacion: 3,
          showModal: false
      });
  }

  componentDidMount() {
    this.props.postFavorito();
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render(){
    const {excursionId} = this.props.route.params;
    return(
        <ScrollView>
            <RenderExcursion
                excursion={this.props.excursiones.excursiones[+excursionId]}
                favorita={this.props.favoritos.some(el => el === excursionId)}
                onPress={() => this.marcarFavorito(excursionId)}
                onPressComentario={() => this.toggleModal()}
                pickImage1={this.pickImage1}
                pickImage2={this.pickImage2}
                newimage={this.state.image}

            />
            <RenderComentario
                comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
            />
            <Modal
                animationType = {"slide"}
                transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                  <View style={styles.modal}>
                    <Rating
                    showRating
                    onFinishRating={value => this.setState({ puntuacion: value })}
                    style={{ paddingVertical: 10 }}
                    defaultRating={3}
                    />
                    <Input
                      placeholder='Autor'
                      onChangeText={value => this.setState({ autor: value })}
                      leftIcon={
                        <Icon
                          name='user-o'
                          type='font-awesome'
                          size={24}
                          color='black'
                        />
                      }
                    />
                    <Input
                      placeholder='Comentario'
                      onChangeText={value => this.setState({ comentario: value })}
                      leftIcon={
                        <Icon
                          name='comment-o'
                          type='font-awesome'
                          size={24}
                          color='black'
                        />
                      }
                    />
                    <Button style={styles.formRow}
                        onPress = {() =>{this.gestionarComentario(excursionId)}}
                        title="ENVIAR"
                        color={colorGaztaroaOscuro}
                        accessibilityLabel=""
                    />
                    <Button style={styles.formRow}
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="Cerrar"
                    />
                </View>
            </Modal>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    cardTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
