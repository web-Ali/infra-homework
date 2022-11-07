const {getCommits, getTags} = require("./utils");
const {api} = require("./api");

async function updateTicket() {
    try {
        let token = process.env.TOKEN
        let X_Org_ID = process.env.X_Org_ID
        let ISSUE = process.env.ISSUE
        console.log(token)
        console.log(X_Org_ID)
        console.log(ISSUE)
        console.log('Получаем последние коммиты')
        const {commits, lastCommiter} = await getCommits();
        console.log('Список последних коммитов')
        console.log(commits)
        console.log('Автор последнего коммита')
        console.log(lastCommiter)

        console.log('Получаем последний тег')
        const {lastTag} = await getTags();
        console.log(lastTag)
        const date = new Date();
        const summary = `Релиз ${lastTag} - ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        console.log(`Формируем заголовок: ${summary}`)
        const description = `Ответственный за релиз: ${lastCommiter}\n\nКоммиты, попавшие в релиз:\n${commits}`;
        console.log(`Формируем описание: ${description}`)

        console.log('Обновляем тикет')
        await api.patchTicket({summary, description})
        console.log('Тикет обновлён')
    } catch (error) {
        console.log('Ошибка при обновлении тикета')
        console.log(error);
    }
}

updateTicket();