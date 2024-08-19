const express = require("express");
const router = express.Router();


const { Author, validateCreateAuthor, validateUpdateAuthor } = require("../models/Authors");

const authors = [
    {
        id: 1,
        firstName: "Mohamed",
        lastName: "Alsamman",
        nationality: "Egyptian",
        image: "default-image.png"
    },
    {
        id: 2,
        firstName: "Nasim",
        lastName: "Tableb",
        nationality: "Lebanon",
        image: "default-image.png"
    }
];

/**
 * @desc Get All Authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", async (req, res) => {
    try {
        const authorList = await Author.find();
        res.status(200).json(authorList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

/**
 * @desc Get Author By ID
 * @route /api/author/:id
 * @method GET
 * @access public
 */
router.get("/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);

        if (author) {
            res.status(200).json(author)
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

/**
 * @desc Create a new Author
 * @route /api/author
 * @method POST
 * @access public
 */
router.post('/', async (req, res) => {

    const { error } = validateCreateAuthor(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    } 
    try {
        
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        });

        const result =  await author.save();

        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });   
    }

});

/**
 * @desc Update author 
 * @route /api/author
 * @method PUT
 * @access
 */
router.put('/:id', async (req, res) => {

    const { error } = validateUpdateAuthor(req.body);

    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    
    try {
        const author = await Author.findByIdAndUpdate(
            req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image
            }
        });
    
        res.status(200).json({author});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });  
    }
});

/**
 * @desc Delete Author
 * @route /api/author
 * @method DELETE
 * @access public
 */
router.delete('/:id', async (req, res) => {

    try {
        const author = await Author.findById(req.params.id);
        if (author) {
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Author has been deleted" });
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    } catch ( error ) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


module.exports = router;