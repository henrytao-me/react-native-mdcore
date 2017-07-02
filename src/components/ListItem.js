import React from 'react'
import { View } from 'react-native'

import IconToggle from './IconToggle'
import Image from './Image'
import PropTypes from './PropTypes'
import Ripple from './Ripple'
import StyleSheet from './StyleSheet'
import Text from './Text'
import ThemeComponent from './ThemeComponent'

export default class ListItem extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    avatar: PropTypes.imageSource,
    avatarPlaceholder: PropTypes.imageSource,
    avatarRadius: PropTypes.imageRadius,
    avatarStyle: PropTypes.style,
    data: PropTypes.any,
    icon: PropTypes.string,
    iconColor: PropTypes.color,
    iconSet: PropTypes.string,
    iconSize: PropTypes.number,
    iconStyle: PropTypes.style,
    secondaryText: PropTypes.text,
    secondaryTextColor: PropTypes.color,
    secondaryTextMaxLines: PropTypes.number,
    secondaryTextStyle: PropTypes.style,
    text: PropTypes.text,
    textColor: PropTypes.color,
    textMaxLines: PropTypes.number,
    textStyle: PropTypes.style,
    touchable: PropTypes.bool,
    type: PropTypes.listItemType.isRequired,
    renderAvatar: PropTypes.func,
    renderIcon: PropTypes.func,
    renderText: PropTypes.func,
    onAvatarPress: PropTypes.func,
    onIconPress: PropTypes.func,
    onPress: PropTypes.func
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    return (
      <Ripple
        style={styles.container}
        touchable={this.props.touchable}
        onPress={this.props.onPress}>
        {this._renderText()}
        {this._renderAvatar()}
        {this._renderIcon()}
      </Ripple>
    )
  }

  _renderAvatar = () => {
    if (this.props.renderAvatar) {
      return this.props.renderAvatar({ ...this.props })
    }
    const styles = Styles.get(this.context.theme, this.props)
    return (
      _hasAvatar(this.props.type) &&
      !!this.props.avatar &&
      <Image
        style={styles.avatar}
        placeholder={this.props.avatarPlaceholder}
        radius={this.props.avatarRadius}
        source={this.props.avatar}
      />
    )
  }

  _renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon({ ...this.props })
    }
    const styles = Styles.get(this.context.theme, this.props)
    return (
      _hasIcon(this.props.type) &&
      !!this.props.icon &&
      <IconToggle
        style={styles.icon}
        color={this.props.iconColor}
        name={this.props.icon}
        set={this.props.iconSet}
        size={this.props.iconSize}
        onPress={this.props.onIconPress}
      />
    )
  }

  _renderText = () => {
    if (this.props.renderText) {
      return this.props.renderText({ ...this.props })
    }
    const maxLines = _getMaxLines(this.props.type)
    const styles = Styles.get(this.context.theme, this.props)
    return (
      <View style={styles.textWrapper}>
        {!!this.props.text &&
          <Text
            style={styles.text}
            color={this.props.textColor}
            numberOfLines={this.props.textMaxLines || maxLines.text}
            subType="primary"
            type="subhead1"
            value={this.props.text}
          />}
        {!_isSingleLine(this.props.type) &&
          !!this.props.secondaryText &&
          <Text
            style={styles.secondaryText}
            color={this.props.secondaryTextColor}
            numberOfLines={
              this.props.secondaryTextMaxLines || maxLines.secondaryText
            }
            subType="secondary"
            type="body1"
            value={this.props.secondaryText}
          />}
      </View>
    )
  }

  _onAvatarPress = () => {
    const { data, onAvatarPress } = this.props
    if (onAvatarPress) {
      onAvatarPress(data)
    }
  }

  _onIconPress = () => {
    const { data, onIconPress } = this.props
    if (onIconPress) {
      onIconPress(data)
    }
  }

  _onPress = () => {
    const { data, onPress } = this.props
    if (onPress) {
      onPress(data)
    }
  }
}

