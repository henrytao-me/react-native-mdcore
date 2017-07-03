import PropTypes from './PropTypes'
import ThemeComponent from './ThemeComponent'

import * as Utils from '../libs/utils'

export default class BottomNavigationContainer extends ThemeComponent {
  static propTypes = {
    initialItem: PropTypes.number
  }

  static defaultProps = {
    initialItem: 0,
    onItemSelected: () => {}
  }

  state = {
    index: undefined
  }

  render() {
    const child = Utils.children(this.props.children)
      .filter((child, index) => index === this._getIndex())
      .map(child => child)
    return child[0] || null
  }

  setItem = index => {
    this.setState({ index })
  }

  _getIndex = () => {
    return this.state.index === undefined
      ? this.props.initialItem
      : this.state.index
  }
}
