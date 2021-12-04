import React from 'react';
import './styles.scss';
import { fetchATMs, ATM_TYPE, BANKS } from './api';
import { Map, MapTools } from './mapTools';
import SearchCity from './components/SearchICity';
import AtmCard from './components/AtmCard';


class App extends React.Component{
  constructor(props){
    super(props, null, null)
    this.state={
      ATMs:[],
      cities:[],
      city: '',
      type: '',
      bank: -1,
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

  // componentDidUpdate(prevProps, prevState) {

  // }

  loadData=async()=>{
    try{
      const res=await fetchATMs( {} );
      this.setState({
        ATMs: res.data.ATMs,
        cities: res.data.Cities,
        isLoad: false
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
  filterItems(){
    const { ATMs, city, type, bank } = this.state;
    if( city.length || bank!=-1 || type.length ){
      return ATMs.filter( x => {
        if( 
            ( !city.length || (x.City && (x.City.trim()) === city) ) && 
            ( bank === -1 || (x.Bank_Code === bank) ) &&
            ( !type.length || (x.ATM_Type === type) )
          )
          return true;
        return false;
      })
    }
    return ATMs;
  }
  render(){
    const { cities, type, zoom, center, bank, isLoad } = this.state;
    console.log('rerender app');
    const displayItems = this.filterItems();

    return(
      <div className="app">
        <div className="container">
          {!isLoad ? 
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
                <div className="col-lg-6 pad"> {/* selcet input type atm */}
                  <select onChange={(e)=>this.setState({type: e.target.value})} value={type}>
                    <option value={''} >{ 'בחר' }</option>
                    {Object.keys(ATM_TYPE).map( key =>(
                      <option key={key} value={ ATM_TYPE[key] } >{ ATM_TYPE[key] }</option>
                    ))}
                  </select>
                </div> 
                <div className="col-lg-6 pad"> {/* selcet input bank */}
                  <select onChange={(e)=>this.setState({bank: parseInt(e.target.value)})} value={bank}>
                    <option value={-1} >{ 'בחר' }</option>
                    {Object.keys(BANKS).map( key =>(
                      <option key={key} value={ key } >{ BANKS[key] }</option>
                    ))}
                  </select>
                </div>
                <div className="cards-container"> {/* atm cards */}
                  {displayItems.map( atm => (
                    <AtmCard 
                      onClick={()=>{
                        if(atm.X_Coordinate && atm.Y_Coordinate)
                          this.setState({
                            center:[ atm.Y_Coordinate, atm.X_Coordinate],
                            zoom: 15
                          })
                      }}
                      key={ atm._id }
                      id={ atm._id }
                      bankName={ atm.Bank_Name }
                      city={ atm.City }
                      address={ atm.ATM_Address }
                      type={ atm.ATM_Type }
                    /> 
                  ))}
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
          </div> : 
          <h1>בתהליך...</h1>
        }
        </div>
      </div>
    )
  }
}
export default App;

