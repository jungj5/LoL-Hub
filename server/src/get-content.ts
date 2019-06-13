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

const convertYoutubeData = (content: YoutubeData[]) => {
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

const convertTwitchClipData = (content: TwitchData[]) => {
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

export const getContent: FetchContentFunction = async () => {


  const twitchClient = await TwitchClient.withClientCredentials(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET);

  const doubleliftRequest = twitchClient.helix.clips.getClipsForBroadcaster('40017619');
  const nb3Request = twitchClient.helix.clips.getClipsForBroadcaster('26946000');
  const doubleliftClips: HelixClip[] = await doubleliftRequest.getNext();
  const nb3Clips: HelixClip[] = await nb3Request.getNext();

  const part = {
    _part: 'snippet',
    get part() {
      return this._part;
    },
    set part(value: string) {
      return;
    }
  };

  const doubleliftPlaylist: any = await youtubeAPI.searchPlaylistItems('UUrPCP1oaOr0AEs2JdxzfOFA', 10, part);
  const doubleliftVids: YoutubeData[] = doubleliftPlaylist.items;
  const imaqtpiePlaylist: any = await youtubeAPI.searchPlaylistItems('UUjyNFmk6Ionj9Lw9iIo9LtQ', 10, part)
  const imaqtpieVids: YoutubeData[] = imaqtpiePlaylist.items;

  const iwdPlaylist: any = await youtubeAPI.searchPlaylistItems('UUmEu9Y8nodUV0jvsR9NYLJA', 10, part);
  const iwdVids: YoutubeData[] = iwdPlaylist.items;
  const foxdropPlaylist: any = await youtubeAPI.searchPlaylistItems('UU9U_UPJLasfZYZ0icNI0vBg', 10, part);
  const foxdropVids: YoutubeData[] = foxdropPlaylist.items;

  const twitchClips: Content[] = convertTwitchClipData(doubleliftClips).concat(convertTwitchClipData(nb3Clips));
  
  const adcVids = convertYoutubeData(doubleliftVids).concat(convertYoutubeData(imaqtpieVids));
  const jgVids = convertYoutubeData(iwdVids).concat(convertYoutubeData(foxdropVids));
  const youtubeVids: Content[] = adcVids.concat(jgVids);

  const convertedData: Content[] = twitchClips.concat(youtubeVids);

  return shuffleArray(convertedData);
}
