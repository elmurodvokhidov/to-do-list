import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ContextData = React.createContext();

function ContextFunc({ children }) {

    const [info, setInfo] = useState(
        JSON.parse(localStorage.getItem('local')) || []
    );

    function refresh() {
        setInfo(JSON.parse(localStorage.getItem('local')) || [])
    }

    const [search, setSearch] = useState({
        searchK: ''
    } && '');

    //   Input 'dagi ma'lumotlar
    const [inputData, setInputData] = useState({
        id: '',
        username: '',
        password: '',
        photo: ''
    });

    // Dark Mode State
    const [darkModeUse, setDarkModeUse] = useState(
        JSON.parse(localStorage.getItem('darkMode'))
    );

    function getItem() {
        setDarkModeUse(JSON.parse(localStorage.getItem('darkMode')));
    }

    const homeLink = useNavigate();
    const addLink = useNavigate();

    function clear() {
        setInputData({
            username: "",
            password: "",
            photo: "",
            id: ""
        });
    }

    function inputFunc(e) {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    };

    function photoSend(e) {
        setInputData({
            ...inputData,
            photo: URL.createObjectURL(e.target.files[0]),
        })
    };

    // Edit
    function editFunc(a) {
        setInputData(a);
        addLink('/add')
    };

    // Delete
    function deleteFunc(baz) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                localStorage.setItem(
                    'local',
                    JSON.stringify(
                        JSON.parse(localStorage.getItem('local')).filter(
                            (din) => din.id !== baz.id
                        )
                    )
                )
                refresh();
            }
        })
    }

    // Add
    function add(e) {
        e.preventDefault();
        // console.log(inputData);
        if (inputData.username !== '' && inputData.password !== '') {
            if (inputData.id === '') {
                if (localStorage.getItem('local')) {
                    localStorage.setItem(
                        'local',
                        JSON.stringify([
                            ...JSON.parse(localStorage.getItem('local')),
                            { ...inputData, id: new Date().getTime() }
                        ])
                    )
                } else {
                    localStorage.setItem(
                        'local',
                        JSON.stringify([{ ...inputData, id: new Date().getTime() }])
                    );
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                localStorage.setItem(
                    'local',
                    JSON.stringify(
                        JSON.parse(localStorage.getItem('local')).map(baz =>
                            baz.id === inputData.id ? inputData : baz)
                    )
                )
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Edited successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            homeLink('/');
        } else {
            Swal.fire(
                'Warning!',
                'Please fill in all the blanks!',
                'warning'
            )
        }
        clear();
        refresh();
    }

    return (
        <ContextData.Provider value={{
            inputFunc,
            inputData,
            photoSend,
            add,
            info,
            setInfo,
            editFunc,
            deleteFunc,
            addLink,
            search,
            setSearch,
            clear,
            darkModeUse,
            getItem
        }}>
            {children}
        </ContextData.Provider>
    )
};

export default ContextFunc;