const {getTags} = require("./utils");
const {api} = require("./api");

async function createComment() {
    try {
        const {lastTag} = await getTags();
        await api.postComment({text: `Собрали образ с тегом ${lastTag}`})
        console.log('Комментарий добавлен')
    }catch (error) {
        console.log('Ошибка при добавлении комментария')
        console.log(error.request);
    }
}

createComment();