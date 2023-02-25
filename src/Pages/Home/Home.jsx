import React from 'react'
import Card from '../../Components/Card/Card'
import '../../Assets/Styles/home.css'

const Home = () => {
  return (
    <div className='posts'>
      <Card className='post' title="Anonymous" content="tes" date="August 12, 2023" comCount='12' />
      <Card className='post' title="Yugen" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor" date="August 12, 2023" comCount='12' />
      <Card className='post' title="Anonymous" content="tes" date="August 12, 2023" comCount='12' />
      <Card className='post' title="Anonymous" content="tes" date="August 12, 2023" comCount='12' />
      <Card className='post' title="Anonymous" content="tes" date="August 12, 2023" comCount='12' />
      <Card className='post' title="Anonymous" content="tes" date="August 12, 2023" comCount='12' />
    </div>
  )
}

export default Home