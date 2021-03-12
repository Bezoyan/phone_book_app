import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ContactContainer from './ContactContainer';
import GroupContainer from './GroupContainer';
import './../../public/custom/main.css';

const App = () => {
  return (
    <div>
      <Header />
      <ContactContainer />
      <GroupContainer />
      <Footer />
    </div>
  );
};

export default App;

