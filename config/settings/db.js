/*SETTINGS:
    -- database url
    -- looks like mongodb://<USERNAME>:<PASSWORD>@URL/<DB_NAME>
*/

module.exports = {
   local_DB: 'mongodb://localhost27017/ghost_kpi_db',
   online_DB:
      'mongodb+srv://admin:<password>@db0-sxgcb.mongodb.net/test?retryWrites=true&w=majority'
};
