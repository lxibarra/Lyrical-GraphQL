import React, { Component } from 'react';
import  gql  from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content:''
    };
  }

  save(e) {
    e.preventDefault();
    this.props.mutate({
      variables:{
        content:this.state.content,
        songId:this.props.params.id
      }
    });//.then(()=>this.props.data.refetch())
  }

  render() {
    console.log(this.props);
    let {song} = this.props.data;
    let lyrics;
    if(song && song.lyrics) {
      let items = song.lyrics.map(lyric=>(<li>{lyric.content}</li>));
      lyrics = (
        <ul>
          {items}
        </ul>
      );
    } else {
      lyrics = <div>No lyrics added yet</div>
    }

    return (
      <div>
        <form onSubmit={this.save.bind(this)}>
          <label>Add Lyric</label>
          <input onChange={event=>this.setState({content:event.target.value})} value={this.state.content} />
        </form>
        <h5>Lyrics</h5>
          {lyrics}
      </div>
    )
  }
}

const mutation = gql`
  mutation addLyric($content:String, $songId:ID) {
    addLyricToSong(content:$content, songId:$songId) {
      lyrics {
        content
      }
    }
  }
`;



export default graphql(fetchSong, {
  options:(props)=>({variables:{id:props.params.id}})
})(graphql(mutation)(LyricCreate));
