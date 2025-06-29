import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, valueConverter } from '../../data';
import moment from 'moment';
import ShimmerCard from '../ShimmerCard/ShimmerCard';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.items || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {loading
        ? Array.from({ length: 20 }).map((_, index) => <ShimmerCard key={index} />)
        : data.map((item, index) => (
            <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>
                {valueConverter(item.statistics.viewCount)} views &bull;{' '}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </Link>
          ))}
    </div>
  );
};

export default Feed;
