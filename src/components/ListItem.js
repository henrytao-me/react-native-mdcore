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
    data: PropTypes.any,
    icon: PropTypes.string,
    iconColor: PropTypes.color,
    iconSet: PropTypes.name,
    iconSize: PropTypes.number,
    iconStyle: PropTypes.style,
    secondaryText: PropTypes.text,
    secondaryTextMaxLines: PropTypes.number,
    secondaryTextStyle: PropTypes.style,
    text: PropTypes.text,
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
    const { theme } = this.context
    const {
      avatar,
      avatarPlaceholder,
      avatarRadius,
      touchable,
      data,
      onAvatarPress,
      renderAvatar,
      type
    } = this.props
    const styles = Styles.get(theme, { type })
    if (!_hasAvatar(type)) {
      return null
    }
    if (renderAvatar) {
      return renderAvatar(data, styles)
    }
    const touchable = touchable && !!onAvatarPress
    const content = (
      <Image
        style={[styles.avatar]}
        placeholder={avatarPlaceholder}
        radius={avatarRadius}
        source={avatar}
      />
    )
    if (touchable) {
      return (
        <TouchableWithoutFeedback onPress={this._onAvatarPress}>
          {content}
        </TouchableWithoutFeedback>
      )
    }
    return content
  }

  _renderIcon = () => {
    const { theme } = this.context
    const {
      data,
      icon,
      iconColor,
      iconSet,
      iconSize,
      iconStyle,
      onIconPress,
      renderIcon,
      type
    } = this.props
    const styles = Styles.get(theme, { type })
    if (!_hasIcon(type)) {
      return null
    }
    if (renderIcon) {
      return renderIcon(data, styles)
    }
    return (
      <IconToggle
        style={[styles.icon, iconStyle]}
        touchable={!!onIconPress}
        color={iconColor}
        iconSet={iconSet}
        name={icon}
        size={iconSize}
        onPress={this._onIconPress}
      />
    )
  }

  _renderText = () => {
    const { theme } = this.context
    const {
      data,
      renderText,
      mainTextProps,
      secondaryText,
      text,
      tertiaryText,
      type
    } = this.props
    const styles = Styles.get(theme, { type })
    if (renderText) {
      return renderText(data, styles)
    }
    const maxLines = _getMaxLines(type)
    const textMaxLines =
      this.props.textMaxLines ||
      (this.props.textMaxLines === undefined ? maxLines.text : undefined)
    const secondaryTextMaxLines =
      this.props.secondaryTextMaxLines ||
      (this.props.textMaxLines === undefined
        ? maxLines.secondaryText
        : undefined)
    if (type.indexOf('single') === 0) {
      return (
        <Text
          style={[styles.text, this.props.textStyle]}
          ellipsizeMode="tail"
          numberOfLines={textMaxLines}
          {...mainTextProps}>
          {text}
        </Text>
      )
    } else if (type.indexOf('two') === 0) {
      return (
        <View>
          <Text
            style={[styles.text, this.props.textStyle]}
            ellipsizeMode="tail"
            numberOfLines={textMaxLines}
            subType="primary"
            type="subhead1">
            {text}
          </Text>
          <Text
            style={[styles.secondaryText, this.props.secondaryTextStyle]}
            ellipsizeMode="tail"
            numberOfLines={secondaryTextMaxLines}
            subType="secondary"
            type="body1">
            {secondaryText}
          </Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text
            style={[styles.text, this.props.textStyle]}
            ellipsizeMode="tail"
            numberOfLines={textMaxLines}
            subType="primary"
            type="subhead1">
            {text}
          </Text>
          <Text
            style={[styles.secondaryText, this.props.secondaryTextStyle]}
            ellipsizeMode="tail"
            numberOfLines={secondaryTextMaxLines}
            subType="secondary"
            type="body1">
            {secondaryText}
          </Text>
          <Text
            style={[styles.secondaryText, this.props.secondaryTextStyle]}
            ellipsizeMode="tail"
            numberOfLines={secondaryTextMaxLines}
            subType="secondary"
            type="body1">
            {tertiaryText}
          </Text>
        </View>
      )
    }
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

const Styles = StyleSheet.create((theme, { style, type }) => {
  const minHeight = _getMinHeight(theme, type)
  const { avatarSize, paddingLeft, paddingRight } = theme.list
  const iconSize = theme.iconToggle.size
  let container = null
  if ((type || '').indexOf('single') > -1) {
    container = {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: minHeight
    }
  } else {
    container = {
      justifyContent: 'center',
      minHeight: minHeight
    }
  }

  const avatar = {
    position: 'absolute',
    top: (minHeight - avatarSize) / 2,
    left: paddingLeft,
    width: avatarSize,
    height: avatarSize
  }
  const icon = {
    position: 'absolute',
    top: (minHeight - iconSize) / 2
  }
  if (type.indexOf('avatar') > 0) {
    icon.right = paddingRight
  } else {
    icon.left = 0
  }
  const text = {
    paddingLeft:
      paddingLeft +
      (type.indexOf('text-only') > 0 ? 0 : paddingLeft + avatarSize),
    paddingRight:
      paddingRight +
      (type.indexOf('avatar-with-text-and-icon') > 0
        ? paddingRight + iconSize
        : 0)
  }
  const secondaryText = {
    paddingLeft:
      paddingLeft +
      (type.indexOf('text-only') > 0 ? 0 : paddingLeft + avatarSize),
    paddingRight:
      paddingRight +
      (type.indexOf('avatar-with-text-and-icon') > 0
        ? paddingRight + iconSize
        : 0),
    paddingTop: 2
  }
  return { avatar, container, icon, text, secondaryText }
})

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
      return 0
  }
}

const _hasAvatar = type => {
  return (type || '').indexOf('avatar') > 0
}

const _hasIcon = type => {
  return (type || '').indexOf('icon') > 0
}
