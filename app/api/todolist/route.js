import { connectdb } from "../../../database/mongo";
import Todo from "../../../models/todo";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectdb();
        const todos = await Todo.find();
        return NextResponse.json(todos, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectdb();
        // console.log(req.json);
        const { title, description, status, deadline } = await req.json();
        const newTask = await Todo.create({ title, description, status, deadline });
        await newTask.save();
        return NextResponse.json(newTask, { message: "sucessfully added" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectdb();
        const { searchParams } = new URL(req.url);
        // console.log(searchParams);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }
        await Todo.findByIdAndDelete(id);
        return NextResponse.json({ message: "sucessfully deleted" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectdb();
        const { id } = params;
        const { status } = req.body;
        if (!id) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }

        await Todo.findByIdAndUpdate(id, { status }, { new: true });
        return NextResponse.json({ message: "sucessfully updated" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await connectdb();

        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ message: "id and status are required" }, { status: 400 });
        }

        const updated = await Todo.findByIdAndUpdate(id, { status }, { new: true });
        if (!updated) {
            return NextResponse.json({ message: "task not found" }, { status: 404 });
        }
        return NextResponse.json(updated, { message: "sucessfully updated" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}