import React, { useEffect, useState } from 'react';
import Bar from './Bar';
import { Bookmark } from 'lucide-react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/articles?populate=*');
        const data = await response.json();
        setArticles(data.data);
        setFilteredArticles(data.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    };
    fetchArticles();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(term)
    );
    setFilteredArticles(filtered);
  };

  const addToWishlist = async (articleId) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('Connectez vous');
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/wishlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            articles: [{ id: articleId }],
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to add product to wishlist');

      alert('added to wishlist!');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-5">
        <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm}
          onChange={handleSearch}
          className="bg-gray-200 p-2 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        />
      </div>

      <p className="flex justify-center font-bold mt-5">Prêt-à-Porter</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-1">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id}>
              <img
                src={`http://localhost:1337${article.image[0].url}`}
                className=" mb-4 mt-4"
              />
              <p className="text-center font-bold">{article.title}</p>
              <p className="text-center mb-3 font-bold">{article.price}</p>
              <button
                onClick={() => addToWishlist(article.id)}
                className="flex justify-center items-center mx-auto text-black hover:bg-slate-500 p-2 rounded-full"
              >
                <Bookmark className="w-6 h-6" />
              </button>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </div>
  );
};

export default Articles;
