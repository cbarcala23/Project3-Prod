import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    gender,
    languages,
    location,
    hobbies
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {gender} {languages && <span> at {languages}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
          {hobbies.slice(0, 4).map((hobby, index) => (
              <li key={index} className="text-primary">
                  <i className="fas fa-check"></i>{hobby}
              </li>
          ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
