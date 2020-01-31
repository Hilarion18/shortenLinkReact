require('dotenv').config()
import BitlyAPI from "node-bitlyapi"

// login our access to bit.ly API
var Bitly = new BitlyAPI({
	client_id: process.env.BITLY_ID,
	client_secret: process.env.BITLY_SECRET
});

// getting token to access to bit.ly API
const bitly_token = [process.env.BITLY_TOKEN]
Bitly.setAccessToken(bitly_token);

export default Bitly