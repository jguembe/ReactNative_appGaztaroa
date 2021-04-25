import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem(props) {

        const item = props.item;

        if (item != null) {
            return(
                <Card>
                    <Card.Divider/>
                    <View style={styles.container}>
                        <Card.Image source={require('./imagenes/40Años.png')} >
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

    constructor(props) {
        super(props);
        this.state = {
          excursiones: EXCURSIONES,
          cabeceras: CABECERAS,
          actividades: ACTIVIDADES
        };
    }

    render() {

        return(
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default Home;

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
