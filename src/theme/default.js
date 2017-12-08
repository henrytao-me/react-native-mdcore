// Dark text on light background:  87%:DE 54%:8A 38%:61 12%:1E
// White text on dark background: 100%:FF 70%:B3 50%:80 12%:1E
// Icon on light background: 54%:8A 38%:61
// Icon on dark background: 100%:FF 50%:80

export default {
  bottomNavigation: {
    height: 56
  },
  button: {
    borderRadius: 2,
    borderWidth: 0.87,
    elevation: 2,
    externalPadding: 8,
    internalPadding: 8,
    height: 36,
    minWidth: 80,
    touchTarget: 48
  },
  card: {
    borderRadius: 2,
    borderWidth: 0.87,
    elevation: 2,
    spacingXs: 4,
    spacingSm: 8,
    spacing: 16,
    spacingLg: 24,
    spacingXlg: 32
  },
  dialog: {
    background: '#303030B3',
    spacing: 24
  },
  divider: {
    color: '#0000001E',
    size: 0.87
  },
  fontFamily: {
    bold: undefined,
    light: undefined,
    medium: undefined,
    regular: undefined
  },
  fontSize: {
    button: 14,
    caption: 12,
    body1: 14,
    body2: 14,
    subhead1: 16,
    subhead2: 16,
    title: 20,
    headline: 24,
    display1: 34,
    display2: 45,
    display3: 56,
    display4: 112
  },
  fontWeight: {
    button: undefined,
    caption: undefined,
    body1: undefined,
    body2: undefined,
    subhead1: undefined,
    subhead2: undefined,
    title: undefined,
    headline: undefined,
    display1: undefined,
    display2: undefined,
    display3: undefined,
    display4: undefined
  },
  icon: {
    size: 24,
    sizeSm: 16,
    activeColor: '#0000008A',
    inactiveColor: '#00000061'
  },
  iconColor: {
    active: {
      primary: '#FFFFFFB3',
      primaryDark: '#FFFFFFB3',
      primaryLight: '#0000008A',
      accent: '#0000008A',
      accentDark: '#0000008A',
      accentLight: '#0000008A',
      warn: '#FFFFFFB3',
      warnDark: '#FFFFFFB3',
      warnLight: '#0000008A',
      background: '#0000008A',
      backgroundDark: '#0000008A',
      backgroundLight: '#0000008A'
    },
    focused: {
      primary: '#FFFFFFFF',
      primaryDark: '#FFFFFFFF',
      primaryLight: '#000000DE',
      accent: '#000000DE',
      accentDark: '#000000DE',
      accentLight: '#000000DE',
      warn: '#FFFFFFFF',
      warnDark: '#FFFFFFFF',
      warnLight: '#000000DE',
      background: '#000000DE',
      backgroundDark: '#000000DE',
      backgroundLight: '#000000DE'
    },
    inactive: {
      primary: '#FFFFFF80',
      primaryDark: '#FFFFFF80',
      primaryLight: '#00000061',
      accent: '#00000061',
      accentDark: '#00000061',
      accentLight: '#00000061',
      warn: '#FFFFFF80',
      warnDark: '#FFFFFF80',
      warnLight: '#00000061',
      background: '#00000061',
      backgroundDark: '#00000061',
      backgroundLight: '#00000061'
    }
  },
  iconToggle: {
    size: 48
  },
  layout: {
    spacingXs: 4,
    spacingSm: 8,
    spacing: 16,
    spacingLg: 24,
    spacingXlg: 32
  },
  lineHeight: {
    button: undefined,
    caption: undefined,
    body1: 20,
    body2: 24,
    subhead1: 24,
    subhead2: 28,
    title: undefined,
    headline: 32,
    display1: 40,
    display2: 48,
    display3: undefined,
    display4: undefined
  },
  list: {
    avatarSize: 40,
    iconSize: 48,
    padding: {
      horizontal: 16,
      vertical: 8
    },
    singleLineTextOnlyHeight: 48,
    singleLineIconWithTextHeight: 48,
    singleLineAvatarWithTextHeight: 56,
    singleLineAvatarWithTextAndIconHeight: 56,
    twoLineTextOnlyHeight: 72,
    twoLineIconWithTextHeight: 72,
    twoLineAvatarWithTextHeight: 72,
    twoLineAvatarWithTextAndIconHeight: 72,
    threeLineTextOnlyHeight: 88,
    threeLineIconWithTextHeight: 88,
    threeLineAvatarWithTextHeight: 88,
    threeLineAvatarWithTextAndIconHeight: 88
  },
  palette: {
    primary: '#03A9F4',
    primaryDark: '#0288D1',
    primaryLight: '#B3E5FC',
    accent: '#FF4081',
    accentDark: '#F50057',
    accentLight: '#FF80AB',
    warn: '#EC4058',
    warnDark: '#D91631',
    warnLight: '#F27889',
    background: '#FAFAFA',
    backgroundDark: '#EEEEEE',
    backgroundLight: '#FFFFFF'
  },
  paletteMode: {
    primary: 'dark',
    primaryDark: 'dark',
    primaryLight: 'light',
    accent: 'light',
    accentDark: 'light',
    accentLight: 'light',
    warn: 'light',
    warnDark: 'dark',
    warnLight: 'dark',
    background: 'light',
    backgroundDark: 'light',
    backgroundLight: 'light'
  },
  tab: {
    iconOnlyHeight: 48,
    iconWithTextHeight: 72,
    indicatorHeight: 2,
    spacing: 8,
    textOnlyHeight: 48
  },
  textColor: {
    primary: {
      primary: '#FFFFFFFF',
      primaryDark: '#FFFFFFFF',
      primaryLight: '#000000DE',
      accent: '#000000DE',
      accentDark: '#000000DE',
      accentLight: '#000000DE',
      warn: '#FFFFFFFF',
      warnDark: '#FFFFFFFF',
      warnLight: '#000000DE',
      background: '#000000DE',
      backgroundDark: '#000000DE',
      backgroundLight: '#000000DE'
    },
    secondary: {
      primary: '#FFFFFFB3',
      primaryDark: '#FFFFFFB3',
      primaryLight: '#0000008A',
      accent: '#0000008A',
      accentDark: '#0000008A',
      accentLight: '#0000008A',
      warn: '#FFFFFFB3',
      warnDark: '#FFFFFFB3',
      warnLight: '#0000008A',
      background: '#0000008A',
      backgroundDark: '#0000008A',
      backgroundLight: '#0000008A'
    },
    hint: {
      primary: '#FFFFFF80',
      primaryDark: '#FFFFFF80',
      primaryLight: '#00000061',
      accent: '#00000061',
      accentDark: '#00000061',
      accentLight: '#00000061',
      warn: '#FFFFFF80',
      warnDark: '#FFFFFF80',
      warnLight: '#00000061',
      background: '#00000061',
      backgroundDark: '#00000061',
      backgroundLight: '#00000061'
    }
  },
  toolbar: {
    elevation: 4,
    minHeight: 56
  }
}
