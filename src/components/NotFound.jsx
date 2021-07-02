import React, { Component } from 'react'
import { toast } from 'react-toastify'

class About extends Component{
    render(){
        toast.error('Wrong email or password!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            })
        return(
            <div className="container">
                <div className="header">
                    <h1>Page Not Found</h1>
                    <label>Error 404</label>
                </div>
            </div>
        )
    }
}

export default About