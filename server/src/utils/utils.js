function sameObject (objToCheck, referencedObj) {
    // for (let key in objToCheck) {
    //     if (referencedObj.hasOwnProperty(key)) {
    //         if (!objToCheck.hasOwnProperty(key)) {
    //             console.log("objToCheck has no " + key)
    //             return false
    //         }
    //     }
    //     return false
    // }
    // const objKey = Object.keys(objToCheck)
    // const refKey = Object.keys(referencedObj)
    // Object.keys(objToCheck).forEach((key) => {
    //     if (!(key in referencedObj)) {
    //         console.log("Key: " + key)
    //         return false
    //     }
            
    // })
    console.log(objToCheck)
    console.log("bye")
    console.log(referencedObj)
    console.log("heyo")
    // console.log(referencedObj.toObj())
    console.log("hi")
    for (let key in objToCheck) {
        if (!referencedObj.hasOwnProperty(key)) {
            console.log("Key " + key)
            return false
        }
            
    }
    return true;
}

module.exports = {sameObject}