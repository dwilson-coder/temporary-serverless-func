// usine the async function
exports.handler = async (event, context) => {
    // console.log('returns event', event)
    // console.log('returns context',context)
    return {
        statusCode: 200,
        body: 'Our First Netlify Example works!',
    }

    // // If I wanted to test send an error to test the code.
    // return {
    //     statusCode: 400,
    //     body: 'Page not found'
    // }
}



// // using callback instead
// exports.handler = (event, context, cb) => {
//     cb(null, {statusCode: 200, body: 'Hello World!'})
// }