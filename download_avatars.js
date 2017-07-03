const request = require('request');
const fs = require('fs');
const GITHUB_USER = "MathewKostiuk";
const GITHUB_TOKEN = "35bb07448bf255c925e55539ac748f31a799226e";

console.log('Welcome to the Github Avatar Downloaded!');


function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});