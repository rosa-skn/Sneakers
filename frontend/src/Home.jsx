import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center p-5">
      <h1 className="mb-5">
        Nos délais de retour sont étendus jusqu'au 31 janvier 2025 pour toute commande passée entre le 1er et le 31 décembre 2024.
      </h1>
      <img 
        src="/images/SN7.jpg" 
        alt="main" 
        className="rounded-lg w-4/5 max-w-[600px] h-auto border-2 border-gray-300" 
      />
    </div>
  );
};

export default Home;
