import express from "express"
import userRoutes from "./api/routes/userRoutes.mjs";

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/user", userRoutes)

app.listen(port);

console.log('user API server started on: ' + port);
console.log('Go here : https://localhost:3000')
