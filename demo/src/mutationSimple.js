import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;
let input;
class AddTodo extends Component {
    render() {
        return (
            <Mutation mutation={ADD_TODO}>
                {(addTodo, { data }) => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                addTodo({ variables: { type: input.value } });
                                input.value = "";
                            }}
                        >
                            <input
                                ref={node => {
                                    input = node;
                                }}
                            />
                            <button type="submit">Add Todo</button>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    }

};

export default AddTodo