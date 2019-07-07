import express from 'express';
import cors from 'cors';
import fs from 'fs';
import * as streamers from './streamers.json';

// Duplicated in client.. maybe move this into its own file?
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

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 1337;

/*
  https://github.com/axios/axios/issues/1414
  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
*/
app.use(cors());

app.get('/', (req, res) => {
  res.send('I am alive! 🎉🎉🎉');
});

let content: Content[] = [];

console.log('Waiting 5 seconds for GCSFuse mount and then retrieving initial content for server startup..');
setTimeout(() => {
  const rawData = fs.readFileSync('./data/content.json');
  const data = JSON.parse(rawData.toString());
  content = data.convertedData;
}, 5000);


setInterval(() => {
  const rawData = fs.readFileSync('./data/content.json');
  const data = JSON.parse(rawData.toString());
  content = data.convertedData;
  console.log('Content Updated!');
}, 1800000); // <--- 30 minutes...

app.get('/content', async (req, res) => {
  res.send({ "content": content});
});

app.get('/streamers', async (req, res) => {
  res.send(streamers);
});

app.listen(port, () => {
  console.log(`Application is listening on port ${port}!!`);
});

/* 
  https://github.com/BrianDGLS/express-ts
  https://expressjs.com/en/starter/hello-world.html
*/