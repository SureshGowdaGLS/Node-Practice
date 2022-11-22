import expres from 'expres';
const app = expres();

app.use((req, res, next) =>{
    res.status(200).json({
        message: 'It works!'
    });
});

export default app;