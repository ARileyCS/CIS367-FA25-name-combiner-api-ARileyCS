const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3000

/* 
GET: /api/combine?name1=James&name2=Alvin 
     /api/combine&name1=John&name2=Bob
*/
app.get("/api/combine&name1&name2", (req, res)=> {

    let result = {
        name1:"",
        name2:"",
        results: []
    }
    console.log(result)

    // extract the query string params 
    result.name1 = req.name1
    result.name2 = req.name2

    // compute combinations 

    // halfway point for each name
    const name1Halfway = Math.round(result.name1.length / 2)
    const name2Halfway = Math.round(result.name2.length / 2)

    // the name combinations
    const combo1 = result.name1 + result.name2
    const combo2 = result.name1.substring(0, name1Halfway) + result.name2.substring(name2Halfway)
    const combo3 = result.name2.substring(0, name2Halfway) + result.name1.substring(name1Halfway)

    // create array of results
    // result.results.push({id: 1, name:"Johnob", goodness:3.4} )
    result.results.push({id: 1, name: combo1, goodness: Math.round(((Math.random() / 2) * 10), 1)})
    result.results.push({id: 2, name: combo2, goodness: Math.round(((Math.random() / 2) * 10), 1)})
    result.results.push({id: 3, name: combo3, goodness: Math.round(((Math.random() / 2) * 10), 1)})

    // write the results to a file
    const filePath = path.join(__dirname, "/logs/output.log")
    //console.log(filePath)
    fs.appendFile(filePath, `${new Date().toISOString()} | ${JSON.stringify(result)}\n`, (err)=> {
        console.log(err)
    })

    //send back the response with the data
    res.json(result)
})

/*
{   
    "name1":"John", 
    "name2":"Bob", 
    "results": [{"id":1, "name":"JohnBob", "goodness":4.0},
                {"id":2, "name":"Bohn",    "goodness":1.0}
                {"id":3, "name":"Johob",   "goodness":3.5}] 
}
*/





app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`)
})