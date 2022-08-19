
# Serverless Functions Course

To see a demo of the project, visit this link.
- [Serverless-Functions-Course](https://serverless-functions-course.netlify.app/)


To start the project, we can clone the Github repo using;
```
git clone https://github.com/john-smilga/serverless-functions-starter
```

## Using Node
First, let's make sure that we have Node.js installed on our system. We can check by typing the following;
```
node -v
```

In my case, I get the response 
```
v18.7.0
```

If I didn't have node, then I would visit Nodejs.org
- [https://nodejs.org/en/](https://nodejs.org/en/)



## Git
First let's remove the git files since it will point us back to the cloned or forked respository, then create a new Git initialzation.
- (on the Mac)
```
rm -rf .git
git init
```




## Dependencies

We need to install a few packages, first let's install Npm.

```bash
  npm install
  ```

  We will install a few other packages later. This project relies on Node and one advantage of using serverless functions is that you don't need to use Express to setup your server.

  To start the project, we'll use the following command.
  ```
  npm run netlify
  ```

  This will trigger this line in the package.json file.
  ```
    "scripts": {
    "netlify": "netlify dev"
  },
  ```

  #### Success!
  In the terminal, we'll see the following output.
  ```
  Running static server from "serverless-functions-starter"

◈ Server listening to 3999

   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │   ◈ Server now ready on http://localhost:8888   │
   │                                                 │
   └─────────────────────────────────────────────────┘
   ```

   #### Note: 
   This project can work with other stacks so I can redo this in React and we are working with Axios to handle the APIs.
   For more information, visit the link below.
   - [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

   Another option is using command line, type the commnand below.
   ```
$ npm install axios

   ````
## Setup
We begin by creating a folder called 'functions'. We will aslo create file called netlify.toml 
in the main project directory. First, lets create the .toml file.


```
touch netlify.toml 
```

Now, let's add the following code.
```
[build]
functions = './functions'
```

- Let's create the functions folder, and a file called 1-hello.js 
```
mkdir functions 
cd functions
touch 1-hello.js 
```

We can see the results on the following URL 
```
http://localhost:8888/.netlify/functions/1-hello
```
let's now navigate to the examples folder and look for the 1-hello sub-folder.
Open the app.js file. 

###### Let's look at this code 
```
const result = document.querySelector('.result')

const fetchData = async () => {
   
    try {
        const {data} = await axios.get('/.netlify/functions/1-hello')
        result.textContent = data
    } catch (error) {
       result.textContent = error.response.data
    }
}

fetchData()
```

We can shortent the URL by using a re-direct. In the .toml file, add this code.
```
[[redirects]]
from = '/api/*'
to = '/.netlify/functions/:splat'
status = 200
```

Now, if you type the follwoing URL
```
http://localhost:8888/api/1-hello
```

You will be redirected to the corresponding URL
```
http://localhost:8888/.netlify/functions/1-hello
```


Now in the app.js file, change the URL to the following code.
###### replace 
```
const {data} = await axios.get('/.netlify/functions/1-hello')
```

###### with
```
 const {data} = await axios.get('/api/1-hello')
```

## Building a basic api

using the second example folder '2-basic-api', we begin by first let's create a new file for this example.

```
touch 2-basic-api.js
```

We have a file called data.js in the assets folder, so let's import it into the 2-basic-api.js file.

```
const items = require('../assets/data')

exports.handler = async (event, context) => {
    
    return {
        statusCode: 200,
        body: JSON.stringify(items),
    }

}
```

Let's go to the /api/2-basic-api/ folder
```
http://localhost:8888/api/2-basic-api/
```

We'll see this displayed on our screen.
```
// 20220819170702
// http://localhost:8888/api/2-basic-api/

[
  {
    "id": "recmg2a1ctaEJNZhu",
    "name": "utopia sofa",
    "image": {
      "url": "https://dl.airtable.com/.attachments/6ac7f7b55d505057317534722e5a9f03/9183491e/product-3.jpg"
    },
    "price": 39.95
  },
  {
    "id": "recvKMNR3YFw0bEt3",
    "name": "entertainment center",
    "image": {
      "url": "https://dl.airtable.com/.attachments/da5e17fd71f50578d525dd5f596e407e/d5e88ac8/product-2.jpg"
    },
    "price": 29.98
  },
  {
    "id": "recxaXFy5IW539sgM",
    "name": "albany sectional",
    "image": {
      "url": "https://dl.airtable.com/.attachments/05ecddf7ac8d581ecc3f7922415e7907/a4242abc/product-1.jpeg"
    },
    "price": 10.99
  },
  {
    "id": "recyqtRglGNGtO4Q5",
    "name": "leather sofa",
    "image": {
      "url": "https://dl.airtable.com/.attachments/3245c726ee77d73702ba8c3310639727/f000842b/product-5.jpg"
    },
    "price": 9.99
  }
]
```


Let's go to the file
```
 examples/2-basic-api/app.js
```

and add the following code. 

```
const result = document.querySelector('.result')

const fetchData = async () => {
   try {
    const {data} = await axios.get('/api/2-basic-api')
    const products = data.map((product) => {
        console.log(product)
    })
    result.innerHTML = `<h4>Success</h4>`
   } catch (error) {
    result.innerHTML = `<h4>There was an error. Please try again later.</h4>`
   }
}


fetchData()
```

This wil display the following output in the console.
```
{id: 'recmg2a1ctaEJNZhu', name: 'utopia sofa', image: {…}, price: 39.95}id: "recmg2a1ctaEJNZhu"image: {url: 'https://dl.airtable.com/.attachments/6ac7f7b55d505057317534722e5a9f03/9183491e/product-3.jpg'}name: "utopia sofa"price: 39.95[[Prototype]]: Object
app.js:7 {id: 'recvKMNR3YFw0bEt3', name: 'entertainment center', image: {…}, price: 29.98}id: "recvKMNR3YFw0bEt3"image: {url: 'https://dl.airtable.com/.attachments/da5e17fd71f50578d525dd5f596e407e/d5e88ac8/product-2.jpg'}name: "entertainment center"price: 29.98[[Prototype]]: Object
app.js:7 {id: 'recxaXFy5IW539sgM', name: 'albany sectional', image: {…}, price: 10.99}id: "recxaXFy5IW539sgM"image: {url: 'https://dl.airtable.com/.attachments/05ecddf7ac8d581ecc3f7922415e7907/a4242abc/product-1.jpeg'}name: "albany sectional"price: 10.99[[Prototype]]: Object
app.js:7 {id: 'recyqtRglGNGtO4Q5', name: 'leather sofa', image: {…}, price: 9.99}
```

Now, we need to destructue the JSON file and loop through each uniqe product.

try this code.

```
const result = document.querySelector('.result')

const fetchData = async () => {
   try {
    const {data} = await axios.get('/api/2-basic-api')
    const products = data.map((product) => {
        const {image:{url}, name, price} = product
        return `<article class="product">
        <img
          src="${url}"
          alt="${name}"
        />
        <div class="info">
          <h5>${name}</h5>
          <h5 class="price">$${price}</h5>
        </div>
      </article>`
    }).join('')
    result.innerHTML = products
   } catch (error) {
    result.innerHTML = `<h4>There was an error. Please try again later.</h4>`
   }
}


fetchData()
```

You can now view the products on the link
```
http://localhost:8888/examples/2-basic-api/index.html
```

