const path = require('path')
const sqlite = require('sqlite3')

const dbpath = path.normalize('C:/Dropbox/My Documents/fingerskier')
const dbfile = path.join(dbpath, 'egoid.db')
const db = new sqlite.Database(dbfile)

module.exports = {
  create: async(req,res,next)=>{
    const {name,description} = req.body
    const parameters = [name,description]
  
    db.all(`insert into tasks(name,description) values(?,?)`, parameters, (err,result)=>{
      if (err) console.error(err)
      res.json(result)
    })
  },
  
  delete: async(req, res, next)=>{
    const {id} = req.params
    const {name,description} = req.body
    
    const sql = `delete from tasks where rowid = ?`
    
    const parameters = [name,description,id]
    
    db.all(sql, parameters, parent, (err,result)=>{
      if (err) console.error(err)
      res.json(result)
    })
  },
  
  read: async(req,res,next)=>{
    const {id} = req.params
  
    db.all(`select * from tasks where rowid=${id}`, (err,result)=>{
      if (err) console.error(err)
      res.json(result)
    })
  },
  
  readAll: async(req, res, next)=>{
    db.all('select rowid,* from tasks', (err,result)=>{
      if (err) console.error(err)
      res.json(result)
    })
  },
  
  update: async(req,res,next)=>{
    const data = req.body

    let sql = [`update tasks set`]
    let parameters = []

    for (let key in data) {
      sql.push(`${key} = ?`)
      parameters.push(data[key])
    }

    sql = sql.join(',')
    
    db.all(sql, parameters, (err,result)=>{
      if (err) console.error(err)
      res.json(result)
    })
  },
}