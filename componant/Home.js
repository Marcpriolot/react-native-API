import React from 'react'
import { Text, View, TextInput, Button, Keyboard, StatusBar } from 'react-native'
import style from '../style/Style'
import { StackNavigator } from 'react-navigation'
import List from './List'

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            city : ''
        }
    }

    submit() {
        Keyboard.dismiss();
        this.props.navigation.navigate('Result', {city: this.state.city})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={false}/>
                <View style={style.containerSearch}>
                    <Text style={style.title}>Entrez le nom d'une ville :</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({city: text})}
                        onSubmitEditing={() => this.submit()}
                        returnKeyType="search"
                        placeholder="Rechercher une ville"
                        style={style.textInput}
                        value={this.state.city}
                    />
                </View>
                <View style={style.containerFavoris}>
                    <Text style={style.title}>Vos favoris :</Text>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text>"Ce service arrivera prochainenement"</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const navigationOptions = {
    title: 'Accueil',
    headerStyle: style.header,
    headerTitleStyle: style.headerTitle
};


export default StackNavigator({

    Home: {
        screen: Home,
        navigationOptions
    },
    Result: {
        screen: List,
    }

})