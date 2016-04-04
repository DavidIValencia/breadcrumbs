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
  }
});

//this array could be crumbs coordinates. Titles and descriptions
//must go in a different array.
var markers = [
  {
    latitude: 37.78825,
    longitude: -122.4324,
  },
  {
    latitude: 37.79,
    longitude: -122.44,
  },
  {
    latitude: 37.8,
    longitude: -122.45,
  }
];

class MapPage extends React.Component{
  renderRow(rowData){
    return (
      <MapView.Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />
    )
  };
  render(){
    return (
      <View style={styles.mainContainer}>
       <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09
        }}>
        {
          markers.map(marker => (
            <MapView.Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
            />
          ))
        }
        <MapView.Polyline coordinates={markers} />
        </MapView>
      </View>
    )
  }
}

module.exports = MapPage;
