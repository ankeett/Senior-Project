import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getAPost,updatePost } from '../../actions/postAction'
import { useParams } from 'react-router-dom'
import { Paper,Avatar,Select,MenuItem,Button,TextField,Input,Divider,Chip,IconButton, } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import PublicIcon from '@mui/icons-material/Public';
import HttpsIcon from '@mui/icons-material/Https';
import LockIcon from '@mui/icons-material/Lock';
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import { useNavigate } from 'react-router-dom'


/*
Update
NAME
    Update
SYNOPSIS
    Update();
DESCRIPTION
    This React component allows users to update a post. Users can modify the post's content, tags, images, and visibility settings.
PARAMETERS
    None.
RETURNS
    Returns a React component that provides an interface for updating a post.
*/

const Update = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.user)
  const {post} = useSelector(state => state.posts)
  const {id} = useParams();
  
  // State variables
  const [status,setStatus] = useState("")
    const [image,setImage] = useState([])
    const [tags,setTags] = useState([])
    const [visibility,setVisibility] = useState('Everyone')
    const [content,setContent] = useState('')
    const [newImages,setNewImages] = useState([])

    const navigate = useNavigate();

    
   // Function to handle image upload 
    const handleImages = (e)=>{
   
        const files = Array.from(e.target.files);
        setNewImages([]);
        files.forEach((file)=>{
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState=== 2){
                    setNewImages((old)=>[...old, reader.result]);
                }
            }
    
            reader.readAsDataURL(file);
        });
    
      }
      
      // Set the visibility state based on the post's visibility setting.
      useEffect(() => {
        if(status === 'Everyone'){
          setVisibility('public');
        }
        else{
          setVisibility('private');
        }
      },[status])

      // Add a tag to the post.
    const handleAdd = (e) =>{
        if(e.key === 'Enter' && e.target.value !== '')
        {
          setTags((prevTags)=>[...prevTags, e.target.value]);
          e.target.value = '';
        }
      }
      
      // Delete a tag from the post.
      const handleDelete = (tagToDelete)=>{
        setTags(tags.filter((tag) => tag !==tagToDelete));
      }

      // Set the post's content, tags, images, and visibility settings.
    useEffect(() => {
        if(post && post._id !== id){
            dispatch(getAPost(id))
        }
        else{
            setStatus(post.visibility === 'public' ? 'Everyone' : 'Anonymous')
            setTags(post.tags)
            setContent(post.content)
            setImage(post.image)
        }
    }, [dispatch,post])

    // Update the post.
    const handleUpdatePost = (e)=>{
      dispatch(updatePost(id,content,tags,image,newImages,visibility));
      navigate(`/post/${id}`);
        
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-[99] w-full h-full'>
    <Paper className=" p-[30px] rounded-[15px] w-2/5 " elevation={6}>
      <div className='text-end '  ><CancelIcon className='cursor-pointer' /></div>  
      <div className='flex flex-row mb-5 gap-3' >
        <Avatar className='bg-[#1da1f2]'>
          {status === 'Anonymous' ? <HttpsIcon/> : <PublicIcon/>}
        </Avatar>
        <Select disableUnderline={true} size='small' className='w-1/4 h-1/9 outline-none' variant="standard" label="Audience" defaultValue={status} onChange={(e)=>{setStatus(e.target.value)}}>
          <MenuItem value="Everyone">Everyone</MenuItem>
          <MenuItem value="Anonymous"> Anonymous</MenuItem>
        </Select>
      </div> 
      
      <div>
        <Input disableUnderline={true} multiline placeholder="What's on your mind?" variant="standard" value = {content} onChange={(e)=>{setContent(e.target.value)}}  className='border-none w-full ml-6 h-full'
        />
      </div>
      <Divider className='m-2 mt-7'/>

      <Input disableUnderline={true} placeholder="tags" variant="standard" className='border-none w-full ml-6 h-full mt-2' onKeyDown={handleAdd}
        />
      <div className='flex flex-row gap-2'>
          {tags.map((tag,index)=>{
            return(
              <Chip
                key={index}
                style={{margin:'10px 0'}}
                value={tag}
                onDelete={()=>{handleDelete(tag)}}
                label={tag}
                varient="outlined"
              />
            )
          })}
        </div>
        
        
      
          <div className='grid grid-cols-2 gap-6'>
          {image &&
                image.map((img,index)=>{
                  return(
                    <div key={index} className="">
                        <IconButton onClick={()=>setImage(image.filter((e)=> e !== img))}><CancelIcon className='object-top'/></IconButton>
                        <img src={img.url} height='200' width='200'/>
                    </div>
                  )
                })
            }
            {newImages &&

                newImages.map((img,index)=>{
                    return(
                        <div key={index} className="">
                            <IconButton onClick={()=>setNewImages(newImages.filter((e)=> e !== img))}><CancelIcon className='object-top'/></IconButton>
                            <img src={img} height='200' width='200'/>
                        </div>
                    )
                    })
            }
            
          </div>
        <div className='flex flex-row justify-between'>
          <div>
            <label htmlFor="myInput"><ImageIcon className='cursor-pointer text-[#1da1f2] float-left mt-3' style={{ fontSize: '20px'}}/></label>
            <input id="myInput" type="file" fullWidth name='image' multiple accept="image/png image/jpeg image/webp" className='hidden' onChange = {handleImages}/>
            <label htmlFor="myGif"><GifBoxIcon className='cursor-pointer text-[#1da1f2] float-left mt-3' style={{ fontSize: '20px'}}/></label>
            <input id="myGif" type="file" fullWidth name='image' multiple accept="image/png image/jpeg image/webp image/gif" className='hidden' onChange = {handleImages}/>
          </div>
          <Button className='text-white bg-[#1da1f2] normal-case text-base rounded-full float-right' onClick={handleUpdatePost}>Update</Button>
      </div>
    </Paper>
  </div>
  )
}

export default Update