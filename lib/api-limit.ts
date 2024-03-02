import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userId: userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId: userId,
                count: 1,
            }
        })
    }
}

export const checkApiLimit = async () => {
    const { userId } = auth();
    if (!userId) return false;

    const maxFree = process.env.MAX_FREE_COUNTS ? parseInt(process.env.MAX_FREE_COUNTS) : 0;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    if (!userApiLimit || userApiLimit.count < maxFree) {
        return true;
    } else {
        return false;
    }
}

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) return 0;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) return 0;

    return userApiLimit.count;
}