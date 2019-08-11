import React from 'react';
import LazyLoad from 'react-lazyload';

import { Content } from '../interfaces/Content';

interface ContentViewProps {
  results: Content[];
}

const ContentView: React.FunctionComponent<ContentViewProps> = props => {
  return (
    <ul id="content_unordered_list">
      {props.results.map((result: Content) => (
        <LazyLoad height={200} /*unmountIfInvisible*/>
          <li key={result.videoId}>
            <iframe
              src={result.embedLink}
              height="390"
              width="640"
              frameBorder="10"
              scrolling="no"
              allowFullScreen
            ></iframe>
            <h3>{result.title}</h3>
            <ul id="content_unordered_list">
              <li>Creator: {result.creatorName}</li>
              <li>Content Type: {result.type.replace('-', ' ')}</li>
              <li>Creation Date: {result.createdAt.split(':')[0]}</li>
            </ul>
          </li>
        </LazyLoad>
      ))}
    </ul>
  );
};

export default ContentView;
