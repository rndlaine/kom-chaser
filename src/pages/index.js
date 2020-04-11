import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Header from '../components/Header/header';
import stravaButton from '../images/stravabutton.png';
import stravaPower from '../images/stravapower.png';

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <Header />
      <section className="landing">
        <article className="landing__card">
          <span className="landing__title">KOM Chaser</span>
          <img src={stravaPower} />
          <hr className="landing__separator" />
          <p className="landing__description">
            This app is meant to help you chase your next (or first) Strava KOM. <br /> Go find your next target!
          </p>
          <Link to="/app" className="landing__button">
            <img src={stravaButton} />
          </Link>
        </article>
      </section>
    </>
  );
};

export default IndexPage;
