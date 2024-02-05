const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const corsConfig ={
    origin:"",
    Credential:true,
    methods:["GET","POST","PUT","DELETE"]
}
app.options("",cors(corsConfig))
const app = express()
app.use(cors(corsConfig))
app.use(express.json())

const PORT = process.env.PORT || 9090

//schema
const schemaData = mongoose.Schema({
    id: String,
    name: String,
    major: String,
    country: String,
    email: String,
    level: String,
}, {
    timestamps: true
})

const useModel = mongoose.model("user", schemaData)

//read data
// http://localhost:9090/
app.get("/", async (req, res) => {
    const data = await useModel.find({})
    res.json({ success: true, data: data })
})

//create data
// http://localhost:9090/create
/*
 id,
 name,
 major,
 address,
 mobile,
*/
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new useModel(req.body)
    await data.save()
    res.send({ success: true, message: " Information save successfully ", data: data })
})

//updata data
// http://localhost:9090/update
/** {
 * id = "",
 * name = "",
 * major = "",
 * address = "",
 * mobile = ""
*}
*/

app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body

    console.log(rest)
    const data = await useModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "information update successfully", data: data })
})
//delete data
// http://localhost:9090/delete/id
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await useModel.deleteOne({ _id: id })
    res.send({ success: true, message: "information delete successfully", data: data })

})


mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")

    .then(() => {
        console.log("Connect to BD & everything is alright")
        app.listen(PORT, () => console.log("server is running"))
    })
    .catch((err) => console.log(err))



