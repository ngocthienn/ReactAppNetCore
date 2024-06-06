import React, { useState, useEffect } from "react";
import storeTemplate from "../stores/store-template";
import TemplateItem from "./template-item-component";

const Home = () => {
    const [data, setData] = useState(storeTemplate.state.data);
    useEffect(() => {
        const unsubscribe = storeTemplate.subscribe((state) => {
            setData(state.data);
        });

        storeTemplate.dispatch("fetchData");

        // return () => {
        //     unsubscribe();
        // };
    }, []);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <TemplateItem key={index} item={item} index={index} />
                    ))
                ) : (
                    <tr>
                        <td>Loading...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Home;
