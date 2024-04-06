exports.getIndexPage = (req, res, next) => {
    res.render('index_page/index', {
        pageTitle: 'Calendio'
    })
}