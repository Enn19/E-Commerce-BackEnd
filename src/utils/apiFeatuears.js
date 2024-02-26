

export class ApiFeatures {
    constructor(mangooseQuery, searchQuery) {
        this.mangooseQuery = mangooseQuery
        this.searchQuery = searchQuery
    }
    pagination() {
        if (this.searchQuery.page <= 0) this.searchQuery.page = 1
        let pageNumber = this.searchQuery.page * 1 || 1
        let pageLimit = 3
        let skip = (pageNumber - 1) * pageLimit
        this.pageNumber=pageNumber
        this.mangooseQuery.skip(skip).limit(pageLimit)
        return this
    } 
    filter() {
        let filterObj = { ...this.searchQuery };
        let excludedFields = ["page", "sort", "fields", "keyword"];
        excludedFields.forEach(val => {
            delete filterObj[val];
        });
        filterObj = JSON.stringify(filterObj); 
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, match => "$" + match);
        filterObj = JSON.parse(filterObj); 
        this.mangooseQuery.find(filterObj);
        return this;
    }
    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(",").join(" ")
            this.mangooseQuery.sort(sortBy)
        }
        return this
    }
    fields() {
        if (this.searchQuery.fields) {
            let fields = this.searchQuery.fields.split(",").join(" ")
            this.mangooseQuery.select(fields)
        }
        return this
    }
    search() {
        if (this.searchQuery.keyword) {
            this.mangooseQuery.find({
                $or: [
                    { title: { $regx: this.searchQuery.keyword } },
                    { description: { $regx: this.searchQuery.keyword } }
                ]
            })
        }
        return this
    }
}