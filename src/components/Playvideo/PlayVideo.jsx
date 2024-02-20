import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Share from "../../assets/share.png";
import Save from "../../assets/save.png";
import { api_key } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";
import {useParams} from 'react-router-dom';

const PlayVideo = () => {

  const{videoId} = useParams();


  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videodetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api_key}`;
    const response = await fetch(videodetails_url);
    const data = await response.json();
    setApiData(data.items[0]);
  };

  const fetchOtherData = async () => {
    if (apiData) {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${api_key}`;
      const response = await fetch(channelData_url);
      const data = await response.json();
      setChannelData(data.items[0]);
    }
  };

  const fetchCommentData = async () => {
    if (apiData) {
      const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${api_key}`;
      const response = await fetch(commentData_url);
      const data = await response.json();
      setCommentData(data.items);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  useEffect(() => {
    fetchCommentData();
  }, [apiData]); // Fetch comment data when apiData changes

  if (!apiData || !channelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <h3>{apiData.snippet.title}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(apiData.statistics.viewCount)} &bull;{" "}
          {moment(apiData.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={Like} alt="" />
            {value_converter(apiData.statistics.likeCount)}
          </span>
          <span>
            <img src={Dislike} alt="" />
          </span>
          <span>
            <img src={Share} alt="" />
            share
          </span>
          <span>
            <img src={Save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData.snippet.thumbnails.default.url}
          alt=""
        />

        <div>
          <p>{apiData.snippet.channelTitle}</p>
          <span>{value_converter(channelData.statistics.subscriberCount)} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData.snippet.description.slice(0, 250)}</p>

        <hr />
        <h4>{apiData.statistics.commentCount}</h4>

        {commentData.map((item, index) => (
          <div key={index} className="comments">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <h3>
               {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1day ago</span>
              </h3>
              <p>
                {item.snippet.topLevelComment.snippet.textDisplay}
              </p>
              <div className="comment-action">
                <img src={Like} alt="" />
                <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                <img src={Dislike} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
