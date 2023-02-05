import { useContext } from "react";
import { ContextData } from "./Context";
import { RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Add() {

    const { inputFunc, inputData, photoSend, add, clear, darkModeUse } = useContext(ContextData);

    const exit = useNavigate();

    function exitF() {
        exit('/');
        clear();
    };

    return (
        <>
            <div className="add" id={darkModeUse ? 'dark' : ''}>
                <span className="exit" onClick={exitF}><RxExit /></span>
                <form action="#">
                    <h1>{inputData.id === '' ? 'Add worker' : 'Edit worker'}</h1>
                    <div className="input">
                        <label htmlFor="username">Username</label>
                        <input value={inputData.username} onInput={(e) => inputFunc(e)} type="text" name="username" id="username" placeholder="Enter your Username" />
                    </div>

                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input value={inputData.password} onInput={(e) => inputFunc(e)} type="password" name="password" id="password" placeholder="Enter your Password" autoComplete="true" />
                    </div>

                    <div className="formFooter">
                        <label htmlFor="photo" id="labelPhoto">
                            <p>Image</p>
                            <img src="./img/Group 177.svg" alt="" />
                        </label>
                        <input onInput={(e) => photoSend(e)} type="file" name="photo" id="photo" />
                    </div>
                    <div className="formBtn">
                        <button type="submit" onClick={add}>{inputData.id === '' ? 'Add worker' : 'Edit worker'}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Add;