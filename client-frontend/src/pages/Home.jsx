// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ListOfTask from '../components/ListOfTask';

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        List of tasks
      </h1>
      <ListOfTask />
    </div>
  );
};

export default Home;
