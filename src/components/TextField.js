import { TextInput as RNTextInput } from 'react-native'

import PropTypes from './PropTypes'
import ThemeComponent from './ThemeComponent'

class TextField extends ThemeComponent {
  static propTypes = {
    color: PropTypes.color,
    counterEnabled: PropTypes.bool,
    errorColor: PropTypes.color,
    errorText: PropTypes.text,
    helperText: PropTypes.text,
    hintText: PropTypes.string,
    inputLineEnabled: PropTypes.bool,
    isRequired: PropTypes.bool,
    labelMode: PropTypes.oneOf(['animated', 'fixed', 'none']),
    leftIcon: PropTypes.string,
    maxLength: PropTypes.number,
    prefix: PropTypes.text,
    requireText: PropTypes.text,
    rightIcon: PropTypes.string,
    suffix: PropTypes.text,
    text: PropTypes.string,
    type: PropTypes.oneOf(['singleline', 'multiline', 'textarea'])
  }

  render() {
    return null
  }
}

import RefTextField from './internal/TextField'
TextField.Ref = RefTextField

export default TextField
