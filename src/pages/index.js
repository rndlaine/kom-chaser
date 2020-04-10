import React from 'react';
import { Link } from 'gatsby';
import smoke from '../images/smoke.jpg';
import _ from 'lodash';

import SEO from '../components/seo';

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <img src={smoke} className="landing__background" />
      <section className="landing">
        <article className="landing__card">
          <span className="landing__title">KOM Chaser (Powered by Strava)</span>
          <Link to="/app" className="landing__button">
            Go to the App! (Login with Strava)
          </Link>
        </article>
      </section>
    </>
  );
};

export default IndexPage;
