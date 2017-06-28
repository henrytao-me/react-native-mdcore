import React from 'react'
import {
  Platform,
  StatusBar as RNStatusBar,
  View
} from 'react-native'

import NativeModules from './NativeModules'
import PropTypes from './PropTypes'
import PureComponent from './PureComponent'

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
    NativeModules.StatusBarManager.getHeight(({ height }) => this.setState({ statusBarHeight: height }))
  }

  render() {
    const backgroundColor = this._getBackgroundColor()
    const barStyle = this._getBarStyle()
    const height = this.state.statusBarHeight
    return (
      <View style={[{ backgroundColor, height }, this.props.style]}>
        <RNStatusBar barStyle={barStyle} />
      </View>
    )
  }

  _getBackgroundColor = () => {
    const { theme } = this.context
    const backgroundColor = this.props.backgroundColor || (Platform.OS === 'ios' ? 'transparent' : theme.palette.backgroundDark)
    return theme.palette[backgroundColor] || backgroundColor
  }

  _getBarStyle = () => {
    return this.props.barStyle || (Platform.OS === 'ios' ? 'dark-content' : 'light-content')
  }
}
