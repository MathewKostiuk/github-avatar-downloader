//define global variables and requires.
//define variables for pushing data to.
require('dotenv').config();
const request = require('request');
const fs = require('fs');
const GITHUB_USER = "MathewKostiuk";
let json = '';
let buf = '';

// setup process.argv
const repoOwner = process.argv[2];
const repoName = process.argv[3];





function getRepoContributors(repoOwner, repoName, cb) {

//verify process.argv entry
  if (repoOwner || repoName === null) {
    console.log("Error! Please provide valid repo name and repo owner name");
    return;
  }
//concatenated string for url request. process.env is an environment variable
  const requestURL = 'https://' + GITHUB_USER + ':' + process.env.GIT_HUB_ACCESS_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

//User-Agent required for github API

  const options = {
    'url': requestURL,
    'headers': {
      'User-Agent': 'avatar_downloader'
    }
  };

//http request
  request.get(options, requestURL)
  .on('error', function (err) {
    console.log(err);
  })
  .on('response', function (response) {
    console.log(response.statusCode);
  })
  .on('data', function(chunk) {
     buf += chunk;
  })
  .on('end', function() {
    json = JSON.parse(buf);
    //console.log(json);
    cb(null, json);
  });
}

getRepoContributors(repoOwner, repoName, function(err, json) {
  for (let i = 0; i < json.length; i++) {
    const avatarUrl = json[i].avatar_url;
    const login = json[i].login;
    const loginName = "./avatars/" + login + ".jpg";
    downloadImageByURL(avatarUrl, loginName);
  }
});
// takes avatarUrl and loginName as parameters
function downloadImageByURL(url, filePath) {
  const options = {
    'url': url,
    'headers': {
      'User-Agent': 'avatar_downloader'
    }
  };

//makes http request to download images based on parameters

request.get(url)
.on('error', function (err) {
  console.log(err);
})
.on('response', function (response) {
  console.log('Response Status Code: ', response.statusCode);
})
.pipe(fs.createWriteStream(filePath));
}
