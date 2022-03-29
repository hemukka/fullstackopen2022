const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const sumLikes = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(sumLikes, 0)
}

const favoriteBlog = (blogs) => {
  const findFavorite = (fav, blog) => {
    return fav.likes < blog.likes
      ? blog
      : fav
  }

  const favorite = blogs.reduce(findFavorite, blogs[0])

  return blogs.length === 0
    ? {}
    : {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
}

const authorStats = (blogList) => {
  return blogList.reduce((authors, blog) => {
    if (blog.author in authors) {
      authors[blog.author].blogs += 1
      authors[blog.author].likes += blog.likes
    } else {
      authors[blog.author] = {
        blogs: 1,
        likes: blog.likes
      }
    }
    return authors
  }, {})
}

const mostBlogs = (blogs) => {
  //not great, but works
  return Object.entries(authorStats(blogs)).reduce((max, [author, stats]) => {
    return max.blogs < stats.blogs
      ? { author: author, blogs: stats.blogs }
      : max
  }, { author: '', blogs: 0 })
}

const mostLikes = (blogs) => {
  //not great, but works
  return Object.entries(authorStats(blogs)).reduce((max, [author, stats]) => {
    return max.likes < stats.likes
      ? { author: author, likes: stats.likes }
      : max
  }, { author: '', likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}