var React = require('react-native')
var MapView = require('react-native-maps')

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
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
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
});

// this function returns a data collection that MapView.Polyline can digest
// as an argument, it takes the same thing we call .map on for the markers
var drawLines = function(someCoords){
  var lineCoords = [];
  someCoords.forEach(function(element){
    lineCoords.push(element.coords)
  });
  return (
    lineCoords
  );
}

class MapPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      crumbs: this.props.crumbs,
      isLoading: false,
      error: false,
      lastPosition: this.props.lastPosition,
      initialLatitude: this.props.pingList[0].coords.latitude,
      initialLongitude: this.props.pingList[0].coords.longitude,
    }
  }

  render(){
    var pins = this.props.crumbs.map((marker,index) => {
      return (
        <MapView.Marker
          coordinate={{
            latitude: marker.pos.coords.latitude,
            longitude: marker.pos.coords.longitude
          }}
          title={marker.title}
          description={marker.note}
          key={index}
        />
      )
    });

    return (
      <View style={styles.mainContainer}>
       <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.initialLatitude,
          longitude: this.state.initialLongitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09
        }}>
        {pins}
          <MapView.Polyline coordinates={drawLines(this.props.pingList)}
            strokeWidth={4}
            strokeColor={'#0000FF'}
            geodesic={true}
          />
        </MapView>
      </View>
    )
  }
};

MapPage.propTypes = {
  crumbs: React.PropTypes.array.isRequired
};

module.exports = MapPage;
