import React from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity, ActionSheetIOS, Alert} from 'react-native'
import { PulseIndicator } from 'react-native-indicators'
import style from '../style/Style'
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import axios from 'axios'
import WeatherRow from './weather/row'
import d2d from 'degrees-to-direction'

export default class List extends React.Component {

    static showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Ajouter aux favoris', 'Fermer'],
                destructiveButtonIndex: 1,
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    console.log("cancel")
                    /* destructive action */
                } else if (buttonIndex === 0) {
                    console.log("favoris");

                }
            });
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: "Accueil",
            headerTitle: "Météo",
            headerRight: <TouchableOpacity style={style.buttonSetting} onPress={List.showActionSheet}>
                <Ionicons name={'ios-settings-outline'} size={26} color="#007aff" />
            </TouchableOpacity>,
        }
    };

    constructor (props) {
        super(props);
        this.state = {
            city: this.props.navigation.state.params.city,
            report: null
        };
        setTimeout(() => {
            this.fetchWeather ()
        }, 1000);
    }

    fetchWeather () {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&mode=json&units=metric&lang=fr&cnt=10&APPID=5ff08a7d3a4bd3fe2a172055012a2c39`)
            .then((response) => {
                const report = response.data.list.map(item => {
                    item.city = response.data.city.name;
                    return item;
                });
                this.setState({report});
            }).catch((error) =>{
                this.setState({error})
        });
    }
    cancel = () => this.props.navigation.goBack();

    alert() {
        Alert.alert(
            this.state.city + ' n\'existe pas',
            'Veuillez recommencer.',
            [
                {text: 'Fermer', onPress: () => this.cancel(), style: 'cancel'}
            ],
            { cancelable: false }
        )
    }

    render() {
        if (this.state.error) {
            return (
                <View>
                    {this.alert()}
                </View>
            )
        } else if (this.state.report === null) {
            return (
                <View style={{margin: 40}}>
                    <PulseIndicator color={style.color} />
                </View>
            )
        } else {
            return (
                 <ScrollView style={{backgroundColor: '#558db9'}}>
                     <FlatList
                         data={this.state.report}
                         keyExtractor={item => item.dt}
                         renderItem={({item, index}) => <WeatherRow day={item} index={index}/>}
                     />
                     <View style={style.infos}>
                         <View style={style.infosDonnees}>
                             <View>
                                 <Text style={style.infosDonneesTitre}>RISQUE DE PLUIE</Text>
                                 <Text style={style.infosDonneesValeurs}>{this.state.report[0].clouds} %</Text>
                             </View>
                             <View style={{justifyContent: 'flex-end'}}>
                                 <Text style={style.infosDonneesTitre}>HUMIDITÉ</Text>
                                 <Text style={style.infosDonneesValeurs}>{this.state.report[0].humidity} %</Text>
                             </View>
                         </View>
                         <View style={style.infosDonnees}>
                             <View>
                                 <Text style={style.infosDonneesTitre}>VENT</Text>
                                 <Text style={style.infosDonneesValeurs}>{Math.round(this.state.report[0].speed * 3.6)} km/h</Text>
                             </View>
                             <View>
                                 <Text style={style.infosDonneesTitre}>DIRECTION</Text>
                                 <Text style={style.infosDonneesValeurs}>{d2d(this.state.report[0].deg)}</Text>
                             </View>
                         </View>
                         <View style={style.infosDonnees}>
                             <View>
                                 <Text style={style.infosDonneesTitre}>RESSENTIE</Text>
                                 <Text style={style.infosDonneesValeurs}>{Math.round(this.state.report[0].temp.max)} °C</Text>
                             </View>
                             <View>
                                 <Text style={style.infosDonneesTitre}>PRESSION</Text>
                                 <Text style={style.infosDonneesValeurs}>{Math.round(this.state.report[0].pressure)} hPa</Text>
                             </View>
                         </View>


                     </View>
                 </ScrollView>
            )
        }

    }
}