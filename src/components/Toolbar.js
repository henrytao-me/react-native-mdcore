import React from 'react'
import { View } from 'react-native'

import BackNative from './BackNative'
import Elevation from './Elevation'
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
    elevation: PropTypes.number,
    extraSpace: PropTypes.bool,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
    iconSet: PropTypes.string,
    palette: PropTypes.palette,
    statusBar: PropTypes.element,
    subtitle: PropTypes.text,
    title: PropTypes.text,
    onNavigationPress: PropTypes.func
  }

  static defaultProps = {
    extraSpace: true,
    palette: 'primary'
  }

  componentDidMount() {
    BackNative.addEventListener('hardwareBackPress', this._onBackPress)
  }

  componentWillUnmount() {
    BackNative.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  render() {
    const { theme } = this.context
    const styles = Styles.get(theme, this.props)
    const elevation =
      this.props.elevation === 0
        ? 0
        : this.props.elevation || theme.toolbar.elevation
    return (
      <Elevation elevation={elevation}>
        {this.props.statusBar}
        <View style={styles.container}>
          {!!this.props.iconName && (
            <IconToggle
              style={styles.icon}
              color={this.props.iconColor}
              name={this.props.iconName}
              palette={this.props.palette}
              set={this.props.iconSet}
              onPress={this._onIconPress}
            />
          )}
          {this.props.children || (
            <View style={styles.title}>
              {!!this.props.title && (
                <Text
                  type={this.props.subtitle ? 'subhead2' : 'title'}
                  subType="primary"
                  palette={this.props.palette}
                  numberOfLines={1}
                  value={this.props.title}
                />
              )}
              {!!this.props.subtitle && (
                <Text
                  type="body1"
                  subType="secondary"
                  palette={this.props.palette}
                  numberOfLines={1}
                  value={this.props.subtitle}
                />
              )}
            </View>
          )}
        </View>
      </Elevation>
    )
  }

  _onBackPress = () => {
    return this._onNavigationPress(true)
  }

  _onIconPress = () => {
    return this._onNavigationPress()
  }

  _onNavigationPress = (hardwareBackPress = false) => {
    if (this.props.onNavigationPress) {
      const res = this.props.onNavigationPress({
        ...this.props,
        hardwareBackPress
      })
      return res === undefined ? true : res
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
    return { container, icon, title }
  },
  ['extraSpace', 'iconName', 'palette', 'style']
)
