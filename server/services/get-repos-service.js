'use strict';

const { request } = require("@octokit/request");
// or: import { request } from "@octokit/request";
const axios=require("axios")
const md = require('markdown-it')();

module.exports = ({ strapi }) => ({

  getProjectForRepo:async(repo)=>{
   const {id}=repo;
   //plugindev:plugin name:contentypename(schema) below line is used to fetch a data from db.connet with db
   const matchingProjects=await strapi.entityService.findMany("plugin::github-projects.project",{
    filters:{
      repositoryId:id
    }
   })  ;
   if(matchingProjects.length ==1) return matchingProjects[0].id;
   return null;
  },
  getPublicRepos:async()=> {
  console.log("res",request)
  const result = await request("GET /user/repos", {
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`, //github token
  },
  type: "public",
});

console.log(`${result.data.length} repos found.`);
// id,name,sd,url,ld=?>from github 
// https://raw.githubusercontent.com/dhanapackialskshmi/API-Development-in-Django/main/README.md //get longdesc from this api

return Promise.all(result.data.map(async(item)=>{
  const{id,name,description,html_url,owner,default_branch}=item  //destructing data
  const readmeUrl=`https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;
  console.log("readme-files",readmeUrl)
  const longDescription=await axios.get(readmeUrl)
  .then((res) => md.render(res.data).replaceAll("\n","<br/>"))
  .catch((err) => console.log("error", err))
  
  // console.log("ld1",longDescription)
  const repo= {
    id,
    name,
    shortDescription:description,
    url:html_url,
    longDescription
  };

// get a related project from current plugin
const relatedProjectId= await strapi.plugin("github-projects").service("getReposService").getProjectForRepo(repo);
return {
  ...repo,
  projectId:relatedProjectId
}
}));
// return result;
  },
});
