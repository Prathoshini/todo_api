import "dotenv/config";

import request from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";
import Todo from "../models/todo.js";


// CONNECT TEST DATABASE
beforeAll(async () => {

    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    await connectDB(process.env.MONGO_TEST_URI);

});


// CLEAR TEST DATA BEFORE EVERY TEST
beforeEach(async () => {

    await Todo.deleteMany({});

});


// DISCONNECT AFTER ALL TESTS
afterAll(async () => {

    await mongoose.connection.dropDatabase();

    await mongoose.disconnect();

});


// TEST CASES
describe("Todo API Testing", () => {

    // TEST 1: CREATE TODO
    test("Should create a new todo", async () => {

        const response = await request(app)
            .post("/api/todos")
            .send({
                title: "Learn Jest",
                description: "Practice testing"
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.title).toBe("Learn Jest");

        expect(response.body.completed).toBe(false);

    });


    // TEST 2: GET ALL TODOS
    test("Should get all todos", async () => {

        await Todo.create({
            title: "Learn React"
        });

        const response = await request(app)
            .get("/api/todos");

        expect(response.statusCode).toBe(200);

        expect(response.body.length).toBe(1);

        expect(response.body[0].title).toBe("Learn React");

    });


    // TEST 3: GET SINGLE TODO
    test("Should get a single todo", async () => {

        const todo = await Todo.create({
            title: "Learn Node"
        });

        const response = await request(app)
            .get(`/api/todos/${todo._id}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.title).toBe("Learn Node");

    });


    // TEST 4: UPDATE TODO
    test("Should update a todo", async () => {

        const todo = await Todo.create({
            title: "Learn MongoDB"
        });

        const response = await request(app)
            .put(`/api/todos/${todo._id}`)
            .send({
                title: "Learn MongoDB and Jest",
                completed: true
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.title)
            .toBe("Learn MongoDB and Jest");

        expect(response.body.completed).toBe(true);

    });


    // TEST 5: DELETE TODO
    test("Should delete a todo", async () => {

        const todo = await Todo.create({
            title: "Learn Express"
        });

        const response = await request(app)
            .delete(`/api/todos/${todo._id}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("Todo deleted successfully");

        const deletedTodo = await Todo.findById(todo._id);

        expect(deletedTodo).toBeNull();

    });


    
//delete all todos
    test("Should delete all todos", async () => {

    await Todo.create([
        { title: "Learn React" },
        { title: "Learn Node" },
        { title: "Learn Jest" }
    ]);

    const response = await request(app)
        .delete("/api/todos/delete-all");

    expect(response.statusCode).toBe(200);

    expect(response.body.message)
        .toBe("All todos deleted successfully");

    const todos = await Todo.find();

    expect(todos.length).toBe(0);

});

});