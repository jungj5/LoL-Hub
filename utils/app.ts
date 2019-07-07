import { YoutubeDataAPI } from 'youtube-v3-api';
import TwitchClient, { HelixClip } from 'twitch';
import * as streamers from './streamers.json';

const fs = require('fs');


const YOUTUBE_API_KEY: string = process.env.YOUTUBE_API_KEY as string;
const youtubeAPI = new YoutubeDataAPI(YOUTUBE_API_KEY);

const TWITCH_CLIENT_ID: string = process.env.TWITCH_CLIENT_ID as string;
const TWITCH_CLIENT_SECRET: string = process.env.TWITCH_CLIENT_SECRET as string;

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

interface Streamer {
  name: string,
  role: string,
  youtubeId?: string,
  twitchId?: string
}

interface TwitchData {
  id: string,
  title: string,
  thumbnailUrl: string,
  broadcasterDisplayName: string,
  creationDate: Date,
  embedUrl: string
}

interface YoutubeData {
  snippet: {
    title: string,
    thumbnails: {
      default: {
        url: string
      }
    },
    resourceId: {
      videoId: string
    },
    channelTitle: string,
    publishedAt: Date,
  }
}

type FetchContentFunction = () => Promise<Content[]>;

const convertYoutubeData = (content: YoutubeData[]): Content[] => {
  let result = []
  for (let i = 0; i < content.length; i++) {
    let youtubeVid = {
      'type': 'youtube-video',
      'videoId': content[i].snippet.resourceId.videoId,
      'title': content[i].snippet.title,
      'thumbnailUrl': content[i].snippet.thumbnails.default.url,
      'creatorName': content[i].snippet.channelTitle.toLowerCase(),
      'createdAt': content[i].snippet.publishedAt.toString(),
      'embedLink': `https://www.youtube.com/embed/${content[i].snippet.resourceId.videoId}`
    };
    result.push(youtubeVid);
  }

  return result;
}

const convertTwitchClipData = (content: TwitchData[]): Content[] => {
  let result = [];
  for (let i = 0; i < 5; i++) {
    let twitchClip = {
      'type': 'twitch-clip',
      'videoId': content[i].id,
      'title': content[i].title,
      'thumbnailUrl': content[i].thumbnailUrl,
      'creatorName': content[i].broadcasterDisplayName.toLowerCase(),
      'createdAt': content[i].creationDate.toString(),
      'embedLink': `${content[i].embedUrl}&autoplay=false`
    };
    result.push(twitchClip);
  }
  return result;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld (computer-optimized Fisher-Yates) shuffle algorithm.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
const shuffleArray = (content: Content[]) => {
  // Don't want to update original array..
  let array = content;
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getContent = async () => {


  const twitchClient = await TwitchClient.withClientCredentials(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET);

  const part = {
    _part: 'snippet',
    get part() {
      return this._part;
    },
    set part(value: string) {
      return;
    }
  };

  let youtubeVids: Content[] = [];
  let twitchClips: Content[] = [];
  for (let i = 0; i < streamers.streamers.length; i++) {
    const streamer: Streamer = streamers.streamers[i];
    if (streamer.youtubeId) {
      const streamerYoutubePlaylist: any = await youtubeAPI.searchPlaylistItems(streamer.youtubeId, 10, part);
      const streamerYoutubeVids: YoutubeData[] = streamerYoutubePlaylist.items;
      youtubeVids = youtubeVids.concat(convertYoutubeData(streamerYoutubeVids));
    }
    if (streamer.twitchId) {
      const streamerTwitchRequest = await twitchClient.helix.clips.getClipsForBroadcaster(streamer.twitchId);
      const streamerTwitchClips: HelixClip[] = await streamerTwitchRequest.getNext();
      twitchClips = twitchClips.concat(convertTwitchClipData(streamerTwitchClips));
    }
  }

  const convertedData: Content[] = shuffleArray(twitchClips.concat(youtubeVids));
  await fs.writeFileSync('./data/content.json', JSON.stringify({convertedData}, null, 4), (err: Error) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('File has been created');
  });
}

getContent();
