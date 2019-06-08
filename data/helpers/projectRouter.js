const express = require('express')
const router = express.Router();
const Projects = require('./projectModel.js')
router.use(express.json())

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The project could not be retrieved" })
        })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The project could not be retrieved" })
        })
})

router.post('/', async (req, res) => {
    const newProject = req.body
    if (!newProject.name || !newProject.description) {
        res.status(400).json({ message: "Please fill out project information." })
    } else {
        await Projects.insert(newProject)
            .then(project => {
                res.json(project)
            })
            .catch(error => {
                res.status(500).json({ error: "Failed to add new project." })
            })
    }
})

router.put('/:id', (req, res) => {
    const updateProject = req.body;
    const id = req.params.id;
    Projects.update(id, updateProject)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Could not update the project" })
        })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const count = await Projects.remove(id);
    if (count > 0) {
        res.status(200).json({ message: 'The project has been deleted' });
    } else {
        res.status(404).json({ message: 'The project could not be found' });
    }
})


module.exports = router;