import React, { useState, useEffect } from "react";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
    const [dealersList, setDealersList] = useState([]);
    // let [state, setState] = useState("")
    let [states, setStates] = useState([]);

    // let root_url = window.location.origin
    let dealer_url = "/djangoapp/get_dealers";

    let dealer_url_by_state = "/djangoapp/get_dealers/";

    const filterDealers = async (state) => {
        dealer_url_by_state = dealer_url_by_state + state;
        const res = await fetch(dealer_url_by_state, {
        method: "GET",
        });
        const retobj = await res.json();
        if (retobj.status === 200) {
        let state_dealers = Array.from(retobj.dealers);
        setDealersList(state_dealers);
        }
    };

    const get_dealers = async () => {
        const res = await fetch(dealer_url, {
        method: "GET",
        });
        const retobj = await res.json();
        if (retobj.status === 200) {
        let all_dealers = Array.from(retobj.dealers);
        let states = [];
        all_dealers.forEach((dealer) => {
            states.push(dealer.state);
        });

        setStates(Array.from(new Set(states)));
        setDealersList(all_dealers);
        }
    };

    useEffect(() => {
        get_dealers();
    }, []);

    let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
    return (
        <div>
            <Header />
            <div class="container">
                <table role="table" class="table-hover">
                    <thead role="rowgroup">
                        <tr role="row">
                            <th role="columnheader">ID</th>
                            <th role="columnheader">Dealer Name</th>
                            <th role="columnheader">City</th>
                            <th role="columnheader">Address</th>
                            <th role="columnheader">Zip</th>
                            <th role="columnheader">
                                <select
                                    name="state"
                                    id="state"
                                    class="form-select"
                                    onChange={(e) => filterDealers(e.target.value)}
                                >
                                <option value="" selected disabled hidden>
                                    State
                                </option>
                                <option value="All">All States</option>
                                {states.map((state) => (
                                    <option value={state}>{state}</option>
                                ))}
                                </select>
                            </th>
                            {isLoggedIn ? <th role="columnheader">Review Dealer</th> : <></>}
                        </tr>
                    </thead>
                    <tbody role="rowgroup">
                    {dealersList.map((dealer) => (
                        <tr role="row">
                            <td role="cell" class="id">{dealer["id"]}</td>
                            <td role="cell">
                                <a href={"/dealer/" + dealer["id"]}>{dealer["full_name"]}</a>
                            </td>
                            <td role="cell">{dealer["city"]}</td>
                            <td role="cell">{dealer["address"]}</td>
                            <td role="cell">{dealer["zip"]}</td>
                            <td role="cell">{dealer["state"]}</td>
                            {isLoggedIn ? (
                            <td role="cell">
                                <a href={`/postreview/${dealer["id"]}`}>
                                    <span class="bi bi-person-lines-fill"></span>
                                </a>
                            </td>
                            ) : (
                            <></>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dealers;
