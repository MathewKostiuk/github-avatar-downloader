const request = require('request');
const fs = require('fs');
const GITHUB_USER = "MathewKostiuk";
let json = '';
let buf = '';



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
    console.log(json);
    //console.log(buf);
  })



}





getRepoContributors("python", "cpython", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});