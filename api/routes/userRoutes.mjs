import express from "express";
import fs from "fs";

const user = express.Router()
let rcdata = fs.readFileSync('data.json');
let data = JSON.parse(rcdata);

const deleteUser = (req, res) => {
    if (req.headers.admin !== 'true') {
        res.sendStatus(401)
    } else {
        data.users = data.users.filter((user) => user.id !== +req.params.id)
        let jsonData = JSON.stringify(data)
        fs.writeFile("data.json", jsonData, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.sendStatus(204)
    }
}

const filter = (req, res) => {
    const { firstname, lastname, company } = req.query
    const result = data.users.filter((user) => {
        return user.firstname === firstname || user.lastname === lastname || user.company === company
    })

    res.json(result)
}

user.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.send(data)
    } else {
        filter(req, res)
    }
})

user.get('/:id', (req, res) => {
    res.send(data.users[req.params.id - 1])
})

user.post("/", (req, res) => {
    let getNewUser = req.body
    console.log(getNewUser)
    data.users.push(getNewUser)
    let newUser = JSON.stringify(data)
    fs.writeFile("data.json", newUser, (err) => {
        // Error checking
        if (err) throw err;
        console.log("New data added");
    });
    res.sendStatus(204)
    res.send(data)
})

user.delete("/:id", (req, res) => {
    deleteUser(req, res)
})

export default user;