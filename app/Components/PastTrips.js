var React = require('react-native')
var Separator = require('../Helpers/Separator')
var Firebase = require('firebase')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
  ListView,
  Image,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    // resizeMode: Image.resizeMode.contain,
    width: null,
    height: null,
  },

  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  // footerContainer: {
  //   backgroundColor: '#E3E3E3',
  //   alignItems: 'center',
  //   flexDirection: 'row'
  // }
});

class PastTrips extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.trips),
      error: '',
      trips: []
    }
    this.tripsRef = new Firebase(`https://amber-torch-3121.firebaseio.com/${this.props.username}/trips`);
  }


  listenforTrips(tripsRef) {
    tripsRef.on('value', (snap)=> {
      snap.forEach((child)=> {
        this.state.trips.push({
          name: child.val().name,
          description: child.val().description,
          tags: child.val().tags,
          timestamp: child.val().timestamp,
          _key: child.key()
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.trips)
      });
    });
  }

  // viewTrip() {
  //   var tripIndex = 
  // }

  componentDidMount() {
    this.listenforTrips(this.tripsRef);
  }

  renderRow(rowData){
    return (
      <Image source={require('../Images/bay-bridge-traffic.gif')} style={styles.backgroundImage}>


            <TouchableHighlight
              style={styles.button}
              // onPress={this.viewTrip.bind(this)}
              underlayColor="#88D4F5">
              <Text> {rowData.name} </Text>
            </TouchableHighlight>
            <Text> {rowData.description} </Text>

          <Separator />

      </Image>
    )
  }

  // <Image source={require('../Images/India.gif')} style={styles.backgroundImage}>

  //       <TextInput
  //         onChangeText={ (text)=> this.setState({email: text}) }
  //         style={styles.input} placeholder="Email"
  //         placeholderTextColor="white">
  //       </TextInput>

  //       <TextInput
  //         onChangeText={ (text)=> this.setState({name: text}) }
  //         style={styles.input} placeholder="Name"
  //         placeholderTextColor="white">
  //       </TextInput>
  //       <TextInput
  //         onChangeText={ (text)=> this.setState({password: text}) }
  //         style={styles.input}
  //         placeholder="Password"
  //         placeholderTextColor="white"
  //         secureTextEntry={true}>
  //       </TextInput>

  //       <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
  //         <Text style={styles.buttonText}>
  //           Submit
  //         </Text>
  //       </TouchableHighlight>

  render(){
    debugger
    return (
      <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow} />
      </View>
    )
  }
};


module.exports = PastTrips;