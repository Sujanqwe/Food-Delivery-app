
import { Stack } from 'expo-router'

const TabsLayout = () => {
  if(!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />
  return <Stack/>
  
}

export default TabsLayout