import { YoutubeDataAPI } from 'youtube-v3-api';
import TwitchClient, { HelixClip } from 'twitch';

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

type FetchContentFunction = () => Promise<Content[]>;

const convertData = (content: any, type: string) => {
  let result = []

  if (type === 'youtube-video') {
    for (let i = 0; i < content.items.length; i++) {
      let youtubeVid = {
        'type': 'youtube-video',
        'videoId': content.items[i].id.videoId,
        'title': content.items[i].snippet.title,
        'thumbnailUrl': content.items[i].snippet.thumbnails.default.url,
        'creatorName': content.items[i].snippet.channelTitle.toLowerCase(),
        'createdAt': content.items[i].snippet.publishedAt,
        'embedLink': `https://www.youtube.com/embed/${content.items[i].id.videoId}`
      };
      result.push(youtubeVid);
    }
  } else if (type === 'twitch-clip') {
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
  } else {
    console.log('Unknown type provided to converter function');
  }
  return result;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld (computer-optimized Fisher-Yates) shuffle algorithm.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
const shuffleArray = (content: any) => {
  // Don't want to update original array..
  let array = content;
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getContent: FetchContentFunction = async () => {


  const twitchClient = await TwitchClient.withClientCredentials(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET);

  const doubleliftRequest = twitchClient.helix.clips.getClipsForBroadcaster('40017619');
  const nb3Request = twitchClient.helix.clips.getClipsForBroadcaster('26946000');
  const doubleliftClips: HelixClip[] = await doubleliftRequest.getNext();
  const nb3Clips: HelixClip[] = await nb3Request.getNext();


  const doubleliftVids: any = await youtubeAPI.searchAll('Doublelift', 5, {type: 'video', channelId: 'UCrPCP1oaOr0AEs2JdxzfOFA'});
  const iwdVids: any = await youtubeAPI.searchAll('IWDominate', 5, {type: 'video', channelId: 'UCmEu9Y8nodUV0jvsR9NYLJA'});

  const twitchClips = convertData(doubleliftClips, 'twitch-clip').concat(convertData(nb3Clips, 'twitch-clip'));
  const youtubeVids = convertData(doubleliftVids, 'youtube-video').concat(convertData(iwdVids, 'youtube-video'));

  let convertedData = [];
  convertedData = twitchClips.concat(youtubeVids);

  return shuffleArray(convertedData);
}
