import React from 'react';
import './styles.scss';
import { fetchATMs, ATM_TYPE, BANKS } from './api';
import { Map, MapTools } from './mapTools';
import SearchCity from './components/SearchICity';


class App extends React.Component{
  constructor(props){
    super(props, null, null)
    this.state={
      ATMs:[],
      cities:[],
      city: '',
      type: null,
      bank: null,
      isLoad: true,
      zoom: MapTools.initialZoom,
      center: MapTools.initialPostiion
    }
  }
  componentDidMount(){
    this.loadData(null, null, null);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if(this.state.city != nextState.city)
  //     return true;
  //   return false;
  // }
  loadData=async()=>{
    try{
      const res=await fetchATMs( {} )
      console.log(res.data);
      this.setState({
        ATMs: res.data.ATMs,
        cities: res.data.Cities,
        load: false
      })
    }
    catch(err){
      console.error(err);
    }
  }
  handleSetCity=(city)=>{
    if(city){
      this.setState({
        city: city.name,
        center: [ city.latt, city.long ],
        zoom: 11
      })
    }
    else{
      this.setState({
        city: '',
        center: MapTools.initialPostiion,
        zoom: MapTools.initialZoom
      })
    }
  }
  getItems(){
    const { ATMs, city, type, bank } = this.state;

    return (city.length ? ATMs.filter(x=>x.City && (x.City.trim())===city) : ATMs);
  }
  render(){
    const { cities, type, zoom, center, bank, load } = this.state;
    console.log('rerender app');
    const displayItems = this.getItems();
    return(
      <div className="app">
        <div className="container">
          {!load ? 
          <div className="flex-container">
            <div className="col-lg-3">
              <div className="flex-container">
                <div className="col-lg-12 pad">
                  <SearchCity 
                    cities={cities}
                    placeholder={'City'}
                    callback={this.handleSetCity}
                  />
                </div>
                <div className="col-lg-6 pad">
                  <select onChange={(e)=>this.setState({type: e.target.value})} value={type}>
                    <option value={null} >{ 'בחר' }</option>
                    {Object.keys(ATM_TYPE).map( key =>(
                      <option key={key} value={key} >{ ATM_TYPE[key] }</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6 pad">
                  <select onChange={(e)=>this.setState({type: e.target.value})} value={bank}>
                    <option value={null} >{ 'בחר' }</option>
                    {Object.keys(BANKS).map( key =>(
                      <option key={key} value={key} >{ BANKS[key] }</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="leaflet-container">
                <Map 
                  markers={displayItems}
                  zoom={zoom}
                  center={center}
                />
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    )
  }
}
export default App;

// function App() {

//   const [ ATMs, setATMs ] = React.useState([]);
//   const [ cities, setCities ] = React.useState([]);
//   const [ city, setCity ] = React.useState('');
//   const [ load, setLoad ] = React.useState(true);
//   const [ zoom, setZoom ] = React.useState( MapTools.initialZoom )
//   const [ center, setCenter ] = React.useState( MapTools.initialPostiion )

//   React.useEffect(()=>{
//     loadData(city, null, null);
//   },[])
//   const loadData=async(/* city, bankName, ATMtype */)=>{
//     // const filters={...defaultFilter};
//     // if(city && city.length > 0)
//     //   filters.City=city;
//     // if(bankName)
//     //   filters.Bank_Name=bankName;
//     // if(ATMtype)
//     //   filters.ATM_Type=ATM_TYPE.INFO;
//     try{
//       const res=await fetchATMs(/*filters*/  {} )
//       console.log(res.data);
//       setATMs(res.data.ATMs)
//       setCities(res.data.Cities);
//       setLoad(false);
//     }
//     catch(err){
//       console.error(err);
//     }
//   }
//   const displayItems=React.useMemo(()=>{
//     console.log('ITEMS MEMO');
//     if(city.length)
//       return ATMs.filter(x=>x.City && (x.City.trim())==city);
//     return ATMs;
//   },[city, ATMs])

//   const handleSetCity=(city)=>{
//     console.log(city);
//     setCity(city.name);
//     setCenter([ city.latt, city.long]);
//     setZoom(11);
//   }

//   return (
//     <div className="app">
//       <div className="container">
//         {!load ? 
//         <div className="flex-container">
//           <div className="col-lg-3">
//             <div className="flex-container">
//               <div className="col-lg-12">
//                 <SearchCity 
//                   value={city}
//                   cities={cities}
//                   placeholder={'City'}
//                   callback={handleSetCity}
//                 />
//               </div>
//               <div className="col-lg-6">

//               </div>
//               <div className="col-lg-6">

//               </div>
//             </div>
//           </div>
//           <div className="col-lg-7">
//             <div className="leaflet-container">
//               <Map 
//                 markers={displayItems}
//                 zoom={zoom}
//                 center={center}
//               />
//             </div>
//           </div>
//         </div> : null}
//       </div>
//     </div>
//   );
// }

