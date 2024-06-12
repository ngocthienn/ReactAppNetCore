import React, { useState, useEffect } from "react";
import storeTemplate from "../stores/store-template";
import TemplateItem from "./template-item-component";

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    OPTIONS: '',
};

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
    const [data, setData] = useState(storeTemplate.state.data);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        const unsubscribe = storeTemplate.subscribe((state) => {
            setData(state.data);
        });

        storeTemplate.dispatch("fetchData");

        // return () => {
        //     unsubscribe();
        // };
    }, []);

    useEffect(() => {
        fetch(`${apiUrl}/Answer/GetAllAnswer`, {
            method: 'GET',
            headers,
        }).then(response => response.json())
            .then(c => {
                setAnswer(c);
            });
    }, []);
    return (
        <>
            <div>
                <h2>Template</h2>
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
                <button><a href={`/FormBuilder`}>Add</a></button>
            </div>
            <br />
            <div>
                <h2>List Answer</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Template ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Answer Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answer.length > 0 ? (
                            answer.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.templateId}</td>
                                    <td>{item.username}</td>
                                    <td><pre>{JSON.stringify(item.answerData, null, 4)}</pre></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;
