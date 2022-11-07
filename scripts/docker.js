const {getTags} = require("./utils");
getTags().then(({lastTag})=> console.log(lastTag.split('-').join(':')))