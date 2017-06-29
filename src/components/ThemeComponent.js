import { Component } from 'react'

import PropTypes from './PropTypes'

import * as Utils from '../libs/utils'

export default class ThemeComponent extends Component {

  static contextTypes = {
    theme: PropTypes.any
  }

  _themeId = undefined

  shouldComponentUpdate(nextProps, nextState, nextContext, deepPropKeys = [], ignorePropKeys = []) {
    const currentProps = { ...this.props }
    const newProps = { ...nextProps }
    const currentState = { ...this.state }
    const newState = { ...nextState }
    const currentThemeId = this._themeId
    const newThemeId = this.context.theme.__id
    this._themeId = newThemeId
    deepPropKeys.forEach(key => {
      const currentData = currentProps[key]
      const newData = newProps[key]
      if (Utils.deepEqual(currentData, newData)) {
        Object.assign(newProps, { [key]: currentData })
      }
    })
    ignorePropKeys.forEach(key => {
      currentProps[key] = newProps[key] = undefined
    })
    return currentThemeId !== newThemeId || !Utils.shallowEqual(currentProps, newProps) || !Utils.shallowEqual(currentState, newState)
  }

  render() {
    return this.props.children
  }
}
