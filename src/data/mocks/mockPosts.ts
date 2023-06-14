import {PostType} from '../../types/post';

const mockPosts: PostType[] = [
  {
    id: Math.random(),
    nickname: 'Rafael Filho',
    email: 'rafa@gmail.com',
    image: require('../../../assets/imgs/fence.jpg'),
    comments: [
      {
        nickname: 'John Sheldon',
        comment: 'Stunning!',
      },
      {
        nickname: 'Ana Julia',
        comment: 'Foto linda!',
      },
    ],
  },
  {
    id: Math.random(),
    nickname: 'Chico Lima',
    email: 'chicao@gmail.com',
    image: require('../../../assets/imgs/bw.jpg'),
    comments: [],
  },
];

export default mockPosts;
