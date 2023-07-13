import { Post, Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = (): Prisma.UserCreateInput[] => [
  { email: "test@email.com", name: "Bob" },
  { email: "test1@email.com", name: "Jane" },
  { email: "test2@email.com", name: "Eli" },
];

const getPosts = (users: User[]): Prisma.PostCreateInput[] => [
  {
    author: { connect: { id: users[0].id } },
    title: "Test title 1",
    text: "test",
  },
  {
    author: { connect: { id: users[1].id } },
    title: "Test title 2",
    text: "test 2",
  },
];

const getComments = (
  users: User[],
  posts: Post[]
): Prisma.CommentCreateInput[] => [
  {
    creator: { connect: { id: users[0].id } },
    post: { connect: { id: posts[0].id } },
    text: "This is a test comment",
  },
];

const main = async () => {
  try {
    await prisma.comment.deleteMany();
    console.log("Deleted records in comment table");

    await prisma.post.deleteMany();
    console.log("Deleted records in post table");

    await prisma.user.deleteMany();
    console.log("Deleted records in user table");

    /*
    await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
    console.log('reset product auto increment to 1')

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    console.log('reset category auto increment to 1')

    */

    const users = await Promise.all(
      getUsers().map((user) => prisma.user.create({ data: user }))
    );

    const posts = await Promise.all(
      getPosts(users).map((post) => prisma.post.create({ data: post }))
    );

    const comments = await Promise.all(
      getComments(users, posts).map((comment) =>
        prisma.comment.create({ data: comment })
      )
    );

    console.log("Database atualizado!!!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
