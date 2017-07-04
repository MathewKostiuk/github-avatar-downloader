const request = require('request');
const fs = require('fs');
const GITHUB_USER = "MathewKostiuk";
let json = '';
let buf = '';

const repoOwner = process.argv[2];
const repoName = process.argv[3];



console.log('Welcome to the Github Avatar Downloaded!');


function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://' + GITHUB_USER + ':' + process.env.GIT_HUB_ACCESS_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  const options = {
    'url': requestURL,
    'headers': {
      'User-Agent': 'avatar_downloader'
    }
  };


  request.get(options, requestURL)
  .on('error', function (err) {
    console.log(err);
  })
  .on('response', function (response) {
    console.log(response.statusCode);
    //console.log(response.headers);
    //console.log(response);
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



//console.log(json.avatar_url)
getRepoContributors(repoOwner, repoName, function(err, json) {
  for (let i = 0; i < json.length; i++) {
    const avatarUrl = json[i].avatar_url;
    const login = json[i].login;
    const loginName = "./avatars/" + login + ".jpg";
    downloadImageByURL(avatarUrl, loginName);
  }
});

function downloadImageByURL(url, filePath) {
  const options = {
    'url': url,
    'headers': {
      'User-Agent': 'avatar_downloader'
    }
  };

request.get(url)
.on('error', function (err) {
  console.log(err);
})
.on('response', function (response) {
  console.log('Response Status Code: ', response.statusCode);
})
.pipe(fs.createWriteStream(filePath));
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");