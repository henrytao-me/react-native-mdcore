import React from 'react'
import { View } from 'react-native'

import Elevation from './Elevation'
import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import ThemeComponent from './ThemeComponent'

export default class Card extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    borderRadius: PropTypes.number,
    elevation: PropTypes.number
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    const { elevation = theme.card.elevation } = this.props
    return (
      <Elevation fallbackStyle={styles.fallback} elevation={elevation}>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </Elevation>
    )
  }
}

const Styles = StyleSheet.create(
  (theme, { borderRadius, style }) => {
    const container = {
      backgroundColor: theme.palette.background,
      borderRadius:
        borderRadius === undefined ? theme.card.borderRadius : borderRadius,
      margin: 8,
      ...style
    }
    const fallback = {
      borderWidth: theme.card.borderWidth,
      borderColor: theme.palette.backgroundDark
    }
    return { container, fallback }
  },
  ['borderRadius', 'style']
)
