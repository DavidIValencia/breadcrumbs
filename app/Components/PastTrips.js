var React = require('react-native')
var Separator = require('../Helpers/Separator')
var Firebase = require('firebase')
var MapPage = require('./MapPage')
var api = require('../Utils/api')

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
  mainContainer: {
    flex: 1,
    // padding: 30,
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: '#8f9fb2'
  },
  title: {
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Helvetica',
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  date: {
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Helvetica',
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    // alignItems: 'center',
    // resizeMode: Image.resizeMode.contain,
    width: null,
    height: null,
    resizeMode: 'stretch'

  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  button: {
    opacity: 0.8,
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#FF3366',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 80,
    marginLeft: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  separator: {
    marginBottom: 50,
  }
});

class PastTrips extends React.Component{
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.goToMap = this.goToMap.bind(this);
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

  goToMap(key){
    api.getTrip(this.props.username, key)
      .then((data)=> {
      this.props.navigator.push({
        title: "Map View",
        component: MapPage,
        passProps: {
          crumbs: data.crumbs,
          pingList: data.pingList,
          username: this.props.username
        }
      });
    })
  }


  listenforTrips(tripsRef) {
    tripsRef.on('value', (snap)=> {
      snap.forEach((child)=> {
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
    return (
      <View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#88D4F5"
            onPress={()=> this.goToMap(rowData._key)}>
            <Text style={styles.buttonText}> {rowData.name} </Text>
          </TouchableHighlight>
            <Text style={styles.title}> {rowData.description} </Text>
            <Text style={styles.date}> {new Date(Math.floor(rowData.timestamp)).toDateString()} </Text>

        </View>
        <Separator style={styles.separator} />
      </View>
    )
  }

  render(){
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.backgroundImage} source={require('../Images/mt-background.jpg')}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow} />
            </Image>
      </View>
    )
  }
};


module.exports = PastTrips;