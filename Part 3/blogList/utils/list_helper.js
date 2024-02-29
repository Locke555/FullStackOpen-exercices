// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (acc, curr) => curr.likes + acc, 0
  )
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (acc, curr) => {
      if (acc !== null) {
        return acc.likes > curr.likes ? acc : curr
      } else {
        return curr
      }
    }, null
  )

  if (favorite === null) {
    return null
  }

  const result = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }

  return result
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}