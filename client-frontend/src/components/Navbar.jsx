import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Pildora de Docker Compose 🐋
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Inicio
          </Link>
          {/* Botón de menú para pantallas pequeñas */}
          <Link to="/" className="text-white md:hidden">
             <MenuIcon/>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;