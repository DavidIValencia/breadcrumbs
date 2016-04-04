// resume trip (back)
// Trip name text field
// Description text area
// Tags
// Sare
// Delete

var React = require('react-native')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
  AlertIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class TripSummary extends React.Component{

  saveTrip(){
    this.setState({
      isLoading: true
    });
    this.props.navigator.popN(2);
  }


  render(){
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.saveTrip.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>Save the Trip</Text>
        </TouchableHighlight>
        <Text>Name Trip</Text>
        <TextInput
          style={styles.searchInput} />
        <Text>Description</Text>
        <TextInput
          style={styles.searchInput} />
        <Text>Add Tags</Text>
        <TextInput
          style={styles.searchInput} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => AlertIOS.alert(
                'Are You Sure?'
              )
            }
            underlayColor="green">
              <Text style={styles.title}>Delete This Shit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => AlertIOS.alert(
                'Sharing is caring'
              )
            }
            underlayColor="red">
              <Text style={styles.title}> Share Trip </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

module.exports = TripSummary;