import Post from '../models/post_model';
// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

export const createPost = (req, res) => {
  const post = new Post();


  post.title = req.body.title;
  post.tags = req.body.tags;
  post.contents = req.body.contents;

  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });

  // res.send(post); // res.send('post should be created here');
};

export const getPosts = (req, res) => {
  Post.find()
  .then(result => {
    res.json(cleanPosts(result));
  }).catch(error => {
    res.json({ error });
  });
  // ((err, posts) => {
  //   if (err) return console.error(err); // http://mongoosejs.com/docs/
  //   else { return res.send(posts); }
  // });
  // res.send('posts should be returned');
};

export const getPost = (req, res) => {
  // const post = new Post();
  Post.findById(req.params.id)
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json(error);
  });

  // res.send('single post looked up');
};
export const deletePost = (req, res) => {
  Post.findById(req.params.id)
  .remove().catch(error => {
    res.json(error);
  });

  // res.send('delete a post here');
};
export const updatePost = (req, res) => {
  const query = { _id: req.params.id };
  Post.update(query, req.body)
  .catch(error => {
    res.json(error);
  }); // http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html

  // res.send('update a post here');
};
