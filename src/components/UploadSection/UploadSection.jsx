import { useContext, useState } from 'react';
import InputField from '../InputField/InputField';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { read, utils } from 'xlsx';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import { AppContext } from '../../contexts/AppContext';
// import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';


const UploadSection = () => {
    const [uploadedJSON, setUploadedJSON] = useState([]);
    const { store } = useContext(AppContext);
    const navigate = useNavigate();
    const { platforms } = store;
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false)


    const handleSubmit = async e => {
        e.preventDefault();

        setUploading(true);
        setProgress(0)

        const time = new Date().getTime();

        // inserting date and platform in excel converted json
        const updatedJSON = uploadedJSON.map(item => {
            const newItem = { ...item }; // Create a shallow copy

            newItem.platformName = e.target['platform-name'].value;
            newItem.uploadDate = e.target['date'].value.split("-").slice(0, 2).join("-");
            newItem.uploadTime = time;

            Object.keys(newItem).forEach(k => {
                if (k.includes('__EMPTY')) {
                    delete newItem[k];
                }
            });

            Object.keys(newItem).forEach(k => {
                if (newItem[k].length === 0) {
                    newItem[k] = "N/A";
                }
            });

            return newItem;
        });

        console.log(updatedJSON);



        const batchSize = 100; // Adjust the batch size according to your needs

        // Calculate the total number of batches
        const totalBatches = Math.ceil(updatedJSON.length / batchSize);

        // Function to upload a batch and handle progress
        const uploadBatch = async (batch, batchNumber) => {
            const config = {
                headers: {
                    token: localStorage.getItem("token")
                },
                // onUploadProgress: progressEvent => {
                //     // Calculate the upload percentage
                //     // const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //     // Update your progress bar here using the calculated percentage
                //     // console.log(`Batch ${batchNumber} - Upload Progress: ${progressPercentage}%`);
                // }
            };

            try {
                const { data } = await axios.post(backendUrl + 'revenue-upload', batch, config);

                if (data.acknowledged) {
                    // toast.success(`Batch ${batchNumber} - File Uploaded Successfully`);
                    setProgress(batchNumber * 100 / totalBatches);
                }
            } catch (error) {
                if (error.response.data.message === 'jwt expired') {
                    navigate('/login')
                }
                // console.error(`Batch ${batchNumber} - ${error.response.data}`);
            }
        };

        // Upload batches with progress
        for (let i = 0; i < totalBatches; i++) {
            const startIndex = i * batchSize;
            const endIndex = Math.min((i + 1) * batchSize, updatedJSON.length);
            const batch = updatedJSON.slice(startIndex, endIndex);
            await uploadBatch(batch, i + 1); // Pass batch number for logging

            if (i === totalBatches - 1) {
                // console.log("Last iteration of the loop");
                setTimeout(() => {
                    setUploading(false);
                    toast.success("File successfully uploaded")
                }, 1000)
                // Additional code specific to the last iteration can be added here
            }
        }

    };




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

            // console.log(uploadedJSON);

            if ((hasAllFields(jsonData[dataKey][0], fields))) {
                // console.log();

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
        <div className="w-2/3 mx-auto shadow p-2 relative">
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
            {uploading && <div className="rounded-full absolute bottom-0 left-0 w-full h-1 bg-grey-light z-[99999] overflow-hidden">
                <div style={{ width: progress + "%" }} className="h-1 bg-primary-light transition-[width]"></div>
            </div>}
        </div>
    );
};

// UploadSection.propTypes = {
//     setProgress: PropTypes.func,
//     progress: PropTypes.string
// }

export default UploadSection;