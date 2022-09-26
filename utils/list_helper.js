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

const mostBlogs = (blogs) =>{
  var names = []
  blogs.map(blog =>{
    names.push(blog.author)
  })

  const auth_blogs = names.reduce( (author, amount)=>{
    author[amount] = (author[amount] || 0 ) + 1
    return (author)
  },{})
  
  const author = Object.keys(auth_blogs).reduce((a, b) => auth_blogs[a] > auth_blogs[b] ? a : b)
  const blogamount = Object.values(auth_blogs).reduce((a, b) => auth_blogs[a] > auth_blogs[b] ? a : b)

  return {
    author : author,
    blogs : blogamount
  }
  }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
  }