import React from 'react';
import './styles.scss';
import { fetchATMs, ATM_TYPE, BANKS, defaultFilter } from './api';
import { Map, MapTools } from './mapTools';
import SearchCity from './components/SearchICity';

function App() {

  const [ ATMs, setATMs ] = React.useState([]);
  const [ cities, setCities ] = React.useState([]);
  const [ city, setCity ] = React.useState('');
  const [ load, setLoad ] = React.useState(true);

  React.useEffect(()=>{
    loadData(city, null, null);
  },[])
  const loadData=async(/* city, bankName, ATMtype */)=>{
    // const filters={...defaultFilter};
    // if(city && city.length > 0)
    //   filters.City=city;
    // if(bankName)
    //   filters.Bank_Name=bankName;
    // if(ATMtype)
    //   filters.ATM_Type=ATM_TYPE.INFO;
    try{
      const res=await fetchATMs(/*filters*/  {} )
      console.log(res.data);
      setATMs(res.data.ATMs)
      setCities(res.data.Cities);
      setLoad(false);
    }
    catch(err){
      console.error(err);
    }
  }
  const displayItems=React.useMemo(()=>{
    console.log('ITEMS MEMO');
    if(city.length)
      return ATMs.filter(x=>x.City && (x.City.trim())==city);
    return ATMs;
  },[city, ATMs])

  const handleSetCity=(city)=>{
    console.log(city);
    setCity(city.name);
  }

  return (
    <div className="app">
      <div className="container">
        {!load ? 
        <div className="flex-container">
          <div className="col-lg-3">
            <div className="flex-container">
              <div className="col-lg-12">
                <SearchCity 
                  value={city}
                  cities={cities}
                  placeholder={'City'}
                  callback={handleSetCity}
                />
              </div>
              <div className="col-lg-6">

              </div>
              <div className="col-lg-6">

              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="leaflet-container">
              <Map 
                markers={displayItems}
              />
            </div>
          </div>
        </div> : null}
      </div>
    </div>
  );
}

export default App;
