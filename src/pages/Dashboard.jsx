// eslint-disable-next-line no-unused-vars
import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
  
function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
 
    useEffect(()=>{
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            navigate("/");
        }else {
            getKaryawan()
        }
    },[])
 
    const getKaryawan = () => {
        axios.get('/karyawan', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
           setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }
 
    const createKaryawan = () => {
        axios.post('/karyawan/{id}', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
            setIsSubmitting(false)
        })
        .catch((e) => {
            setIsSubmitting(false)
            if (e.response.data.errors != undefined) {
                setValidationErrors(e.response.data.errors);
            }
            if (e.response.data.error != undefined) {
                setValidationErrors(e.response.data.error);
            }
        });
    }
 
    const getKaryawanWithId = () => {
        axios.get('/karyawan/{id}', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
           setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }
 
    const deleteKaryawan = () => {
        axios.delete('/karyawan/{id}', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
    }
 
    const logoutAction = () => {
        axios.post('logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        // eslint-disable-next-line no-unused-vars
        .then((r) => {
            localStorage.setItem('token', "")
           navigate("/");
        })
        .catch((e) => {
            console.log(e)
        });
    }
     
    return (
        <Layout>
           <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Dashboard</a>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a onClick={()=>logoutAction()} className="nav-link " aria-current="page" href="#">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Umur</th>
                        <th scope="col">Tanggal Lahir</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">No HP</th>
                        <th scope="col">Email</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nama}</td>
                            <td>{item.umur}</td>
                            <td>{item.tanggal_lahir}</td>
                            <td>{item.alamat}</td>
                            <td>{item.no_handphone}</td>
                            <td>{item.email}</td>
                            <td> 
                                <button type="button" className="btn btn-primary mr-5">Lihat</button>
                                <button type="button" className="btn btn-success">Ubah</button>
                                <button type="button" className="btn btn-danger">Hapus</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
   
export default Dashboard;