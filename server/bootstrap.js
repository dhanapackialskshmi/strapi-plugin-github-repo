'use strict';


const RBAC_ACTIONS=[
  {
    section:"plugins",
    displayName:"View and access the plugin",
    uid:"use",
    pluginName:"github-projects",

  },

  {
    section:"plugins",
    subCategory:"Repositories",
    displayName:"Read Github reposotories",
    uid:"repos.read",
    pluginName:"github-projects",
  },

   {
    section:"plugins",
    subCategory:"Projects",
    displayName:"Read Project entities",
    uid:"projects.read",  //get a lsit of project in our table
    pluginName:"github-projects",
  },

    {
    section:"plugins",
    subCategory:"Projects",
    displayName:"Create Project entities",
    uid:"projects.create",  //create a lsit of project in our table
    pluginName:"github-projects",
  },

  {
    section:"plugins",
    subCategory:"Projects",
    displayName:"Delete Project entities",
    uid:"projects.delete",  //create a lsit of project in our table
    pluginName:"github-projects",
  },

];


module.exports = async({ strapi }) => {
  // bootstrap phase
  await strapi.admin.services.permission.actionProvider.registerMany(
    RBAC_ACTIONS
    );


};
