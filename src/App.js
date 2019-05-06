import React, { Component, Fragment } from 'react'
import { Query, Mutation } from "react-apollo";
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
const ADD_DATA = gql`
mutation addUser($name: String!,$sex: String! ,$intro: String!) {
            addUser(name: $name, sex: $sex, intro: $intro) {
                id,
                name,
                sex,
                intro
            }
        }
`;
const UPDATE_DATA = gql`
mutation updateUser($id: Int!, $name: String!,$sex: String! ,$intro: String!) {
        updateUser(id: $id, name: $name, sex: $sex, intro: $intro) {
                id,
                name,
                sex,
                intro
            }
        }
`;
const DELETE_DATA = gql`
mutation deleteUser($id: Int!) {
            deleteUser(id: $id) {
                id
            }
        }
`;

class Search extends Component {
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
          console.log(data.user)
          return (
            <div>
              <h2>查询</h2>
              {data.user.length !==0 ? <div>
                <p>id:{data.user[0].id}</p>
                <p>name:{data.user[0].name}</p>
                <p>sex:{data.user[0].sex}</p>
                <p>intro:{data.user[0].intro}</p>
              </div> : <p>此id无数据</p>}
              <input onChange={e => { this.setState({ input: parseInt(e.target.value) }) }} placeholder='serach id' />
              <button onClick={this.onSearch}>Search!</button>
            </div>
          );
        }}
      </Query>
    )
  }
};

class Add extends Component {
  state = {
    input_name: '',
    input_sex: '',
    input_intro: '',
    name: '',
    sex: '',
    intro: ''
  }
  onSearch = () => {

  }
  render() {
    return (
      <Mutation mutation={ADD_DATA} >
        {(addTodo, { loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data) {
            console.log(data.addUser[0].id)
          }
          return (
            <div>
              <h2>显示返回数据新增</h2>
              {data &&
                <div>
                  <p>接口返回新增的数据</p>
                  <p>id:{data.addUser[0].id}</p>
                  <p>name:{data.addUser[0].name}</p>
                  <p>sex:{data.addUser[0].sex}</p>
                  <p>intro:{data.addUser[0].intro}</p>
                </div>
              }
              <input onChange={e => { this.setState({ input_name: e.target.value }) }} placeholder='add name' />
              <input onChange={e => { this.setState({ input_sex: e.target.value }) }} placeholder='add sex' />
              <input onChange={e => { this.setState({ input_intro: e.target.value }) }} placeholder='add intro' />
              <button onClick={e => {
                e.preventDefault();
                this.setState({
                  name: this.state.input_name,
                  sex: this.state.input_sex,
                  intro: this.state.input_intro,
                }, (() => {
                  addTodo({ variables: { name: this.state.name, sex: this.state.sex, intro: this.state.intro } });
                  this.setState({ input_name: '', input_sex: '', input_intro: '', name: '', sex: '', intro: '' })
                }))
              }}>add!</button>
            </div>
          );
        }}
      </Mutation>
    )
  }
};


class Add1 extends Component {
  state = {
    input_name: '',
    input_sex: '',
    input_intro: '',
    name: '',
    sex: '',
    intro: ''
  }
  render() {
    return (
      <Mutation mutation={ADD_DATA} >
        {(addTodo, { loading, error }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <h2>新增</h2>
              <input onChange={e => { this.setState({ input_name: e.target.value }) }} placeholder='add name' />
              <input onChange={e => { this.setState({ input_sex: e.target.value }) }} placeholder='add sex' />
              <input onChange={e => { this.setState({ input_intro: e.target.value }) }} placeholder='add intro' />
              <button onClick={e => {
                e.preventDefault();
                this.setState({
                  name: this.state.input_name,
                  sex: this.state.input_sex,
                  intro: this.state.input_intro,
                }, (() => {
                  addTodo({ variables: { name: this.state.name, sex: this.state.sex, intro: this.state.intro } });
                  this.setState({ input_name: '', input_sex: '', input_intro: '', name: '', sex: '', intro: '' })
                }))
              }}>add!</button>
            </div>
          );
        }}
      </Mutation>
    )
  }
};


class Update extends Component {
  state = {
    input_id: '',
    input_name: '',
    input_sex: '',
    input_intro: '',
    id: '',
    name: '',
    sex: '',
    intro: ''
  }
  render() {
    return (
      <Mutation mutation={UPDATE_DATA} >
        {(addTodo, { loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data) {
            console.log(data)
          }
          return (
            <div>
              <h2>更新数据</h2>
              {data && data.updateUser && (data.updateUser.length > 0 ?
                <div>
                  <p>更新后的数据</p>
                  <p>id:{data.updateUser[0].id}</p>
                  <p>name:{data.updateUser[0].name}</p>
                  <p>sex:{data.updateUser[0].sex}</p>
                  <p>intro:{data.updateUser[0].intro}</p>
                </div> :  <div>
                  <p>此id无数据</p>
                </div>
              )
              }
              <input onChange={e => { this.setState({ input_id: parseInt(e.target.value) }) }} placeholder='add id' />
              <input onChange={e => { this.setState({ input_name: e.target.value }) }} placeholder='add name' />
              <input onChange={e => { this.setState({ input_sex: e.target.value }) }} placeholder='add sex' />
              <input onChange={e => { this.setState({ input_intro: e.target.value }) }} placeholder='add intro' />
              <button onClick={e => {
                e.preventDefault();
                this.setState({
                  id: this.state.input_id,
                  name: this.state.input_name,
                  sex: this.state.input_sex,
                  intro: this.state.input_intro,
                }, (() => {
                  addTodo({ variables: { id: this.state.id, name: this.state.name, sex: this.state.sex, intro: this.state.intro } });
                  this.setState({ input_id: '', input_name: '', input_sex: '', input_intro: '', id: '', name: '', sex: '', intro: '' })
                }))
              }}>update!</button>
            </div>
          );
        }}
      </Mutation>
    )
  }
};

class Delete extends Component {
  state = {
    id: '',
    input_id: ''
  }
  onDelete = (e, addTodo) => {
    e.preventDefault();
    this.setState({
      id: this.state.input_id,
    }, (() => {
      addTodo({ variables: { id: this.state.id } });
      this.setState({ input_id: '', id: '' })
    }))
  }
  render() {
    return (
      <Mutation mutation={DELETE_DATA} >
      {(addTodo, { loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data) {
          console.log(data)
        }
        return (
          <div>
            <h2>删除数据</h2>
            {data && data.deleteUser && (data.deleteUser.length === 0 ?
              <div>
                <p>数据已删除</p>
              </div> :  <div>
                <p>数据未删除</p>
              </div>
            )}
            <input onChange={e => { this.setState({ input_id: parseInt(e.target.value) }) }} placeholder='delete id' />
            <button onClick={e => this.onDelete(e,addTodo)}>delete!</button>
          </div>
        );
      }}
    </Mutation>
    )
  }
};

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
      <div>
        <Search />
        <Add1 />
        <Add />
        <Update />
        <Delete />
      </div>
    )
  }
};
export default App;
