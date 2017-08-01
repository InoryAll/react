package com.service;

import com.dao.StudentDao;
import com.entity.Student;

/*处理学生注册*/
public class StudentRegisterService {
	public boolean validate(Student stu){
		StudentDao stuDao=new StudentDao();
		Student student=new Student();
		student=stuDao.getStudentById(stu.getStuId());
		if(student!=null){
			return true;
		}
		return false;
	}
	
	public boolean addStudent(boolean isExist,Student stu){
		if(isExist){
			return false;
		}
		else{
			StudentDao stuDao=new StudentDao();
			return stuDao.addStudent(stu);
		}
	}
	
	public String returnMessage(boolean isExist,boolean isAdded){
		if(isExist){
			return "{\"code\":\"0\",\"message\":\"用户名已存在!\"}";
		}
		if(!isAdded){
			return "{\"code\":\"0\",\"message\":\"注册失败,请重试!\"}";
		}
		return "{\"code\":\"1\",\"message\":\"恭喜您,注册成功!\"}";
	}
}
