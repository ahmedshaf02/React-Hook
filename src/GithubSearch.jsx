
import React, { useState,useEffect } from "react";
import axios from "axios"

const Styles={
  searchBtn:{
    border:"0.8px solid black",
padding:"10px 12px",
backgroundColor:"white",
borderRadius:6,
fontSize:18,
margin:10
  },
inputSearch:{
border:"2px solid #7405FA",
padding:"10px 12px",
backgroundColor:"white",
borderRadius:6,
fontSize:24,
margin:"auto",
},
counterContainer:{
  position:"relative",
  // border:"0.5px solid gray",
  borderRadius:5,
  padding:20
}
}

const GithubSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)


  useEffect(()=>{
      console.log("inside useeffect")
  },[query,data])

  const handleClick = ()=>{
      setLoading(true)
      axios.get("https://api.github.com/search/users",{
        params:{
          q: query
        }
      }).then(data=>setData(data.data.items),setLoading(false))
      .catch(error=>console.log("error",error),setLoading(false))
  }



  console.log(data, "render")
  return (
    <>
      <h1>Github User Search</h1>
      <div style={Styles.counterContainer}>
        
      <input value={query} onChange={(e)=>setQuery(e.target.value)} style={Styles.inputSearch}/>
      <button style={Styles.searchBtn} onClick={handleClick}>Search</button>
      </div>

      <div style={Styles.counterContainer}>
        
        <div>
          <div className="row "style={{margin:"auto"}}>
          {!loading && data && data.map(ele=>
            <div className="card m-2" style={{width: "10rem"}} key={ele.id}>
              <img src={ele.avatar_url} className="card-img-top" alt={ele.login}/>
              <div className="card-body" style={{backgroundColor:"#F5F1A3"}}>
                <h5 className="card-text">{ele.login}</h5>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default GithubSearch

// import React from "react";
// import axios from "axios";
// import TableData from "./TableData";

// class GithubSearch extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       search: "",
//       value: "",
//       data: [],
//       isLoading: false
//     };
//   }
//   handleSearch = () => {
//     this.setState({ isLoading: true });
//     // this.setState({ value: this.state.search });
//     axios
//       .get("https://api.github.com/search/repositories?", {
//         params: {
//           q: this.state.search
//         }
//       })
//       .then(data1 => {
//         console.log(data1);
//         this.setState({
//           data: data1.data.items,
//           isLoading: false
//         });
//       })
//       .catch(error => {
//         console.log(error, "error ok");
//         alert("error occured please try again");
//         this.setState({ isLoading: false });
//       })
//       .finally(data2 => console.log(data2));
//   };

//   componentDidMount() {
//     this.setState({
//       isLoading: true
//     });

//     axios.get("https://api.github.com/search/repositories?q=main").then(data1 => {
//       console.log(data1);
//       this.setState({
//         data: data1.data.items,
//         isLoading: false
//       });
//     });
//   }

//   render() {
//     return (
//       <>
//         <div>
//           <h1>github user search</h1>
//           <input
//             style={{ height: 40, margin: 10 }}
//             value={this.state.search}
//             onChange={e => {
//               this.setState({ search: e.target.value });
//             }}
//             className="border-primary rounded"
//           />

//           <button
//             className="btn btn-outline-primary"
//             onClick={this.handleSearch}
//           >
//             Search
//           </button>

//           <div>
//             {this.state.isLoading ? (
//               <div
//                 class="spinner-border"
//                 style={{ width: "3rem", height: "3rem", margin: 10 }}
//                 role="status"
//               >
//                 <span class="sr-only">Loading...</span>
//               </div>
//             ) : (
//               ""
//             )}

//             <table className="table">
//               {!this.state.isLoading ? (
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">User Id</th>
//                     <th scope="col">User Name</th>
//                     <th scope="col">Image</th>
//                     <th scope="col">Option</th>
//                   </tr>
//                 </thead>
//               ) : (
//                 ""
//               )}

//               <tbody>
//                 {!this.state.isLoading &&
//                   this.state.data &&
//                   this.state.data.map(ele => (
//                     <TableData key={ele.id} value={ele} />
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default GithubSearch;
