import React, { useEffect, useState ,useContext} from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { dataContext } from '../../context/dataProvider';
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const intialPost  = {
    title:'',
    description:'',
    picture:'',
    category:'',
    username:'',
    date: Date.now()
}

export const UpdateDetails = () => {

    const {id} = useParams();
    const {data}  = useContext(dataContext)
    const [post , setPost] = useState(intialPost);
    const [file,setFile] = useState('') ; 

    const url =post.picture?post.picture: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
    post.picture = post.picture?post.picture:url;

    const location = useLocation();
    const navigate = useNavigate();
    
    const handleChange = (e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
    

    useEffect(()=>{
        const getImage=async()=>{
            if(file){
                const data = new FormData();
                data.append('name',file.name);
                data.append('file',file);
                console.log("data ",data.get('file'));
                // API call 
                const response = await API.uploadFile(data);
                post.picture = response.data.url;
                console.log(response.data)

                
            }
        }
        
        getImage();
        post.category= location.search?.split('=')[1]|| 'All';
        console.log(post)
        post.username = data.username;
        console.log(post)
    },[file])
    
    const submitHandler = async()=>{
        try{
          console.log(post._id)
            const response = await API.updatePost(
                post,               // body
                null,               // upload progress (not used)
                null,               // download progress (not used)
                { id: post._id }    // path params
            );
            
            alert("Post Updated");
            navigate('/');
        }
        catch(error){
            console.log("Error in found , error: ",error);
        }

    }
    // fetch data
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response = await API.getPostById({id:id});
          setPost(response.data)
          console.log(response.data);
        }
        catch(error){
          console.log("Error Fetching Post Id")
        }
        
      }
      fetchData()
      
    },[])

    

  return (
    <div 
    className='border border-blue-500 w-full h-screen flex flex-col justify-center items-center p-3'>
       
        <div
        className='h-1/2 min-w-300px'
        >
            <img className='h-full object-contain ' src={url} alt="" />
            
        </div>
        <div>
            <label htmlFor="file">
                <FaPlusCircle className='text-2xl'/>
            </label>
            <input   onChange={(e)=>{setFile(e.target.files[0]);console.log(file)}} className='hidden' type="file"  id="file" />
            <input value={post.title} className='w-full p-2 my-2' name='title' type="text" placeholder='Title' onChange={(e)=>{handleChange(e)}}/>
            <textarea value={post.description} className='w-full p-2 h-24 my-2' name='description' placeholder='description' onChange={(e)=>{handleChange(e)}}></textarea>
            <br/>
            <button onClick={()=>{submitHandler()}} className='bg-blue-300 text-blue-700 px-3 py-2 border rounded ' type='button'>Publish</button>
        </div>
    </div>
  )
}
