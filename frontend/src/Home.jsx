import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center p-5 font-bold">
      <h1 className="bg-yellow-50 px-12 rounded-lg mr-5 ml-5 mt-5 mb-5 p-6">
        Nos délais de retour sont étendus jusqu'au 31 janvier 2025 pour toute commande passée entre le 1er et le 31 décembre 2024.
      </h1>
      
      <img 
        src="/images/SN7.jpg" 
        alt="main" 
        className="rounded-lg w-4/5 max-w-[2000px]" 
      />
      
      <h2 className="mt-5 mb-5">AREA / SNEAKERS / TABI</h2>
      <h3 className= "mb-5 text-2xl"> MM6 X A. ARIGATO</h3>
      <div className="grid grid-cols-2 w-full h-screen gap-4">

        <div className="w-full h-full">
          <img 
            src="https://images.milledcdn.com/2021-12-19/E1w8WDhtcH9H_2yF/k_VTLkxKYe6F.gif" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="w-full h-full">
          <img 
            src="https://i.gifer.com/154A.gif" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
