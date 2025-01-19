import { useEffect, useState } from "react"
import BeatLoader from "react-spinners/BeatLoader";

export const App = () => {
  const [quoteData, setquoteData] = useState({content:'',author:''});
  const [isLoading, setisLoading] = useState(true);
  const [favoriteQuotes, setfavoriteQuotes] = useState(()=>{
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites):[];
  });

  const getQuote = async() =>{
    try {
      const url = 'http://api.quotable.io/random';
      const response = await fetch(url);
      const data = await response.json(); 
      setquoteData(data);
      setisLoading(false);
      return data;
    } catch (error) {
      console.log(`Error Fetching Quote: ${error}`);
    }
  }

  const saveQuote = (quote) =>{
    const updateFavorites = [quote, ...favoriteQuotes];
    setfavoriteQuotes(updateFavorites);
    localStorage.setItem("favorites",JSON.stringify(updateFavorites));
  }

  const deleteQuote = (indexToDelete)=>{
    const updateFavorite = favoriteQuotes.filter((_,index)=> index !== indexToDelete);
    setfavoriteQuotes(updateFavorite);
    localStorage.setItem("favorites", JSON.stringify(updateFavorite));
  }

  useEffect(() => {
    getQuote();
  }, [])
  
    return (
      <>
        <div className="flex-container">
          {
            isLoading?(
              <BeatLoader color="#3498db" size={60} />
            ):(
              <>
                <div className="innerBox">
                <h1>{quoteData.content}</h1>
                <h2>- {quoteData.author}</h2>
                </div>
                <button onClick={()=>{
                  setisLoading(true);
                  getQuote();
                }}>
                  Generate new Quote
                </button>
                {/* ADD BUTTON TO ADD FAVORITE QUOTE */}
                <button onClick={()=>saveQuote(quoteData)}>Save Quote</button>
                {/* add favorite section */}
                <h1>Favorite Quotes</h1>
                {
                  favoriteQuotes.length>0 ?(
                    favoriteQuotes.map((quote,index)=>(
                      <div key={index} className="innerBox">
                          <h2 >{quote.content}</h2>
                          <h3 >{quote.author}</h3>
                          <button onClick={()=> deleteQuote(index)}>Delete</button>
                      </div>
                    ))
                  ):(
                    <p>No Favorite Quote yet!</p>
                  )
                  
                }
              </>
          )}
        </div>
        
      </>
    )
  
  // Since I'm passing initial values for quoteData, I could have donde this directly instead of handling the isLoading state
  // return (
  //   <div className="flex-container">
  //     <div className="innerBox">
  //       <h1>{quoteData.content || "Loading content..."}</h1>
  //       <h2>{quoteData.author || "Loading author..."}</h2>
  //     </div>
  //   </div>
  // );

}
