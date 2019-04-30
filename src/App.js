import React, { Component, Fragment } from 'react'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
const GET_DATA = gql`
query user($id: Int!){
  user(id: $id) {
    id
    name
    sex
    intro
    __typename
  }
}
`;

class App extends Component {
  state = {
    id: 1,
    input: null
  }
  onSearch = () => {
    console.log(this)
    this.setState({ id: this.state.input })
  }
  render() {
    return (
      <Query query={GET_DATA} variables={{ id: this.state.id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <p>{data.user[0].id}</p>
              <p>{data.user[0].name}</p>
              <p>{data.user[0].sex}</p>
              <p>{data.user[0].intro}</p>
              <input onChange={e => { this.setState({ input: parseInt(e.target.value) }) }} placeholder='add name' />
              <button onClick={this.onSearch}>Search!</button>
            </div>
          );
        }}
      </Query>
    )
  }
};
export default App;
