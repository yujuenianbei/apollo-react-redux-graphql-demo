import React from 'react';
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { stringify } from 'querystring';
const GET_TODOS = gql`
  query GetTodos {
    todos{
        id,
        type
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

const Todos = () => (
    <Query query={GET_TODOS}>
        {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data)
            return data.todos.map(({ id, type }) => {
                let input;
                return (
                    <Mutation mutation={UPDATE_TODO} key={id}>
                        {(updateTodo) => (
                            <div>
                                <p>{type}</p>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        updateTodo({ variables: { id: Math.random().toString(), type: input.value } });
                                        refetch()
                                        input.value = "";
                                    }}
                                >
                                    <input
                                        ref={node => {
                                            input = node;
                                        }}
                                    />
                                    <button type="submit">Update Todo</button>
                                </form>
                            </div>
                        )}
                    </Mutation>
                );
            });
        }}
    </Query>
);
export default Todos