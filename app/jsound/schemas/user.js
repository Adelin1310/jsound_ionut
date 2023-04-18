export default {
  name: "user",
  type: "document",
  fields: [
    {
      name: "username",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        indexed: true,
        unique: true
      }
    },
    {
      name: "email",
      type: "string",
      validation: Rule => Rule.required().email(),
      options: {
        indexed: true,
        unique: true
      }
    },
    {
      name: "password",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "firstName",
      type: "string"
    },
    {
      name: "lastName",
      type: "string"
    },
    {
      name: "role",
      type: 'reference',
      to: [{ type: 'role' }]
    }
  ]
}