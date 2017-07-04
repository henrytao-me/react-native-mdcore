import React from 'react'
import { Image as RNImage, TouchableWithoutFeedback, View } from 'react-native'

import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import ThemeComponent from './ThemeComponent'

import * as Utils from '../libs/utils'

export default class Image extends ThemeComponent {
  static propTypes = {
    height: PropTypes.number,
    placeholder: PropTypes.imageSource,
    radius: PropTypes.imageRadius,
    ratio: PropTypes.number,
    resizeMode: PropTypes.imageResizeMode,
    scaleType: PropTypes.imageScaleType,
    source: PropTypes.imageSource,
    width: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    radius: 'none',
    resizeMode: 'cover',
    scaleType: 'width',
    onPress: () => {}
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
    const styles = Styles.get(undefined, this.props, {
      height: this._getHeight(),
      radius,
      width: this._getWidth()
    })
    return (
      <TouchableWithoutFeedback
        onPress={this._onPress}
        onLayout={this._onLayout}>
        <View style={styles.container}>
          <RNImage
            style={styles.image}
            resizeMode={this.props.resizeMode}
            source={image}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _computeImageSize = (scaleType, layout, width, height) => {
    if (!this._mounted) {
      return
    }
    this.setState({
      width:
        scaleType === 'width' || scaleType === 'none'
          ? layout.width
          : layout.height * width / height,
      height:
        scaleType === 'height' || scaleType === 'none'
          ? layout.height
          : layout.width * height / width
    })
  }

  _getHeight = () => {
    return this.props.height || this.state.height
  }

  _getImage = () => {
    const source = this._getSource()
    const placeholder = this._getPlaceholder()
    return (
      (!!source && !!source.uri ? source : null) ||
      (!!placeholder && !!placeholder.uri ? placeholder : null)
    )
  }

  _getPlaceholder = () => {
    const placeholder = Utils.isString(this.props.placeholder)
      ? { uri: this.props.placeholder }
      : this.props.placeholder
    return (
      RNImage.resolveAssetSource(placeholder) || {
        uri: undefined,
        width: undefined,
        height: undefined
      }
    )
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
    const source = Utils.isString(this.props.source)
      ? { uri: this.props.source }
      : this.props.source
    return (
      RNImage.resolveAssetSource(source) || {
        uri: undefined,
        width: undefined,
        height: undefined
      }
    )
  }

  _getWidth = () => {
    return this.props.width || this.state.width
  }

  _onLayout = ({ nativeEvent: { layout } }) => {
    const { scaleType } = this.props
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

  _onPress = () => {
    this.props.onPress({ ...this.props })
  }
}

const Styles = StyleSheet.create(
  (
    theme,
    { height, style, width },
    { height: imageHeight, radius: imageRadius, width: imageWidth }
  ) => {
    const container = {
      alignSelf: 'stretch',
      height,
      width,
      ...style
    }
    const image = {
      borderRadius: imageRadius,
      height: imageHeight,
      width: imageWidth
    }
    return { container, image }
  },
  ['height', 'style', 'width']
)
