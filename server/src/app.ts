import express from 'express';
import cors from 'cors';
//import { content } from '../data/response1.json';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 1337;

/*
  https://github.com/axios/axios/issues/1414
  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
*/
app.use(cors());

app.get('/', (req, res) => {
  res.send('I am alive! 🎉🎉🎉🎉');
});

app.get('/test', (req, res) => {
  res.send({ "content": [
    {
      "type": "youtube-video",
      "videoId": "fs5cYAsSM40",
      "title": "Doublelift - INSANE PLAYS MADE POSSIBLE BY UDOTGG (THAT'S U.GG)",
      "thumbnailUrl": "https://i.ytimg.com/vi/fs5cYAsSM40/default.jpg",
      "creatorName": "Doublelift",
      "createdAt": "2019-03-31:04:30:37Z",
      "embedLink": "https://www.youtube.com/embed/fs5cYAsSM40"
    },
    {
      "type": "twitch-clip",
      "videoId": "ReliableRamshackleCroissantCurseLit",
      "title": "MikeYeung's baron pit escape tutorial.",
      "thumbnailUrl": "https://clips-media-assets2.twitch.tv/AT-cm%7C428125954-preview-260x147.jpg",
      "creatorName": "Riot Games",
      "createdAt": "2019-03-29:03:30:37Z",
      "embedLink": "https://clips.twitch.tv/embed?clip=ReliableRamshackleCroissantCurseLit&autoplay=false"
    },
    {
      "type": "youtube-video",
      "videoId": "1UB8jRU0waM",
      "title": "TSM Doublelift Montage - League of Legends",
      "thumbnailUrl": "https://i.ytimg.com/vi/1UB8jRU0waM/default.jpg",
      "creatorName": "Doublelift",
      "createdAt": "2019-11-17:04:44:47Z",
      "embedLink": "https://www.youtube.com/embed/1UB8jRU0waM"
    },
    {
      "type": "twitch-clip",
      "videoId": "FunFreezingChickenKappaPride",
      "title": "Worlds Quarterfinals: SK Telecom T1 vs. Royal Never Give Up",
      "thumbnailUrl": "https://clips-media-assets2.twitch.tv/23410850752-offset-15554-preview-260x147.jpg",
      "creatorName": "Riot Games",
      "createdAt": "2016-10-14:03:30:37Z",
      "embedLink": "https://clips.twitch.tv/embed?clip=FunFreezingChickenKappaPride&autoplay=false"
    },
    {
      "type": "youtube-video",
      "videoId": "HZnP2yVK94A",
      "title": "THAT SHOULDN'T HAVE HAPPENED...",
      "thumbnailUrl": "https://i.ytimg.com/vi/HZnP2yVK94A/default.jpg",
      "creatorName": "IWDominate",
      "createdAt": "2019-04-07:04:44:47Z",
      "embedLink": "https://www.youtube.com/embed/HZnP2yVK94A"
    },
    {
      "type": "twitch-clip",
      "videoId": "FairDarlingAirGuitarKlappa",
      "title": "NB3 VS T2G",
      "thumbnailUrl": "https://clips-media-assets2.twitch.tv/33571426192-offset-10090-preview-260x147.jpg",
      "creatorName": "Nightblue3",
      "createdAt": "2019-04-06:03:30:37Z",
      "embedLink": "https://clips.twitch.tv/embed?clip=FairDarlingAirGuitarKlappa&autoplay=false"
    },
    {
      "type": "twitch-clip",
      "videoId": "DelightfulTalentedKeyboardTBCheesePull",
      "title": "nuts",
      "thumbnailUrl": "https://clips-media-assets2.twitch.tv/AT-cm%7C434275469-preview-260x147.jpg",
      "creatorName": "Doublelift",
      "createdAt": "2019-04-08:03:30:37Z",
      "embedLink": "https://clips.twitch.tv/embed?clip=DelightfulTalentedKeyboardTBCheesePull&autoplay=false"
    }
  ]});
});

app.listen(port, () => {
  console.log(`Application is listening on port ${port}!!`);
});

/* 
  https://github.com/BrianDGLS/express-ts
  https://expressjs.com/en/starter/hello-world.html
*/