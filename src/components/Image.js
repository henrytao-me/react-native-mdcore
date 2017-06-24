import React from 'react'
import { Image as RNImage, View } from 'react-native'

import PropTypes from './PropTypes'
import PureComponent from './PureComponent'

import * as Utils from '../libs/utils'

export default class Image extends PureComponent {

  static propTypes = {
    height: PropTypes.number,
    placeholder: PropTypes.imageSource,
    radius: PropTypes.imageRadius,
    resizeMode: PropTypes.imageResizeMode,
    scaleType: PropTypes.imageScaleType,
    source: PropTypes.imageSource,
    width: PropTypes.number
  }

  static defaultProps = {
    radius: 'none',
    resizeMode: 'contain',
    scaleType: 'width'
  }

  state = {
    width: 0,
    height: 0
  }

  _mounted = false

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  render() {
    const image = this._getImage()
    const radius = this._getRadius()
    return (
      <View style={[{ width: this.props.width, height: this.props.height }, this.props.style]} onLayout={this._onLayout}>
        <RNImage style={{ width: this._getWidth(), height: this._getHeight(), borderRadius: radius }}
          resizeMode={this.props.resizeMode}
          source={image} />
      </View>
    )
  }

  _getHeight = () => {
    return this.props.height || this.state.height
  }

  _getImage = () => {
    const source = this._getSource()
    const placeholder = this._getPlaceholder()
    return (!!source && !!source.uri ? source : null) || (!!placeholder && !!placeholder.uri ? placeholder : null)
  }

  _getPlaceholder = () => {
    const placeholder = Utils.isString(this.props.placeholder) ? { uri: this.props.placeholder } : this.props.placeholder
    return RNImage.resolveAssetSource(placeholder) || { uri: undefined, width: undefined, height: undefined }
  }

  _getRadius = () => {
    const { width, height } = this.state
    const { radius } = this.props
    switch (radius) {
      case 'none':
        return undefined
      case 'auto':
        return Math.min(width, height) / 2
      default:
        return radius
    }
  }

  _getSource = () => {
    const source = Utils.isString(this.props.source) ? { uri: this.props.source } : this.props.source
    return RNImage.resolveAssetSource(source) || { uri: undefined, width: undefined, height: undefined }
  }

  _getWidth = () => {
    return this.props.width || this.state.width
  }

  _onLayout = (e) => {
    const { scaleType } = this.props
    const { layout } = e.nativeEvent
    const image = this._getImage()
    if (!!image && !!image.uri) {
      if (!!image.width && !!image.height) {
        this._computeImageSize(scaleType, layout, image.width, image.height)
      } else {
        RNImage.getSize(image.uri, (width, height) => {
          this._computeImageSize(scaleType, layout, width, height)
        })
      }
    }
  }

  _computeImageSize = (scaleType, layout, width, height) => {
    if (!this._mounted) {
      return
    }
    this.setState({
      width: scaleType === 'width' || scaleType === 'none' ? layout.width : layout.height * width / height,
      height: scaleType === 'height' || scaleType === 'none' ? layout.height : layout.width * height / width
    })
  }
}
