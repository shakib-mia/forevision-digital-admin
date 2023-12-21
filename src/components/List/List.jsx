import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../constants';

const List = () => {
    const [revenues, setRevenues] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0)

    useEffect(() => {
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }


        axios.post(backendUrl + 'revenue', { currentPage: page - 1, page }, config).then(res => {
            const { data, count } = res.data;
            setCount(Math.ceil(count / 100));
            setRevenues(data)
        })
    }, [page])

    // let keysToRemove = ['_id', 'platform_name', 'platform_classified_genre', 'uploadTime', 'platform_song_id', 'product_code', 'territory', "label_provided_genre"];
    let keysToRemove = [];

    function removeKeys(obj, keysToRemove) {
        let newObj = { ...obj }; // Creating a shallow copy of the original object

        keysToRemove.forEach(key => {
            delete newObj[key];
        });

        return newObj;
    }
    // Creating a new array with modified objects
    let modifiedData = revenues.map(item => removeKeys(item, keysToRemove));

    // new Array(5).map(item => console.log(item))
    const newArr = Array.apply(null, Array(count))
        .map(function () { });
    // newArr.map((item, key) => console.log(item, key))

    return (
        <>
            <div className="mx-auto mt-5 overflow-x-auto text-center relative">
                <h1 className="text-heading-1-bold sticky left-0 top-0">{modifiedData.length}</h1>
                <ul className="flex items-center list-none justify-between w-[100vw] gap-3 font-bold">  {modifiedData.length ? Object.keys(modifiedData[0]).slice(1, Object.keys(modifiedData[0]).length).map(item => !item.includes('EMPTY') && <li className="w-[6.67rem] capitalize" key={item}>{item.includes("_") ? item.split("_").join(" ") : item}</li>) : <></>}</ul>

                {modifiedData.map(item => <li className="flex w-[100vw] gap-3 justify-between py-2" key={item._id}>
                    {Object.keys(item).slice(1, Object.keys(item).length).map(k => <div className="w-[6.67rem] break-words" key={k}>{item[k]}</div>)}
                </li>)}
            </div>
            <div className="flex gap-2 flex-wrap">
                {newArr.map((i, key) => <button key={key} onClick={() => setPage(key + 1)} className='p-3 border'>{key + 1}</button>)}

            </div>
        </>
    );
};

export default List;