const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://kxsalmi:${password}@cluster0.jflaui0.mongodb.net/BlogPage?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Blog = mongoose.model('Blog', noteSchema)

const blog = new Blog({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

blog.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})