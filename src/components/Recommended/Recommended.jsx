import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, valueConverter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    const res = await fetch(relatedVideoUrl);
    const data = await res.json();
    if (data.items) {
      setApiData(data.items);
    } else {
      setApiData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);


  return (
    <div className='recommended'>
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="side-video-list"
          key={index}
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{valueConverter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
