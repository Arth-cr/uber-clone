import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavorite from './NavFavorite';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <Text style={tw`text-center py-5 text-xl`}>Bem vindo, Arthur!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <GooglePlacesAutocomplete
                placeholder="Para onde?"
                styles={toInputBoxStyles}
                enablePoweredByContainer={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }))

                    navigation.navigate('RideOptionsCard')
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "pt-BR",
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                />
            </View>

            <NavFavorite />
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
