
module.exports={

kind: 'collectionType',
  collectionName: 'projects',
  info: {
    singularName: 'project', // kebab-case mandatory
    pluralName: 'projects', // kebab-case mandatory
    displayName: 'Project',
    // description: 'Agithub repo content-type',
  },
  options: {
    draftAndPublish: false,
  },

//   field names
  attributes: {
    repositoryId: {
      type: 'uid',
      unique:true
      
    },
    title:{
        type:"string",
        required:true,
        unique:true
    },
    shortDescription:{
        type:"string"
    },
    repoUrl:{
        type:"string"
    },
    longDescription:{
        type:"richtext"
    },
    coverImage:{
        type:"media",
        allowedTypes:["images"],
        multiple:false , // allow multiple images

    },
  },
};