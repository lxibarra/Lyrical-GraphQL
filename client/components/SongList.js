import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class ListComponent extends Component {

  onSongDelete(id) {
    this.props.mutate({
      variables:{
        id
      }
    }).then(()=>this.props.data.refetch())
  }

  render() {
    console.log('Properties', this.props);
    let songs = (this.props.data.songs||[])
      .map(song=>{
        return (
          <li key={song.id} className="collection-item">
              <Link to={`/song/${song.id}`}>{song.title}</Link> <i className="material-icons" onClick={()=>this.onSongDelete(song.id)}>delete</i>
          </li>);
    });

    return (
      <div>
        <ul className="collection">{songs}</ul>
        <Link to="songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
      mutation DeleteSong($id:ID) {
        deleteSong(id:$id) {
          id
          title
        }
      }
`;



export default graphql(mutation)(
  graphql(query)(ListComponent)
)
