"use strict";

module.exports=({strapi})=>({
    create : async(repo,userId)=>{
        console.log("ser1",repo)
        console.log("repserciv",`${repo.id}`)
        console.log("user-servi",userId)
        // const UIID = repo.id
        const newProject= await strapi.entityService.create("plugin::github-projects.project",{
            data:{
                repositoryId: `${repo.id}`,
                title:repo.name,
                shortDescription:repo.shortDescription,
                repoUrl:repo.url,
                longDescription:repo.longDescription,
                createdBy:userId,
                updatedBy:userId
            },
        }
        );
          return newProject;
    },

    delete:async(projectId)=>{
        const deletedProject=await strapi.entityService.delete(
        "plugin::github-projects.project",
        projectId);

        return deletedProject;

    },

    find: async(params)=>{
        return  strapi.entityService.findMany("plugin::github-projects.project",params);

    },

    findOne:async(projectId,params)=>{
        return strapi.entityService.findOne("plugin::github-projects.project",projectId,params);

    }
});