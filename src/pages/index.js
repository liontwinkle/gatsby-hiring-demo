/* eslint max-len: 0 */

import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import config from '../../config/website';
import theme from '../../config/theme';
import styled from 'react-emotion';

const Heading = styled.div`
  margin: 3rem;
  color: ${props => props.theme.colors.white.base};
  text-shadow: ${theme.shadow.text.big};
  @media (max-width: 500px) {
    display: none;
  }
`;

const Index = () => (
  <div>
    <Header>
      <Heading>
        Web site comming soon...<br/>
        #ourgoalisthefuture
      </Heading>
      <a href="https://www.facebook.com/sektor909/" >
        <img src={config.siteBanner} />
      </a>
    </Header>
  </div>
);

export default Index;
