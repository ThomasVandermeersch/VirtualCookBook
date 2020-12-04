
//This function completes products information when they are added by a user.
module.exports = function addProduct(product){    
    const date = Date()
    
    product["created"] = date
    product["updated"] = date
    product["validated"] = false
    
    return product
}