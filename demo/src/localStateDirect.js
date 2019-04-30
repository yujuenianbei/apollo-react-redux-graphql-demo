import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import Link from './Link';

const FilterLink = ({ filter, children }) => (
  <ApolloConsumer>
    {client => (
      <Link
        onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
      >
        {children}
      </Link>
    )}
  </ApolloConsumer>
);
export default FilterLink