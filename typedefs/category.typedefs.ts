import { gql } from "apollo-server-express";

//TypeDefs GrqphQl
export const typeDefsCategory = gql`
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
`