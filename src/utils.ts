import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const urlToFile = async (url: string) => {
    console.log(url);
    const response = await fetch(url);
    
    const blob = await response.blob();
    const t = await response.body;
    console.log(t);
    console.log(blob);
    const file = new File([blob], "image.jpg", { type: blob.type });
    console.log(file);
    return file;
};
//TODO
//example, make yout own util file cuz this one is used in client components too and throws an error. Can make other methods too etc @radutek, @enilesi
// import { Roles } from '@/types/globals'
// import { auth } from '@clerk/nextjs/server'
// export const checkRole = async (role: Roles) => {
//   const { sessionClaims } = await auth()
//   return sessionClaims?.metadata.role === role
// }