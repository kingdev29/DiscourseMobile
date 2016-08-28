/* @flow */
'use strict'

import React from 'react'

import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  View
} from 'react-native'

class HomeTermBar extends React.Component {
  static propTypes = {
    expanded: React.PropTypes.bool.isRequired,
    onDidSubmitTerm: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      termContainerHeight: new Animated.Value(props.expanded ? 48 : 0),
      text: '',
      expanded: props.expanded || false
    }
  }

  termContainerAnimatedHeight() {
    return this.state.termContainerHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 48],
    })
  }

  hideTermInput() {
    this.refs.Input.blur()
    Animated.timing(this.state.termContainerHeight, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: 0
    }).start()
  }

  showTermInput() {
    this.refs.Input.focus()
    Animated.timing(this.state.termContainerHeight, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: 1
    }).start()
  }

  handleSubmitTerm(term) {
    this.setState({text: ''})
    this.props.onDidSubmitTerm(term)
  }

  componentWillReceiveProps(props) {
    if (props.expanded) {
      this.showTermInput()
    }
    else {
      this.hideTermInput()
    }
  }

  render() {
    return (
      <Animated.View style={[styles.termContainer, {height: this.termContainerAnimatedHeight()}]}>
        <TextInput
          ref="Input"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={(event)=>this.handleSubmitTerm(event.nativeEvent.text)}
          placeholder="meta.discourse.org"
          style={styles.term}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  term: {
    flex:1,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    marginRight: 12,
    height: 36
  },
  termContainer: {
    backgroundColor: '#e9e9e9',
    height: 48,
    overflow: 'hidden'
  }
})

export default HomeTermBar