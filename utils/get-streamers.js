const rp = require('request-promise');
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');
const fs = require('fs');

const url = 'https://www.reddit.com/r/summonerschool/wiki/101/streamers';

rp(url)
  .then(function(html){
    $ = cheerio.load(html);
    cheerioTableParser($);
    let data = $("table").parsetable(true,true,true);

    // html del tags (false,false,false)
    let dataWithDelTags = $("table").parsetable(false,false,false);
    let streamers = {
      'streamers': []
    }
    for (let i = 1; i < data[0].length; i++) {
      if (!dataWithDelTags[0][i].includes("<del>") && !dataWithDelTags[0][i].includes("</del>")) {
        streamers.streamers.push({
          'name': data[0][i],
          'role': data[1][i]
        });
      }
    }

    streamers.streamers.push({
      'name': "iwdominate",
      'role': "jg"
    });
    streamers.streamers.push({
      'name': "foxdrop",
      'role': "jg"
    });

    fs.writeFileSync('../server/data/streamers.json', JSON.stringify(streamers, null, 4), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('File has been created');
    })

  })
  .catch(function(err){
    console.log(err);
  });