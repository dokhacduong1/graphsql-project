"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUser = (0, apollo_server_express_1.gql) `
    type User {
        id: ID,
        fullName: String,
        email: String,
        token: String,
        code: Int,
        message: String
    } 

    input RegisterUserInput  {
        fullName: String,
        email: String,
        password: String
    }
    input LoginUserInput {
        email: String,
        password: String
    }
    #Query để lấy dữ liệu
    type Query {
        #Categorys
        getUser: User,
    }

    #Multation
    type Mutation {
        #Regiuser
        registerUser(user: RegisterUserInput): User,
        loginUser(user: LoginUserInput): User,
    }
`;
