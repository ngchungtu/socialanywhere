import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const { name, email, password } = await req.json();
    await connectMongoDB()
    await User.create({ name, email, password })
    return NextResponse.json({ message: 'User regist successfully!' }, { status: 201 })
}

export async function GET(req, res) {
    try {
        await connectMongoDB()
        const user = await User.find()
        return new NextResponse(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new NextResponse.json({ message: "Cannot GET User" }, { status: 404 })
    }
}