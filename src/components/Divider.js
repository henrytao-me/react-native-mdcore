import React from 'react'
import { View } from 'react-native'

import PropTypes from './PropTypes'
import PureComponent from './PureComponent'
import StyleSheet from './StyleSheet'

export default class Divider extends PureComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    largePadding: PropTypes.bool
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    return <View style={styles.container} />
  }
}

const Styles = StyleSheet.create(
  (theme, { largePadding, style }) => {
    const container = {
      backgroundColor: theme.divider.color,
      height: theme.divider.size,
      marginLeft: largePadding
        ? 2 * theme.list.paddingLeft + theme.list.avatarSize
        : 0,
      ...style
    }
    return { container }
  },
  ['largePadding', 'style']
)
