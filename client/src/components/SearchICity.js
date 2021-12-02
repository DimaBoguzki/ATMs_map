import React from 'react';

function SearchInput({value, cities, style, placeholder, callback}){
  const [ val, setVal ] = React.useState(()=> value ? value : '')
  const [ search, setSearch ] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(search!=val)
        setSearch(val)
    }, 800)
    return () => clearTimeout(delayDebounceFn)
  }, [ val ])

  React.useEffect(() => {
    setVal(value)
  }, [value])

  const displayCities=React.useMemo(()=>{
    console.log('memo', search);
    if(search.length && search!='-1')
      return cities.filter(city => city.name && (city.name.trim()).includes(search));
    return [];
  }, [search])

  const handleSelect=(v)=>{
    inputRef.current.value=v;
    setSearch('');
    callback(v);
  }

  return (
    <div className="search-input">
      <input 
        ref={inputRef}
        className="input-app"
        value={val}
        placeholder={placeholder ? placeholder : 'search'}
        onChange={(e) => setVal(e.target.value)}
      />
      {displayCities.length ? <ul className="list">
        {displayCities.map((c, i)=>(
          <li key={i} onClick={()=>handleSelect(c)}>{c.name}</li>
        ))}
      </ul> : null }
    </div>
  )
}


export default React.memo(SearchInput, (prevProps, nextProps)=>prevProps.value===nextProps.value);