var React = require('react-native')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput
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
    this.ds = new Listview.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      trip: '',
      error: ''
    }
  }
  handleChange(e){
    this.setState({
      trip: e.nativeEvent.text
    })
  }
  handleSubmit(){
    var trip = this.state.trip;
    this.setState({
      trip: ''
    });
    api.addTrip(this.props.userName, trip)
      .then((data)=> {
        api.getTrips(this.props.userName)
          .then((data)=> {
            this.setState({
              dataSource:this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((error)=> {
        console.log('Request failed', error);
        this.setState({error})
      });
  }
  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
      </View>
    )
  }
};


module.exports = PastTrips;