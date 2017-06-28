import { PureComponent } from 'react'

let READY = true

const LISTENERS = []
const addListener = (listener) => {
  if (READY) {
    listener()
  } else {
    LISTENERS.push(listener)
  }
}
const removeListener = (listener) => {
  const index = LISTENERS.indexOf(listener)
  if (index >= 0) {
    LISTENERS.slice(index, 1)
  }
}

export default class Loader extends PureComponent {

  static defer = () => {
    READY = false
    LISTENERS.splice(0, LISTENERS.length)
  }

  static isReady = () => {
    return READY
  }

  static ready = () => {
    READY = true
    LISTENERS.forEach(listener => listener())
    LISTENERS.splice(0, LISTENERS.length)
  }

  state = {
    ready: READY
  }

  componentDidMount() {
    addListener(this._onReady)
  }

  componentWillUnmount() {
    removeListener(this._onReady)
  }

  render() {
    const { ready } = this.state
    if (!ready) {
      return null
    } else {
      return this.props.children
    }
  }

  _onReady = () => {
    this.setState({
      ready: true
    })
  }
}
