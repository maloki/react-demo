import userService from '../services/user.js'

export const createUser = (req, res, next) => {
  console.log("contr user")
  userService.createUser("","","").then(response => {
    res.send(response)
  })
}

export const signin = (req, res, next) => {
  userService.signin(req.body).then(response => {
    res.send(response)
  })
}

export const signup = (req, res, next) => {
  userService.signup(req.body).then(response => {
    res.send(response)
  })
}

export const getAllUsers = (req, res, next) => {
  userService.getAllUsers().then(response => {
    res.send(response)
  })
}

export const deleteUser = (req, res, next) => {
  userService.deleteUser(req.body).then(response => {
    res.send(response)
  })
}
