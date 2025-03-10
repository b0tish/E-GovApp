import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Forbidden" });

    req.user = decoded;
    next();
  });
};

export const conditionalVerifyToken = (req, res, next) => {
  if (req.path.startsWith("/dashboard")) {
    return verifyToken(req, res, next); // Only apply verifyToken if the path matches
  }
  next(); // Skip verification for other paths
};

export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};

export const authorizeDashboard = () => {
  return (req, res, next) => {
    const { identifier } = req.params; // Get name from request parameters

    if (identifier !== "National") {
      if (req.user.name !== identifier) {
        return res.status(403).json({ msg: "Access denied" });
      }
    } else {
      if (req.user.level !== identifier) {
        return res.status(403).json({ msg: "Access denied" });
      }
    }
    next();
  };
};

export const restrictToOwnEntity = (req, res, next) => {
  const { level, name } = req.body;

  if (level === "National") {
    if (req.user.level !== "National") {
      return res.status(403).json({ msg: "Access denied " });
    }
  } else {
    if (req.user.name !== name) {
      return res.status(403).json({ msg: "Access denied " });
    }
  }
  next();
};
