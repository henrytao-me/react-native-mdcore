import React from 'react'
import { Platform } from 'react-native'

import PropTypes from './PropTypes'
import ThemeComponent from './ThemeComponent'

export default class Elevation extends ThemeComponent {
  static propTypes = {
    fallbackStyle: PropTypes.style,
    elevation: PropTypes.number
  }

  static defaultProps = {
    elevation: 0
  }

  render() {
    const { fallbackStyle, elevation } = this.props
    if (elevation === 0) {
      return this.props.children
    }
    if (Platform.OS === 'ios') {
      return React.cloneElement(this.props.children, {
        style: {
          ...this.props.children.props.style,
          shadowOpacity: 0.0015 * elevation + 0.18,
          shadowRadius: 0.54 * elevation,
          shadowOffset: {
            height: 0.38 * elevation
          }
        }
      })
    }
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return React.cloneElement(this.props.children, { elevation })
    }
    return React.cloneElement(this.props.children, {
      style: {
        ...this.props.children.props.style,
        ...fallbackStyle
      }
    })
  }
}
