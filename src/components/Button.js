import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import Elevation from './Elevation'
import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import Text from './Text'
import ThemeComponent from './ThemeComponent'

import * as Utils from '../libs/utils'

export default class Button extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    palette: PropTypes.palette,
    title: PropTypes.text.isRequired,
    type: PropTypes.oneOf(['flat', 'raised']),
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    palette: 'background',
    type: 'raised'
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    const elevation = this.props.type === 'raised' ? theme.button.elevation : 0
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Elevation fallbackStyle={styles.fallback} elevation={elevation}>
          <View style={styles.container}>
            <Text
              color={styles.textColor}
              palette={this.props.palette}
              type="button"
              value={this._getTitle()}
            />
          </View>
        </Elevation>
      </TouchableOpacity>
    )
  }

  _getTitle = () => {
    if (Utils.isString(this.props.title)) {
      return this.props.title.toUpperCase()
    }
    return this.props.title
  }
}

const Styles = StyleSheet.create(
  (theme, { palette, style, type }) => {
    const container = {
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.button.height,
      minWidth: theme.button.minWidth,
      paddingLeft: theme.button.internalPadding,
      paddingRight: theme.button.internalPadding,
      marginLeft: theme.button.externalPadding,
      marginRight: theme.button.externalPadding,
      marginTop: (theme.button.touchTarget - theme.button.height) / 2,
      marginBottom: (theme.button.touchTarget - theme.button.height) / 2,
      borderRadius: theme.button.borderRadius,
      backgroundColor: theme.palette[palette],
      ...style
    }
    const fallback = {
      borderWidth: theme.button.borderWidth,
      borderColor:
        palette === 'background'
          ? theme.palette.backgroundDark
          : theme.palette[palette]
    }
    let textColor = undefined
    if (type === 'flat') {
      container.backgroundColor = 'transparent'
      textColor = palette === 'background' ? undefined : theme.palette[palette]
    }
    return { container, fallback, textColor }
  },
  ['palette', 'style', 'type']
)
