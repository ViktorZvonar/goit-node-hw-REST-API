const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (req.method === "POST" && error) {
      const missingField = error.details[0].path[0];
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing required ${missingField} field`,
      });
      return;
    }

    if (
      req.method === "PUT" &&
      !req.body.name &&
      !req.body.phone &&
      !req.body.email &&
      !req.body.id
    ) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
      return;
    }

    next();
  };
};

module.exports = validation;