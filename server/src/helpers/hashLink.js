require('dotenv').config()
import BitlyAPI from "node-bitlyapi"

var Bitly = new BitlyAPI({
	client_id: process.env.BITLY_ID,
	client_secret: process.env.BITLY_SECRET
});
const bitly_token = [process.env.BITLY_TOKEN]
Bitly.setAccessToken(bitly_token);
// 	$login="urlogin";
// 	$appkey="ur_api_key";   

// 	$bitly = 'http://api.bit.ly/shorten?version='.$version.'&longUrl='.urlencode($url).'&login='.$login.'&apiKey='.$appkey.'&format='.$format;
// 			$response = file_get_contents($bitly);

// 			$xml = simplexml_load_string($response);

// 	return $response;

export default Bitly