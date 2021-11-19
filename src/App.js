import axios from "axios";
import { useEffect, useState } from "react";
import 'boxicons'
import './App.css'
function App() {
  const [search,setSearch]=useState(' ')
  const [final,setFinal]=useState([])
  const [products,setProducts]=useState('')
  const [inputv,setInputv]=useState('')
  useEffect(()=>{

    search&&axios.get(`https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/?user=&q=${search}&size=6&suggestions=1&maxSuggestions=6`)
      .then((response)=>{
        
        setProducts(response.data.results)
  
      })
  },[search])
  useEffect(()=>{

    search&&axios.get(`https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/?user=&q=${inputv}&size=6&suggestions=1&maxSuggestions=6`)
      .then((response)=>{
        setFinal(response.data)
        setProducts(response.data.results)
 
      })
  },[inputv])
  useEffect(()=>{
    
  })
  const valueChange=(e)=>{
    setSearch(e.target.value)
    setInputv(e.target.value)
  }
  return (
    <div className="App">
    <div id='searchboxContainer'>
    <input id='searchbox' placeholder="Find Your furniture . . ." type='text' value={inputv} onChange={(e)=>valueChange(e)}/><span><box-icon name='search-alt-2'></box-icon></span>
    </div>
 {  inputv&& <div id='allsearch'>
  <div id='side'>
    <div className='heading1'>TOP SEARCHES</div>
    <div id='topsearchescontainer'>
    {
      final.suggestions&&final.suggestions.filter((item, idx) => idx < 5).map((ele)=>{
        return <div className='topsearches' onMouseEnter={()=>setSearch(ele.suggestion)} key={ele.score}>{ele.suggestion}</div>
      })
    }
  </div>
    <div className='heading1'>TOP COLLECTIONS</div>
 
    {
      final.facets&&final.facets.collectionname&&final.facets.collectionname.map((ele,i)=>{
        return <div className='topsearches' onMouseEnter={()=>setSearch(ele.name)} key={i}>{ele.name}</div>
      })
    }

    </div>
    <div id='suggestions'>
    <div className='heading1'>POPULAR PRODUCTS IN '{search}'</div>
    <br/>
    <div id='products'>
    {products&&products.map((ele)=>{
      return<div >
            <div> <img src={ele.productimage}></img></div>
            <div className='productname'>{ele.productname}</div>
            <div><span className='price'>Rs {ele.sellingprice} &nbsp;&nbsp;&nbsp;</span><span><strike>{ele.mrpprice}</strike></span></div>
            </div>
    })
   
    }
    <button id='show'>View All Search Results</button>
    </div>
    </div>
    </div>}
    </div>
  );
}

export default App;
