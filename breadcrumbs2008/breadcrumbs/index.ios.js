var React = require('react-native')
var Main = require('./app/Components/Main')


var {
  NavigatorIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

class breadcrumbs extends React.Component {
  render() {
    return (
      <NavigatorIOS
      style={styles.container}
        initialRoute={{
          title: "Breadcrumbs",
          component: Main
        }} />
    );
  }
};


AppRegistry.registerComponent('breadcrumbs', () => breadcrumbs);
