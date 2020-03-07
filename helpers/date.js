function firstDayInMonth(year, month){
  return new Date(year, month-1, 1, 3, 0, 0, 0).toISOString();
}

function lastDayInMonth(year, month){
  return new Date((new Date(year, month, 1, 3, 0, 0, 0)) - 1).toISOString();
}

function firstDayInYear(year){
  return new Date(year, 0, 1, 3, 0, 0, 0).toISOString();
}

function lastDayInYear(year){
  return new Date((new Date(year, 12, 1)) - 1).toISOString();
}

function MonthName(month){
  switch (month) {
    case 1: return "January"
    case 2: return "February"
    case 3: return "March"
    case 4: return "April"
    case 5: return "May"
    case 6: return "June"
    case 7: return "July"
    case 8: return "August"
    case 9: return "September"
    case 10: return "October"
    case 11: return "November"
    case 12: return "December"
    default: return ''
  }
};

exports.GenerateDateRange = (start, end)=>{
  if(end) return { $gte: new Date(start), $lt: new Date(end) };

  let date = start.split('/');
  if (date.length == 1) return {
    $gte: firstDayInYear(date[0]),
    $lt: lastDayInYear(date[0])
  }
  else return {
    $gte: firstDayInMonth(date[0], date[1]),
    $lt: lastDayInMonth(date[0], date[1])
  }
};

exports.catagorizeDates = (records)=>{
  let catagories = {};

  for(let i in records){
    let date = new Date(records[i]['date']);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monName = MonthName(month);

    if(!catagories[year])
      catagories[year] = { total: 0, months: [{ id: `${year}/${month}`, value: monName, records: 1 }] };
    else{
      let index = catagories[year]['months'].findIndex(i => i['value'] == monName);
      if(index > -1) catagories[year]['months'][index]['records'] += 1;
      else catagories[year]['months'].push({ id: `${year}/${month}`, value: monName, records: 1 })
    }
    catagories[year]['total'] +=1;
  }
  return catagories;
}
