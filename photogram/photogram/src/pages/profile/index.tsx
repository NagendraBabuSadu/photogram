import Layout from '@/components/layout';
import * as React from 'react';

interface IProfileProps {
}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  return  (
    <Layout >
      <div className='flex text-black w-screen h-screen'>
        Profile
      </div>
    </Layout>)
};

export default Profile;
