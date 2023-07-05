import prisma from "@/lib/db/prisma";
export const getUserByEmail =async (email:string) => {
    const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
}

export const createUser =async (email:string) => {
    const user = await prisma.user.create({
        data: {
            email,
            password: 'something'
        }
      });
      return user;
}