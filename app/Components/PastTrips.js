var React = require('react-native')
var Separator = require('../Helpers/Separator')

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
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.trips),
      error: '',
      selectedTrip: {}
    }
  }

  viewTrip(){
    this.setState({
      selectedTrip
    })
    var trip = {}
    api.getTrips(this.props.username)
      .then((data)=> {
        for (var i = 0; i < data.length; i++){
          if (data[i].name ===  )
        }

      })
  }


  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.viewTrip.bind(this)}
            underlayColor="#88D4F5">
              <Text> {rowData.name} </Text>
              <Text> {rowData.description} </Text>
          </TouchableHighlight>
        </View>
        <Separator />
      </View>
    )
  }

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