import React, { useEffect, useState } from "react";
import NewsList from "../components/newsList/NewsList";
import NewsService from "../API/NewsService";
import { useFetching } from "../hooks/useFetching";
import axios from "../API/axiosConfig";

function UsersNews() {

    const [newslist, setNewslist] = useState([]);
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`/news`);
                setNewslist(response.data);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchSchedule();
    }, []);


    return (
        <NewsList newslist={newslist} />
    );
}

export default UsersNews;
