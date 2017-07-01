import {
  PropTypes,
  PureComponent
} from '../components'

let READY = true

const LISTENERS = []
const addListener = listener => {
  if (READY) {
    listener()
  } else {
    LISTENERS.push(listener)
  }
}
const removeListener = listener => {
  const index = LISTENERS.indexOf(listener)
  if (index >= 0) {
    LISTENERS.slice(index, 1)
  }
}

export default class Loader extends PureComponent {

  static propTypes = {
    onRender: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onRender: () => { },
    onUpdate: () => { }
  }

  static defer = () => {
    READY = false
    LISTENERS.splice(0, LISTENERS.length)
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
    this._onUpdate()
  }

  componentDidUpdate() {
    this._onUpdate()
  }

  componentWillUnmount() {
    removeListener(this._onReady)
  }

  render() {
    const { ready } = this.state
    if (!ready) {
      return null
    } else {
      this._onRender()
      return this.props.children
    }
  }

  _onReady = () => {
    this.setState({
      ready: true
    })
  }

  _onRender = () => {
    this.props.onRender()
  }

  _onUpdate = () => {
    if (this.state.ready) {
      this.props.onUpdate()
    }
  }
}
