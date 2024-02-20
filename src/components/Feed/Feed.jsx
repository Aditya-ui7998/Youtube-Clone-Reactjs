import React, { useEffect, useState } from 'react'
import moment from 'moment';
import './Feed.css'
import { Link } from 'react-router-dom'
import {api_key} from '../../data'
import { value_converter } from '../../data'

const Feed = ({category}) => {

  

  const[data,setData]= useState([]);

  const fetchData = async()=>{
    const videoList_url=` 
    https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${api_key}`
  try {
    const response = await fetch(videoList_url);
    const data = await response.json();
    setData(data.items);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  }

  useEffect(()=>{
    fetchData();
  },[category])
  
  return (
    <div className="feed">
      {data && data.length > 0 ? (
  data.map((item, index) => (
    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card' key={index}>
      {/* Use actual data properties from the YouTube API response */}
      <img src={item.snippet.thumbnails.medium.url} alt="" />
      <h2>{item.snippet.title}</h2>
      <h3>{item.snippet.channelTitle}</h3>
      <p>{value_converter(item.statistics.viewCount)} views &bull;{moment(item.snippet.publishedAt).fromNow()}</p>
    </Link>
  ))
) : (
  <p>Loading...</p>
)}

    </div>
  )
}

export default Feed;
