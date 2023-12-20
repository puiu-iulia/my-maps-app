import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "My Maps"}} />
      </Stack>
  )
}

export default RootLayout