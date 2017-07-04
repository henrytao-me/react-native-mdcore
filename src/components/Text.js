import React from 'react'
import { Text as RNText } from 'react-native'

import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import ThemeComponent from './ThemeComponent'

import * as Utils from '../libs/utils'

export default class Text extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    color: PropTypes.color,
    ellipsizeMode: PropTypes.ellipsizeMode,
    enable: PropTypes.bool,
    numberOfLines: PropTypes.number,
    palette: PropTypes.palette,
    subType: PropTypes.textSubType,
    type: PropTypes.textType,
    value: PropTypes.text
  }

  static defaultProps = {
    ellipsizeMode: 'tail',
    enable: true,
    palette: 'background',
    subType: 'primary',
    type: 'body1'
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props, { color: this._getColor() })
    return (
      <RNText
        style={styles.container}
        ellipsizeMode={this.props.ellipsizeMode}
        numberOfLines={styles.numberOfLines}>
        {this.props.children || this.props.value}
      </RNText>
    )
  }

  _getColor = () => {
    if (Utils.isFunction(this.props.color)) {
      return this.props.color(this.props)
    }
    const { theme } = this.context
    const subType = this.props.enable ? this.props.subType : 'hint'
    return this.props.color || theme.textColor[subType][this.props.palette]
  }
}

const Styles = StyleSheet.create(
  (theme, { numberOfLines, style, type }, { color }) => {
    const defaultStyle = {
      button: {
        fontFamily: theme.fontFamily.medium
      },
      caption: {
        fontFamily: theme.fontFamily.regular
      },
      body1: {
        fontFamily: theme.fontFamily.regular
      },
      body2: {
        fontFamily: theme.fontFamily.medium
      },
      subhead1: {
        fontFamily: theme.fontFamily.regular
      },
      subhead2: {
        fontFamily: theme.fontFamily.regular
      },
      title: {
        fontFamily: theme.fontFamily.medium
      },
      headline: {
        fontFamily: theme.fontFamily.regular
      },
      display1: {
        fontFamily: theme.fontFamily.regular
      },
      display2: {
        fontFamily: theme.fontFamily.regular
      },
      display3: {
        fontFamily: theme.fontFamily.regular
      },
      display4: {
        fontFamily: theme.fontFamily.light
      }
    }
    Object.keys(defaultStyle).forEach(key => {
      defaultStyle[key].fontSize = theme.fontSize[key]
      defaultStyle[key].lineHeight = theme.lineHeight[key]
    })

    let lines = undefined
    switch (type) {
      case 'button':
      case 'caption':
      case 'title':
      case 'display3':
      case 'display4':
        lines = 1
        break
      default:
        lines = undefined
        break
    }
    lines = numberOfLines || lines
    lines = lines === 0 ? undefined : lines

    const container = {
      ...defaultStyle[type],
      color,
      ...style
    }
    if (lines === 1) {
      container.lineHeight = undefined
    }
    return { container, numberOfLines: lines }
  },
  ['numberOfLines', 'style', 'type']
)
