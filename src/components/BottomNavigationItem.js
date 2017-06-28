import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import Icon from './Icon'
import PropTypes from './PropTypes'
import PureComponent from './PureComponent'
import StyleSheet from './StyleSheet'
import Text from './Text'

import * as Utils from '../libs/utils'

export default class BottomNavigationItem extends PureComponent {

  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.color,
    iconName: PropTypes.string,
    iconSet: PropTypes.string,
    palette: PropTypes.palette,
    title: PropTypes.text,
    titleStyle: PropTypes.style,
    onPress: PropTypes.func
  }

  static defaultProps = {
    active: false,
    palette: 'background',
    onPress: () => { }
  }

  render() {
    const { theme } = this.context
    const color = this._getColor()
    const styles = Styles.get(theme, this.props)
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={styles.container}>
          {this.props.iconName && <Icon
            active={this.props.active}
            color={color}
            focus={this.props.active}
            name={this.props.iconName}
            palette={this.props.palette}
            set={this.props.iconSet} />}
          {this.props.title && <Text style={this.props.titleStyle}
            color={color}
            enable={this.props.active}
            palette={this.props.palette}
            subType="primary"
            type="caption">
            {this._getTitle()}
          </Text>}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _getColor = () => {
    if (Utils.isFunction(this.props.color)) {
      return this.props.color(this.props)
    }
    return this.props.color
  }

  _getTitle = () => {
    return Utils.isString(this.props.title) ? this.props.title.toUpperCase() : this.props.title
  }

  _onPress = () => {
    this.props.onPress({ ...this.props })
  }
}

const Styles = StyleSheet.create((theme, { style }) => {
  const container = {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: theme.bottomNavigation.height,
    ...style
  }
  return { container }
})
