const contactAddSchema = require('./contactAdd')
const contactUpdateSchema = require('./contactUpdate')
const contactStatusUpdateSchema = require('./contactStatusUpdate')
const contactIdSchema = require('./contactId')
const userSchema = require('./user')
const userSubscriptionUpdateSchema = require('./userSubscriptionUpdate')
const userEmailSchema = require('./userEmail')

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
  contactIdSchema,
  userSchema,
  userSubscriptionUpdateSchema,
  userEmailSchema,
}
