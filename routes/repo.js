var express = require('express')
var { fetchTreeFromGithub } = require('../requests.js')
var { printTree } = require('../txt-utils')
var router = express.Router()

// GET /repo?owner=OWNER&repo=REPO

router.get('/', async function (req, res) {
    // validation of query params
    if (!req.query.owner) {
        return res.status(422).json({ errors: { owner: "can't be blank" } })
    }

    if (!req.query.repo) {
        return res.status(422).json({ errors: { repo: "can't be blank" } })
    }

    const owner = req.query.owner
    const repo = req.query.repo
    const responseFromGithub = await fetchTreeFromGithub(owner, repo)

    // check response and reply to client
    if (responseFromGithub.status) {
        res.status(responseFromGithub.status).send(
            responseFromGithub.statusText
        )
    } else {
        res.status(200).send(printTree(responseFromGithub))
    }
})

module.exports = router
