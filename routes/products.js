const router = require('express').Router();
let Product = require('../models/product.model');
const auth = require('../middleware/auth')

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

// metoda převzata z https://github.com/bradtraversy/react_file_uploader/blob/master/server.js
router.route('/upload').post(auth, (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

router.route('/add').post(auth, (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const atStore = req.body.atStore;
    const description = req.body.description;
    const imgPath = req.body.imgPath;

    const newProduct = new Product({
        name,
        price,
        atStore,
        description,
        imgPath,
    });

    newProduct.save()
        .then(() => res.json('saved'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(auth, (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name;
            product.price = Number(req.body.price);
            product.atStore = Number(req.body.atStore);
            product.description = req.body.description;

            product.save()
                .then(() => res.json('Product updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/order').post((req, res) => {
    const cart = req.body;
    console.log(cart);

    cart.map((item) => {
        Product.findById(item.id)
            .then(product => {
                product.atStore = Number(item.atStore) - Number(item.quantity);

                product.save()
                    .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
    });
    return res.json('Stock updated');
});

module.exports = router;