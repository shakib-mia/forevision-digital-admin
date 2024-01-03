import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import UploadSection from "../../components/UploadSection/UploadSection";
import List from "../../components/List/List";
import Filter from "../../components/Filter/Filter";
import { useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    // const [progress, setProgress] = useState(0)

    return (
        <>

            <div className="max-w-[1200px] mx-auto relative">
                <Header />
                <UploadSection />
                <Filter />
                <List />

                <Button className="fixed bottom-3 right-3" onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login")
                }}>Logout</Button>
            </div>
        </>
    );
};

export default Home;