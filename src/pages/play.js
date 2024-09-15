import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import FarmingButton from "./components/button";

function Play() {

    const [farm, setFarm] = useState();
    const [user, setUser] = useState();

    const auth = useContext(AuthContext);
    const { request } = useHttp();

    useEffect(() => {
        const get = async () => {  
            try {
                const response = await request(`/user/farm`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                
                if (response.status) {
                    setFarm(response.farm);
                    setUser(response.user);
                }
            } catch (e) {}
        }

        get()
    }, [auth, request]);

    return (
        <>
            <div className="window">
                <div className="image"/>
                <h1 className="play_header">{user ? user.name : "Name"}</h1>
                <h1 className="play_header" style={{ fontSize: "26px" }}>{user ? user.coins.toFixed(2) : "Coins"} {user ? user.currency : "Currency"}</h1>
            
                <div className="dj">
                    <div className="bottom">
                        <div className="info">
                            <div className="name">Egyptian Spiderman</div>
                            <div className="autor">R. Bou</div>
                        </div>
                        <span className="play">Play</span>
                    </div>
                </div>
            </div>
            {farm ? <FarmingButton lastUpdateTime={farm.updateTime} setFarm={setFarm} /> : <></>}
        </>
    );
}

export default Play;
