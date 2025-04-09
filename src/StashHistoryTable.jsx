import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import "./StashHistoryTable.css";

export function StashHistoryTable() {

    const stashActions = useSelector((state) => state.filter.stashActions);
    const leagues = useSelector((state) => state.filter.leagues);
    const accounts = useSelector((state) => state.filter.accounts);
    const stashes = useSelector((state) => state.filter.stashes);

    //const currentLeague = "SGF Unique Collection League (PL53786)";
    const currentLeague = "SGF April Hardcore (PL53725)";
    const currentStash = "Unique";
    const uniqueColumn = "item";
    const leagueColumn = "league";
    const stashColumn = "stash";

    const stashData = useSelector((state) => state.ghHistory.stashData);
    const peoples = useSelector((state) => state.ghHistory.people);
   // const sortedPeople = peoples.sort((a, b) => (a.removals - b.removals));//((b.removals - b.additions) - (a.removals - a.additions)));
    const peopleToDisplay = [...peoples].sort((a, b) => ((a.removals - a.additions) - (b.removals - b.additions)));

    const [currentFilters, setCurrentFilters] = useState({ league: currentLeague, account: "Any", action: "added", stash: currentStash})


    function getTableRow(entry) {
        //console.log(line);
        return <tr>
            <td>{entry.datetime}</td>
            <td>{entry.account}</td>
            <td>{entry.item}</td>
        </tr>;
    }

    function getMySelection(a) {
        return <option value={a}>{a}</option>;
    }

    const getRowsForUniques = (data) => {
        const seen = new Set();
        return data.toReversed().filter(row => {
            if (row[stashColumn] !== currentStash) return false;
            if (row[leagueColumn] !== currentLeague) return false;
            const value = row[uniqueColumn];
            if (seen.has(value)) return false;
            seen.add(value);
            return true;
        }).toReversed();
    };


    function actionSelect(e) {
        setCurrentFilters({...currentFilters, [e.target.name]: e.target.value});
    }

    function passesFilter(entry) {
        if (currentFilters.league !== "Any" && entry.league !== currentFilters.league)
            return false;
        if (currentFilters.account !== "Any" && entry.account !== currentFilters.account)
            return false;
        if (currentFilters.action !== "Any" && entry.action !== currentFilters.action)
            return false;
        if (currentFilters.stash !== "Any" && entry.stash !== currentFilters.stash)
            return false;
        return true;
    }

    return <>
        <div className="tables">
            <div className="History">
                <h3>{currentLeague} {currentStash} Stash additions</h3>

                <table>
                    <thead>
                    <tr>
                        <th>Datetime</th>
                        <th>Account</th>
                        <th>Item</th>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <td>-----</td>
                        <td>
                            <form><select name="account" onChange={(e) => actionSelect(e)}>
                                <option value="Any">Any</option>
                                {
                                    accounts.map((a) => (getMySelection(a)))
                                }
                            </select>
                            </form>
                            </td>
                            <td>-----</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        getRowsForUniques(stashData).filter((item) => passesFilter(item)).map((line) =>
                        //stashData.filter((item) => passesFilter(item)).map((line) =>
                            //  (line + " " + lineIndex)
                            getTableRow(line)
                        )
                    }
                    </tbody>
                </table>

            </div>
        </div>

    </>
}