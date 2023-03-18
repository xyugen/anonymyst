import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import '../../Assets/Styles/home.css'

import { supabase } from '../../Services/supabase'
import Pagination from '../../Components/Interface/Pagination'

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);

  const start = items * page - items;
  const end = items * page - 1;
  
  

  const goToPage = (newPage) => {
      setPage(newPage);
  };

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          comments(count)
        `)
        .range(start, end);
      if (error) console.log('Error fetching data: ', error);
      else setData(data);
    }

    fetchData();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};

    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div className='posts'>
        {data.map((post) => (
          <Card
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            date={formatDate(post.created_at)}
            content={post.content}
            comCount={post.comments[0].count}
          />
        ))}
      </div>
      <ul className="pagination">
      </ul>
    </>
  )
}

export default Home
