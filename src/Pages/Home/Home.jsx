import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import '../../Assets/Styles/home.css'

import { supabase } from '../../Services/supabase'

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          comments(count)
        `);
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
    <div className='posts'>
      {data.map((post) => (
        <Card
          key={post.id}
          title={post.title}
          date={formatDate(post.created_at)}
          content={post.content}
          comCount={post.comments[0].count}
        />
      ))}
    </div>
  )
}

export default Home
