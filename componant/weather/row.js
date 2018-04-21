import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr'
import axios from 'axios'

moment.locale('fr');

export default class Row extends React.Component {

    static propTypes = {
        day: PropTypes.object,
        index : PropTypes.number
    };

    state = {
        report: []
    };



    componentDidMount() {
        this.hoursWeather()
    }

    icon (size = 30) {
        const type = this.props.day.weather[0].icon;
        return (
            <Image
                source={{uri: `http://openweathermap.org/img/w/${type}.png`}}
                style={{width: size, height:size}}/>
        )
    };

    day(format = 'ddd') {
        let day = moment(this.props.day.dt * 1000).format(format);
        return (
            <Text style={[style.white, style.bold]}>{ day.toUpperCase() }</Text>
        )
    }

    date() {
        let day = moment(this.props.day.dt * 1000).format('DD/MM');
        return (
            <Text style={style.white}>{ day }</Text>
        );
    }

    hoursWeather () {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.day.city}&cnt=10&mode=json&units=metric&APPID=5ff08a7d3a4bd3fe2a172055012a2c39`)
            .then((response) => {
                this.setState({report: response.data.list});
            }).catch((error) =>{
            this.setState({error})
        })
    }

    renderItem = ({item}) => {
       return (
           <View style={style.viewFlatView}>
               <View>
                   <Text style={{color: '#FFF', paddingLeft: 6}}>{moment(item.dt * 1000).format('HH')}</Text>
               </View>
               <View>
                   <Image
                       source={{uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`}}
                       style={{width: 30, height: 30}}/>
               </View>
               <Text style={{color: '#FFF', paddingLeft: 7}}>{Math.round(item.main.temp)}°</Text>
           </View>
       )};


    render () {
        if (this.props.index === 0) {
            return (
                <View style={[style.view, style.first]}>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={style.firstCity}>{this.props.day.city}</Text>
                        <Text style={style.white}>{this.props.day.weather[0].description}</Text>
                        <View>{this.icon(70)}</View>
                        <Text style={[style.temp, {fontSize: 30, paddingBottom: 30}]}>{Math.round(this.props.day.temp.day)} °C</Text>
                    </View>
                    <View style={style.viewContent}>
                        <Text style={style.white}>Aujourd'hui  {this.day('dddd')}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[style.temp, {paddingRight: 20}]}>{Math.round(this.props.day.temp.min)}°</Text>
            <Text style={style.temp}>{Math.round(this.props.day.temp.max)}°</Text>
        </View>
        </View>
            <FlatList
                horizontal
                data={this.state.report}
                keyExtractor={item => item.dt}
                renderItem={this.renderItem}
            />
                </View>
            )
        } else {
            return (
                <View style={[style.flex, {backgroundColor: '#558db9', paddingHorizontal: 20}]}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text>{this.day()} {this.date()}</Text>
                        </View>
                        <View >{this.icon()}</View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: 40}}>
                                <Text style={style.temp}>{Math.round(this.props.day.temp.min)}°</Text>
                            </View>
                            <View>
                                <Text style={style.temp}>{Math.round(this.props.day.temp.max)}°</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const style = StyleSheet.create({
    white: {
        color: '#FFF',
        fontSize: 15
    },
    bold: {
        fontWeight: 'bold'
    },
    flex: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    view: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    viewFlatView: {
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF',
        paddingHorizontal: 17,
        paddingVertical: 20,
    },
    temp: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    viewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 17,
        paddingBottom: 5
    },
    firstCity: {
        fontSize: 30,
        color: '#FFF',
        paddingVertical: 10
    }
});