import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import product from './product'
import category from './category'
import banner from './banner'
import user from './user'
import role from './role'
import session from './session'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    category,product,banner,user,role,session
  ]),
})
