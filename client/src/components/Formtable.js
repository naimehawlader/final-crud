import React from 'react'
import "../App.css"
import { IoMdCloseCircle } from 'react-icons/io'
import { TbHandClick } from 'react-icons/tb'
//import Logo from '../Assets/TGU.png'

export const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleclose}><IoMdCloseCircle /></div>

                <label htmlFor="id">ID : </label>
                <input type="string" id="id" name="id" onChange={handleOnChange} value={rest.id} />

                <label htmlFor="name">Name : </label>
                <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name} />

                <label htmlFor="major">Major : </label>
                <input type="text" id="major" name="major" onChange={handleOnChange} value={rest.major} />


                <label htmlFor="country">Country : </label>
                <input type="text" id="country" name="country" onChange={handleOnChange} value={rest.country} />

                <label htmlFor="email">Email : </label>
                <input type="text" id="email" name="email" onChange={handleOnChange} value={rest.email} />

                <button className="btn"> Submit </button>

                <div className="click-btn"><TbHandClick /></div>

            </form>
        </div>

    )
}
