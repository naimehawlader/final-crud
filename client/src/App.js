//import logo from './logo.svg';
import './App.css';
import Logo from './TGU.png';
import { IoMdCloseCircle } from "react-icons/io";
import { TbHandClick } from "react-icons/tb";
import { useEffect, useState } from 'react';
import axios from "axios"
import { Formtable } from './components/Formtable';



axios.defaults.baseURL = "http://localhost:9090/"

function App() {

  const [addSection, setAddsection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    major: "",
    country: "",
    email: "",
  })
  const [formDataEdit, setFormDataEdit] = useState({
    id: "",
    name: "",
    major: "",
    country: "",
    email: "",
    _id: ""
  })

  const [dataList, setDataList] = useState([])

  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {
      setAddsection(false)
      alert(data.data.message)
      getFetchData()
    }
  }
  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }
  useEffect(() => {
    getFetchData()
  }, [])
  //console.log(dataList)

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update", formDataEdit)
    console.log(data)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }

const handleEditOnChange = async (e) => {
  const { value, name } = e.target
  setFormDataEdit((preve) => {
    return {
      ...preve,
      [name]: value
    }
  })
}

const handleEdit = (el) => {
  setFormDataEdit(el)
  setEditSection(true)
}


return (

  <div className="container">
    
    <div className="logo-container">
          <img src={Logo} alt="" />
        </div>
    <header className="container-header">Tiangong University</header>
    <button className="btn btn-add" onClick={() => setAddsection(true)} >Enroll Student</button>
    <button className="btn btn-continue">Continue</button>

    {
      addSection && (

        <Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddsection(false)}
          rest={formData}
        />
      )
    }
    {
      editSection && (

        <Formtable

          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />

      )
    }

    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Major</th>
            <th>Country</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList[0] ? (
            dataList.map((el) => {
              return (
                <tr>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.major}</td>
                  <td>{el.country}</td>
                  <td>{el.email}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(el)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              )
            }))
            : (
              <p style={{ textAlign: "center" }}>No Data</p>
            )
          }
        </tbody>
      </table>
    </div>
  </div>
);
}

export default App;
