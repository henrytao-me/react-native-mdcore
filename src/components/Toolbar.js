import React from 'react'
import { View } from 'react-native'

import BackNative from './BackNative'
import IconToggle from './IconToggle'
import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import Text from './Text'
import ThemeComponent from './ThemeComponent'

export default class Toolbar extends ThemeComponent {
  static contextTypes = {
    theme: PropTypes.object
  }

  static propTypes = {
    extraSpace: PropTypes.bool,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
    iconSet: PropTypes.string,
    palette: PropTypes.palette,
    subtitle: PropTypes.text,
    title: PropTypes.text,
    onNavigationPress: PropTypes.func
  }

  static defaultProps = {
    extraSpace: true,
    palette: 'primary'
  }

  pureComponentDidMount() {
    BackNative.addEventListener('hardwareBackPress', this._onBackPressed)
  }

  pureComponentWillUnmount() {
    BackNative.removeEventListener('hardwareBackPress', this._onBackPressed)
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    return (
      <View style={styles.container}>
        {!!this.props.iconName &&
          <IconToggle
            style={styles.icon}
            color={this.props.iconColor}
            name={this.props.iconName}
            palette={this.props.palette}
            set={this.props.iconSet}
            onPress={this._onBackPressed}
          />}
        {this.props.children ||
          <View style={styles.title}>
            {!!this.props.title &&
              <Text
                type={this.props.subtitle ? 'subhead2' : 'title'}
                subType="primary"
                palette={this.props.palette}
                numberOfLines={1}
                value={this.props.title}
              />}
            {!!this.props.subtitle &&
              <Text
                type="body1"
                subType="secondary"
                palette={this.props.palette}
                numberOfLines={1}
                value={this.props.subtitle}
              />}
          </View>}
        <View style={styles.shadow} />
      </View>
    )
  }

  _onBackPressed = () => {
    const { onNavigationPress } = this.props
    if (onNavigationPress) {
      onNavigationPress()
      return true
    }
    return false
  }
}

const Styles = StyleSheet.create(
  (theme, { extraSpace, iconName, palette, style }) => {
    const container = {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme.palette[palette],
      minHeight: theme.toolbar.minHeight,
      ...style
    }
    const icon = {
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
      marginBottom: 4
    }
    const title = {
      flex: 1,
      paddingLeft: extraSpace || !iconName ? theme.layout.spacing : 0,
      paddingRight: theme.layout.spacing,
      justifyContent: 'center'
    }
    const shadow = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: theme.divider.size,
      backgroundColor: theme.divider.color
    }
    return { container, icon, title, shadow }
  },
  ['extraSpace', 'iconName', 'palette', 'style']
)
