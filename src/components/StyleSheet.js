import * as Utils from '../libs/utils'

export default class StyleSheet {
  static create(creator = (_theme, ..._args) => {}, ...whitelists) {
    return new StyleSheet(
      Utils.isFunction(creator) ? creator : () => creator,
      ...whitelists
    )
  }

  static _getThemeId(theme) {
    return theme ? theme.__id : null
  }

  constructor(creator, ...whitelists) {
    this._creator = creator
    this._whitelists = whitelists
    this._theme = undefined
    this._themeId = undefined
    this._args = undefined
    this._style = undefined
  }

  get(theme = null, ...args) {
    args = args.map((arg, index) => {
      const whitelist =
        Utils.idx(
          this._whitelists,
          whitelists =>
            Utils.isArray(whitelists[index]) ? whitelists[index] : undefined
        ) || []
      if (whitelist.length > 0) {
        return whitelist.reduce((acc, key) => {
          acc[key] = arg[key]
          return acc
        }, {})
      }
      return arg
    })
    if (this._shouldRenewCache(theme, args)) {
      this._theme = theme
      this._themeId = this.constructor._getThemeId(theme)
      this._args = args
      this._style = this._creator(this._theme, ...this._args)
    }
    if (__DEV__ && args[0] && this._whitelists[0] === undefined) {
      // eslint-disable-next-line
      console.warn(
        'StyleSheet.create(theme, { ... }, [ ... ]) should be optimized'
      )
    }
    return this._style
  }

  _shouldRenewCache(theme = null, args) {
    return (
      theme !== this._theme ||
      this.constructor._getThemeId(theme) !== this._themeId ||
      !Utils.deepEqual(args, this._args)
    )
  }
}
