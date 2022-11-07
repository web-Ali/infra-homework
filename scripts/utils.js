let {api} = require("./api")

async function  getTags() {
    try {
        const data = await api.getTags();
        if (data.length < 2) {
            return {lastTag: '', tagBeforeLast: ''};
        } else {
            const regex = /rc-0.0.[0-9]+/;
            let lastTag = regex.exec(data.pop().ref)[0];
            let tagBeforeLast = regex.exec(data.pop().ref)[0];
            return {lastTag, tagBeforeLast};
        }
    } catch (error) {
        console.log('Ошибка при получении тегов')
        console.log(error);
    }
}

async function getCommits() {
    try {
        const {lastTag, tagBeforeLast} = await getTags();
        let lastCommiter = ''
        if (lastTag && tagBeforeLast) {
            const data = await api.getRangeCommit(lastTag, tagBeforeLast);
            const commits = data.commits.map((el) => {
                lastCommiter = el.commit.author.name
                return `${el.sha} ${el.commit.author.name} ${el.commit.message}`;
            }).join('\n');
            return {commits, lastCommiter};
        } else {
            const data = await api.getAllCommit();

            const commits = data.map((el) => {
                lastCommiter = el.commit.author.name
                return `${el.sha} ${el.commit.author.name} ${el.commit.message}`;
            }).join('\n');
            return {commits, lastCommiter};
        }
    } catch (error) {
        console.log('Ошибка при получении коммитов')
        console.log(error);
    }
}

module.exports = {
    getCommits,
    getTags
}