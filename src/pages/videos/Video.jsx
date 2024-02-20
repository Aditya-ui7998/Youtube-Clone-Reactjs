import React from 'react'
import './Video.css'
import PlayVideo from '../../components/Playvideo/PlayVideo'
import Recomended from '../../components/Recommended/Recomended'
import {useParams} from 'react-router-dom';
const Video = () => {

  const{videoId,categoryId}=useParams();

  return (
    <div className='play-video'> 
      <PlayVideo videoId ={videoId}/>
      <Recomended categoryId={categoryId}/>
    </div>
  )
}

export default Video;
