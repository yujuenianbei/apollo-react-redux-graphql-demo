import React, { Component, Fragment } from 'react'
import './App.css';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import DogPhoto from './DogPhoto'
import DelayedQuery from './DelayedQuery'

// const ExchangeRates = () => (
//   <Query
//     query={gql`
//       {
//         rates(currency: "USD") {
//           currency
//           rate
//         }
//       }
//     `}
//   >
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;

//       return data.rates.map(({ currency, rate }) => (
//         <div key={currency}>
//           <p>{currency}: {rate}</p>
//         </div>
//       ));
//     }}
//   </Query>
// );



const GET_DOGS = gql`
  query{
    dogs {
      id
      breed
    }
  }
`;

class Dogs extends Component {
  state = {
    breed: 'affenpinscher'
  }
  onDogSelected = (e) => {
    this.setState({ breed: e.target.value })
  }
  render() {
    return (
      <Query query={GET_DOGS}>
        {({ loading, error, data, refetch}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              {/* ApolloConsumer 的方式进行查询 */}
              <DelayedQuery/>
              <DogPhoto breed={this.state.breed}/>
              <select ref="dog" name="dog" onChange={this.onDogSelected}>
                {data.dogs.map(dog => (
                  <option key={dog.id} value={dog.breed}>
                    {dog.breed}
                  </option>
                ))}
              </select>
            </div>

          );
        }}
      </Query>
    )
  }
};

export default Dogs;
