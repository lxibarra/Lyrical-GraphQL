import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {
  render() {
    let songDetails;
    if(this.props.data.song) {
      songDetails = (<div>
        <ul>
          <li><b>Id:</b> {this.props.data.song.id}</li>
          <li><b>Title:</b> {this.props.data.song.title}</li>
        </ul>
      </div>);
    } else {
      songDetails = (<div>...fetching</div>);
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Song Details</h3>
        {songDetails}
        <LyricCreate {...this.props}/>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options:(props)=>({variables: { id:props.params.id }})
})(SongDetail);
