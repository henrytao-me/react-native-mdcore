import React from 'react'
import { Platform, View } from 'react-native'

import PropTypes from './PropTypes'
import ThemeComponent from './ThemeComponent'

import * as Utils from '../libs/utils'

export default class Elevation extends ThemeComponent {
  static propTypes = {
    fallbackStyle: PropTypes.style,
    elevation: PropTypes.number
  }

  static defaultProps = {
    elevation: 0
  }

  render() {
    let children = Utils.children(this.props.children)
    if (children.length === 0) {
      return null
    } else if (children.length === 1) {
      children = children[0]
    } else {
      children = (
        <View>
          {children.map(child => child)}
        </View>
      )
    }
    const { fallbackStyle, elevation } = this.props
    if (elevation === 0) {
      return children
    }
    if (Platform.OS === 'ios') {
      return React.cloneElement(children, {
        style: {
          ...children.props.style,
          shadowOpacity: 0.0015 * elevation + 0.18,
          shadowRadius: 0.54 * elevation,
          shadowOffset: {
            height: 0.38 * elevation
          }
        }
      })
    }
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return React.cloneElement(children, { elevation })
    }
    return React.cloneElement(children, {
      style: {
        ...children.props.style,
        ...fallbackStyle
      }
    })
  }
}
