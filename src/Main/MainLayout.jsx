import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer';
import LoadingSpinner from '../Components/LoadingSpinner';
import "aos/dist/aos.css";


const MainLayout = () => {

  const {state} = useNavigation()

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky bg-white top-0 z-50'>
        <Navbar></Navbar>
      </header>
      <main className='flex-grow'>
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