import crypto from 'crypto'
import mongoose from 'mongoose'
import CommentSchema from './CommentSchema.js'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const BlogSchema = new Schema(
  {
    author: {
      type: ObjectId,
      required: [true, 'please provide the author'],
      ref: 'Users'
    },
    title: String,
    body: String,
    banner: String,
    likes: Object,
    comments: [CommentSchema]

  },
  {
    timestamps: true
  }
)

BlogSchema.pre('save', async function (next) {
  if (this.banner) next()
  // else {
  const fileName = `${crypto.randomUUID()}--${Date.now()}`
  // fs.writeFile(`public/${fileName}`, this.banner, (err) => {
  //   err && console.error(err)
  //   // }
  // })
  this.banner = fileName
  next()
  // }
})

const Blog = mongoose.model('Blogs', BlogSchema)
export default Blog
