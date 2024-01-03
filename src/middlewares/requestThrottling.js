const slowDown = require('express-slow-down');


const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, 
  delayAfter: 75, 
  delayMs: (used, req) => {
    const delayAfter = req.slowDown.limit;
    return (used - delayAfter) * 500;
}
});

module.exports = speedLimiter;