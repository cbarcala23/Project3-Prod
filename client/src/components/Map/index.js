import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Profiles from "../profiles/Profiles";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      latitude: 47.5123737,
      longitude: -122.384732,
      // latitude: "",
      // longitude: "",
      userAddress: null,
      input: "",
      name: "",
      address: "",
      venuetype: "",
      flag: false
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  //If Component mounts then get Venues and get User Location (coordinates)
  componentDidMount() {
    this.getLocation();
    // this.renderMap();
    this.getVenues();

  }

  componentDidUpdate() {
    if (this.props.latitude !== this.state.latitude) {
      console.log("latitude state has changed.");
      console.log(this.state.latitude, this.state.longitude);
    }
  }

  //Get User Location
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationErrors
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  //Called by getLocation to get User Coordinates
  getCoordinates(position) {
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  //Called by getLocation to handle any User errors such as blocking location
  handleLocationErrors(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  //Create the map
  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1chYak_uM6Xy8GbWSbI9Jicb6-v2ySCM&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  //Gets Venues from the Foursquare API and uses Axios. This is Asynchronous
  getVenues = () => {
    console.log("getVenues latitude and long");
    console.log(this.state.latitude, this.state.longitude);
    const endPoint = `https://api.foursquare.com/v2/venues/explore?ll=${this.state.latitude},${this.state.longitude}&`;
    //Parameters Object
    const parameters = {
      client_id: "0SFPNAQUPHHVK2CMUP2DGVAB5ADKV0J4YH0UX3T4AEOOCKLL",
      client_secret: "JG5SSB2KSBRRZKD1EIGLFA0YQEUPNRCWJBLRGJCI1GMIFQDJ",
      query: this.state.input,
      // ll: "47.5123727,-122.384749",
      v: "20180323"
    };
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items);
        //stores response in the venues state
        this.setState(
          {
            venues: response.data.response.groups[0].items
          },
          //map renders after getting the response stored into the venues state
          this.renderMap()
        );
      })
      .catch(error => {
        console.log("ERROR!!! " + error);
      });
  };

  //Initialize map
  initMap = () => {
    //Create a map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.state.latitude, lng: this.state.longitude },
      // center: { lat: 45.5123727, lng: -121.384749 },
      zoom: 15
    });

    //Creating an Infowindow
    var infowindow = new window.google.maps.InfoWindow();

    //Loop through venues in the venue state
    this.state.venues.map(myVenue => {
      //content that will display in the info window
      var contentString =
        `${myVenue.venue.name}` +
        "<p>" +
        `${myVenue.venue.location.address}` +
        "<p>";

      //Creating a Marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name
      });

      //Click on Marker
      marker.addListener("click", () => {
        //Change the content
        infowindow.setContent(contentString);
        //Open an Info Window
        // infowindow.open(map, marker);
        //Render to page location id venue
        console.log("test");
        this.setState({
          venueid: myVenue.venue.id,
          name: myVenue.venue.name,
          address: myVenue.venue.location.address,
          venuetype: myVenue.venue.categories[0].name
        });
        this.renderVenueIN();
        // const element = (
        //   <div className="venue-bg" id="renderedinfo">
        //     <h1>{myVenue.venue.name}</h1>
        //     <p>{myVenue.venue.location.address}</p>
        //     <p>Type of Venue: {myVenue.venue.categories[0].name}</p>
        //     <button className="btn btn-dark" onClick={this.checkin}>CheckIN</button>
        //   </div>
        // );
        // ReactDOM.render(element, document.getElementById("venue"));
      });
    });
  };

  //For rendering data to page in id venue
  handle(event) {
    this.setState({
      input: event.target.value
    });
    console.log(event.target.value);
  }

  renderVenueOUT = () => {
    console.log("checked in!");
    this.setState({
      flag: true
    });
    const element = (
      <div className="venue-bg" id="renderedinfo">
        <h1>{this.state.name}</h1>
        <p>{this.state.address}</p>
        <p>Type of Venue: {this.state.venuetype}</p>
        <p>(Clicking CheckOUT will remove you from the users Checked IN.)</p>
        <button className="btn btn-dark" onClick={this.renderVenueIN}>
          CheckOUT
        </button>
      </div>
    );
    ReactDOM.render(element, document.getElementById("venue"));
  };

  renderVenueIN = () => {
    this.setState({
      flag: false
    });
    const element = (
      <div className="venue-bg" id="renderedinfo">
        <h1>{this.state.name}</h1>
        <p>{this.state.address}</p>
        <p>Type of Venue: {this.state.venuetype}</p>
        {/* <button className="btn btn-light" onClick={this.renderVenueOUT}>CheckIN</button> */}
        <button className="btn btn-primary" onClick={() => {
          this.renderVenueOUT();
          this.bookmark();
        }}>CheckIN</button>
        {/* <button className="btn btn-light" onClick="window.location.href = '#bookmark1';">CheckIN</button> */}
      </div>
    );
    ReactDOM.render(element, document.getElementById("venue"));
    console.log("rendered");
  };

  //Go to bookmark
  bookmark = () => {
    window.location.href = "#bookmark1";
  };

  //Render the map onto the div map
  render() {
    return (
      <main>
        <header>
          <Container className="mx-auto text-center">
                <h2>Find types of venue</h2>
                ex: bars, coffee shops, etc
                <p></p>
                <input type="text" onChange={this.handle.bind(this)} className="form-control"/>
                <p></p>
                <button className="btn btn-primary" onClick={this.getVenues}>Search</button>
                {/* <p>Your Latitude: {this.state.latitude}</p>
                <p>Your Longitude: {this.state.longitude}</p> */}
            <div id="venue"></div>
          </Container>
        </header>

        <div id="map"></div>
        <Container className="mt-3 mx-auto text-center">
          <h1 className="" id="bookmark1">
            <h5>Anyone Checked IN that venue will appear below</h5>
          </h1>
          <Row className="flexbox-container">
            <div id="test">{this.state.flag ? <Profiles /> : <Fragment />}</div>
          </Row>
        </Container>
      </main>
    );
  }
}

//Loads the Google Maps API Script by creating <script> tags and adding 'src', 'async' and 'defer' as seen below:
/*
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
*/
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Map;
