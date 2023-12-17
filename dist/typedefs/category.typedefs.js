"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsCategory = (0, apollo_server_express_1.gql) `
    type Category {
        id: ID,
        title: String,
        avatar: String
    } 

    input CategoryInput {
        title: String,
        avatar: String
    }

    #Query để lấy dữ liệu
    type Query {
        #Categorys
        getListCategory: [Category],
        getCategory(id: ID): Category
    }

    #Multation
    type Mutation {
        #category Category
        createCategory(category: CategoryInput) : Category
        updateCategory(id: ID,category: CategoryInput) : Category
        deleteCategory(id: ID) : String
    }
`;
