import React from 'react';
import LazyLoad from 'react-lazyload';

import { Content } from '../interfaces/Content';
import ContentFrame from './ContentFrame';

interface ContentViewProps {
  results: Content[];
}

const ContentView: React.FunctionComponent<ContentViewProps> = props => {
  return (
    <ul id="content_unordered_list">
      {props.results.map((result: Content) => (
        <LazyLoad height={200} /*unmountIfInvisible*/>
          <ContentFrame content={result} />
        </LazyLoad>
      ))}
    </ul>
  );
};

export default ContentView;
