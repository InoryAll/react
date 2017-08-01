package com.service;

import com.dao.TeacherDao;
import com.entity.Teacher;

public class teacherLoginService {
	public boolean validate(String teaId,String teaPassword){
		TeacherDao teaDao=new TeacherDao();
		Teacher tea=new Teacher();
		tea=teaDao.getTeacherById(teaId);
		if(tea==null||!tea.getTeaPassword().equals(teaPassword)){
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
