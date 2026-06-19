import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';

import User from './models/User.js';
import Genre from './models/Genre.js';
import Movie from './models/Movie.js';

dotenv.config();

const placeholder = (title) =>
  `https://placehold.co/300x450/111827/FFFFFF?text=${encodeURIComponent(title)}`;

try {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing');
  }

  await connectDB();

  await User.deleteMany();
  await Genre.deleteMany();
  await Movie.deleteMany();
  console.log('Old data removed');

  const hashedPassword = await bcrypt.hash('123456', 10);

  const users = await User.insertMany([
    {
      username: 'admin',
      email: 'admin@mail.com',
      password: hashedPassword,
      isAdmin: true,
    },
    {
      username: 'hizkia',
      email: 'hizkia@mail.com',
      password: hashedPassword,
      isAdmin: false,
    },
    {
      username: 'movie_lover',
      email: 'movie@mail.com',
      password: hashedPassword,
      isAdmin: false,
    },
    {
      username: 'sinta',
      email: 'sinta@mail.com',
      password: hashedPassword,
      isAdmin: false,
    },
    {
      username: 'reviewer',
      email: 'reviewer@mail.com',
      password: hashedPassword,
      isAdmin: false,
    },
    {
      username: 'nabila',
      email: 'nabila@mail.com',
      password: hashedPassword,
      isAdmin: false,
    },
    {
      username: 'rama',
      email: 'rama@mail.com',
      password: hashedPassword,
      isAdmin: false,
    },
    {
      username: 'admin2',
      email: 'admin2@mail.com',
      password: hashedPassword,
      isAdmin: true,
    },
  ]);

  console.log('Users seeded');

  const genres = await Genre.insertMany([
    { name: 'Action' },
    { name: 'Drama' },
    { name: 'Comedy' },
    { name: 'Sci-Fi' },
    { name: 'Thriller' },
    { name: 'Fantasy' },
    { name: 'Animation' },
    { name: 'Romance' },
    { name: 'Crime' },
    { name: 'Adventure' },
    { name: 'Horror' },
    { name: 'Mystery' },
    { name: 'Biography' },
    { name: 'Musical' },
    { name: 'Historical' },
    { name: 'Superhero' },
  ]);

  console.log('Genres seeded');

  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.name] = genre._id;
    return acc;
  }, {});

  const movies = [
    {
      name: 'Avengers: Endgame',
      image: 'https://image.tmdb.org/t/p/w1280/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
      year: 2019,
      genre: genreMap['Action'],
      detail:
        "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions.",
      cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
      reviews: [
        {
          name: 'admin',
          rating: 5,
          comment: 'Epic conclusion for the Avengers saga.',
          user: users[0]._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'The Godfather',
      image: 'https://image.tmdb.org/t/p/w1280/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      year: 1972,
      genre: genreMap['Crime'],
      detail:
        'The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.',
      cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
      reviews: [
        {
          name: 'hizkia',
          rating: 5,
          comment: 'Classic, slow, but extremely powerful.',
          user: users[1]._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'Interstellar',
      image: 'https://image.tmdb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
      year: 2014,
      genre: genreMap['Sci-Fi'],
      detail:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      reviews: [
        {
          name: 'movie_lover',
          rating: 5,
          comment: 'Emotional and intellectually satisfying.',
          user: users[2]._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'Inception',
      image: 'https://image.tmdb.org/t/p/w1280/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
      year: 2010,
      genre: genreMap['Sci-Fi'],
      detail:
        'A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal history.',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'The Dark Knight',
      image: 'https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      year: 2008,
      genre: genreMap['Action'],
      detail: 'Batman faces the Joker, a criminal mastermind who plunges Gotham City into chaos.',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      reviews: [
        {
          name: 'admin',
          rating: 5,
          comment: 'One of the best superhero movies ever made.',
          user: users[0]._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'La La Land',
      image: 'https://image.tmdb.org/t/p/w1280/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      year: 2016,
      genre: genreMap['Romance'],
      detail:
        'A pianist and an aspiring actress fall in love while pursuing their dreams in Los Angeles.',
      cast: ['Ryan Gosling', 'Emma Stone'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'Toy Story',
      image: 'https://image.tmdb.org/t/p/w1280/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
      year: 1995,
      genre: genreMap['Animation'],
      detail:
        "A cowboy doll feels threatened when a new spaceman action figure becomes his owner's favorite toy.",
      cast: ['Tom Hanks', 'Tim Allen'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'The Matrix',
      image: 'https://image.tmdb.org/t/p/w1280/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
      year: 1999,
      genre: genreMap['Sci-Fi'],
      detail: 'A hacker discovers that reality is a simulated world controlled by machines.',
      cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'Guardians of the Galaxy',
      image: 'https://image.tmdb.org/t/p/w1280/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
      year: 2014,
      genre: genreMap['Superhero'],
      detail:
        'A group of unlikely heroes must work together to stop a powerful villain from destroying the galaxy.',
      cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista'],
      reviews: [
        {
          name: 'nabila',
          rating: 5,
          comment: 'Funny, colorful, and very entertaining.',
          user: users.find((user) => user.email === 'nabila@mail.com')._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'Whiplash',
      image: 'https://image.tmdb.org/t/p/w1280/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
      year: 2014,
      genre: genreMap['Drama'],
      detail:
        'A young drummer joins a strict music conservatory and faces intense pressure from his demanding instructor.',
      cast: ['Miles Teller', 'J.K. Simmons', 'Melissa Benoist'],
      reviews: [
        {
          name: 'rama',
          rating: 5,
          comment: 'Very intense and powerful. The ending is amazing.',
          user: users.find((user) => user.email === 'rama@mail.com')._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'Hamilton',
      image: 'https://image.tmdb.org/t/p/w1280/A8wKCnzR2lksFuO6XyJZUUYddRP.jpg',
      year: 2020,
      genre: genreMap['Musical'],
      detail:
        'A filmed version of the Broadway musical about Alexander Hamilton, told through hip-hop and stage performance.',
      cast: ['Lin-Manuel Miranda', 'Phillipa Soo', 'Leslie Odom Jr.'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: '1917',
      image: 'https://image.tmdb.org/t/p/w1280/iZf0KyrE25z1sage4SYFLCCrMi9.jpg',
      year: 2019,
      genre: genreMap['Historical'],
      detail:
        'Two soldiers during World War I are sent on a dangerous mission to deliver a message that could save many lives.',
      cast: ['George MacKay', 'Dean-Charles Chapman', 'Mark Strong'],
      reviews: [
        {
          name: 'admin2',
          rating: 4,
          comment: 'Beautifully shot and very tense from start to finish.',
          user: users.find((user) => user.email === 'admin2@mail.com')._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'Get Out',
      image: 'https://image.tmdb.org/t/p/w1280/mE24wUCfjK8AoBBjaMjho7Rczr7.jpg',
      year: 2017,
      genre: genreMap['Thriller'],
      detail:
        'A young man visits his girlfriend’s family and discovers a disturbing secret beneath their friendly behavior.',
      cast: ['Daniel Kaluuya', 'Allison Williams', 'Lakeith Stanfield'],
      reviews: [
        {
          name: 'nabila',
          rating: 5,
          comment: 'Smart, scary, and full of tension.',
          user: users.find((user) => user.email === 'nabila@mail.com')._id,
        },
        {
          name: 'rama',
          rating: 4,
          comment: 'Very unique thriller with a strong message.',
          user: users.find((user) => user.email === 'rama@mail.com')._id,
        },
      ],
      numReviews: 2,
    },
    {
      name: 'Coco',
      image: 'https://image.tmdb.org/t/p/w1280/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg',
      year: 2017,
      genre: genreMap['Animation'],
      detail:
        'A young boy who dreams of becoming a musician enters the Land of the Dead and learns about family and memory.',
      cast: ['Anthony Gonzalez', 'Gael Garcia Bernal', 'Benjamin Bratt'],
      reviews: [
        {
          name: 'admin2',
          rating: 5,
          comment: 'Heartwarming, emotional, and visually beautiful.',
          user: users.find((user) => user.email === 'admin2@mail.com')._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'Joker',
      image: 'https://image.tmdb.org/t/p/w1280/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
      year: 2019,
      genre: genreMap['Drama'],
      detail:
        'A failed comedian descends into madness and becomes a symbol of chaos in Gotham City.',
      cast: ['Joaquin Phoenix', 'Robert De Niro'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'Spider-Man: No Way Home',
      image: 'https://image.tmdb.org/t/p/w1280/kjdJntyBeEvqm9w97QGBdxPptzj.jpg',
      year: 2021,
      genre: genreMap['Adventure'],
      detail: 'Peter Parker seeks help from Doctor Strange, causing the multiverse to break open.',
      cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'Parasite',
      image: 'https://image.tmdb.org/t/p/w1280/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      year: 2019,
      genre: genreMap['Thriller'],
      detail:
        'A poor family schemes to become employed by a wealthy household, leading to unexpected consequences.',
      cast: ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'The Grand Budapest Hotel',
      image: 'https://image.tmdb.org/t/p/w1280/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
      year: 2014,
      genre: genreMap['Comedy'],
      detail:
        'A hotel concierge and his lobby boy become involved in a story of theft, family fortune, and murder.',
      cast: ['Ralph Fiennes', 'Tony Revolori'],
      reviews: [],
      numReviews: 0,
    },
    {
      name: 'Dune',
      image: 'https://image.tmdb.org/t/p/w1280/gDzOcq0pfeCeqMBwKIJlSmQpjkZ.jpg',
      year: 2021,
      genre: genreMap['Sci-Fi'],
      detail:
        'A young nobleman becomes part of a war for control over the most valuable resource in the universe.',
      cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
      reviews: [
        {
          name: 'sinta',
          rating: 5,
          comment: 'Beautiful visuals and very interesting world-building.',
          user: users.find((user) => user.email === 'sinta@mail.com')._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'The Conjuring',
      image: 'https://image.tmdb.org/t/p/w1280/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
      year: 2013,
      genre: genreMap['Horror'],
      detail:
        'Paranormal investigators help a family terrorized by a dark presence in their farmhouse.',
      cast: ['Vera Farmiga', 'Patrick Wilson', 'Lili Taylor'],
      reviews: [
        {
          name: 'reviewer',
          rating: 4,
          comment: 'Scary and suspenseful horror movie.',
          user: users.find((user) => user.email === 'reviewer@mail.com')._id,
        },
      ],
      numReviews: 1,
    },
    {
      name: 'Oppenheimer',
      image: 'https://image.tmdb.org/t/p/w1280/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      year: 2023,
      genre: genreMap['Biography'],
      detail:
        'The story of J. Robert Oppenheimer and the creation of the atomic bomb during World War II.',
      cast: ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.'],
      reviews: [],
      numReviews: 0,
    },
  ];

  await Movie.insertMany(movies);
  console.log('Movies seeded');

  console.log('Seeder completed successfully');
  process.exit(0);
} catch (error) {
  console.error('Seeder failed:');
  console.error(error);
  process.exit(1);
}
