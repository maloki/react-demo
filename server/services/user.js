import User from "../models/user.js"
import { tokenForUser } from './passport.js'
import emailValidator from "email-validator"
export default {
  signin: (payload) => {
      return new Promise((resolve, reject) => {
        User.findOne({email: payload.email}).then(u => {
          u.comparePassword(payload.password, (err, isMatch) => {
            if(!err && isMatch){
              resolve({token: tokenForUser(u)});
            }else{
              reject({email: 'Invalid email or password.'});
            }
          })
        }).catch(err => {
          reject({email: 'Invalid email or password.'});
        })
      });
  },
  signup: (payload) => {
    return new Promise((resolve, reject) => {
      if(payload.name === "" || payload.email === "" || payload.password === "" || payload.confirmPassword === "")
        return resolve({success:false, payload:"Wypełnij wszystkie pola."})
      if(payload.name.length < 2)
        return resolve({success:false, payload:"Nazwa użytkownika musi składać się z przynajmniej 2 znaków."})
      if(!emailValidator.validate(payload.email))
        return resolve({success:false, payload:"Podany adres email jest niepoprawny."})
      User.findOne({email: payload.email}).then(usr => {
        if(usr !== null)
          return resolve({success:false, payload:"Podany adres email jest zajęty."})
        else {
          if(payload.password !== payload.confirmPassword)
            return resolve({success:false, payload:"Podane hasła muszą być takie same."})
          if(payload.password.length < 8)
            return resolve({success:false, payload:"Hasło musi składać się z przynajmniej 8 znaków."})
          const dateRegistered = new Date().toISOString()
          const user = new User({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            dateRegistered: dateRegistered,
          });
          user.markModified('object') 
          user.save()
          .then(u => resolve({success:true, payload:u}))
          .catch(e => reject({success:false, payload:e}));
        }
      })
    })
  },
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      User.find({})
      .then(u => resolve({success:true, payload:u}))
      .catch(e => reject({success:false, payload:e}));
    })
  },
  deleteUser: (payload) => {
    return new Promise((resolve, reject) => {
      User.findByIdAndRemove(payload.userId)
      .then(u => resolve({success:true, payload:u}))
      .catch(e => reject({success:false, payload:e}));
    })
  },
}
