import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/wishlists?populate=articles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }

        const data = await response.json();
        setWishlist(data.data[0]?.attributes?.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold mb-6 mt-5">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.length > 0 ? (
          wishlist.map((article) => (
            <div key={article.id} className="p-4 border rounded-md shadow-md">
              <img
                src={`http://localhost:1337${article.image.data[0]?.attributes.url}`}
                alt={article.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3>{article.name}</h3>
              <p>{article.price}</p>
            </div>
          ))
        ) : (
          <p>No products in your wishlist</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
