import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import '../../Assets/Styles/home.css'

import { supabase } from '../../Services/supabase'
import Pagination from '../../Components/Interface/Pagination'

const Home = () => {
  const [data, setData] = useState([]);
  const [totalPosts, setTotalPosts] = useState();
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const [start, setStart] = useState(ITEMS_PER_PAGE * page - ITEMS_PER_PAGE);
  const [end, setEnd] = useState(ITEMS_PER_PAGE * page - 1);

  const goToPage = (newPage) => {
      setPage(newPage);
  };

  console.log(end);
  console.log(start);

  useEffect(() => {
    const newStart = ITEMS_PER_PAGE * (page - 1);
    const newEnd = ITEMS_PER_PAGE * page - 1;
    async function fetchData() {
      const { data, count, error } = await supabase
        .from("posts")
        .select(`*, comments(count)`, { count: "exact" })
        .order("post_id", { ascending: false })
        .range(newStart, newEnd);
      if (error) console.log("Error fetching data: ", error);
      else {
        setData(data);
        setTotalPosts(count);
      }
    }
    fetchData();
    setStart(newStart);
    setEnd(newEnd);
  }, [page, ITEMS_PER_PAGE]);

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
            haveImage={post.image_url}
            comCount={post.comments[0].count}
          />
        ))}
      </div>
      <Pagination goToPage={goToPage} page={page} items={ITEMS_PER_PAGE} totalItems={totalPosts} />
    </>
  )
}

export default Home
