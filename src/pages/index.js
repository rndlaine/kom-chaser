import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Header from '../components/Header/header';

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <Header />
      <section className="landing">
        <article className="landing__card">
          <span className="landing__title">KOM Chaser (Powered by Strava)</span>
          <hr className="landing__separator" />
          <p className="landing__description">
            This app is meant to help you chase your next (or first) Strava KOM. <br /> Go find your next target!
          </p>
          <Link to="/app" className="landing__button">
            Go to the App! (Login with Strava)
          </Link>
        </article>
      </section>
    </>
  );
};

export default IndexPage;
