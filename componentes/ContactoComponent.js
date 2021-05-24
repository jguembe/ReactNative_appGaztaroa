import React, { Component } from 'react';
import { Text, Linking} from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { colorGaztaroaOscuro } from '../comun/comun';

class Contacto extends Component {

    render() {

        const shareCall = async () =>{
            await Linking.openURL("tel:+34948277151");
        };

        const shareMail = async () =>{
            await Linking.openURL("mailto:gaztaroa@gaztaroa.com");
        };

        return(
            <Card>
                <Card.Title>Información de contacto</Card.Title>
                <Card.Divider/>
                <Text style={{margin: 10}}>
                Kaixo Mendizale!{'\n'}{'\n'}
                Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.{'\n'}{'\n'}
                Para lo que quieras, estamos a tu disposición!{'\n'}{'\n'}
                Tel: +34 948 277151
                <Icon
                    raised
                    reverse
                    name='phone'
                    type='font-awesome'
                    color={colorGaztaroaOscuro}
                    onPress={shareCall}
                  />
                  {'\n'}{'\n'}
                Email: gaztaroa@gaztaroa.com
                <Icon
                    raised
                    reverse
                    name='envelope'
                    type='font-awesome'
                    color={colorGaztaroaOscuro}
                    onPress={shareMail}
                  />
                </Text>
            </Card>
            );
    }
}

export default Contacto;
