import React, { useEffect, useState } from 'react';
import './Recomended.css';
import { api_key } from '../../data';
import { value_converter } from "../../data";
import { Link } from 'react-router-dom'

const Recomended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const recommended_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${api_key}`;
    const res = await fetch(recommended_url);
    const data = await res.json();
    setApiData(data.items);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className='recomended'>
      {apiData.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recomended;
