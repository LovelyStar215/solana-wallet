import React from 'react';

import Layout from '.';

const withPublicLayout = (WrappedComponent: React.FunctionComponent) => {
  return function WithPublicLayout(props: any) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
};

export default withPublicLayout;
