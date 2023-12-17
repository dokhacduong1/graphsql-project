
import { convertToSlug } from "../helpers/convertToSlug";
import { filterQueryPagination } from "../helpers/filterQueryPagination.";
import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    //ĐOạn này là những hàm lấy dữ liệu
    Query: {
        //article
        //Hàm này lấy ra danh sách article
        getListArticle: async (_: any, agrs: any) => {
            //lấy ra các param truyền vào
            const { sortKey, sortValue, currentPage, limitItems,filterKey,filterValue, keyword } = agrs;

            const find = {
                deleted: false,
            }
      
            let querySortKey: string;
            let querySortValue: string;
            let queryPage: number = 1;
            let queryLimit: number = 4;
            let queryKeyword: string;

            //Check xem nếu query có sortKey  thì gán vào biến sortKey không thì gán bằng title. (Chức Năng Sắp Xếp)
            if (sortKey) {
                querySortKey = sortKey.toString() || "title";
            }

            //Check xem nếu query có sortValue  thì gán vào biến sortValue không thì gán bằng desc. (Chức Năng Sắp Xếp)
            if (sortValue) {
                querySortValue = sortValue.toString() || "asc";
            }

            //Check xem nếu query có queryPage thì gán vào biến queryPage không thì gán bằng rỗng. (Chức Năng Phân Trang)
            if (currentPage) {
                queryPage = parseInt(currentPage.toString());
            }

            //Check xem nếu query có queryLimit thì gán vào biến queryLimit không thì gán bằng 1. (Chức Năng Phân Trang)
            if (limitItems) {
                queryLimit = parseInt(limitItems.toString());
            }
            if(keyword){
                 //Chuyển keyword về dạng regex
                const regex : RegExp = new RegExp(keyword,"i");
                //Chuyển tất cả sang dạng slug nghĩa là như này cat-doi-noi-sau
                const unidecodeSlug: string = convertToSlug(keyword);
                //Chuyển slug vừa tạo qua regex
                const slugRegex: RegExp = new RegExp(unidecodeSlug, "i");
                console.log(slugRegex);
                find["title"] = regex
            }
            //Đếm xem bảng record có bao nhiêu sản phẩm và check phân trang (Chức Năng Phân Trang)
            const countRecord = await Article.countDocuments(find);
            const objectPagination = filterQueryPagination(countRecord, queryPage, queryLimit);

            let sort = {}
            //Nếu tồn tại thì mới gán vào sort
            if (querySortKey && querySortValue) {
                sort = {
                    [querySortKey]: querySortValue
                };
            }
            //Nếu muốn lọc trạng thái linh động thì như này
            if(filterKey && filterValue){
                find[filterKey] = filterValue
            }
            console.log(find)
            const record = await Article.find(find)
            .sort(sort)
            .limit(objectPagination.limitItem)
            .skip(objectPagination.skip)
            ;
            return record;
        },
        getArticle: async (_: any, agrs: any) => {
            const { id } = agrs;
            const record = await Article.findOne({
                _id: id
            });
            return record;
        },

    },
    Article: {
        category: async (item: any) => {
            const categoryId = item.categoryId
            const record = await Category.findOne({
                _id: categoryId,
                deleted: false
            });
            return record;
        }
    },
    //Đoạn này là những hàm chỉnh xửa xóa thêm
    Mutation: {
        //Article
        createArticle: async (_: any, agrs: any) => {
            const { article } = agrs;
            const record = new Article(article);
            await record.save();
            return record;
        },
        updateArticle: async (_: any, agrs: any) => {
            const { id, article } = agrs;
            await Article.updateOne({
                _id: id
            }, article)
            const record = Article.findOne({ _id: id })
            return record;
        },
        deleteArticle: async (_: any, agrs: any) => {
            const { id } = agrs;
            await Article.updateOne({ _id: id }, {
                deleted: true,
                deletedAt: new Date()
            });
            return `Đã xóa bản ghi có id ${id}`
        },

    }
}