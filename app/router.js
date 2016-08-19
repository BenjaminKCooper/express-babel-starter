import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// router.post(requireAuth, Posts.createPost);
// router.post(requireAuth, Posts.updatePost);
// router.post(requireAuth, Posts.getPost);
// router.post(requireAuth, Posts.getPosts);
// router.post(requireAuth, Posts.deletePost);

router.route('/posts/:id')
  .put(requireAuth, Posts.updatePost)
  .get(Posts.getPost)
  .delete(requireAuth, Posts.deletePost);

router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);


router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

export default router;
