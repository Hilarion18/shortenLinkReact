import mongoose from 'mongoose'
const Schema = mongoose.Schema

const linkSchema = new Schema (
  {
    longUrl: {
      type: String
    },
    shortUrl: {
      type: String
    },
    hashed: {
      type: String
    },
    postedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true
  }
)


const Link = mongoose.model("Link", linkSchema);

module.exports = Link;