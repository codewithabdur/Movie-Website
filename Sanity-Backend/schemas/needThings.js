import {defineField, defineType} from 'sanity'
import {MdLocalMovies as icon} from 'react-icons/md'

export default defineType({
  name: 'needThings',
  title: 'Need Things',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
        name: 'navImg',
        title: 'Nav Img',
        type: 'image',
        option:{
            hotspot: true
        }
    })
]
})