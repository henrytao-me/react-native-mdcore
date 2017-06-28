import { NativeModules, Platform } from 'react-native'
const { StatusBarManager } = NativeModules

StatusBarManager._getHeight = StatusBarManager.getHeight
StatusBarManager.getHeight = (callback = (_data) => { }) => {
  switch (Platform.OS) {
    case 'ios':
      StatusBarManager._getHeight(callback)
      break
    case 'android':
      callback({ height: StatusBarManager.HEIGHT })
      break
  }
}

export default NativeModules
