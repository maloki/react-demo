import factService from '../services/fact.js'

export const addFact = (req, res, next) => {
  factService.addFact(req.body).then(response => {
    res.send(response)
  })
}

export const deleteFact = (req, res, next) => {
  factService.deleteFact(req.body).then(response => {
    res.send(response)
  })
}

export const updateFact = (req, res, next) => {
  factService.updateFact(req.body).then(response => {
    res.send(response)
  })
}

export const getAllFacts = (req, res, next) => {
  factService.getAllFacts(req.params).then(response => {
    res.send(response)
  })
}

export const getAllFactsWithCategoryCount = (req, res, next) => {
  factService.getAllFactsWithCategoryCount(req.params).then(response => {
    res.send(response)
  })
}

export const getAllFactsWithCategories = (req, res, next) => {
  factService.getAllFactsWithCategories(req.params).then(response => {
    res.send(response)
  })
}

export const getFactById = (req, res, next) => {
  factService.getAllFacts(req.params).then(response => {
    res.send(response)
  })
}

export const getFactsByCategory = (req, res, next) => {
  console.log("catego")
  factService.getFactsByCategory(req.params).then(response => {
    res.send(response)
  })
}

export const getFactsCategories = (req, res, next) => {
  factService.getFactsCategories().then(response => {
    res.send(response)
  })
}

export const getFactsCategoriesWithCount = (req, res, next) => {
  factService.getFactsCategoriesWithCount().then(response => {
    res.send(response)
  })
}
