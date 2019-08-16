import React from 'react';

import { Content } from '../interfaces/Content';

interface ContentFrameProps {
  content: Content;
}

const ContentFrame: React.FunctionComponent<ContentFrameProps> = props => {
  const { content } = props;
  return (
    <li key={content.videoId}>
      <iframe
        title={content.title}
        src={content.embedLink}
        height="390"
        width="640"
        frameBorder="10"
        scrolling="no"
        allowFullScreen
      ></iframe>
      <h3>{content.title}</h3>
      <ul id="content_unordered_list">
        <li>Creator: {content.creatorName}</li>
        <li>Content Type: {content.type.replace('-', ' ')}</li>
        <li>Creation Date: {content.createdAt.split(':')[0]}</li>
      </ul>
    </li>
  );
};

export default ContentFrame;
