const mongoose = require("mongoose");
const request = require("supertest");

const { login } = require("../controllers/users");
const app = require("../app");

require("dotenv").config();
const { DB_HOST } = process.env;

// Подключение к MongoDB
mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/api/users/login", login);

describe("test login controller", () => {
  let server;

  const loginUser = {
    email: "example@.com",
    password: "example",
  };

  beforeAll(() => {
    server = app.listen(4000); // запуск Express-сервера для тестов
  });

  afterAll((done) => {
    server.close(() => {
      done();
      //   mongoose.connection.close(done); // для закрытия Express-сервера и соединения с базой данных после тестов
    });
  });

  beforeEach(async () => {
    await mongoose.connection.collection("users");
  });

  test("should respons with status 200 and return token", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    expect(response.status).toBe(200);

    const { token } = response.body;
    expect(token).toBeTruthy();
  });

  test("The response should return a user object with 2 fields email and subscription, having the data type String", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    const { user } = response.body;

    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("subscription");
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
