const dummy = (blogs) => {
    imp_blogs = blogs
    return 1
  }
  

const totalLikes = (blogs) => {
    var totalLikes = 0

    blogs.map(blog => {
      totalLikes = (totalLikes + blog.likes)
    })
  
    return totalLikes
}

const favoriteBlog = (blogs) => {
  var mostLiked = {
    title: "", 
    author: "",
    likes: 0  
  }

  blogs.map(blog =>{
    if (blog.likes > mostLiked.likes){
      mostLiked = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })

  return mostLiked

}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }