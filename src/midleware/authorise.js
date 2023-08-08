const authorisation = (permittedRoles) => {
  // console.log(permittedRoles);
  return (req, resp, next) => {
    const loginData = req.loginData;
    let isPermitted = false;
    permittedRoles.map((role) => {
      if (loginData.role.includes(role)) {
        isPermitted = true;
      }
    });
    if (isPermitted) {
      return next();
    } else {
      return resp.status(401).send({
        message: "you are not authorised to perform this opration",
      });
    }
  };
};

module.exports = authorisation;
