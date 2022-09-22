const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll ({
  // be sure to include its associated Product data
  include: [Product]
  }).then (dbTag => {
    res.join(dbTag)
  }).catch (err => {
    console.log(err);
    res.status(500).json({msg: "an error had occured", err});
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
   include: [Product]
  }).then (dbTag => {
    res.json(dbTag);
  }).catch (err => {
    console.log(err);
    res.status(500).json({msg: "an error had occured", err});
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(newTag=> {
    res.json(newTag)
  }).catch (err => {
    console.log(err);
    res.status(500).json({msg: "an error has occured", err});
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then (updatedTag => {
    res.json(updatedTag)
  }).catch (err => {
    console.log(err);
    res.status(500).json({msg: "an error has occured", err});
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy ({
    where: {
      id: req.params.id
    }
  }).then (delTag => {
    res.json(delTag)
  }).catch (err => {
    console.log(err);
    res.status(500).json({msg: "an error has occured", err})
  });
});

module.exports = router;
