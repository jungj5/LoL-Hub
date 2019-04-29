import { YoutubeDataAPI } from 'youtube-v3-api';
import TwitchClient, { HelixClip } from 'twitch';

const YOUTUBE_API_KEY: string = process.env.YOUTUBE_API_KEY as string;
const youtubeAPI = new YoutubeDataAPI(YOUTUBE_API_KEY);

const TWITCH_CLIENT_ID: string = process.env.TWITCH_CLIENT_ID as string;
const TWITCH_CLIENT_SECRET: string = process.env.TWITCH_CLIENT_SECRET as string;


const getYoutubeVideos = async () => {
  const doubleliftVids: any = await youtubeAPI.searchAll('Doublelift', 5, {type: 'video', channelId: 'UCrPCP1oaOr0AEs2JdxzfOFA'});
  const iwdVids: any = await youtubeAPI.searchAll('IWDominate', 5, {type: 'video', channelId: 'UCmEu9Y8nodUV0jvsR9NYLJA'});
  const content = [];

  for (let i = 0; i < iwdVids.items.length; i++) {
    let doubleliftVid = {
      'type': 'youtube-video',
      'videoId': doubleliftVids.items[i].id.videoId,
      'title': doubleliftVids.items[i].snippet.title,
      'thumbnailUrl': doubleliftVids.items[i].snippet.thumbnails.default.url,
      'creatorName': doubleliftVids.items[i].snippet.channelTitle.toLowerCase(),
      'createdAt': doubleliftVids.items[i].snippet.publishedAt,
      'embedLink': `https://www.youtube.com/embed/${doubleliftVids.items[i].id.videoId}`
    }

    let iwdVid = {
      'type': 'youtube-video',
      'videoId': iwdVids.items[i].id.videoId,
      'title': iwdVids.items[i].snippet.title,
      'thumbnailUrl': iwdVids.items[i].snippet.thumbnails.default.url,
      'creatorName': iwdVids.items[i].snippet.channelTitle.toLowerCase(),
      'createdAt': iwdVids.items[i].snippet.publishedAt,
      'embedLink': `https://www.youtube.com/embed/${iwdVids.items[i].id.videoId}`
    }

    content.push(doubleliftVid);
    content.push(iwdVid);
  }

  return content;
}

const getTwitchClips = async () => {
  const twitchClient = await TwitchClient.withClientCredentials(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET);

  const doubleliftRequest = twitchClient.helix.clips.getClipsForBroadcaster('40017619');
  const nb3Request = twitchClient.helix.clips.getClipsForBroadcaster('26946000');
  const doubleliftClips: HelixClip[] = await doubleliftRequest.getNext();
  const nb3Clips: HelixClip[] = await nb3Request.getNext();

  const content = [];

  for (let i = 0; i < 5; i++) {
    let doubleliftClip = {
      'type': 'twitch-clip',
      'videoId': doubleliftClips[i].id,
      'title': doubleliftClips[i].title,
      'thumbnailUrl': doubleliftClips[i].thumbnailUrl,
      'creatorName': doubleliftClips[i].broadcasterDisplayName.toLowerCase(),
      'createdAt': doubleliftClips[i].creationDate,
      'embedLink': `${doubleliftClips[i].embedUrl}&autoplay=false`
    }

    let nb3Clip = {
      'type': 'twitch-clip',
      'videoId': nb3Clips[i].id,
      'title': nb3Clips[i].title,
      'thumbnailUrl': nb3Clips[i].thumbnailUrl,
      'creatorName': nb3Clips[i].broadcasterDisplayName.toLowerCase(),
      'createdAt': nb3Clips[i].creationDate,
      'embedLink': `${nb3Clips[i].embedUrl}&autoplay=false`
    }

    content.push(doubleliftClip);
    content.push(nb3Clip);
  }

  return content;
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

export const getContent = async () => {
  // const youtubeContent = await getYoutubeVideos();
  const twitchContent = await getTwitchClips();
  //const content = youtubeContent.concat(twitchContent);
  return shuffleArray(twitchContent);
}


/*
TODO: convert this to class
*/