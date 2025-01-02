const dummy= (blogs) => {
return 1
}

const totalLikes= (blogs) => {
const reducer= (sum, blog) => {
return sum + blog.likes
 }

return blogs.length===0
?0
: blogs.reduce(reducer, 0) 
}

const favouriteBlog= (blogs) => {
const reducer= (max, blog) => {
return blog.likes > max.likes ? blog : max
 }

if (blogs.length===0) {
return null;
 }

const mostLikedBlog= blogs.reduce(reducer, blogs[0]);
return {
 title: mostLikedBlog.title,
 author: mostLikedBlog.author,
 likes: mostLikedBlog.likes,
 };

}

const mostBlogs= (blogs) => {
if (blogs.length===0) {
return null;
 }

}

module.exports= {
 dummy, totalLikes, favouriteBlog
}
