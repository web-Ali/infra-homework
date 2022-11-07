const axios =  require("axios");

const instanceTracker = axios.create({
    baseURL: 'https://api.tracker.yandex.net',
    headers: {
        'Authorization': `OAuth ${process.env.TOKEN}`,
        'X-Org-ID': `${process.env.X_Org_ID}`
    }
});
const instanceGithub = axios.create({
    baseURL: 'https://api.github.com',
});
const api = {
    patchTicket: (data)=> instanceTracker.patch(`/v2/issues/${process.env.ISSUE}`,JSON.stringify(data)),
    postComment:(text)=> instanceTracker.post(`/v2/issues/comments`,JSON.stringify(text)),
    getTags: ()=> instanceGithub.get('/repos/web-Ali/infra-homework/git/refs/tags').then(res=>res.data),
    getRangeCommit: (lastTag, tagBeforeLast)=> instanceGithub.get(`/repos/web-Ali/infra-homework/compare/${tagBeforeLast}...${lastTag}`).then(res=>res.data),
    getAllCommit: ()=> instanceGithub.get('/https://api.github.com/repos/web-Ali/infra-homework/commits').then(res=>res.data)
}
module.exports = {
    api
}
