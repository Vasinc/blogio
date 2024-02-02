exports.getIndexPage = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Blogio'
    })
}