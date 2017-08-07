import 'whatwg-fetch/fetch';
import {Modal} from 'antd';
import {browserHistory} from 'react-router';
import {setCookie} from "../util";

//login
export const SET_LOGIN='SET_LOGIN';

export const setLogin=(isSucceed) => {
    return {
        type:SET_LOGIN,
        isSucceed
    };
};

export const doLogin=(id,role,password)=>{
    return (dispatch,getState)=>{
        if (role==='student'){
            fetch('http://localhost:8080/studentmanagement/StudentAction', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'id='+id+"&password="+password+"&action=login"
            }).then((response) => {
                if (response.ok){
                    return response.json();
                }
            }).then((data)=>{
                if (data.code==='0'){
                    Modal.error({
                        title: '错误',
                        content: data.message,
                    });
                    dispatch(setLogin(false));
                }
                else {
                    const modal=Modal.success({
                        title: '成功',
                        content: data.message,
                    });
                    dispatch(setLogin(true));
                    setTimeout(()=>{
                        modal.destroy();
                        browserHistory.push('/student/'+id);
                        setCookie('username',id);
                    },1000);
                }
            }).catch((e)=>{
                console.log(e.message);
            });
        }
        if (role==='teacher'){
            fetch('http://localhost:8080/studentmanagement/TeacherAction',{
                method:'POST',
                mode:'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'id='+id+"&password="+password+"&action=login"
            }).then((response) => {
                if (response.ok){
                    return response.json();
                }
            }).then((data) => {
                if (data.code==='0'){
                    Modal.error({
                        title: '错误',
                        content: data.message,
                    });
                    dispatch(setLogin(false));
                }
                else
                {
                    const modal=Modal.success({
                        title: '成功',
                        content: data.message,
                    });
                    dispatch(setLogin(true));
                    setTimeout(()=>{
                        modal.destroy();
                        browserHistory.push('/teacher/'+id);
                        setCookie('username',id);
                    },1000);
                }
            }).catch((e)=>{
                console.log(e.message);
            });
        }
    };
};

//register
export const SET_REGISTER='SET_REGISTER';

export const setRegister=(canRegistered)=>{
    return {
        type:SET_REGISTER,
        canRegistered
    };
};

export const doRegister=(user)=>{
    return (dispatch,getState)=>{
        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'id='+user.id+'&password='+user.password
            +'&name='+user.name+'&sex='+user.sex
            +'&nation='+user.nation+'&age='+user.age
            +'&department='+user.department+'&class='+user.class
            +'&tel='+user.tel+'&action=register'
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title: '失败',
                    content: data.message,
                });
                dispatch(setRegister(false));
            }
            else{
                const modal=Modal.success({
                    title: '成功',
                    content: data.message,
                });
                dispatch(setRegister(true));
                setTimeout(()=>{
                    modal.destroy();
                    browserHistory.push('/user/login');
                },1000);
            }
        });
    };
};

//student_show
export const SHOW_STUDENT_INFO='SHOW_STUDENT_INFO';

export const showStudentInfo=(student)=>{
    return {
        type:SHOW_STUDENT_INFO,
        student
    };
};

export const getStudentInfo=(id)=>{
    return (dispatch,getState)=>{
        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'id='+id+'&action=searchInfo'
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title: '失败',
                    content: '查询个人信息失败，请重试!'
                });
                dispatch(showStudentInfo({}));
            }
            else {
                /*this.setState({
                    data:data.info
                });*/
                dispatch(showStudentInfo(data.info));
            }
        }).catch((e) => {
            console.log(e.message);
        });
    };
};

//student_update
export const UPDATE_STUDENT_INFO='UPDATE_STUDENT_INFO';

export const updateStudentInfo=(student)=>{
    return {
        type:UPDATE_STUDENT_INFO,
        student
    };
};

export const getUpdatedStudentInfo=(student)=>{
    return (dispatch,getState)=>{
        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'id='+student.id+'&password='+student.password
            +'&name='+student.name+'&sex='+student.sex
            +'&nation='+student.nation+'&age='+student.age
            +'&department='+student.department+'&class='+student.class
            +'&tel='+student.tel+'&action=updateInfo'
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title: '失败',
                    content: '修改个人信息失败，请重试!'
                });
                dispatch(updateStudentInfo({}));
            }
            else{
                const modal=Modal.success({
                    title: '成功',
                    content: '修改成功!'
                });
                dispatch(updateStudentInfo(data.info));
                setTimeout(() => {
                    modal.destroy();
                },1000);
            }
        }).catch((e) => {
            console.log(e.message);
        });
    };
};

//student_course_search
export const SEARCH_STUDENT_COURSE='SEARCH_STUDENT_COURSE';

export const searchStudentCourse=(courses)=>{
    return {
        type:SEARCH_STUDENT_COURSE,
        courses
    };
};

export const getStudentCourse=(id)=>{
    return (dispatch,getState)=>{
        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'action=selectedCourse'+'&stuId='+id
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title:'错误',
                    content:'初始化失败,请重试!'
                });
                dispatch(searchStudentCourse([]));
            }
            else{
                dispatch(searchStudentCourse(data.courses));
            }
        }).catch((e) =>{
            console.log(e.message);
        });
    };
};

//course_filter
export const FILTER_COURSE='FILTER_COURSE';

export const filterCourse=(filter)=>{
    return {
        type:FILTER_COURSE,
        filter
    };
};

export const getFilterInitial=()=>{
    return (dispatch,getState)=>{
        fetch('http://localhost:8080/studentmanagement/StudentAction',{
            method:'POST',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'action=initialSearch'
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
        }).then((data) => {
            if (data.code==='0'){
                Modal.error({
                    title:'错误',
                    content:'初始化失败,请重试!'
                });
                dispatch(filterCourse({}));
            }
            else{
               /* this.setState({
                    courses:data.courses,
                    teachers:data.teachers
                });*/
                dispatch(filterCourse({
                    courses:data.courses,
                    teachers:data.teachers
                }));
            }
        }).catch((e) => {
            console.log(e.message);
        });
    };
};





