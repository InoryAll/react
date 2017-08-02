package com.service;

import com.dao.StudentDao;
import com.dao.TeacherDao;
import com.entity.Teacher;

/*处理教师个人信息操作*/
public class TeacherInfoService {
	public Teacher getTeacherById(String teaId){
		TeacherDao teaDao=new TeacherDao();
		Teacher tea=new Teacher();
		tea=teaDao.getTeacherById(teaId);
		return tea;
	}
	public String getSearchInfo(Teacher tea){
		String info="";
		if(tea==null){
			info="{\"code\":\"0\",\"message\":\"获取个人信息失败!\"}";
		}
		else{
			info="{\"code\":\"1\",\"info\":{"
					+ "\"teaId\":\""+tea.getTeaId()+"\""
					+ ",\"teaPassword\":\""+tea.getTeaPassword()+"\""
					+ ",\"teaName\":\""+tea.getTeaName()+"\""
					+ ",\"teaSex\":\""+tea.getTeaSex()+"\""
					+ ",\"teaNation\":\""+tea.getTeaNation()+"\""
					+ ",\"teaAge\":\""+tea.getTeaAge()+"\""
					+ ",\"teaDepartment\":\""+tea.getTeaDepartment()+"\""
					+ ",\"teaTel\":\""+tea.getTeaTel()+"\"}}";
		}
		return info;
	}
	public boolean updateSearchInfo(Teacher tea){
		TeacherDao teaDao=new TeacherDao();
		return teaDao.updateTeacher(tea);
	}
	public String updateReturnMessage(boolean isUpdated,Teacher tea){
		if(isUpdated){
			return getSearchInfo(tea);
		}
		else{
			return "{\"code\":\"0\",\"messagae\":\"个人信息修改失败!\"}";
		}
	}
}
