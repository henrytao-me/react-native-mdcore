# react-native-mdcore

Material Design for both Android and iOS. `ThemeProvider` has to be set at root of component tree. All children components can access theme properties via `context`. Features: 

- Provide [default theme properties](src/libs/theme/default.js) for all material components. 
- Easy to customize theme.
- Provide most of material components to build cross platform apps with consistent APIs.


## Installation

```node
npm install react-native-mdcore --save
```


## Usages

### Setup ThemeProvider

Use default theme:

```js
import React from 'react'
import {
  PureComponent,
  ThemeProvider
} from 'react-native-mdcore'

export default class Main extends PureComponent {

  render() {
    return (
      <ThemeProvider>
        <HomeComponent />
      </ThemeProvider>
    )
  }
}
```

Use custom theme:

```js
import React from 'react'
import {
  PureComponent,
  Theme,
  ThemeProvider
} from 'react-native-mdcore'

cons CUSTOM_THEME = Theme.extend({
  palette: {
    primary: '#006f7b',
    primaryDark: '#005a64',
    primaryLight: '#7fb7bd',
  }
})

export default class Main extends PureComponent {

  render() {
    return (
      <ThemeProvider theme={CUSTOM_THEME}>
        <HomeComponent />
      </ThemeProvider>
    )
  }
}
```

Access theme:

```js
import React from 'react'
import {
  PropTypes,
  PureComponent, 
  Text,
  View
} from 'react-native-mdcore'

export default class HomeComponent extends PureComponent {

  static contextTypes = {
    theme: PropTypes.any
  }

  render() {
    const { theme } = this.context
    return (
      <View style={{ backgroundColor: theme.palette.primary }}>
        <Text palette="primary">Home</Text>
      </View>
    )
  }
}
```

### All-in-one place

All components are now in `react-native-mdcore` that makes it easiest to remember and use. 

```js
import React from 'react'
import {
  AppRegistry, AppState, Animated,
  Easing,
  FlatList,
  InteractionManager,
  ListView,
  PixelRatio,
  Platform,
  ScrollView, SectionList, StatusBar,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
  View, VirtualizedList,
  WebView,

  BottomNavigation,
  BottomNavigationItem,
  Button,
  Card,
  Divider,
  Icon,
  Image,
  NativeModules,
  PropTypes,
  PureComponent,
  Ripple,
  StyleSheet,
  TabItem,
  Tabs,
  Text,
  ViewPager,
} from 'react-native-mdcore'

export default class CustomComponent extends PureComponent {

  render() {
    return null
  }
}
```


## License

    Copyright 2017 "Henry Tao <hi@henrytao.me>"

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
