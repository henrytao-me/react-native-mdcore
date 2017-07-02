import React from 'react'

import Icon from './Icon'
import PropTypes from './PropTypes'
import Ripple from './Ripple'
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
    set: PropTypes.string,
    size: PropTypes.number,
    touchable: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    touchable: true,
    onPress: () => {}
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    return (
      <Ripple
        style={styles.container}
        touchable={this.props.touchable}
        onPress={this._onPress}>
        <Icon
          active={this.props.active}
          color={this.props.color}
          focus={this.props.focus}
          name={this.props.name}
          palette={this.props.palette}
          set={this.props.set}
          size={this.props.size}
        />
      </Ripple>
    )
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
