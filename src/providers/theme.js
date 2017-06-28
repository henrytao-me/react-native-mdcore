import React, { PureComponent } from 'react'
import { AppState, I18nManager, View } from 'react-native'

import {
  PropTypes,
  StyleSheet
} from '../components'
import Theme from '../theme'
import * as Utils from '../libs/utils'

import Loader from './loader'

const LAND = 'land'
const LDLTR = 'ldltr'
const LDRTL = 'ldrtl'
const PORT = 'port'

export default class ThemeProvider extends PureComponent {

  static childContextTypes = {
    theme: PropTypes.any
  }

  static propTypes = {
    layoutDirection: PropTypes.string,
    orientation: PropTypes.string,
    theme: PropTypes.instanceOf(Theme.constructor),
    smallestWidth: PropTypes.string,
    onConfigChange: PropTypes.func
  }

  static defaultProps = {
    layoutDirection: '',
    orientation: '',
    theme: Theme,
    smallestWidth: '',
    onConfigChange: (_config = {}) => { }
  }

  static defer = () => {
    Loader.defer()
  }

  static ready = () => {
    Loader.ready()
  }

  state = {
    layoutDirection: undefined,
    orientation: undefined,
    smallestWidth: undefined
  }

  _theme = {}

  componentDidMount() {
    this._mounted = true
    AppState.addEventListener('change', this._onAppStateChange)
  }

  componentDidUpdate() {
    if (Loader.isReady()) {
      this.props.onConfigChange(this._getConfigProps())
    }
  }

  componentWillUnmount() {
    this._mounted = false
    AppState.removeEventListener('change', this._onAppStateChange)
  }

  getChildContext() {
    return { theme: this._theme }
  }

  render() {
    const theme = this._theme
    theme.__id = (theme.__id || new Date().getTime()) + 1
    Object.assign(theme, this.props.theme.resolve(Object.values(this._getConfigProps())))
    const styles = Styles.get(theme, this.props)
    return (
      <View style={styles.container} onLayout={this._onLayout}>
        {this.state._ready && <Loader>{this.props.children}</Loader>}
      </View>
    )
  }

  _getConfigProps = () => {
    return Object.keys(this.props)
      .filter(prop => Utils.isString(this.props[prop]))
      .reduce((acc, prop) => {
        acc[prop] = this.props[prop] || this.state[prop]
        return acc
      }, {})
  }

  _onAppStateChange = () => {
    if (I18nManager.isRTL && this.state.layoutDirection !== LDRTL) {
      this.setState({ layoutDirection: LDRTL })
    } else if (!I18nManager.isRTL && this.state.layoutDirection !== LDLTR) {
      this.setState({ layoutDirection: LDLTR })
    }
  }

  _onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    const keys = this.props.theme.getOrderedKeys()
    const newState = Object.assign({ _ready: true }, this.state, {
      smallestWidth: undefined
    })
    keys.forEach(key => {
      const smallestWidth = Utils.idx(key, key => parseInt(/^sw([0-9]+)$/.exec(key)[1]))
      if (smallestWidth && width >= smallestWidth) {
        newState.smallestWidth = key
      }
    })
    if (width > height && this.state.orientation !== LAND) {
      newState.orientation = LAND
    } else if (width <= height && this.state.orientation !== PORT) {
      newState.orientation = PORT
    }
    this.setState(newState)
  }
}

const Styles = StyleSheet.create((theme, { style }) => {
  const container = {
    backgroundColor: theme.palette.background,
    flex: 1,
    ...style
  }
  return { container }
})
