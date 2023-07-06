import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon,
  fields: [
    defineField({
        name: "username",
        title: "User Name",
        type: "string",
    }),
    defineField({
        name: "firstName",
        title: "First Name",
        type: "string",
    }),
    defineField({
        name: "lastName",
        title: "Last Name",
        type: "string",
    }),
    defineField({
        name: "email",
        title: "Email",
        type: "email",
    }),
    defineField({
        name: "password",
        title: "Password",
        type: "string",
    }),
    defineField({
        name: "phoneNumber",
        title: "Phone Number",
        type: "number"
    }),
    defineField({
        name: "message",
        title: "Message",
        type: "text"
    })
]
})