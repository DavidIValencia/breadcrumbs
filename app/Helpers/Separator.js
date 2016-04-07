var React = require('react-native')

var {
  View,
  StyleSheet,

} = React;

var styles = StyleSheet.create({
  separator: {
    height: 2,
    backgroundColor: '#E4E4E4',
    flex: 2,
    marginLeft: 15
  },
});

class Separator extends React.Component {
  render() {
    return (
      <View style={styles.separator} />
    );
  }
};

module.exports = Separator;