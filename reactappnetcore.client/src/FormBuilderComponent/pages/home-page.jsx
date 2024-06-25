/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TemplateItem from "../components/template-item-component";
import templateStore from '../stores/templateStore';
import NavBar from "../components/nav-bar-component";

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    OPTIONS: '',
};

const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [template, setTemplate] = useState([]);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        templateStore.dispatch('getAllTemplate');
        templateStore.subscribe(state => onUpdateByStore(state));
    }, []);

    const onUpdateByStore = (state) => {
        setTemplate(state.data);
    }
    

    // useEffect(() => {
    //     const unsubscribe = storeTemplate.subscribe((state) => {
    //         settemplate(state.template);
    //     });

    //     storeTemplate.dispatch("fetchtemplate");

    //     // return () => {
    //     //     unsubscribe();
    //     // };
    // }, []);

    // useEffect(() => {
    //     fetch(`${apiUrl}/Answer/GetAllAnswer`, {
    //         method: 'GET',
    //         headers,
    //     }).then(response => response.json())
    //         .then(c => {
    //             setAnswer(c);
    //         });
    // }, []);
    return (
        <>
            <NavBar />
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
                        {template?.length > 0 ? (
                            template.map((item, index) => (
                                <TemplateItem key={index} item={item} index={index} />
                            ))
                        ) : (
                            <tr>
                                <td>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button><a href={`/form-builder`}>Add</a></button>
            </div>
            <br />
            {/* <div>
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
            </div> */}
        </>
    );
};

export default HomePage;