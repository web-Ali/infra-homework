const {getTags} = require("./utils");
const {api} = require("./api");

async function createComment() {
    try {
        const {lastTag} = await getTags();
        console.log(lastTag)
        let text = `Собрали образ с тегом ${lastTag}`
        await api.postComment({text})
        console.log('Комментарий добавлен')
    }catch (error) {
        console.log('Ошибка при добавлении комментария');
        throw error

    }
}

createComment();