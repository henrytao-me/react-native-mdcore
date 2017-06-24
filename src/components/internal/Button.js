import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'
import PropTypes from 'prop-types'

export default class Button extends Component {

  static propTypes = {
    /**
     * Text to display inside the button
     */
    title: PropTypes.string.isRequired,
    /**
     * Text to display for blindness accessibility features
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Color of the text (iOS), or background color of the button (Android)
     */
    color: PropTypes.any,
    /**
     * If true, disable all interactions for this component.
     */
    disabled: PropTypes.bool,
    /**
     * Handler to be called when the user taps the button
     */
    onPress: PropTypes.func.isRequired,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: PropTypes.string,

    buttonStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object
  }

  render() {
    const {
      accessibilityLabel,
      color,
      onPress,
      disabled,
      testID,
    } = this.props
    const title = `${this.props.title}`
    const buttonStyles = [styles.button]
    const textStyles = [styles.text]
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    if (color && Platform.OS === 'ios') {
      textStyles.push({ color: color })
    } else if (color) {
      buttonStyles.push({ backgroundColor: color })
    }
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled)
      textStyles.push(styles.textDisabled)
    }
    const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title
    const accessibilityTraits = ['button']
    if (disabled) {
      accessibilityTraits.push('disabled')
    }
    buttonStyles.push(this.props.buttonStyle)
    textStyles.push(this.props.textStyle)
    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        testID={testID}
        disabled={disabled}
        onPress={onPress}>
        <View style={buttonStyles}>
          <Text style={textStyles} disabled={disabled}>{formattedTitle}</Text>
        </View>
      </Touchable>
    )
  }
}

// Material design blue from https://material.google.com/style/color.html#color-color-palette
let defaultBlue = '#2196F3'
if (Platform.OS === 'ios') {
  // Measured default tintColor from iOS 10
  defaultBlue = '#007AFF'
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      elevation: 4,
      backgroundColor: defaultBlue,
      borderRadius: 2,
    },
    android: {
      elevation: 4,
      backgroundColor: defaultBlue,
      borderRadius: 2,
    },
  }),
  text: Platform.select({
    ios: {
      color: defaultBlue,
      textAlign: 'center',
      padding: 8,
      fontSize: 18,
    },
    android: {
      textAlign: 'center',
      color: 'white',
      padding: 8,
      fontWeight: '500',
    },
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#a1a1a1',
    }
  }),
})
