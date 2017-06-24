import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewPagerAndroid
} from 'react-native'

export default class ViewPager extends Component {

  static propTypes = {
    bounces: PropTypes.boolean,
    count: PropTypes.number,
    onSelectedIndexChange: PropTypes.func,
    selectedIndex: PropTypes.number
  }

  static defaultProps = {
    onSelectedIndexChange: (_index) => { }
  }

  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex || 0,
      scrollingTo: null
    }
    this.handleHorizontalScroll = this.handleHorizontalScroll.bind(this)
    this.adjustCardSize = this.adjustCardSize.bind(this)
  }

  render() {
    if (Platform.OS === 'ios') {
      return this.renderIOS()
    } else {
      return this.renderAndroid()
    }
  }

  renderIOS() {
    return (
      <ScrollView
        ref="scrollview"
        contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal={true}
        pagingEnabled={true}
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews={true}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        onLayout={this.adjustCardSize}>
        {this.renderContent()}
      </ScrollView>
    )
  }

  renderAndroid() {
    return (
      <ViewPagerAndroid
        ref="scrollview"
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this.handleHorizontalScroll}
        style={[styles.container, this.props.style]}
        onLayout={this.adjustCardSize}>
        {this.renderContent()}
      </ViewPagerAndroid>
    )
  }

  adjustCardSize(e) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (Platform.OS === 'ios') {
        this.refs.scrollview.scrollTo({
          x: nextProps.selectedIndex * this.state.width,
          animated: true,
        })
        this.setState({ scrollingTo: nextProps.selectedIndex })
      } else {
        this.refs.scrollview.setPage(nextProps.selectedIndex)
        this.setState({ selectedIndex: nextProps.selectedIndex })
      }
    }
  }

  renderContent() {
    const { width, height } = this.state
    const style = Platform.OS === 'ios' && styles.card
    if (!this.props.children) {
      return null
    }
    return this.props.children.map((child, i) => (
      <View style={[style, { width, height }]} key={'r_' + i}>
        {child}
      </View>
    ))
  }

  handleHorizontalScroll(e) {
    let selectedIndex = e.nativeEvent.position
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
        e.nativeEvent.contentOffset.x / this.state.width,
      )
    }
    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return
    }
    if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
      return
    }
    if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
      this.setState({ selectedIndex, scrollingTo: null })
      const { onSelectedIndexChange } = this.props
      onSelectedIndexChange && onSelectedIndexChange(selectedIndex)
    }
  }

  setPage = (index) => {
    if (Platform.OS === 'ios') {
      this.refs.scrollview.scrollTo({
        x: index * this.state.width,
        animated: true,
      })
      this.setState({ scrollingTo: index })
    } else {
      this.refs.scrollview.setPage(index)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'transparent',
  }
})
