import React from "react";
import { View, Text, StatusBar} from 'react-native'
import style from '../style/Style'
import { StackNavigator } from 'react-navigation'

class User extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column',  paddingHorizontal: 10, paddingTop: 20, justifyContent: 'space-between' }}>
                <StatusBar hidden={false}/>
                <View>
                    <Text>Application météo qui se base sur l'API d'OpenWeather. On peut rechercher une ville (en France ou
                        dans le monde).</Text>
                    <Text>On possède la méteo sur 10 jours en comptant le jour actuel.</Text>
                    <Text>On a aussi une vue détaillé par tranche de trois heure.</Text>
                    <Text>Le service "favoris" ne fonctionne pas encore.</Text>
                    <Text>La vue n'est pas prête. Il y a un bout du Back qui est
                        commencé (un "console.log()" qui s'affiche quand on clique sur "ajouter aux favoris").</Text>
                </View>
                <View style={{alignItems: 'center', paddingBottom: 10}}>
                    <Text>Réalisé par Marc Priolot, projet étudiant</Text>
                </View>

            </View>
        );
    }
}

const navigationOptions = {
    title: 'À propos de l\'application',
    headerStyle: style.header,
    headerTitleStyle: style.headerTitle

};

export default StackNavigator({

    User: {
        screen: User,
        navigationOptions
    },

})