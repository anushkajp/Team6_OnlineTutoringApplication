class Review {
    constructor (rating, review) {
        this.rating = rating;
        this.review = review;
    }
    // GET ALL BY TUTOR ID
    findAll() {
        return json.Review();
    }
    // GET BY ID
    find(id) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
    // POST
    create(id) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
    // PATCH
    update(id, review) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
    delete(id) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
}