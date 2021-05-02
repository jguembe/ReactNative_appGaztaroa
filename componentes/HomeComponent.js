import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

function RenderItem(props) {

        const item = props.item;

        if (item != null) {
            return(
                <Card>
                    <Card.Divider/>
                    <View style={styles.container}>
                        <Card.Image source={{uri: baseUrl + item.imagen}} >
                          <Text style={styles.text}>{item.nombre}</Text>
                        </Card.Image>
                    </View>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

    render() {

        return(
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
   },
   image:{flexGrow:1,
    height:null,
    width:null,
    alignItems: 'center',
    justifyContent:'center',},

  text: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'chocolate',
  },
});
