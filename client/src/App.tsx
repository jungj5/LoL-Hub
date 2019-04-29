import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { render } from 'react-dom';

interface ComponentState {
  fullContent: Content[],
  content: Content[],
  selectedContentType: string,
  selectedRole: string
}

interface Content {
  type: string,
  videoId: string,
  title: string,
  thumbnailUrl: string,
  creatorName: string,
  createdAt: string,
  embedLink: string,
  viewCount?: number,
  redditInfo?: object,
  videoClipInfo?: object,
  upvotes?: number
};

let streamers = new Map();
streamers.set('jungle', ['nightblue3', 'iwdominate']);
streamers.set('adc', 'doublelift');

class App extends Component<{}, ComponentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      fullContent: [],
      content: [],
      selectedContentType: 'all',
      selectedRole: 'all'
    };
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get('http://localhost:1337/test');
      const content = res.data.content;

      this.setState({
        fullContent: content,
        content: content
      });

    } catch (e) {
      console.log(e);
    }
  }

  filterByContentType = (selectedContentType: string, contentArray: Content[]) => {
    if (selectedContentType === 'all') {
      return contentArray;
    } else {
      const result = contentArray.filter((media) => {
        return media.type === selectedContentType;
      });
      return result;
    }
  }

  filterByRole = (selectedRole: string, contentArray: Content[]) => {
    if (selectedRole === 'all') {
      return contentArray;
    } else {
      const result = contentArray.filter((media) => {
        return streamers.get(selectedRole).includes(media.creatorName);
      });
      return result;
    }
  }

  contentFilter = async (/*field: string, event: any*/) => {
    //await this.setState({[field]: event.target.value} as ComponentState);
    let contentArray = this.state.fullContent;
    let selectedContentType = this.state.selectedContentType;
    let selectedRole = this.state.selectedRole;

    contentArray = this.filterByContentType(selectedContentType, contentArray);
    contentArray = this.filterByRole(selectedRole, contentArray);
    this.setState({content: contentArray});
  }

  render = () => {

    // let contentArray = this.state.fullContent;
    // let selectedContentType = this.state.selectedContentType;
    // let selectedRole = this.state.selectedRole;

    // contentArray = this.filterByContentType(selectedContentType, contentArray);
    // contentArray = this.filterByRole(selectedRole, contentArray);
    // this.setState({content: contentArray});

    const results = this.state.content;
    return results.length > 0 ?
      this.renderResults(results) :
      this.renderLoading()
  }

  /* https://stackoverflow.com/questions/42217579/data-binding-in-react */
  renderResults = (results: Content[]) => {
    return (
      <div>
        <select name="selectedContentType" value={this.state.selectedContentType} onChange={async (event) => {
            await this.setState({selectedContentType: event.target.value});
            this.contentFilter(/*'selectedContentType', event*/);
          }}>
          <option value="all">All</option>
          <option value="youtube-video">Youtube Video</option>
          <option value="twitch-clip">Twitch Clip</option>
        </select>
        <select name="selectedRole" value={this.state.selectedRole} onChange={async (event) => {
          await this.setState({selectedRole: event.target.value});
          this.contentFilter(/*'selectedRole', event*/);
        }}>
          <option value ="all">All</option>
          <option value="jungle">jungle</option>
          <option value="adc">adc</option>
        </select>        
        <ul id="content_unordered_list">
          {results.map((result: Content) =>
            <li key={result.videoId} >
              <iframe
                src={result.embedLink}
                height="390"
                width="640"
                frameBorder="10"
                scrolling="no">
                allowFullScreen>
              </iframe>
              <h3>{result.title}</h3>
              <ul id="content_unordered_list">
                <li>Creator: {result.creatorName}</li>
                <li>Content Type: {result.type.replace('-',' ')}</li>
                <li>Creation Date: {result.createdAt.split(':')[0]}</li>
              </ul>                
            </li>
            )}
        </ul>
      </div>
    );
  }

  renderLoading = () => {
    return (
      <div style={{backgroundColor: "#141414"}}>
      <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default App;

//https://www.robinwieruch.de/react-fetching-data/
//https://codepen.io/pjmtokyo/pen/ZGVjVV/
//https://moduscreate.com/blog/ext-js-to-react-load-sort-and-filter-data-with-react/




// referential transparancy
// functional purity (pure functions)
// Read up on these!!

// React developer tools <-- get dis


/*
Data Binding in React
*/