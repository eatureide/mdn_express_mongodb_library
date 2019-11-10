const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  family_name: {
    type: String,
    required: true,
    max: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
})

AuthorSchema.virtual('name').get(function () {
  return this.family_name + ',' + this.first_name
})

AuthorSchema.virtual('lifespan').get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
})

AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this.id
})

AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function () {
    return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do YYYY') : '暂无'
  })

AuthorSchema
  .virtual('date_of_death_formatted')
  .get(function () {
    return this.date_of_death ? moment(this.date_of_death).format('MMMM Do YYYY') : '暂无'
  })

module.exports = mongoose.model('Author', AuthorSchema)