class APIfilter {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }
    search() {
        const keyword = this?.querystr?.keyword ? { name: { $regex: this.querystr.keyword, $options: "i" } } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }
    pagination(resperpage) {

        let page = Number(this.querystr.page) || 1;
        let skipProduct = resperpage * (page - 1);

        this.query = this.query.limit(resperpage).skip(skipProduct);


        return this;
    }
}

module.exports = APIfilter