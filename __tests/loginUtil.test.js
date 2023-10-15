const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { User } = require("../models");
const ctrl = require("../controllers/users");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("test login controller", () => {
  let req, res, next;

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    id: "12345",
    email: "test@example.com",
    password: "hashedPassword",
    subscription: "pro",
  };

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "password",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("should response with status 200, return token and obj user with 2 fields email and subscription", async () => {
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedToken");
    User.findByIdAndUpdate = jest.fn();

    await ctrl.login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      token: "mockedToken",
      user: {
        email: mockUser.email,
        subscription: mockUser.subscription,
      },
    });
  });
});
