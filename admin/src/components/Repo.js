import React, { useState, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { Box, Typography, BaseCheckbox } from '@strapi/design-system'

import { Loader, Alert, Link, Flex, IconButton } from '@strapi/design-system';
import { Pencil, Trash,Plus } from '@strapi/icons';
import axios from "../utils/axiosInstance";
import ConfirmationDialog from './ConfirmationDialog';
//loclaize the str name
import { useIntl } from "react-intl";
import getTrad from "../utils/getTrad" ;

const COL_COUNT = 5


const Repo = () => {

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRepos,setSelectedRepos]=useState([]);
  
  const[alert,setAlert]=useState(undefined);

  const[deletingRepo,setDeletingRepo]=useState(false);

  const {formatMessage}=useIntl();

  //intermediae alert
  // close a alert mesage.5s=5000
  const showAlert= (alert)=>{
    setAlert(alert);
    setTimeout(()=>{
      setAlert(undefined);
    },5000);

  };


  const createProject = (repo)=>{
    // console.log("rep-comp",repo)
      axios.post("/github-projects/project",repo).then((response)=>{

       setRepos(repos.map((item) => item.id!== repo.id?item:{
        ...item,
        projectId:response.data.id

      }
      )
      );
      showAlert({
        title:"Project Created",
        message:`Successfully created project ${response.data.title}`,
        variant:"success",
      });

    }).catch((error)=>{

       showAlert({
        title:"An error occured",
        message:error.toString(),
        variant:"danger",
      });

    });
    // console.log("create",response);
 
  };

  const deleteProject = (repo)=>{
    const {projectId}=repo;
     axios.delete(
      `/github-projects/project/${projectId}`
    ).then((response)=>{

    setRepos(repos.map((item) => item.id!== repo.id ? 
      item:{
        ...item,
        projectId:null,

      }
      )
      );
      showAlert({
        title:"Project Deleted",
        message:`Successfully deleted project ${response.data.title}`,
        variant:"success",
      });
    })
    .catch((error)=>{

       showAlert({
        title:"Adn error occured",
        message:error.toString(),
        variant:"danger",
      });
      

    });
    // console.log("deldata",response);

  };


  useEffect(async () => {
    setLoading(true);
    axios.get("/github-projects/repos").then((response) =>{
    console.log("jjj"),
    console.log("resp",response),
    console.log("resp-data",response.data),
    setRepos(response.data)
    
      
    }
   
     
       )
      .catch((error) => 
      // setError(error)
      showAlert({
        title:"Error fetching repositories",
        message:error.toString(),
        variant:"danger"

      })

      );
    setLoading(false);
  }, []);


  //[] for reexecution

  if (loading) return <Loader />;

  console.log("reposData", repos);
  
  //no.of repos selected (all)
  const allChecked= selectedRepos.length == repos.length;

  //some repo select
  const isInderminate=selectedRepos.length>0 && !allChecked;



  return (
    // <div>Example Plugin</div>
    <Box padding={8} background="neutral100">
   
    
      {alert && (
        <div style={{position:"absolute", top:0,left:"14%",zIndex:10}}>
        <Alert closeLabel='Close Alert'
         title={alert.title}
         variant={alert.variant}>
          {alert.message}
         </Alert>
         </div>
      )}
      <Table colCount={COL_COUNT} rowCount={repos.length}>

        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox aria-label="Select all entries" 
              value={allChecked}
              indeterminate={isInderminate}
              onValueChange={value=>value ? setSelectedRepos(repos.map((repo)=>repo.id)):setSelectedRepos([])}
              />
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id:getTrad("repo.name"),
                  defaultMessage:"Name"

                })}

              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                 {formatMessage({
                  id:getTrad("repo.description"),
                  defaultMessage:"Description"

                })}

              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                 {formatMessage({
                  id:getTrad("repo.url"),
                  defaultMessage:"Url"

                })}

                </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                 {formatMessage({
                 id:getTrad("repo.actions"),
                  defaultMessage:"Actions"
                })}

              </Typography>
            </Th>

          </Tr>
        </Thead>


        <Tbody>
          {repos.map((repo) => {
            const { id, name, shortDescription, url, projectId } = repo;
            return (
              <Tr key={repo.id}>
                <Td>
                  <BaseCheckbox aria-label={`Select ${id}`} 
                  value={selectedRepos.includes(id)}
                  onValueChange={(value)=>{
                    const newSelectedRepos= value ?[...selectedRepos,id]:  //selected repo
                    selectedRepos.filter((item)=>item !==id);   //unselect repo
                    setSelectedRepos(newSelectedRepos);
                  }}
                  />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{name}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{shortDescription}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    <Link href={url} isExternal>{url}</Link>
                  </Typography>
                </Td>

                <Td>
                  { projectId ? 
                    (<Flex>
                      <Link to={`/content-manager/collectionType/plugin::github-projects.project/${projectId}`}>
                      <IconButton onClick={() => console.log('edit')} label="Edit"
                       noBorder icon={<Pencil />} />
                       </Link>
                      <Box paddingLeft={1}>
                        <IconButton onClick={() => deleteProject(repo)} 
                        label="Delete" 
                        noBorder icon={<Trash />} />
                      </Box>
                    </Flex>):

                ( <IconButton onClick={() => createProject(repo)} label="Add"
                       noBorder icon={<Plus />} />)
                  }

                </Td>
              </Tr>
            );
          })}
        </Tbody>

      </Table>

         {deletingRepo && <ConfirmationDialog visible={!!deletingRepo}
      message="Are you sure ypu want to delete this? "
      onClose={()=>setDeletingRepo(undefined)}
      onConfirm={()=>deleteProject(deletingRepo)}
      />}
    </Box>

  );


}
export default Repo;