import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import Icon from './Icon'
import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import Text from './Text'
import ThemeComponent from './ThemeComponent'

export default class BottomNavigationItem extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.color,
    icon: PropTypes.string.isRequired,
    iconSet: PropTypes.string,
    palette: PropTypes.palette,
    title: PropTypes.text.isRequired,
    onPress: PropTypes.func
  }

  static defaultProps = {
    active: false,
    palette: 'background',
    onPress: () => {}
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={styles.container}>
          {this.props.icon &&
            <Icon
              active={this.props.active}
              color={this.props.color}
              focus={this.props.active}
              name={this.props.icon}
              palette={this.props.palette}
              set={this.props.iconSet}
            />}
          {this.props.title &&
            <Text
              color={this.props.color}
              enable={this.props.active}
              palette={this.props.palette}
              subType="primary"
              type={this.props.active ? 'body1' : 'caption'}
              value={this.props.title}
            />}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _onPress = () => {
    this.props.onPress({ ...this.props })
  }
}

const Styles = StyleSheet.create(
  (theme, { style }) => {
    const container = {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: theme.bottomNavigation.height,
      ...style
    }
    return { container }
  },
  ['style']
)
