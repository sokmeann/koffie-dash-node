const groupbyProperty = (obj, num = 1) => {
  const sortedObj = {};
  const len = Object.keys(obj).length;
  let limit = num;
  if(num > len){
     limit = len
  };
  Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) =>
  {
     if(ind < limit){
        sortedObj[key] = obj[key];
     }
  });
  return sortedObj;
};

const weekdays = { 
  0: "Sunday", 
  1: "Monday", 
  2: "Tuesday", 
  3: "Wednesday", 
  4: "Thursday", 
  5: "Friday", 
  6: "Saturday" 
}

const byWeekday = {
  "Sunday": 0,
  "Monday": 0, 
  "Tuesday": 0, 
  "Wednesday": 0, 
  "Thursday": 0, 
  "Friday": 0, 
  "Saturday": 0 
}

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

const byMonth = {
  "January": 0,
  "February": 0,
  "March": 0,
  "April": 0,
  "May": 0,
  "June": 0,
  "July": 0,
  "August": 0,
  "September": 0,
  "October": 0,
  "November": 0,
  "December": 0
}

module.exports = {
  groupbyProperty,
  weekdays,
  byWeekday,
  months,
  byMonth
}