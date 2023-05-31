import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "./context/user.context";

const PostAnalytics = () => {
  const [insights, setInsights] = useState([]);
  const { userAuth,  businessAccountId } =
  useContext(UserContext);

  // Replace with your Instagram Business Account ID and Page Access Token
  const instagramBusinessAccountId = 'YOUR_INSTAGRAM_BUSINESS_ACCOUNT_ID';
  const accessToken = 'YOUR_PAGE_ACCESS_TOKEN';

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get(`https://graph.facebook.com/v16.0/${businessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,insights.metric(engagement,impressions,reach,saved)&access_token=${userAuth.authResponse.accessToken}`);
        setInsights(response.data.data);
      } catch (error) {
        console.error('Error fetching Instagram insights:', error);
      }
    };

    fetchInsights();
  }, [userAuth.authResponse.accessToken, businessAccountId]);

  return (
    <div>
      <h1>Instagram Post Insights</h1>
      {insights.map((item, index) => (
        <div key={index}>
          <h2>{item.caption || 'No caption'}</h2>
          <p><strong>Timestamp:</strong> {item.timestamp}</p>
          {item.media_type === 'IMAGE' && <img src={item.media_url} alt={item.caption} style={{ maxWidth: '300px' }} />}
          {item.media_type === 'VIDEO' && <img src={item.thumbnail_url} alt={item.caption} style={{ maxWidth: '300px' }} />}
          <ul>
            {item.insights.data.map((insight, index) => (
              <li key={index}><strong>{insight.name}:</strong> {insight.values[0].value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PostAnalytics;