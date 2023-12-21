import { View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, { Callout, Circle, Marker, Polygon, Polyline, Region } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922, // Zoom level
    longitudeDelta: 0.0421, // Zoom level
}

const index = () => {

    const [region, setRegion] = useState(INITIAL_REGION)
    const mapRef = useRef<MapView>(null)

    const onRegionChange = (region: Region) => {
        //setRegion(region)
        // console.log(region)
    }

    const focusMap = () => {
        const NewYorkRegion = {
            latitude: 40.7128,
            longitude: -74.0060,
            latitudeDelta: 0.0922, // Zoom level
            longitudeDelta: 0.0421, // Zoom level
        }

        mapRef.current?.animateToRegion(NewYorkRegion)
    }

    const zoom = () => {
        mapRef.current?.animateCamera({ zoom: 13 })
    }

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete 
                placeholder='Search'
                fetchDetails
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    const point = details?.geometry?.location
                    if (!point) return
                    setRegion({
                        latitude: point.lat,
                        longitude: point.lng,
                        latitudeDelta: 0.0922, // Zoom level
                        longitudeDelta: 0.0421, // Zoom level
                    })
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    },
                    textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
                onFail={(error) => console.error(error)}
            />
            <MapView
                provider='google'
                style={[styles.map, StyleSheet.absoluteFill]}
                mapType='hybrid'
                zoomControlEnabled
                showsUserLocation
                showsMyLocationButton
                initialRegion={region}
                region={region}
                onRegionChange={onRegionChange}
            >
                <Polyline 
                    coordinates={[
                        { latitude: 37.78825, longitude: -122.4324 },
                        { latitude: 37.79486, longitude: -122.4596 },
                        { latitude: 37.80255, longitude: -122.4351 },
                    ]}
                    strokeColor='red'
                    strokeWidth={6}
                />
                <Circle
                    center={{ latitude: 37.78825, longitude: -122.4324 }}
                    radius={200}
                    strokeWidth={6}
                    strokeColor='green'
                />
                <Polygon 
                    coordinates={[
                        { latitude: 37.78825, longitude: -122.4324 },
                        { latitude: 37.79486, longitude: -122.4496 },
                        { latitude: 37.80255, longitude: -122.4351 },
                    ]}
                    strokeColor='blue'
                    strokeWidth={6}
                />
                <Marker 
                    coordinate={{ latitude: 37.802526, longitude: -122.4324 }}
                    title='San Francisco'
                    description='City by the Bay'
                    pinColor='green'
                    image={require('../assets/images/favicon.png')}
                    // onPress={() => console.log('Marker pressed')}
                >
                    <Callout 
                        onPress={() => console.log('Callout pressed')}
                    />
                </Marker>
            </MapView>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={focusMap} >
                    <Ionicons name='business' size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={zoom} >
                    <Ionicons name='earth' size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        zIndex: -1,
    },
    btnContainer: {
        position: 'absolute',
        bottom: 110,
        right: 10,
        gap: 10,
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: 48,
        padding: 16,
    }
})

export default index