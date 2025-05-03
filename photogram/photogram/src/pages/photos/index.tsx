import Layout from '@/components/layout';
import * as React from 'react';

interface IMyPhotosProps {
}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = (props) => {
  return (
    <Layout >
      <div className='flex text-black w-screen h-screen'>
        My Photos
      </div>
    </Layout>)
};

export default MyPhotos;
