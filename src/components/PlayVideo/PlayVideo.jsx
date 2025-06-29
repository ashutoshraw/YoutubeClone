import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, valueConverter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";
const PlayVideo = () => {
  const {videoId}=useParams()
  const [apiData, setApiData] = useState(null);
  const[channelData,setChannelData]=useState(null)
  const[commentData,setCommentData]=useState([])
  const fetchVideoData = async () => {
    const videoDetailsUrl =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetailsUrl)
      .then((response) => response.json())
      .then((data) => setApiData(data.items[0]));
  };
   
  const fetchOtherData = async () => {   
    const channelDetailsUrl =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
     const commentUrl=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    await fetch(channelDetailsUrl)
      .then((response) => response.json())
      .then((data) => setChannelData(data.items[0]));

     await fetch(commentUrl)
  .then((res) => res.json())
  .then((data) => {
    if (data.items) {
      setCommentData(data.items);
    } else {
      setCommentData([]); // Ensure it's always an array
    }
  })
  .catch((error) => {
    console.error("Failed to fetch comments", error);
    setCommentData([]); // Handle fetch error gracefully
  });

  };


 useEffect(() => {
    fetchVideoData();
    
  }, [videoId]);

  useEffect(() => {
  if (apiData && apiData.snippet && apiData.snippet.channelId) {
    fetchOtherData();
  }
}, [apiData]);
  return (
    <div className="play-video">
   <iframe
  width="560"
  height="315"
  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

      <h3>{apiData ? apiData.snippet.title : "title here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? valueConverter(apiData.statistics.viewCount) : ""} Views
          &bull;
         {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? valueConverter(apiData.statistics.likeCount) : ""}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData? channelData.snippet.thumbnails.default.url:null} alt="publisher image " />
        <div>
          <p>{apiData? apiData.snippet.channelTitle:jack}</p>
          <span>{channelData? valueConverter(channelData.statistics.subscriberCount):''} subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
       <p>{apiData?apiData.snippet.description.slice(0,250):''}</p>
        <hr />
        <h4>{apiData?valueConverter(apiData.statistics.commentCount):''} comments</h4>
        {commentData.map((item,index)=>{
          return(
 <div className="comment" key={index}>
          <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
          <div>
            <h3>
              {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
            </h3>
            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
          )
        })}
       
      </div>
    </div>
  );
};

export default PlayVideo;
