import axios from 'axios';

export const SocialAuth = async (username, email, userType, path) => {
  let data = JSON.stringify({
    username: username,
    email: email,
    user_type: userType,
    profileImageURL: path,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://54.172.115.72:3000/user/social-auth',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('resp', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
