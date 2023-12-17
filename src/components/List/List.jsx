import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../constants';

const List = () => {
    const [revenues, setRevenues] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }


        axios.get(backendUrl + 'revenue', config).then(res => setRevenues(res.data))
    }, [])

    let keysToRemove = ['_id', 'platform_name', 'platform_classified_genre', 'uploadTime', 'platform_song_id', 'product_code', 'territory', "label_provided_genre"];

    function removeKeys(obj, keysToRemove) {
        let newObj = { ...obj }; // Creating a shallow copy of the original object

        keysToRemove.forEach(key => {
            delete newObj[key];
        });

        return newObj;
    }
    // Creating a new array with modified objects
    let modifiedData = revenues.map(item => removeKeys(item, keysToRemove));

    return (
        <div className="mx-auto mt-5 overflow-x-auto text-center relative">
            <h1 className="text-heading-1-bold sticky left-0 top-0">{modifiedData.length}</h1>
            <ul className="flex items-center list-none justify-between w-[100vw] gap-3 font-bold">  {modifiedData.length ? Object.keys(modifiedData[0]).slice(1, Object.keys(modifiedData[0]).length).map(item => !item.includes('EMPTY') && <li className="w-[6.67rem] capitalize" key={item}>{item.includes("_") ? item.split("_").join(" ") : item}</li>) : <></>}</ul>

            {modifiedData.map(item => <li className="flex w-[100vw] gap-3 justify-between py-2" key={item._id}>
                {Object.keys(item).slice(1, Object.keys(item).length).map(k => <div className="w-[6.67rem] break-words" key={k}>{item[k]}</div>)}
            </li>)}
        </div>
    );
};

export default List;