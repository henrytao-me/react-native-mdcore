import React from 'react'
import { View } from 'react-native'

import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import ThemeComponent from './ThemeComponent'

export default class ListPadding extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  render() {
    const styles = Styles.get(this.context.theme)
    return <View style={styles.container} />
  }
}

const Styles = StyleSheet.create(theme => {
  const container = {
    height: theme.list.padding.vertical
  }
  return { container }
})