const Styles = StyleSheet.create(
  (
    theme,
    { avatarStyle, iconStyle, secondaryTextStyle, style, textStyle, type }
  ) => {
    const avatar = {
      position: 'absolute',
      height: theme.list.avatarSize,
      left: theme.list.padding.horizontal,
      top: _isThreeLine(type) ? theme.list.padding.horizontal : undefined,
      width: theme.list.avatarSize,
      ...avatarStyle
    }
    const container = {
      justifyContent: 'center',
      minHeight: _getMinHeight(theme, type),
      paddingLeft:
        _hasAvatar(type) || _hasIcon(type)
          ? theme.list.padding.horizontal + theme.list.avatarSize
          : 0,
      paddingRight: _hasAvatar(type) ? theme.list.iconSize : 0,
      ...style
    }
    const icon = {
      position: 'absolute',
      left: _hasAvatar(type) ? undefined : 0,
      right: _hasAvatar(type) ? 0 : undefined,
      top: _isThreeLine(type) ? 0 : undefined,
      ...iconStyle
    }
    const secondaryText = {
      marginTop: theme.layout.spacingXs / 2,
      ...secondaryTextStyle
    }
    const text = {
      ...textStyle
    }
    const textWrapper = {
      paddingBottom: theme.list.padding.vertical,
      paddingLeft: theme.list.padding.horizontal,
      paddingRight: theme.list.padding.horizontal,
      paddingTop: theme.list.padding.vertical
    }
    return { avatar, container, icon, secondaryText, text, textWrapper }
  }
)

const _getMinHeight = (theme, type) => {
  switch (type) {
    case 'single-line-text-only':
      return theme.list.singleLineTextOnlyHeight
    case 'single-line-icon-with-text':
      return theme.list.singleLineIconWithTextHeight
    case 'single-line-avatar-with-text':
      return theme.list.singleLineAvatarWithTextHeight
    case 'single-line-avatar-with-text-and-icon':
      return theme.list.singleLineAvatarWithTextAndIconHeight
    case 'two-line-text-only':
      return theme.list.twoLineTextOnlyHeight
    case 'two-line-icon-with-text':
      return theme.list.twoLineIconWithTextHeight
    case 'two-line-avatar-with-text':
      return theme.list.twoLineAvatarWithTextHeight
    case 'two-line-avatar-with-text-and-icon':
      return theme.list.twoLineAvatarWithTextAndIconHeight
    case 'three-line-text-only':
      return theme.list.threeLineTextOnlyHeight
    case 'three-line-icon-with-text':
      return theme.list.threeLineIconWithTextHeight
    case 'three-line-avatar-with-text':
      return theme.list.threeLineAvatarWithTextHeight
    case 'three-line-avatar-with-text-and-icon':
      return theme.list.threeLineAvatarWithTextAndIconHeight
    default:
      return 0
  }
}

const _getMaxLines = type => {
  switch (type) {
    case 'single-line-text-only':
    case 'single-line-icon-with-text':
    case 'single-line-avatar-with-text':
    case 'single-line-avatar-with-text-and-icon':
      return { text: 1, secondaryText: 0 }
    case 'two-line-text-only':
    case 'two-line-icon-with-text':
    case 'two-line-avatar-with-text':
    case 'two-line-avatar-with-text-and-icon':
      return { text: 1, secondaryText: 1 }
    case 'three-line-text-only':
    case 'three-line-icon-with-text':
    case 'three-line-avatar-with-text':
    case 'three-line-avatar-with-text-and-icon':
      return { text: 1, secondaryText: 2 }
    default:
      return { text: 0, secondaryText: 0 }
  }
}

const _hasAvatar = type => {
  return (type || '').indexOf('avatar') > 0
}

const _hasIcon = type => {
  return (type || '').indexOf('icon') > 0
}

const _isSingleLine = type => {
  return (type || '').indexOf('single') === 0
}

const _isThreeLine = type => {
  return (type || '').indexOf('three') === 0
}
