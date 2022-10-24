import React from 'react';
import Header from '../Header';
import Footer from '../Footer'
import Main from '../Main';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className='App-container'>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
