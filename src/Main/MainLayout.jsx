import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer';
import LoadingSpinner from '../Components/LoadingSpinner';

const MainLayout = () => {

  const {state} = useNavigation()

  return (
    <div>
      <header className='sticky top-0 z-50'>
        <Navbar></Navbar>
      </header>
      <main>
        {
          state === 'loading' ? <LoadingSpinner/> : <Outlet/>
        }
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;