import { Post, Prisma, PrismaClient, User } from "@prisma/client";
import { mainModule } from "process";

const prisma = new PrismaClient();

const main = async () => {
  try {
    const post = await prisma.post.findFirst({
      where: { title: "New Title 1" },
      include: {
        author: true,
        comments: true,
      },
    });
    console.log(post);
    if (post) {
      const newPost = await prisma.post.update({
        data: {
          title: "New Title XXX",
        },
        where: {
          id: post.id,
        },
      });

      console.log(newPost);
    }

    //
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
main();
