const {getCommits, getTags} = require("./utils");
const {api} = require("./api");

async function updateTicket() {
    try {
        const {commits, lastCommiter} = await getCommits();
        console.log('Список последних коммитов')
        console.log(commits)
        console.log(lastCommiter)
        const {lastTag} = await getTags();
        console.log(lastTag)
        const date = new Date();
        const title = `Релиз ${lastTag} - ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const description = `Ответственный за релиз: ${lastCommiter}\n\nКоммиты, попавшие в релиз:\n${commits}`;

        console.log('Обновляем тикет')
        api.patchTicket({title, description})
        console.log('Тикет обновлён')
    } catch (error) {
        console.log('Ошибка при обновлении тикета')
        console.log(error);
    }
}

updateTicket();