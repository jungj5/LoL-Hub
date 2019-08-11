import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';

import ContentView from '../components/ContentView';
import { ComponentState, Content } from '../interfaces/Content';

let streamers = new Map<String, Set<String>>();

class Main extends Component<{}, ComponentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      fullContent: [],
      selectedContentType: 'all',
      selectedRole: 'all',
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + 'content');
      const content = res.data.content;

      const streamersRes = await axios.get(process.env.REACT_APP_API_BASE_URL + 'streamers');
      const streamersArray = streamersRes.data.streamers;

      // Populating Streamers Map..
      for (let i = 0; i < streamersArray.length; i++) {
        const role = streamersArray[i].role.toLowerCase();
        const name = streamersArray[i].name.toLowerCase();
        if (!streamers.has(role)) {
          streamers.set(role, new Set([name]));
        } else {
          //https://github.com/microsoft/TypeScript/issues/9619
          const newStreamerEntry = streamers.get(role)!.add(name);
          streamers.set(role, newStreamerEntry);
        }
      }

      this.setState({
        fullContent: content,
        isLoading: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  filterByContentType = (selectedContentType: string, contentArray: Content[]) => {
    if (selectedContentType === 'all') {
      return contentArray;
    } else {
      const result = contentArray.filter(media => {
        return media.type === selectedContentType;
      });
      return result;
    }
  };

  filterByRole = (selectedRole: string, contentArray: Content[]) => {
    if (selectedRole === 'all') {
      return contentArray;
    } else {
      const result = contentArray.filter(media => {
        return streamers.get(selectedRole)!.has(media.creatorName.toLowerCase());
      });
      return result;
    }
  };

  render = () => {
    if (this.state.isLoading) return this.renderLoading();

    let contentArray = this.state.fullContent;
    let selectedContentType = this.state.selectedContentType;
    let selectedRole = this.state.selectedRole;

    contentArray = this.filterByContentType(selectedContentType, contentArray);
    contentArray = this.filterByRole(selectedRole, contentArray);

    return this.renderResults(contentArray);
  };

  /* https://stackoverflow.com/questions/42217579/data-binding-in-react */
  renderResults = (results: Content[]) => {
    return (
      <div>
        <select
          name="selectedContentType"
          value={this.state.selectedContentType}
          onChange={event => {
            this.setState({ selectedContentType: event.target.value });
          }}
        >
          <option value="all">All</option>
          <option value="youtube-video">Youtube Video</option>
          <option value="twitch-clip">Twitch Clip</option>
        </select>
        <select
          name="selectedRole"
          value={this.state.selectedRole}
          onChange={event => {
            this.setState({ selectedRole: event.target.value });
          }}
        >
          <option value="all">All</option>
          <option value="top">top</option>
          <option value="jg">jg</option>
          <option value="mid">mid</option>
          <option value="adc">adc</option>
          <option value="sup">sup</option>
        </select>
        <ContentView results={results} />
      </div>
    );
  };

  renderLoading = () => {
    return <div>bear with us as we load your content</div>;
  };
}

export default Main;
