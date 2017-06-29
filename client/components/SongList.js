import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class ListComponent extends Component {
  componentWillMount() {

  }

  render() {
    console.log('Properties', this.props);
    let songs = (this.props.data.songs||[]).map(song=><li key={song.id}>{song.title}</li>);

    return (
      <ul>{songs}</ul>
    )
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(ListComponent)
