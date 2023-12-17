"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversArticle = void 0;
const convertToSlug_1 = require("../helpers/convertToSlug");
const filterQueryPagination_1 = require("../helpers/filterQueryPagination.");
const article_model_1 = __importDefault(require("../models/article.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
exports.resolversArticle = {
    Query: {
        getListArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limitItems, filterKey, filterValue, keyword } = agrs;
            const find = {
                deleted: false,
            };
            let querySortKey;
            let querySortValue;
            let queryPage = 1;
            let queryLimit = 4;
            let queryKeyword;
            if (sortKey) {
                querySortKey = sortKey.toString() || "title";
            }
            if (sortValue) {
                querySortValue = sortValue.toString() || "asc";
            }
            if (currentPage) {
                queryPage = parseInt(currentPage.toString());
            }
            if (limitItems) {
                queryLimit = parseInt(limitItems.toString());
            }
            if (keyword) {
                const regex = new RegExp(keyword, "i");
                const unidecodeSlug = (0, convertToSlug_1.convertToSlug)(keyword);
                const slugRegex = new RegExp(unidecodeSlug, "i");
                console.log(slugRegex);
                find["title"] = regex;
            }
            const countRecord = yield article_model_1.default.countDocuments(find);
            const objectPagination = (0, filterQueryPagination_1.filterQueryPagination)(countRecord, queryPage, queryLimit);
            let sort = {};
            if (querySortKey && querySortValue) {
                sort = {
                    [querySortKey]: querySortValue
                };
            }
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            console.log(find);
            const record = yield article_model_1.default.find(find)
                .sort(sort)
                .limit(objectPagination.limitItem)
                .skip(objectPagination.skip);
            return record;
        }),
        getArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = agrs;
            const record = yield article_model_1.default.findOne({
                _id: id
            });
            return record;
        }),
    },
    Article: {
        category: (item) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = item.categoryId;
            const record = yield category_model_1.default.findOne({
                _id: categoryId,
                deleted: false
            });
            return record;
        })
    },
    Mutation: {
        createArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = agrs;
            const record = new article_model_1.default(article);
            yield record.save();
            return record;
        }),
        updateArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = agrs;
            yield article_model_1.default.updateOne({
                _id: id
            }, article);
            const record = article_model_1.default.findOne({ _id: id });
            return record;
        }),
        deleteArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = agrs;
            yield article_model_1.default.updateOne({ _id: id }, {
                deleted: true,
                deletedAt: new Date()
            });
            return `Đã xóa bản ghi có id ${id}`;
        }),
    }
};
