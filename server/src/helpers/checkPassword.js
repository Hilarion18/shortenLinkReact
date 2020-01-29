const bcryptjs = require('bcryptjs')

function checkPassword (salt, password, email) {
  return new Promise((resolve, reject) => {
      const emailPassword = email + password
      bcryptjs.compare(emailPassword, salt, function (err, data) {
          if (data) {
            //   console.log(`access granted `+data);
              
              resolve(data)
          } else {
            //   console.log(`access failed `+err);
              reject(err)
          }
      });
  })
}

module.exports = checkPassword