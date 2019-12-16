import React, { Component } from 'react';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { LoginSuccessAction, Loginthunk, Login_error } from './../redux/actions'
// import Loader from 'react-loader-spinner'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

class Register extends Component {
    state = {
        error: '',
        loading: false,
        toLoginPage:false
    }

onRegisterClick = (e) => {
    e.preventDefault()
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var repassword = this.refs.repassword.value;
    var role = "user";
    var newUser = { username, password, role };
    if (username === "" || password === "" || repassword === "") {
        MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Data Gaboleh Ada Yang Kosong!"
        });
    } else {
        Axios.get(`${APIURL}/users?username=${username}`)
            .then(res1 => {
                console.log(res1);
                if (res1.data.length === 0) {
                    if (password !== repassword) {
                        MySwal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Password must match"
                        });
                    } else {
                        Axios.post(`${APIURL}/users`, newUser)
                            .then(res => {
                                MySwal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: "Your are success Registered! Please Login"
                                });
                                this.setState({ toLoginPage: true });

                            })
                            .catch(err1 => {
                                console.log(err1);
                            });
                    }
                } else {
                    MySwal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `"${username}" is not Available, Try Using Another Username :`
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

    render() {
        if (this.state.toLoginPage) {
            return <Redirect to={'/login'} />
        }
        return (
            <div>
                <div className="mt-3 d-flex justify-content-center">
                    <div style={{ width: '500px', border: '1px solid black' }} className='rounded p-2'>
                        <h1>Register</h1>
                        <div className='p-1' style={{ borderBottom: '1px solid black' }}>
                            <input type='text' className='username' style={{ border: 'transparent', width: '100%', fontsize: '20px' }} ref='username' placeholder='Username' />
                        </div>
                        <div className='p-1' style={{ borderBottom: '1px solid black' }}>
                            <input type='password' className='username' style={{ border: 'transparent', width: '100%', fontsize: '20px' }} ref='password' placeholder='Password' />
                        </div>
                        <div className='p-1' style={{ borderBottom: '1px solid black' }}>
                            <input type='password' className='username' style={{ border: 'transparent', width: '100%', fontsize: '20px' }} ref='repassword' placeholder='Re-enter Password' />
                        </div>
                        {/* {this.props.Auth.error === '' ?
                            null
                            :
                            <div className="alert alert-danger mt-2">
                                {this.props.Auth.error} <span onClick={this.props.Login_error} className='float-right font-weight-bold'>x</span>
                            </div>
                        } */}
                        <div className='mt-4'>
                            {/* {this.props.Auth.loading ?
                                <Loader
                                    type="Triangle"
                                    color="#FF6969"
                                    height={100}
                                    width={100}
                                />
                                : */}
                                <button className='btn btn-primary' onClick={this.onRegisterClick}>Register</button>
                            {/* } */}
                        </div>
                        <div className='mt-2'>
                            sudah punya akun? <Link to='/login'>Login</Link> aja
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const MapStateToProps = (state) => {
    return {
        AuthLog: state.Auth.login,
        Auth: state.Auth
    }
}

export default connect(MapStateToProps, { LoginSuccessAction, Loginthunk, Login_error })(Register);





// onClickRegister = (e) => {
//     e.preventDefault()
//     var username = this.refs.username.value;
//     var password = this.refs.password.value;
//     var repassword = this.refs.repassword.value;
//     var role = "user";
//     var newUser = { username, password, role };
//     if (username === "" || password === "" || repassword === "") {
//         MySwal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Data Gaboleh Ada Yang Kosong!"
//         });
//     } else {
//         Axios.get(`${url}users?username=${username}`)
//             .then(res1 => {
//                 console.log(res1);
//                 if (res1.data.length === 0) {
//                     if (password !== repassword) {
//                         MySwal.fire({
//                             icon: "error",
//                             title: "Oops...",
//                             text: "Password must match"
//                         });
//                     } else {
//                         Axios.post(`${url}users`, newUser)
//                             .then(res => {
//                                 MySwal.fire({
//                                     icon: "success",
//                                     title: "Success!",
//                                     text: "Your are success Registered! Please Login"
//                                 });
//                                 this.setState({ toLoginPage: true });

//                             })
//                             .catch(err1 => {
//                                 console.log(err1);
//                             });
//                     }
//                 } else {
//                     MySwal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: `"${username}" is not Available, Try Using Another Username :`
//                     });
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// }