"use strict";

module.exports=({strapi}) => ({
    create: async(ctx) => {
//add a new project

  const repo=ctx.request.body;
  console.log("cont",repo);
//   console.log("uid",ctx.state.user.id)

  const newProject = await strapi
  .plugin('github-projects')
  .service("projectService")
  .create(repo,ctx.state.user.id);
  return newProject;
    },

    delete:async(ctx)=>{
      const projectId=ctx.params.id;
      
      const deletedProject=await strapi
  .plugin('github-projects')
  .service("projectService")
  .delete(projectId)

  return deletedProject;

    },

    find:async(ctx)=>{
      //get api params or populat fields using ctx
      return  await strapi
      .plugin("github-projects")
      .service("projectService")
      .find(ctx.query);
    },
    findOne:async(ctx)=>{
      const projectId=ctx.params.id ; //get a id from url

      return  await strapi
      .plugin("github-projects")
      .service("projectService")
      .findOne(projectId,ctx.query);

    }
});