import gql from 'graphql-tag';

export default gql`
query querySong($id:ID!) {
  song(id:$id) {
    id
    title
    lyrics{
      content,
      likes
    }
  }
}`;
