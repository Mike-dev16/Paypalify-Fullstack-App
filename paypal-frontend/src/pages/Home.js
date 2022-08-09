import React from 'react';
import DesktopNav from '../components/navbar/DesktopNav';
import Hero from '../components/main/Hero';
import Online from '../components/main/Online';
import Join from '../components/main/Join';
import FooterTop from '../components/footer/FooterTop';
import FooterBottom from '../components/footer/FooterBottom';


const Home = ({user, handleLogout}) => {
  return (
    <div style={{ overflowX: "hidden" }}>
        <DesktopNav user={user} handleLogout = {handleLogout}/>
        <Hero  user={user}/>
        <Online />
        <Join />
        <FooterTop />
        <FooterBottom />
    </div>
  )
}

export default Home;