import React from 'react';
import PropTypes from 'prop-types';

const ProfileCard = ({ profile }) => {
  const keys = ['username', 'firstname', 'lastname', 'city', 'state', 'country', 'sex'];
  return (
    <section>
      <h1 className="label__header">My Profile</h1>

      <article className="profile">
        <img src={profile.profile} className="profile__picture" />

        {keys.map(key => (
          <div key={key} className="profile__trait">
            <span>{key}</span>
            <span className="profile__trait-value">{profile[key]}</span>
          </div>
        ))}
      </article>
    </section>
  );
};
ProfileCard.propTypes = {
  profile: PropTypes.object,
};

export default ProfileCard;
