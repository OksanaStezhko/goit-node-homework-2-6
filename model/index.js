const fs = require('fs').promises
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    return contactsList
  } catch (error) {
    throw console.error()
  }
}

async function listContacts() {
  try {
    return await readContacts()
  } catch (error) {
    console.log(error.message)
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await readContacts()
    const contact = contactsList.find(
      (contact) => String(contact.id) === String(contactId)
    )
    if (!contact) {
      return console.error(`Сontact with id = ${contactId} not found`)
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

async function removeContactById(contactId) {
  try {
    const contactsList = await readContacts()
    const idx = contactsList.findIndex(
      (contact) => String(contact.id) === String(contactId)
    )
    if (idx === -1) {
      console.log(`Сontact with id= ${contactId} not found`)
      return null
    }
    const removedContact = contactsList.splice(idx, 1)

    await fs.writeFile(contactsPath, JSON.stringify(contactsList))
    return removedContact
  } catch (error) {
    console.log(error.message)
  }
}

async function addContact(body) {
  try {
    const contactsList = await readContacts()
    const newContact = { id: v4(), ...body }
    const newContactsList = [...contactsList, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

async function updateContactById(contactId, body) {
  try {
    const contactsList = await readContacts()
    const contactFouUpdate = contactsList.find(
      (contact) => String(contact.id) === String(contactId)
    )
    if (contactFouUpdate) {
      const updateContact = { ...contactFouUpdate, ...body }
      const updateContactsList = contactsList.map((contact) => {
        if (String(contact.id) === String(contactId)) {
          return updateContact
        }
        return contact
      })

      await fs.writeFile(contactsPath, JSON.stringify(updateContactsList))
      return updateContact
    }
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
}
