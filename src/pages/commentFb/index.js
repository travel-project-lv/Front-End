import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

const FacebookComment = ({  url, width, numPosts }) => {
  return (
    <FacebookProvider appId="609226686716-rha901hdhi60o2tsgsrik8k56pr9cs4n.apps.googleusercontent.com">
       <Comments href={url} width={width} numPosts={numPosts} />
    </FacebookProvider>
  );
};

export default FacebookComment;
