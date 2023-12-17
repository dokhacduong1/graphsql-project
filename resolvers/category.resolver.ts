
import Category from "../models/category.model";

export const resolversCategory = {
    //ĐOạn này là những hàm lấy dữ liệu
    Query: {
        //category
        getListCategory: async ()=>{
            const record = await Category.find({});
            return record;
        },
        getCategory : async ( _ : any,agrs : any)=>{
            const {id}= agrs;
            const record = await Category.findOne({
                _id: id
            });
            return record;
        }
    },
 
    //Đoạn này là những hàm chỉnh xửa xóa thêm
    Mutation: {
        //Category
        createCategory: async (_ : any, agrs : any) =>{
            const {category}= agrs;
            const record = new Category(category);
            await record.save();
            return record;
        },
        updateCategory: async (_ : any, agrs: any)=>{
            const {id,category}= agrs;
            await Category.updateOne({
                _id:id
            },category)
            const record = Category.findOne({_id:id})
            return record;
        },
        deleteCategory: async  (_ : any, agrs: any)=>{
            const {id}= agrs;
            await Category.updateOne({_id:id},{
                deleted:true,
                deletedAt: new Date()
            });
            return  `Đã xóa bản ghi có id ${id}`
        }
    }
}