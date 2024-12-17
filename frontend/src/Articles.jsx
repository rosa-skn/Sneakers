import React, { useEffect, useState } from 'react';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/articles?populate=*');
        const data = await response.json();
        setArticles(data.data); 
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 p-1">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id}>
<img src={`http://localhost:1337${article.image[0].url}`}  className="w-45 h-45 object-contain mb-4 mt-4 rounded-md"/>
            <p className='text-center font-bold'>{article.title}</p>
            <p className='text-center mb-3 font-bold'>{article.price}</p>
          </div>
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
};

export default Articles;
