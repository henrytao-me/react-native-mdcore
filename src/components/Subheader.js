import React from 'react'
import { View } from 'react-native'

import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import Text from './Text'
import ThemeComponent from './ThemeComponent'

export default class Subheader extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    color: PropTypes.color,
    extraSpacing: PropTypes.bool,
    palette: PropTypes.palette,
    text: PropTypes.text.isRequired
  }

  static defaultProps = {
    extraSpacing: false,
    palette: 'background'
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    return (
      <View style={styles.container}>
        <Text
          color={this.props.color}
          type="subhead1"
          subType="secondary"
          palette={this.props.palette}
          numberOfLines={1}
          value={this.props.text}
        />
      </View>
    )
  }
}

const Styles = StyleSheet.create(
  (theme, { extraSpacing, style }) => {
    let container = {
      height: theme.list.singleLineTextOnlyHeight,
      justifyContent: 'center',
      paddingLeft: extraSpacing
        ? 2 * theme.list.paddingLeft + theme.list.avatarSize
        : theme.list.paddingLeft,
      paddingRight: theme.list.paddingRight,
      ...style
    }
    return { container }
  },
  ['extraSpacing', 'style']
)
