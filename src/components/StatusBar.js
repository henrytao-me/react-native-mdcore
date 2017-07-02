import React from 'react'
import { Platform, StatusBar as RNStatusBar, View } from 'react-native'

import NativeModules from './NativeModules'
import PropTypes from './PropTypes'
import PureComponent from './PureComponent'
import StyleSheet from './StyleSheet'

export default class StatusBar extends PureComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    backgroundColor: PropTypes.color,
    barStyle: PropTypes.oneOf(['light-content', 'dark-content', 'default'])
  }

  state = {
    statusBarHeight: 0
  }

  componentDidMount() {
    NativeModules.StatusBarManager.getHeight(({ height }) =>
      this.setState({ statusBarHeight: height })
    )
  }

  render() {
    const { theme } = this.context
    const height = this.state.statusBarHeight
    const styles = Styles.get(theme, this.props, { height })
    return (
      <View style={styles.container}>
        <RNStatusBar barStyle={styles.barStyle} />
      </View>
    )
  }
}

const Styles = StyleSheet.create(
  (theme, { backgroundColor, barStyle, style }, { height }) => {
    const bar =
      barStyle || (Platform.OS === 'ios' ? 'dark-content' : 'light-content')
    const container = {
      backgroundColor,
      height,
      ...style
    }
    return { bar, container }
  },
  ['backgroundColor', 'barStyle', 'style']
)
