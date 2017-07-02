import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import PropTypes from './PropTypes'
import ThemeComponent from './ThemeComponent'

export default class Ripple extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    borderless: PropTypes.bool,
    color: PropTypes.color,
    duration: PropTypes.number,
    opacity: PropTypes.opacity,
    size: PropTypes.number,
    touchable: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    borderless: false,
    touchable: true,
    onPress: () => {}
  }

  state = {
    ripples: []
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={this.props.style}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

// const Styles = StyleSheet.create(theme => {
//   return {}
// })
