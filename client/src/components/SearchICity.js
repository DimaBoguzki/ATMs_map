import React from 'react';

function SearchInput({ cities, placeholder, callback }){
  const [ val, setVal ] = React.useState('');
  const [ search, setSearch ] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(search!==val)
        setSearch(val)
    }, 800)
    return () => clearTimeout(delayDebounceFn)
  }, [ val ])


  const displayCities=React.useMemo(()=>{
    if(search.length && search!=='-1')
      return cities.filter(city => city.name && (city.name.trim()).includes(search));
    return [];
  }, [search])

  const handleSelect=(v)=>{
    inputRef.current.value=v.name;
    setSearch('-1');
    callback(v);
  }
  const handleOnChange=(e)=>{
    inputRef.current.value=e.target.value;
    setVal(e.target.value);
  }
  const handleClear=()=>{
    inputRef.current.value='';
    setVal('')
    setSearch('-1');
    callback(null);
  }
  return (
    <div className="search-input">
      <div className="flex-container">
        <input 
          ref={inputRef}
          className="input-app"
          placeholder={placeholder ? placeholder : 'search'}
          onChange={ handleOnChange }
        />
        <button onClick={handleClear}>X</button>
      </div>
      {displayCities.length ? <ul className="list">
        {displayCities.map((c, i)=>(
          <li key={i} onClick={()=>handleSelect(c)}>{c.name}</li>
        ))}
      </ul> : null }
    </div>
  )
}


export default React.memo(SearchInput, (prevProps, nextProps)=>(prevProps.cities.length===nextProps.cities.length));