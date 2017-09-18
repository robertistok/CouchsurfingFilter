import React from 'react';
import { Layout } from 'antd';

import LoginForm from './LoginForm';

const { Header, Content } = Layout;

const Home = () => (
  <Layout>
    <Header />
    <Content>
      <LoginForm />
    </Content>
  </Layout>
);

export default Home;
