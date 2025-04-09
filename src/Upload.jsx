import React, { useState} from "react";
import { setHistory, setPeople } from "./GSHistorySlice";
import { addLeagues, addAccounts, addStashes } from "./FilterSlice";
import {useDispatch} from "react-redux";
import exampleUrl from '/example-logs.csv?url';

export function UploadGSHistory({children}) {
    //const [bigLines, setBigLines] = useState([]);
    const dispatch = useDispatch();
    const uniquesColumn = 6;

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const lines = e.target.result.split('\n');
            let arrayOfLines = [];
            let leagues = [];
            let accounts = [];
            let stashes = [];
            let people = [];
            for (let i = 1; i < lines.length; i++) {
                let splitLine = lines[i].replaceAll("\"", "").split(',');
                if (splitLine.length !== 7){
                    continue;
                }
                if (!leagues.includes((splitLine[2]))){
                    leagues.push(splitLine[2]);
                }
                if (!accounts.includes((splitLine[3]))){
                    accounts.push(splitLine[3]);
                }
                if (!stashes.includes((splitLine[5]))){
                    stashes.push(splitLine[5]);
                }
                const person = people.find((guy) => (guy.name === splitLine[3]));
                if(person){
                    if (splitLine[4] === "removed"){
                        person.removals += 1;
                    }
                    if (splitLine[4] === "added"){
                        person.additions += 1;
                    }
                } else {
                    if (splitLine[4] === "removed"){
                        people.push({name: splitLine[3], removals: 1, additions: 0})
                    }
                    if (splitLine[4] === "added"){
                        people.push({name: splitLine[3], removals: 0, additions: 1})
                    }
                }

                const entry = {datetime: splitLine[0], id: splitLine[1], league: splitLine[2], account: splitLine[3], action: splitLine[4], stash: splitLine[5], item: splitLine[6]}
                arrayOfLines.push(entry);

            }
            dispatch(addLeagues(leagues));
            dispatch(addAccounts(accounts));
            dispatch(addStashes(stashes));
            dispatch(setPeople(people));
            dispatch(setHistory(arrayOfLines));
        };

    };

    return (
        <>
            <h2>Upload Guild Stash Logs</h2>
            <div className="log-choices">
                <input type="file" accept=".csv" onChange={handleChange}/>
                <a href={exampleUrl}>Download Example Logs</a>

            </div>
            <div className="patient"><br/> The file will take a minute to load</div>
        </>
    );
}