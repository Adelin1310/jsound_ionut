export default{
    name:'session',
    title:'Session',
    type:'document',
    fields:[
        {
            name:'sessionID',
            title:'Session ID',
            type:'string',
        },
        {
            name:'token',
            title:'Token',
            type:'string'
        },
        {
            name:'userId',
            title:'User ID',
            type:'string'
        },
        {
            name:'products',
            title:'Products',
            type:'array',
            of: [{type: 'string'}],
        }
    ]
}