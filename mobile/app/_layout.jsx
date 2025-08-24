import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Colors } from "react-native-ui-lib";
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaView style={{ flex: 1, backgroundColor:Colors.background }} edges={['top'] }>
        <Slot />
      </SafeAreaView>
    </ClerkProvider>
  ); 
}
