import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Slider from "../Slider";
import Checkin from "../../img/icons/icons/checkin.png";
import Login from "../../img/icons/icons/login.png";
import Many from "../../img/icons/icons/many.png";
import Marker from "../../img/icons/icons/marker.png";

// Prevents you to go back to Landing page if logged in
const Landing = ({ isAuthenticated }) => {
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <section className="landing">
      <div className="container-fluid mb-5">
        {/* <div className="landing-inner"> */}
          <h1 className="x-large text-center">
            <p className="huge">CheckIN</p>
          </h1>
          <br />
          <br />
          <h1 className="text-light">Live Life Spontaneously, Check In!</h1>
          <p className="text-dark">
            Whether it's at a Happy Hour, Coffee Shop, Lounge, or even a Museum,
            find people that you share interests with and meet them
            instantaneously!
          </p>
          </div>
        {/* </div> */}
        <Slider />

      
        {/* <div className="container-fluid">
          <div className="icons row">
            
            <i class="fas fa-check-double icon"></i>
            <i class="fas fa-users icon"></i>
            <i class="fas fa-map-marker icon"></i>
          </div>
        </div> */}

        <div className="footer">
          <div className="row">
            <i className="fas fa-user-plus icon col-sm-4 pt-5"></i>
            <p className="col-sm-8 p-3">
              <h1 className="large">SIGN UP</h1>
            Simply signup and login to start exploring areas around you and meet new people.
            </p>
          </div>
        </div>

        <div className="footer2">
          <div className="row">
          <i className="fas fa-map-marker icon col-sm-4 pt-5"></i>
            <p className="col-sm-8 p-3">
            <h1 className="large">LOCATE</h1>
            Using the familiar Google Maps API, you can search for venues using keywords such as ‘food’, ‘coffee’, ‘bars’, and pull up business to view who is currently checked IN.
            </p>
          </div>
        </div>

        <div className="footer">
          <div className="row">
            <i className="fas fa-check-double icon col-sm-4 pt-5"></i>
            <p className="col-sm-8 p-3">
            <h1 className="large">CHECK IN</h1>
            Once you have selected a venue, click on the CheckIN button to notify others already Checked In you are on your way!
            </p>
          </div>
        </div>

        <div className="footer2">
          <div className="row">
          <i className="fas fa-users icon col-sm-4 pt-5"></i>
            <p className="col-sm-8 p-3">
            <h1 className="large">MEET</h1>
            View other Checked In profiles and walk in ready to strike up a great conversation based on Interests.
            </p>
          </div>
        </div>

        </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
