import { gql } from "apollo-server-express";

//TypeDefs GrqphQl
export const typeDefsUser = gql`
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
`