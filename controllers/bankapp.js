module.exports = {
    index
};

function index(req, res) {
    res.render('bankapp/bankapp', { title: 'About BankApp' });
};