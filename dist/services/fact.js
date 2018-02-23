"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fact = require("../models/fact.js");

var _fact2 = _interopRequireDefault(_fact);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  addFact: function addFact(payload) {
    return new Promise(function (resolve, reject) {
      var fact = new _fact2.default({
        text: payload.text,
        category: payload.category,
        tags: payload.tags,
        img: payload.img,
        dateCreated: Date.now()
      });
      fact.save().then(function (f) {
        return resolve({ success: true, payload: f });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  deleteFact: function deleteFact(payload) {
    return new Promise(function (resolve, reject) {
      _fact2.default.findByIdAndRemove(payload.factId).then(function (facts) {
        return resolve({ success: true, payload: facts });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  updateFact: function updateFact(payload) {
    return new Promise(function (resolve, reject) {
      _fact2.default.findOne({ _id: payload.factId }).then(function (fact) {
        fact.text = payload.text, fact.category = payload.category, fact.tags = payload.tags, fact.img = payload.img;
        fact.save().then(function (editedFact) {
          resolve({ success: true, payload: editedFact });
        });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  getAllFacts: function getAllFacts(payload) {
    return new Promise(function (resolve, reject) {
      var query = payload.lastId === "-" || payload.lastId === undefined ? {} : { "dateCreated": { "$lt": payload.lastId } };
      _fact2.default.find(query).sort({ "dateCreated": -1 }).limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize)).then(function (facts) {
        return resolve({ success: true, payload: facts });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  getAllFactsWithCategories: function getAllFactsWithCategories(payload) {
    return new Promise(function (resolve, reject) {
      var query = payload.lastId === "-" || payload.lastId === undefined ? {} : { "dateCreated": { "$lt": payload.lastId } };
      _fact2.default.find(query).sort({ "dateCreated": -1 }).limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize)).then(function (facts) {
        return resolve({ success: true, payload: { facts: facts, categories: facts.distinct("category") } });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  getAllFactsWithCategoryCount: function getAllFactsWithCategoryCount(payload) {
    return new Promise(function (resolve, reject) {
      _fact2.default.find({}).distinct("category").then(function (categories) {
        var categoryCount = [];
        var promises = categories.map(function (category) {
          return new Promise(function (resolve, reject) {
            _fact2.default.count({ category: category }, function (err, count) {
              resolve(categoryCount.push({ category: category, count: count }));
            });
          });
        });
        Promise.all(promises).then(function (p) {
          var factList = [];
          var query = payload.lastId === "-" || payload.lastId === undefined ? {} : { "dateCreated": { "$lt": payload.lastId } };
          _fact2.default.find(query).sort({ "dateCreated": -1 }).limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize)).then(function (facts) {
            categoryCount.map(function (cat) {
              facts.map(function (f) {
                if (cat.category === f.category) {
                  factList.push({
                    id: f._id,
                    _id: f._id,
                    category: f.category,
                    tags: f.tags,
                    dateCreated: f.dateCreated,
                    text: f.text,
                    img: f.img,
                    categoryCount: cat.count
                  });
                }
              });
            });
            resolve({ success: true, payload: factList });
          });
        });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  getFactById: function getFactById(payload) {
    return new Promise(function (resolve, reject) {
      _fact2.default.findOne({ _id: payload.factId }).then(function (fact) {
        return resolve({ success: true, payload: fact });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  getFactsByCategory: function getFactsByCategory(payload) {
    return new Promise(function (resolve, reject) {
      var query = payload.lastId === "-" || payload.lastId === undefined ? { category: payload.category } : { category: payload.category, "dateCreated": { "$lt": payload.lastId } };
      _fact2.default.find(query).sort({ "dateCreated": -1 }).limit(payload.pageSize === "-" || payload.pageSize === undefined ? 30 : parseInt(payload.pageSize)).then(function (fact) {
        return resolve({ success: true, payload: fact });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  getFactsCategories: function getFactsCategories() {
    return new Promise(function (resolve, reject) {
      _fact2.default.find({}).distinct("category").then(function (cat) {
        return resolve({ success: true, payload: cat });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  },
  getFactsCategoriesWithCount: function getFactsCategoriesWithCount() {
    return new Promise(function (resolve, reject) {
      _fact2.default.find({}).then(function (facts) {
        var distinct = [];
        facts.map(function (f) {
          if (!distinct.some(function (a) {
            return a === f.category;
          }) && f.category !== undefined) distinct.push(f.category);
        });
        var categories = [];
        distinct.map(function (d) {
          categories.push({ category: d, count: facts.filter(function (f) {
              return f.category === d;
            }).length });
        });
        resolve({ success: true, payload: categories });
      }).catch(function (err) {
        return reject({ success: false, payload: err });
      });
    });
  }
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
};
//import XLSX from 'XLSX'