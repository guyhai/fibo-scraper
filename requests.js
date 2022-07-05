const axios = require('axios')
const { BASE_URL } = require('./constants')

const fetchFromGithubApi = async function (owner, repo, path) {
    var res

    const url = path
        ? `${BASE_URL}/${owner}/${repo}/contents/${path}`
        : `${BASE_URL}/${owner}/${repo}/contents`

    var config = {
        method: 'get',
        url,
        headers: {
            Authorization: 'Basic ' + process.env.TOKEN,
        },
    }

    await axios(config)
        .then(function (response) {
            res = response
        })
        .catch(function (error) {
            res = error.response
        })

    if (res.status === 200) {
        return Promise.all(
            res.data.map(async (element) => {
                if (element.type === 'file') {
                    return { name: element.name }
                } else if (element.type === 'dir') {
                    return {
                        name: element.name,
                        children: await fetchFromGithubApi(
                            owner,
                            repo,
                            element.path
                        ),
                    }
                }
            })
        )
    } else {
        return res
    }
}

module.exports.fetchTreeFromGithub = async function (owner, repo) {
    var responsoneFromGithub = await fetchFromGithubApi(owner, repo)
    return responsoneFromGithub
}
