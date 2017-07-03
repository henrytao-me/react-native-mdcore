import React from 'react'
import { View } from 'react-native'

import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import ThemeComponent from './ThemeComponent'

import * as Utils from '../libs/utils'

export default class BottomNavigation extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    backgroundColor: PropTypes.color,
    initialItem: PropTypes.number,
    onItemSelected: PropTypes.func
  }

  static defaultProps = {
    initialItem: 0,
    onItemSelected: () => {}
  }

  state = {
    index: undefined
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    return (
      <View style={styles.container}>
        {Utils.children(this.props.children).map(this._renderItem)}
      </View>
    )
  }

  setItem = index => {
    if (index === this.state.index) {
      return
    }
    this.setState({ index })
  }

  _getIndex = () => {
    return this.state.index === undefined
      ? this.props.initialItem
      : this.state.index
  }

  _onItemPress = ({ index }) => {
    this.setState({ index })
    this.props.onItemSelected({ ...this.props, index })
  }

  _renderItem = (item, index) => {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    const active = index === this._getIndex()
    return (
      <View key={index} style={styles.item}>
        {React.cloneElement(item, {
          active,
          index,
          onPress: this._onItemPress
        })}
      </View>
    )
  }
}

const Styles = StyleSheet.create(
  (theme, { backgroundColor, style }) => {
    const container = {
      backgroundColor,
      flexDirection: 'row',
      ...style
    }
    const item = {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
    return { container, item }
  },
  ['backgroundColor', 'style']
)
