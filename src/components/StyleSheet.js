import * as Utils from '../libs/utils'

export default class StyleSheet {

  static create(creator = (_theme, ..._args) => { }) {
    return new StyleSheet(creator)
  }

  constructor(creator) {
    this._creator = creator
    this._theme = null
    this._themeId = null
    this._args = []
    this._style = null
  }

  get(theme, ...args) {
    if (this._shouldRenewCache(theme, args)) {
      this._theme = theme
      this._themeId = theme.__id
      this._args = args
      this._style = this._creator(this._theme, ...this._args)
    }
    return this._style
  }

  _shouldRenewCache(theme, ...args) {
    if (theme !== undefined && (theme !== this._theme || theme.__id !== this._themeId || !Utils.deepEqual(args, this._args))) {
      return true
    }
    return false
  }
}
