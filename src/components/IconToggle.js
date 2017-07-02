import React from 'react'
import { View } from 'react-native'

import Icon from './Icon'
import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import ThemeComponent from './ThemeComponent'

export default class IconToggle extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.color,
    focus: PropTypes.bool,
    name: PropTypes.string.isRequired,
    palette: PropTypes.palette,
    pressable: PropTypes.bool,
    set: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    pressable: true,
    onPress: () => {}
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    const content = (
      <View style={styles.container}>
        <Icon {...this.props} />
      </View>
    )
    if (this.props.pressable) {
      return (
        <View onPress={this._onPress}>
          {content}
        </View>
      )
    }
    return content
  }

  _onPress = () => {
    this.props.onPress({ ...this.props })
  }
}

const Styles = StyleSheet.create(
  (theme, { style }) => {
    const container = {
      width: theme.iconToggle.size,
      height: theme.iconToggle.size,
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }
    return { container }
  },
  ['style']
)
