const app = require('express')()
app.set('trust proxy', '127.0.0.1/8')
app.get('/', (req, res)=>{
    res.send('<h1>App 2!</h1>')
})

app.listen(3000)