import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import PropTypes from './PropTypes'
import ThemeComponent from './ThemeComponent'

import { default as RNRipple } from './internal/Ripple'

export default class Ripple extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    // borderless: PropTypes.bool,
    // color: PropTypes.color,
    // duration: PropTypes.number,
    // opacity: PropTypes.opacity,
    // size: PropTypes.number,
    radius: PropTypes.number,
    touchable: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    // borderless: false,
    radius: 0,
    touchable: true,
    onPress: () => {}
  }

  state = {
    ripples: []
  }

  render() {
    return (
      <RNRipple
        onPress={this.props.onPress}
        disabled={!this.props.touchable}
        rippleContainerBorderRadius={this.props.radius}
      >
        <View style={this.props.style}>{this.props.children}</View>
      </RNRipple>
    )
  }
}
