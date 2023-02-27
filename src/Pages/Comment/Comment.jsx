import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../Services/supabase';
import CommentCard from '../../Components/Card/CommentCard';
import Card from '../../Components/Card/Card';
import '../../Assets/Styles/comments.css'

const Comment = () => {
    const [data, setData] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
        const { data, error } = await supabase
            .from('posts')
            .select(`
                *,
                comments (
                    comment_id,
                    post_id,
                    created_at,
                    title,
                    content
                )
            `)
            .eq('post_id', params.id);
        if (error) console.log('Error fetching data: ', error);
        else setData(data);
        }

        fetchData();
    }, [params]);

    console.log(params.id);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};

        return new Date(date).toLocaleDateString("en-US", options);
    }

    console.log(data);

    return (
        <>
            {data.map((post) => (
                <div>
                    <div id='post'>
                        <Card
                            key={post.post_id}
                            title={post.title}
                            date={formatDate(post.created_at)}
                            content={post.content}
                        />
                    </div>
                    <div id='comments' className='comments'>
                        {post.comments.map((comment) => (
                            <CommentCard
                                title={comment.title}
                                date={formatDate(comment.created_at)}
                                content={comment.content}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
)

}

export default Comment