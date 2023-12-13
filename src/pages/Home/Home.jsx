// import React from 'react';

import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { read, utils } from "xlsx"

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const sorted = users.sort((a, b) => a.emailId.localeCompare(b.emailId));
    const [uploadedJSON, setUploadedJSON] = useState([])

    const [counts, setCounts] = useState({});

    // console.log(counts);

    useEffect(() => {
        const config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }
        // axios.get(backendUrl + 'users', config).then(res => setUsers(res.data)).catch(err => console.log(err.response.data))
        axios.get(backendUrl + 'dashboard', config).then(res => setCounts(res.data)).catch(err => {
            if (err.response.data.message === "jwt expired") {
                localStorage.removeItem("token");
                navigate("/login")
            }
        })

    }, [])


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            readExcel(file);
        }
    };

    const readExcel = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = read(data, { type: 'binary' });
            const jsonData = {};
            workbook.SheetNames.forEach((sheetName) => {
                const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName]);
                jsonData[sheetName] = sheetData;
            });

            setUploadedJSON(jsonData['Лист1']);
        };

        reader.readAsBinaryString(file);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(uploadedJSON);
    }


    return (
        <div>
            {/* <h4 className="text-heading-4-bold text-center">Total Users: {sorted.length}</h4> */}

            <div className="grid grid-cols-4 w-3/4 mx-auto gap-3 py-3">
                <div className="shadow p-4 rounded">
                    <h6 className="text-heading-6">Total Users</h6>
                    <h5 className="text-heading-5-bold mt-1">{counts.usersCount || 0}</h5>
                </div>

                <div className="shadow p-4 rounded">
                    <h6 className="text-heading-6">Total Songs</h6>
                    <h5 className="text-heading-5-bold mt-1">{counts.isrcCount || 0}</h5>
                </div>

                <div className="shadow p-4 rounded">
                    <h6 className="text-heading-6">Top Contributor</h6>
                    <h5 className="text-heading-5-bold mt-1">{counts.topContributor ? counts.topContributor.partnerName : "..."}</h5>
                </div>

                <div className="shadow p-4 rounded">
                    <h6 className="text-heading-6">-</h6>
                    <h5 className="text-heading-5-bold mt-1">-</h5>
                </div>
            </div>

            <div className="w-1/3 mx-auto shadow p-2">
                <form className="flex mx-auto flex-col gap-1" onSubmit={handleSubmit}>
                    <InputField placeholder="Platform Name" type="text" />
                    <InputField accept=".xls, .xlsx" type="file" name={'file'} onChange={handleFileUpload} />
                    <InputField type="date" />

                    <Button type={'submit'} text={'Add file'} className='mx-auto'></Button>
                </form>
            </div>

            <Button className="fixed bottom-3 right-3" onClick={() => {
                localStorage.removeItem("token");
                navigate("/login")
            }}>Logout</Button>
        </div>
    );
};

export default Home;