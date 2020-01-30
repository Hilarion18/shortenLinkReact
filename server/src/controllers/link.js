import Link from '../models/link'
import Bitly from '../helpers/hashLink'

module.exports = {
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
            let msg = result.status_txt
            if (msg = 'MISSING_ARG_URI') {
              res.status(500).json({
                message: `please insert the url`
              })
            } else if (msg = "INVALID_URI") {
              res.status(500).json({
                message: `wrong url`
              })
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
  deleteOne: (req,res) => {
    Link.findOne({ _id: req.params.id})
    .then((link) => {
      
        Link.deleteOne({_id: req.params.id})
        .then((result) => {
            res.status(200).json({
                result,
                message: `Link detail has been deleted`
            })
        })
    })
    .catch((err) => {
        res.status(500).json({
          err,
            message: `Link failed to delete`
        })
    })
  },
  deleteAll: (req,res) => {
    Link.remove({})
      .then((data) => {
        res.status(200).json({
          data,
          message: `all data has been removed`
        })
      })
      .catch((err) => {
        res.status(500).json({
          err,
          message: `data failure to remove`
        })
      })
  }
}