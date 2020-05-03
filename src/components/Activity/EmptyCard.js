import React from 'react';
import { Link } from 'gatsby';

const EmptyCard = ({ text }) => (
  <div className="card card__empty --loading">
    <span>{text}</span>
    <span>
      You can first by syncing{' '}
      <Link className="card__link" to="/sync">
        your data here
      </Link>
    </span>
  </div>
);

export default EmptyCard;
