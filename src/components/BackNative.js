import { Platform } from 'react-native'

export default Platform.select({
  android: () => require('react-native').BackHandler,
  ios: () => {
    return {
      addEventListener: () => {},
      removeEventListener: () => {}
    }
  }
})()
