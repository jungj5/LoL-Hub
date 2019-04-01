import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

interface response {
  content: content[]
}

interface content {
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


// function used to simulate time used for network communication
function sleep(milliseconds: number) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


class App extends Component<any, response> {
  constructor(props: any) {
    super(props);

    this.state = {
      content: []
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get('response1.json');
      sleep(200);
      const contentArray = res.data
      this.setState(contentArray);

    } catch (e) {
      
    }

  }
  render() {
    const results = this.state.content;
    return (
      <ul>
        {results.map((result: content) =>
          <li key={result.videoId} >
            <iframe
              src={result.embedLink}
              height="390"
              width="640"
              frameBorder="10"
              scrolling="no">
              allowFullScreen>
              >
            </iframe>
          </li>
          )}
      </ul>

    );
  }
}

export default App;

//https://www.robinwieruch.de/react-fetching-data/