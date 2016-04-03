var React = require('react-native')
var UserPage = require('./UserPage')
var TripPage = require('./TripPage')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput
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

class Home extends React.Component{
    goToUserPage(){
      this.props.navigator.push({
        title: "Past Trips",
        component: UserPage
      });
    }
      newTrip(){
      this.props.navigator.push({
        title: "Trip Page",
        component: TripPage
      });
    }
  render(){
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          onPress={this.goToUserPage.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>Past Trips</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.newTrip.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>Start New Trip</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = Home;