const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {Book, validateCreateBook, validateUpdateBook} = require("../models/Books");

const books = [
    {
        id: 1,
        title: "Black Swan",
        author: "Nasim Tableb",
        description: "About Black Swan",
        price: 10,
        cover: "soft cover"
    },
    {
        id: 2,
        title: "Rich Dad poor Dad",
        author: "Robert Kiyosaki",
        description: "About Black Rich Dad Poor Dad",
        price: 12,
        cover: "soft cover"
    }
]

/**
 * @desc    Get all books
 * @route   /api/books
 * @method  GET
 * @access  pubic
 * 
*/
router.get("/", asyncHandler( async (req, res) => {
    const books = await Book.find().populate("author", ["_id", "firstName", "lastName"]);
    res.json(books);
}));

/**
 * @desc    Get a book by id
 * @route   /api/books/:id
 * @method  GET
 * @access  public
 */
router.get("/:id", asyncHandler( async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({message: "Book not found"});
    }
}));

/**
 * @desc    Create new book
 * @route   /api/books
 * @method  post
 * @access  public
 */
router.post("/", asyncHandler( async (req, res) => {
    
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message})
    }


    const book = new Book(
        {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    )

    const result = await book.save();
    res.status(201).json(result);
}));

/**
 * @desc    Update new book
 * @route   /api/books/:id
 * @method  post
 * @access  public
 */
router.put("/:id", asyncHandler( async (req, res) => {
    
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover
            }
    });
    res.status(200).json(updatedBook);
}));

/**
 * @desc    Delete new book
 * @route   /api/books/:id
 * @method  post
 * @access  public
 */
router.delete("/:id", asyncHandler( async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book has been deleted"})
    } else {
        res.status(400).json({ message: "book not found" });
    }
}));



module.exports = router;