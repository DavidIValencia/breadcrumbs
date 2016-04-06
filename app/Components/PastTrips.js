var React = require('react-native')
var Separator = require('../Helpers/Separator')
var Firebase = require('firebase')
var MapPage = require('./MapPage')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
  ListView
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
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class PastTrips extends React.Component{
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this._goToMap = this._goToMap.bind(this);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.trips),
      error: '',
      trips: [],
      crumbs: {},
      pingList: {}
    }
    this.tripsRef = new Firebase(`https://amber-torch-3121.firebaseio.com/${this.props.username}/trips`);
  }

  componentDidMount() {
    this.listenforTrips(this.tripsRef);
  }

  _goToMap(key){
    console.log(key);
    this.props.navigator.push({
      title: "Map View",
      component: MapPage,
      passProps: {
        tripID: key
      }
    });
  }


  listenforTrips(tripsRef) {
    tripsRef.on('value', (snap)=> {
      snap.forEach((child)=> {
        console.log(child.key())
        this.state.trips.push({
          id: child.val().id,
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

  renderRow(rowData){
    console.log(this)
    return (
      <View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#88D4F5"
            onPress={this._goToMap(rowData._key)}>
            <Text> {rowData.name} </Text>
          </TouchableHighlight>
          <Text> {rowData.description} </Text>
          <Text> {rowData._key} </Text>
        </View>
        <Separator />
      </View>
    )
  }

  render(){
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