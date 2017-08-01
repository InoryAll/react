package com.service;

import com.dao.StudentDao;
import com.entity.Student;

/*处理学生登录*/
public class studentLoginService {
	public boolean validate(String stuId,String stuPassword){
		StudentDao stuDao=new StudentDao();
		Student stu=new Student();
		stu=stuDao.getStudentById(stuId);
		if(stu==null||!stu.getStuPassword().equals(stuPassword)){
			return false;
		}
		return true;
	}
	public String returnMessage(boolean canLogin){
		if(canLogin){
			return "{\"code\":\"1\",\"message\":\"登录成功\"}";
		}
		return "{\"code\":\"0\",\"message\":\"用户名或密码错误,请重试\"}";
	}
}
