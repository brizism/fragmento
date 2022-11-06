import axios from "axios";

// headers for axios
const headers = {
  Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
};

const baseURL = (userId) =>
  `https://api.twitter.com/2/users/${userId}/tweets?max_results=100&tweet.fields=author_id,conversation_id,created_at,id,in_reply_to_user_id,public_metrics,entities,lang,possibly_sensitive,source,text&media.fields=alt_text,height,preview_image_url,url`;

async function main(userId = "127933832") {
  const data = await (await axios.get(baseURL(userId), { headers })).data;
  return data?.data ?? [];
}

export default async function handler(req, res) {
  const response = await main(req.query?.userId);
  res.status(200).json(response);
}
