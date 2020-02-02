import Link from '../models/link'
import Bitly from '../helpers/hashLink'

module.exports = {
  // 
  getLinks: (req,res) => {
    Link.find({})
    .then((data) => {
      res.status(200).json({
        data,
        message: `get links`
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `data failure to get`
      })
    })
  },
  createLink: (req,res) => {
    Bitly.shorten({longUrl: req.body.longUrl}, function(err, results) {
      // Do something with your new, shorter url...
      if (err) {
        res.status(500).json({
          message: `something trouble with your link`
        })
      }
      if (results) {
        const result = JSON.parse(results)
        // if post status success from bit.ly API
        if (result.status_code === 200) {
          let linkData = new Link ({
            longUrl: req.body.longUrl,
            shortUrl: result.data.url,
            hashed: result.data.hash
          })
          linkData.save()
            .then((data) => {
              res.status(201).json({
                data,
                message: `get links`
              })
            })
            .catch((err) => {
              res.status(500).json({
                err,
                message: `data failure to get`
              })
            })
          } else if (result.status_code === 500) {
            // if no url request
            let msg = result.status_txt
            if (msg = 'MISSING_ARG_URI') {
              res.status(500).json({
                message: `please insert the url`
              })
              // if url is invalid
            } else if (msg = "INVALID_URI") {
              res.status(500).json({
                message: `wrong url`
              })
              // else 500 response from bit.ly API
            } else {
              res.status(500).json({
                msg,
              })
            }
          } else {
              res.status(result.status_code).json({
              message: `there is something wrong with connection`
            })
          }
      }
    });
  },
  // to delete all posted link
  deleteAll: (req,res) => {
    Link.remove({})
      .then((data) => {
        res.status(200).json({
          data,
          message: `all link has been removed`
        })
      })
      .catch((err) => {
        res.status(500).json({
          err,
          message: `links failure to remove`
        })
      })
  }
}