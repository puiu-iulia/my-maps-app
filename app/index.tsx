import { View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, { Region } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'

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
        console.log(region)
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
        mapRef.current?.animateCamera({ zoom: 16 })
    }

    return (
        <View style={styles.container}>
            <MapView
                provider='google'
                style={styles.map}
                mapType='hybrid'
                zoomControlEnabled
                showsUserLocation
                showsMyLocationButton
                initialRegion={region}
                onRegionChange={onRegionChange}
            />
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