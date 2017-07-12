import React, { Component } from 'react';
import { Link, hashHistory, Router } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';

class SongCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title:''
    };
  }

  setValue(e) {
    this.setState({
      title:e.target.value
    });
  }

  save(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        title:this.state.title
      },
      refetchQueries:[{ query: query }]
    }).then(()=>hashHistory.push('/'));
  }

  render() {
    return (
        <div>
          <Link to="/">Back</Link>
          <h3>Create a new song</h3>
          <form onSubmit={this.save.bind(this)}>
            <label>Song title:</label>
            <input type="text" onInput={this.setValue.bind(this)} value={this.state.title}/>
            <button>Save</button>
          </form>
        </div>
    );
  }
}


const mutation = gql`
    mutation addSong($title:String) {
      addSong(title:$title) {
        id
        title
      }
    }
`;


export default graphql(mutation)(SongCreate);
