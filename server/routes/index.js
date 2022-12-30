module.exports = [
  {
    method: 'GET',
    path: '/repos',  // localhost:1337/github-projects/repos
    handler: 'getReposController.index', // controller name
    config: {
      policies: ["admin::isAuthenticatedAdmin",
      {

        name:"admin::hasPermissions",
        config:{
        actions:[
        "plugin::github-projects.repos.read",
        "plugin::github-projects.projects.read"],

        },
        
      },
    ],
      // auth:false,
    },
  },

  {
    method: "POST",
    path: "/project",  // localhost:1337/github-projects/repos
    handler: 'projectController.create', // controller name/methodname
    config: {
     policies: ["admin::isAuthenticatedAdmin",{

        name:"admin::hasPermissions",
        config:{
        actions:[
        "plugin::github-projects.projects.create"  //only forsuperadmin
      ],

        },
        
      }],
    
    },
  },

  {
    method: "DELETE",
    path: "/project/:id",  // localhost:1337/github-projects/repos
    handler: 'projectController.delete', // controller name/methodname
    config: {
   

      policies: ["admin::isAuthenticatedAdmin",{

        name:"admin::hasPermissions",
        config:{
        actions:[
        "plugin::github-projects.projects.delete"],

        },
        
      }],
    
    },
  },

    {
    method: "GET",
    path: "/projects",  // localhost:1337/github-projects/projects
    handler: 'projectController.find', // controller name/methodname
    config: {   
        auth:false,
        prefix:false
    },
  },

   {
    method: "GET",
    path: "/projects/:id",  // localhost:1337/github-projects/repos
    handler: 'projectController.findOne', // controller name/methodname
    config: {
        auth:false,
        prefix:false   //remove prefix(github-project)  localhost:1337/projects
    },
  },

];
