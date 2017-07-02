import PropTypes from 'prop-types'

export default Object.assign({}, PropTypes, {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  ellipsizeMode: PropTypes.oneOf(['head', 'middle', 'tail', 'clip']),
  imageRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto', 'none'])
  ]),
  imageResizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'center']),
  imageScaleType: PropTypes.oneOf(['width', 'height', 'none']),
  imageSource: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      uri: PropTypes.string
    }),
    PropTypes.string
  ]),
  listItemType: PropTypes.oneOf([
    'single-line-text-only',
    'single-line-icon-with-text',
    'single-line-avatar-with-text',
    'single-line-avatar-with-text-and-icon',
    'two-line-text-only',
    'two-line-icon-with-text',
    'two-line-avatar-with-text',
    'two-line-avatar-with-text-and-icon',
    'three-line-text-only',
    'three-line-icon-with-text',
    'three-line-avatar-with-text',
    'three-line-avatar-with-text-and-icon'
  ]),
  opacity: PropTypes.number,
  palette: PropTypes.oneOf([
    'primary',
    'primaryDark',
    'primaryLight',
    'accent',
    'accentDark',
    'accentLight',
    'warn',
    'warnDark',
    'warnLight',
    'background',
    'backgroundDark',
    'backgroundLight'
  ]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  textSubType: PropTypes.oneOf(['primary', 'secondary', 'hint']),
  textType: PropTypes.oneOf([
    'button',
    'caption',
    'body1',
    'body2',
    'subhead1',
    'subhead2',
    'title',
    'headline',
    'display1',
    'display2',
    'display3',
    'display4'
  ]),
  view: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
})
