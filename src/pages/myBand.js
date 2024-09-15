import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

function App() {

  const [user, setUser] = useState();
  const [friends, setFriends] = useState([]);

  const auth = useContext(AuthContext);
  const { request } = useHttp();

  useEffect(() => {
      const get = async () => {  
          try {
            const responseFriends = await request(`/user/friends`, "GET", null, {
              authorization: `Bearer ${auth.token}`
            });
            
            if (responseFriends.status) {
              setFriends(responseFriends.friends);
              setUser(responseFriends.user);
            }
          } catch (e) {}
      }

      get()
  }, [auth, request]);

  const renderFriends = (list) => {
    const result = [];

    list.forEach((element, i) => {
      result.push(<div className="friends" key={i}>
        <div className="icon"></div>
        <div className="description">
          <div className="text">{element.name}</div>
          <svg style={{ float: "left" }} width="18px" height="18px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#AAAAAA" fill="none"><circle cx="22.83" cy="22.57" r="7.51"/><path d="M38,49.94a15.2,15.2,0,0,0-15.21-15.2h0a15.2,15.2,0,0,0-15.2,15.2Z"/><circle cx="44.13" cy="27.22" r="6.05"/><path d="M42.4,49.94h14A12.24,12.24,0,0,0,44.13,37.7h0a12.21,12.21,0,0,0-5.75,1.43"/></svg>
          <span className="amount">{element.friends}</span>
        </div>
        <div className="coins">{element.coins.toFixed(2)} {element.currency}</div>
      </div>);
    });

    return result;
  }

  return (
    <>
      <div className="window">
        <h1 className="band_header">Invite Frens</h1>
        <div className="monitor">{user ? user.coinsByFriends.toFixed(2) : 0} {user ? user.currency : "MP"} Earned</div>
        <p className="percent_description">Score 10% from buddies + 2.5% from their referrals</p>
        <h2 className="list_header">{friends.length} frens</h2>

        { renderFriends(friends) }
      </div>

      <div className="sticked_button">Invite Frens</div>
    </>
  );
}

export default App;
