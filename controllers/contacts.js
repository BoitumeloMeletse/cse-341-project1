const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
  /* #swagger.tags = ['Contacts'] */
  try {
    const db = mongodb.getDatabase();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
};

const getSingle = async (req, res) => {
  /* #swagger.tags = ['Contacts'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid contact ID format' });

    const db = mongodb.getDatabase();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contact' });
  }
};

const createContact = async (req, res) => {
  /* #swagger.tags = ['Contacts'] */
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Validation
    for (const [key, val] of Object.entries(contact)) {
      if (!val) return res.status(400).json({ error: `Missing field: ${key}` });
    }

    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').insertOne(contact);
    res.status(201).json({ _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

const updateContact = async (req, res) => {
  /* #swagger.tags = ['Contacts'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').replaceOne({ _id: new ObjectId(id) }, updatedContact);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Contact not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

const deleteContact = async (req, res) => {
  /* #swagger.tags = ['Contacts'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Contact not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
