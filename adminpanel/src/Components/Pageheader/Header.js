import React from "react";
import "./header.css";
function Header({ listsize, setformstate, setloading, required,filterstate ,setFilterState,filterFields,updateformstate}) {
  const handlecreateclick = () => {
    setformstate(true);
    setloading(false);
  };
  return (
    <div className="pageheader">
      <div className="listandsize">
        <h1>List</h1>
        <span>{listsize?listsize:0}</span>
      </div>
      { updateformstate && <div> Update </div>}
      <div className="createfilter">
        {required==="true" && (
          <button className="create" onClick={handlecreateclick}>
            +&nbsp;Create new
          </button>
        )}
        {/* <button className="filter">
          <span>
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M30 8h-4.1c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2h14.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30V8zM21 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3S22.7 12 21 12zM2 24h4.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30v-2H15.9c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2V24zM11 20c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S9.3 20 11 20z"></path>
            </svg>
          </span>
          Select Filter Field 
        </button> */}
              
        <select placeholder="Filter" className="filter" value={filterstate}  onChange={(e)=>setFilterState(e.target.value)}  >
        <option value="" disabled selected>Filter</option>
          { filterFields && filterFields.map((f,i)=>(
            <option value={f}>{f}</option>
          ))  }
          
        </select>
       
      </div>
    </div>
  );
}

export default Header;
