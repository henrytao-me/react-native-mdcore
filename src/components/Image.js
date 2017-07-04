import React, { Component } from 'react'
import { Image as RNImage, TouchableWithoutFeedback, View } from 'react-native'

import PropTypes from './PropTypes'
import StyleSheet from './StyleSheet'
import ThemeComponent from './ThemeComponent'

import * as Utils from '../libs/utils'

const DEEP_PROPS = ['resizeMode', 'source', 'style']

class RawImage extends Component {
  static propTypes = {
    resizeMode: PropTypes.any,
    source: PropTypes.any
  }

  shouldComponentUpdate(nextProps) {
    const res = DEEP_PROPS.reduce((acc, key) => {
      return acc || !Utils.deepEqual(nextProps[key], this.props[key])
    }, false)
    return res && !!nextProps.style.width && !!nextProps.style.height
  }

  render() {
    console.log('aaaaaaaaaaa', this.props)
    return (
      <RNImage
        style={this.props.style}
        resizeMode={this.props.resizeMode}
        source={this.props.source}
      />
    )
  }
}

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
    radius: undefined,
    resizeMode: 'cover',
    scaleType: 'width',
    onPress: () => {}
  }

  state = {
    finalHeight: 0,
    finalWidth: 0,
    imageUri: null,
    imageHeight: 0,
    imageWidth: 0,
    layoutHeight: 0,
    layoutWidth: 0
  }

  componentDidMount() {
    this._onSourceChange(this.props.source)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source !== this.props.source) {
      this._onSourceChange(nextProps.source)
    }
  }

  render() {
    const styles = Styles.get(undefined, this.props, this.state)
    return (
      <View onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this._onPress}>
          <RawImage
            style={styles.container}
            resizeMode={this.props.resizeMode}
            source={this._getImage()}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }

  _getImage = () => {
    if (this.state.imageUri) {
      return {
        height: this.state.imageHeight,
        uri: this.state.imageUri,
        width: this.state.imageWidth
      }
    }
    const placeholder = Utils.isString(this.props.placeholder)
      ? { uri: this.props.placeholder }
      : this.props.placeholder
    return {
      height: undefined,
      uri: undefined,
      width: undefined,
      ...RNImage.resolveAssetSource(placeholder)
    }
  }

  _onConfigChange = (
    shouldSetState = false,
    props = this.props,
    state = this.state
  ) => {
    const { ratio } = props
    const { imageHeight, imageWidth } = state
    const layoutHeight = props.height || state.layoutHeight || 0
    const layoutWidth = props.width || state.layoutWidth || 0
    let finalHeight = 0
    let finalWidth = 0
    switch (props.scaleType) {
      case 'height':
        finalHeight = layoutHeight
        finalWidth = layoutHeight * imageWidth / imageHeight
        if (ratio) {
          finalWidth = finalHeight * ratio
        }
        break
      case 'width':
        finalHeight = layoutWidth * imageHeight / imageWidth
        finalWidth = layoutWidth
        if (ratio) {
          finalHeight = finalWidth / ratio
        }
        break
      default:
        finalHeight = layoutHeight
        finalWidth = layoutWidth
        break
    }
    finalHeight = finalHeight || 0
    finalWidth = finalWidth || 0
    const res = { finalHeight, finalWidth }
    if (shouldSetState) {
      this.setState(res)
    }
    return res
  }

  _onLayout = ({ nativeEvent: { layout: { height, width } } }) => {
    this._updateState({
      layoutHeight: height,
      layoutWidth: width
    })
  }

  _onPress = () => {
    this.props.onPress({ ...this.props })
  }

  _onSourceChange = source => {
    const newSource = RNImage.resolveAssetSource(
      Utils.isString(source) ? { uri: source } : source
    )
    if (newSource && newSource.uri) {
      RNImage.getSize(newSource.uri, (width, height) => {
        this._updateState({
          imageHeight: height,
          imageUri: newSource.uri,
          imageWidth: width
        })
      })
    }
  }

  _updateState = newState => {
    this.setState(newState, () => this._onConfigChange(true))
  }
}

const Styles = StyleSheet.create(
  (theme, { height, radius, style, width }, { finalHeight, finalWidth }) => {
    finalHeight = finalHeight || height
    finalWidth = finalWidth || width
    const finalRadius =
      (radius === 'auto' ? Math.min(finalHeight, finalWidth) / 2 : radius) ||
      undefined

    const container = {
      borderRadius: finalRadius,
      height: finalHeight || undefined,
      width: finalWidth || undefined,
      ...style
    }
    return { container }
  },
  ['height', 'radius', 'style', 'width'],
  ['finalHeight', 'finalWidth']
)
