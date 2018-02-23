import Fact from "../models/fact.js"
//import XLSX from 'XLSX'
import moment from 'moment'

export default {
  addFact: (payload) => {
      return new Promise((resolve, reject) => {
        let fact = new Fact({
          text: payload.text,
          category: payload.category,
          tags: payload.tags,
          img: payload.img,
          dateCreated: Date.now()
        })
        fact.save()
          .then(f => resolve({success: true, payload: f}))
          .catch(err => reject({success: false, payload: err}))
      });
  },
  deleteFact: (payload) => {
      return new Promise((resolve, reject) => {
        Fact.findByIdAndRemove(payload.factId)
          .then(facts => resolve({success: true, payload: facts}))
          .catch(err => reject({success: false, payload: err}))
      });
  },
  updateFact: (payload) => {
      return new Promise((resolve, reject) => {
        Fact.findOne({_id: payload.factId})
          .then(fact => {
            fact.text = payload.text,
            fact.category = payload.category,
            fact.tags = payload.tags,
            fact.img = payload.img
            fact.save().then(editedFact => {
              resolve({success: true, payload: editedFact})
            })
          })
          .catch(err => reject({success: false, payload: err}))
      });
  },
  getAllFacts: (payload) => {
      return new Promise((resolve, reject) => {
        let query = (payload.lastId === "-" || payload.lastId === undefined ? {} : {"dateCreated": {"$lt": payload.lastId}})
        Fact.find(query)
          .sort({"dateCreated": -1})
          .limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize))
          .then(facts => resolve({success: true, payload: facts}))
          .catch(err => reject({success: false, payload: err}))
      });
  },
  getAllFactsWithCategories: (payload) => {
      return new Promise((resolve, reject) => {
        let query = (payload.lastId === "-" || payload.lastId === undefined ? {} : {"dateCreated": {"$lt": payload.lastId}})
        Fact.find(query)
          .sort({"dateCreated": -1})
          .limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize))
          .then(facts => resolve({success: true, payload: {facts: facts, categories: facts.distinct("category")}}))
          .catch(err => reject({success: false, payload: err}))
      });
  },
  getAllFactsWithCategoryCount: (payload) => {
      return new Promise((resolve, reject) => {
        Fact.find({}).distinct("category")
          .then(categories => {
            let categoryCount = []
            let promises = categories.map(category => {
              return new Promise(function(resolve, reject) {
                Fact.count({category: category}, (err, count) => {
                  resolve(categoryCount.push({category: category, count: count}))
                })
              })
            })
            Promise.all(promises).then(p => {
              let factList = []
              let query = (payload.lastId === "-" || payload.lastId === undefined ? {} : {"dateCreated": {"$lt": payload.lastId}})
              Fact.find(query)
                .sort({"dateCreated": -1})
                .limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize))
                .then(facts => {
                  categoryCount.map(cat => {
                    facts.map(f => {
                      if(cat.category === f.category){
                        factList.push({
                          id: f._id,
                          _id:f._id,
                          category: f.category,
                          tags: f.tags,
                          dateCreated: f.dateCreated,
                          text:f.text,
                          img: f.img,
                          categoryCount: cat.count
                        })
                      }
                    })
                  })
                  resolve({success: true, payload: factList})
              })
            })
          })
          .catch(err => reject({success: false, payload: err}))
      });
  },
  getFactById: (payload) => {
      return new Promise((resolve, reject) => {
        Fact.findOne({_id: payload.factId})
          .then(fact => resolve({success: true, payload: fact}))
          .catch(err => reject({success: false, payload: err}))
      });
  },
  getFactsByCategory: (payload) => {
      return new Promise((resolve, reject) => {
        let query = (payload.lastId === "-" || payload.lastId === undefined ? {category: payload.category} : {category: payload.category, "dateCreated": {"$lt": payload.lastId}})
        Fact.find(query)
          .sort({"dateCreated": -1})
          .limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize))
          .then(fact => resolve({success: true, payload: fact}))
          .catch(err => reject({success: false, payload: err}))
      });
  },
  getFactsCategories: () => {
    return new Promise((resolve, reject) => {
      Fact.find({}).distinct("category")
        .then(cat => resolve({success:true, payload: cat}))
        .catch(err => reject({success:false, payload: err}))
    })
  },
  getFactsCategoriesWithCount: () => {
    return new Promise((resolve, reject) => {
      Fact.find({})
        .then(facts => {
          let distinct = []
          facts.map(f => {
            if(!distinct.some(a => a === f.category) && f.category !== undefined)
              distinct.push(f.category)
          })
          let categories = []
          distinct.map(d => {
            categories.push({category: d, count: facts.filter(f => f.category === d).length})
          })
          resolve({success:true, payload: categories})
        })
        .catch(err => reject({success:false, payload: err}))
    })
  },
  //*** IMPORT XLSX TABLE TO DATABASE ***//
/*  importFactsFromXlsx: () => {
    let file = XLSX.readFile("./table.xlsx")
    var sheet_name_list = file.SheetNames;
    let wb = XLSX.utils.sheet_to_json(file.Sheets[sheet_name_list[0]])
    var d = new Date();
    wb.map((fact, i) => {
      let tags = []
      if(fact["tagi"] !== undefined){
        tags.push(fact["tagi"])
        for(var l = 1; l < 10; l++){
          let tag = fact["tagi_" + l]
          if(tag !== undefined)
            tags.push(tag)
          else
            break
        }
      }
      let factModel = new Fact({
        text: fact["treść"],
        category: fact["kategoria"],
        tags: tags,
        // when importing facts, date created must differ, for sorting purposes
        dateCreated: new Date(new Date(moment(d.getTime()).subtract(i, "minutes")))
      })
      factModel.save()
    })
  }*/
}
