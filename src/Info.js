import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { ContextData } from "./Context";
import { AiOutlineBars, AiOutlineFile, AiOutlineSetting } from "react-icons/ai";
import { FiCreditCard } from "react-icons/fi";
import { GiAchievement } from "react-icons/gi";
import { MdOutlineInsertChart } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

function Info() {

    const { info, editFunc, deleteFunc, addLink, search, setSearch, darkModeUse, getItem } = useContext(ContextData);

    const [menu, setMenu] = useState(false);

    function addLinkF() {
        addLink('/add')
        setSearch({
            searchK: ''
        } && '')
    };

    // Dark Mode Function
    function darkMode() {
        if (localStorage.getItem('darkMode') === 'false') {
            localStorage.setItem('darkMode', 'true')
        } else {
            localStorage.setItem('darkMode', 'false')
        }
        getItem();
    };

    // Menu function
    function menuF() {
        setMenu(!menu);
    }

    return (
        <div className="info" id={darkModeUse ? 'dark' : ''}>
            <div className="left" id={menu ? 'openMenu' : 'closeMenu'}>
                <div className="lTop">
                    <figure><img src="./img/Vector.png" alt="Vector.png" /></figure>
                    <h3>cloudcash</h3>

                    <div className="htRight">
                        <p><img src="./img/Group 138.png" alt="Group 138.png" /></p>
                        <p><img src="./img/bell.png" alt="bell.png" /></p>
                        <p><span onClick={darkMode} className="darkMode">{darkModeUse ? <BsSun /> : <BsMoon />}</span></p>
                        <p className="orange"><img src="./img/Group 135.png" alt="Group 135.png" /></p>
                        <p><span className="menu" onClick={menuF}><RxCross2 /></span></p>
                    </div>
                </div>

                <div className="lBottom">
                    <div className="lWrapper">
                        <div>
                            <span><MdOutlineInsertChart /></span>
                            <button>Overview</button>
                        </div>
                        <div className="second">
                            <span><AiOutlineBars /></span>
                            <button>Worker</button>
                        </div>
                        <div>
                            <span><FiCreditCard /></span>
                            <button>Cards</button>
                        </div>
                        <div>
                            <span><AiOutlineFile /></span>
                            <button>Invoices</button>
                        </div>
                        <div>
                            <span><GiAchievement /></span>
                            <button>Goals</button>
                        </div>
                        <div>
                            <span><AiOutlineSetting /></span>
                            <button>Settings</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="header">
                    <div className="hTop">
                        <div className="lTop">
                            <figure><img src="./img/Vector.png" alt="Vector.png" /></figure>
                            <h3>cloudcash</h3>
                        </div>

                        <div className="htLeft">
                            <h1>Weekly sumup</h1>
                            <h3>Get summary of your weekly online transactions here.</h3>
                        </div>

                        <div className="htRight">
                            <p><img src="./img/Group 138.png" alt="Group 138.png" /></p>
                            <p><img src="./img/bell.png" alt="bell.png" /></p>
                            <p><span onClick={darkMode} className="darkMode">{darkModeUse ? <BsSun /> : <BsMoon />}</span></p>
                            <p className="orange"><img src="./img/Group 135.png" alt="Group 135.png" /></p>
                        </div>

                        <p><span className="menu" onClick={menuF}><FiMenu /></span></p>
                    </div>

                    <div className="htLeft media450">
                        <h1>Weekly sumup</h1>
                        <h3>Get summary of your weekly online transactions here.</h3>
                    </div>

                    <div className="hBottom">
                        <input onInput={(e) => setSearch(e.target.value)} value={search.searchK} type="text" name="search" id="search" placeholder="Search" />
                        <button onClick={addLinkF}>Add</button>
                    </div>
                </div>

                <div className="footer">
                    <Table id={darkModeUse ? 'dark' : ''}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>image</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Activ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                info.length > 0 ?
                                    info.filter((item) => {
                                        if (search === "") {
                                            return item;
                                        } else if (
                                            item.username.toLowerCase().includes(search.toLowerCase())
                                            // item.body.toLowerCase().includes(search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    })
                                        .map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="tdImg">
                                                        {item.photo !== '' ?
                                                            <img src={item.photo} alt={item.username} />
                                                            : <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="Avatar" />}
                                                    </div>
                                                </td>
                                                <td>{item.username}</td>
                                                <td>{item.password}</td>
                                                <td className="activ">
                                                    <button onClick={() => editFunc(item)}><img src="./img/edit.svg" alt="edit.svg" /></button>
                                                    <button onClick={() => deleteFunc(item)}><img src="./img/Vector.svg" alt="Vector.svg" /></button>
                                                </td>
                                            </tr>
                                        )) : <tr>
                                        <td colSpan={10} style={{ textAlign: 'center', fontSize: '22px', padding: '10px' }}>Information not found</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Info;