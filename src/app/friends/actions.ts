"use server";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";

export async function getFriends() {
  const { userId } = await auth();
  const friends = await prisma.friend.findMany({
    where: {
      userId: userId!,
    },
    select: {
      friend: {select:{profileImage:true,name:true}},
    },
  });
  return friends.map((friend)=>{return friend.friend});
}
