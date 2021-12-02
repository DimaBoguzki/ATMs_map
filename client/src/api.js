import axios from 'axios';

export const ATM_TYPE={
  CASH:'משיכת מזומן',
  INFO: 'מכשיר מידע/או מתן הוראות\n'
}
export const BANKS={
  // 4: 'בנק יהב לעובדי המדינה בע"מ',
  13: 'בנק אגוד לישראל בע"מ-13001',
  14: 'בנק אוצר החייל בע"מ',
  10: 'בנק לאומי לישראל בע"מ',
  11: 'בנק דיסקונט לישראל בע"מ',
  31: 'בנק הבינלאומי הראשון לישראל בע"מ',
  12: 'בנק הפועלים בע"מ',
  54: 'בנק ירושלים בע"מ',
}
export const defaultFilter={
  Bank_Code: Object.keys(BANKS),
}
export const fetchATMs=(filters, limit=5000)=>{
  return axios.post("/fetch", { limit, filters } );
}
export const fetchCities=(filters, limit=5000)=>{
  return axios.post("/fetchCities", { limit, filters } );
}

