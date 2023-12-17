"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

    type Category {
        id: ID,
        title: String,
        avatar: String
    }

    #Đoạn này để thêm sửa xóa dữ liệu
    input ArticleInput {
        title: String,
        avatar: String,
        description: String,
        categoryId: String
    }


    #Query để lấy dữ liệu
    type Query {
        #Article
        #  Định nghĩa hàm article trả về kiểu dữ liệu article
        getListArticle(
            sortKey: String,
            sortValue: String,
            currentPage: Int,
            limitItems: Int,
            filterKey: String,
            filterValue: String,
            keyword: String

        ): [Article],
        getArticle(id: ID): Article

    } 

    #Multation
    type Mutation {
        #article
        createArticle(article: ArticleInput) : Article
        updateArticle(id: ID,article: ArticleInput) : Article
        deleteArticle(id: ID) : String
    }


`;
