import React, { useState, useEffect } from 'react'

function View() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [button, setbutton] = useState("")
    const [record, setrecord] = useState([])
    let id = Math.floor(Math.random() * 100)


    const submit = () => {
        let obj = { id, password, email }
        if (button) {
            let recc = [...record]
            let ans = recc.map((val) => {
                if (val.id === button) {
                    return {
                        ...val,
                        email: email,
                        password: password
                    }
                }
                return val
            })
            setrecord(ans)
            localStorage.setItem("user", JSON.stringify(ans))
            setbutton('')

        } else {
            let ans = [...record, obj]
            setrecord(ans)
            localStorage.setItem("user", JSON.stringify(ans))
        }
        setemail('')
        setpassword('')
    }

    const remove = (id) => {
        let rec = [...record]
        let deleterec = rec.filter((val) => {
            return val.id != id
        })

        setrecord(deleterec)
        localStorage.setItem("user", JSON.stringify(deleterec))
    }

    const edit = (id) => {
        let rec = [...record]
        let editrec = rec.find((val) => {
            return val.id === id
        })

        setbutton(id)
        setemail(editrec.email)
        setpassword(editrec.password)
        localStorage.setItem("user", JSON.stringify(editrec))
    }

    useEffect(() => {
        let recc = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : []
        setrecord(recc)
    }, [])


    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center", marginTop: "10px" }}>Form</h1>
                <form style={{ background: "lightblue", padding: "25px", margin: "20px" }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    {
                        button ? <button type="button" onClick={submit} className="btn btn-success">edit</button> : <button type="button" onClick={submit} className="btn btn-primary">Submit</button>
                    }
                </form>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          record && record.map((val) => 
                            
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.email}</td>
                                        <td>{val.password}</td>
                                        <td>
                                            <button type="button" class="btn btn-success me-2" onClick={() => edit(val.id)}>Edit</button>
                                            <button type="button" class="btn btn-danger" onClick={() => remove(val.id)}>Delete</button>
                                        </td>
                                    </tr>
                                
                            
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default View