'use strict';

module.exports = ({ strapi }) => ({
  index:async(ctx)=> {
    // console.log("proj-controller")
    ctx.body = await strapi
      .plugin('github-projects')
      .service('getReposService')
      .getPublicRepos();
  },
});
