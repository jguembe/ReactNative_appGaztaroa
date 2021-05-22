import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList, Text, View, Alert} from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { borrarFavorito } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      favoritos: state.favoritos
    }
  }

const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId)),
})


class VistaFavoritos extends Component {



    render(){
        const { navigate } = this.props.navigation;

        const showAlert = (item) =>{
            Alert.alert(
              "¿Borrar excursión favorita?",
              "Confirma que desea borrar la excursión favorita: "+ item.nombre,
              [
                {
                  text: "Cancel",
                  onPress: () => console.log(item.nombre + ' Favorito no borrado'),
                  style: "cancel"
                },
                { text: "OK", onPress: () => {this.props.borrarFavorito(item.id);this.forceUpdate();} }
              ]
            )
        };

        const renderFavoritoItem = ({item, index}) => {

          const rightButton = [{
              text: 'Borrar',
              type: 'delete',
              onPress: () => showAlert(item)
          }];

          if(!this.props.favoritos.includes(item.id))
            return <></>;
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        onLongPress={() => showAlert(item)}
                        bottomDivider>
                        <Avatar rounded source={{uri: item.imagen}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </Swipeout>
            );
        };

        return (
            <SafeAreaView>
                <FlatList
                    data={this.props.excursiones.excursiones}
                    renderItem={renderFavoritoItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);
