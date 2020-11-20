
module.exports = function addProduct(product){    
    
    //Complete product informations
    const date = Date()
    product["created"] = date
    product["updated"] = date
    product["validated"] = false
    
    return product
}