import { useContext, useState } from 'react';
import InputField from '../InputField/InputField';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { read, utils } from 'xlsx';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import { AppContext } from '../../contexts/AppContext';
const UploadSection = () => {
    const [uploadedJSON, setUploadedJSON] = useState([]);
    const { store } = useContext(AppContext);
    const { platforms } = store


    const handleSubmit = e => {
        e.preventDefault();

        const time = new Date().getTime()

        // inserting date and platform in excel converted json

        uploadedJSON.map(item => {
            item.platformName = e.target['platform-name'].value;
            item.date = e.target['date'].value;
            item.uploadTime = time
        })

        const batchSize = 100; // Adjust the batch size according to your needs

        for (let i = 0; i < uploadedJSON.length; i += batchSize) {
            const batch = uploadedJSON.slice(i, i + batchSize);
            const config = {
                headers: {
                    token: localStorage.getItem("token")
                }
            }

            axios.post(backendUrl + 'revenue-upload', batch, config)
                .then(({ data }) => console.log(data))
                .catch(err => console.log(err.response.data))
        }

    }


    function hasAllFields(obj, requiredFields) {
        return requiredFields.every(field => Object.prototype.hasOwnProperty.call(obj, field));
    }


    const readExcel = (file) => {
        const reader = new FileReader();

        // Fields to Match
        const fields = ['Date', 'Time', 'product', 'isrc', 'upc', 'vendor', 'catalogue id', 'composer', 'Lyricist', 'track_artist', 'song_name', 'album', 'Language', 'Content ID', 'label', 'country', 'file_name', 'months', 'total', 'royality', 'platform tds', 'after tds revenue', 'forevision cut', 'final revenue']

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = read(data, { type: 'binary', raw: false });
            const jsonData = {};
            workbook.SheetNames.forEach((sheetName) => {
                // Set defval option to an empty string to handle empty cells
                const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
                jsonData[sheetName] = sheetData;
            });
            const dataKey = Object.keys(jsonData)[0]
            setUploadedJSON(jsonData[dataKey]);

            if ((hasAllFields(jsonData[dataKey][0], fields))) {
                console.log(Object.keys(jsonData[dataKey][0]));

                setUploadedJSON(jsonData[dataKey]);
            } else {
                toast.error("Format Didn't match")
            }

        };

        reader.readAsBinaryString(file);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        if (file) {
            readExcel(file);
        }
    };

    return (
        <div className="w-2/3 mx-auto shadow p-2">
            <form className="flex mx-auto flex-col gap-1" onSubmit={handleSubmit}>
                {/* <InputField type placeholder="Platform Name" type="text" /> */}
                <label htmlFor="platform-name">Platform Name</label>
                <select name="platform-name" id="platform-name" className="bg-surface-white-surface-1 p-2 focus:outline-none cursor-pointer" required>
                    {platforms?.map(item => <option key={item._id}>{item.cat_name}</option>)}
                </select>
                <InputField accept=".xls, .xlsx" type="file" name={'file'} onChange={handleFileUpload} required />
                <InputField type="date" name={'date'} placeholder="dd-mm-yyyy"
                    min="1997-01-01" max="2030-12-31" required />

                <Button type={'submit'} text={'Add file'} className='mx-auto'></Button>
            </form>
        </div>
    );
};

export default UploadSection;