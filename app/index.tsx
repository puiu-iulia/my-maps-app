import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps'

const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922, // Zoom level
    longitudeDelta: 0.0421, // Zoom level
}

const index = () => {

    const [region, setRegion] = useState(INITIAL_REGION)

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
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    }
})

export default index