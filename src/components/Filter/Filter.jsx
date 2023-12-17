import axios from 'axios';
import { useContext } from 'react';
import { backendUrl } from '../../constants';
import Button from '../Button/Button';
import { AppContext } from '../../contexts/AppContext';

const Filter = () => {
    const months = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const { store } = useContext(AppContext);
    const { platforms, token } = store

    const handleDelete = (e) => {
        e.preventDefault();

        // console.log(e.target.monthsList.value, e.target.years.value, e.target.platforms.value,);
        const reqBody = {
            month: e.target.monthsList.value,
            year: e.target.years.value,
            platform: e.target.platforms.value
        }
        const config = {
            headers: {
                token: token
            }
        }

        axios.delete(backendUrl + 'revenue' + '/' + reqBody.month + '/' + reqBody.year + '/' + reqBody.platform, config).then(({ data }) => console.log(data))
    }
    return (
        <form className="flex mt-6 items-center justify-center overflow-y-visible" onSubmit={handleDelete}>
            <div className="w-1/4">
                <label htmlFor="months" className="mr-1">Select Months</label>
                <select name="monthsList" id="months" className="p-1" required>
                    {months.map((item, key) => <option key={key} value={key + 1 > 9 ? key + 1 : `0${key + 1}`}>{item}</option>)}
                </select>
            </div>

            <div className="w-1/4">
                <label htmlFor="years" className="mr-1">Select Year</label>
                <select name="years" id="years" className="p-1" required>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                </select>
            </div>

            <div className="w-1/4">
                <label htmlFor="platforms" className="mr-1">Select Platforms</label>
                <select name="platforms" id="platforms" className="p-1" required>
                    {platforms ? platforms.map(item => <option key={item._id}>{item.cat_name}</option>) : "Loading..."}
                </select>
            </div>
            <Button type={'submit'} text={"Delete"} onClick={handleDelete}>Delete</Button>
        </form>
    );
};

export default Filter;