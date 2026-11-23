"use server"
import {prisma} from "../src/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export async function checkUser(){
    const clerkUser = await currentUser();
    if(!clerkUser){
        return;
    }

    const existingUser = await prisma.user.findUnique({
        where:{clerkId:clerkUser.id}
    })

    if(existingUser){
        return existingUser
    }
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) return null;

    return prisma.user.create({
        data: {
        clerkId: clerkUser.id,
        email,
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null,
        imageUrl: clerkUser.imageUrl,
        },
    });
}