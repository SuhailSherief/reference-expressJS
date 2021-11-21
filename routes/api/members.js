const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

// List members
router.get('/', (req, res) => {
    res.json(members);
});

// List a particular member
router.get('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter( member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(404).json({ msg: `No member with id ${req.params.id} exist`});
    }
})

// Create member
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name: req.body.name,
        email : req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email)
    {
        return res.status(404).json({msg : 'Please enter name and email'});
    }
    members.push(newMember);
    res.json(members);
})

// Update member
router.put('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if(found){
        const updMember = req.body;
        members.forEach( member => {
            if(member.id === parseInt(req.params.id))
            {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg: 'Member updated', members});
            }
        })
    }
    else{
        res.status(404).json({ msg: `No member with id ${req.params.id} exist`});
    }
})

// Delete member
router.delete('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if(found)
    {
        res.json({msg: 'Member deleted', members: members.filter( member => member.id !== parseInt(req.params.id))});
    }
    else{
        res.status(404).json({ msg: `No member with id ${req.params.id} exist`});
    }
});

module.exports = router;