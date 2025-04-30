import Layout from '@/components/layout';
import * as React from 'react';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <Layout >
      <div className='flex text-black w-screen h-screen'>
        Home
      </div>
    </Layout>
  )
};

export default Home;
