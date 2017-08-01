package com.service;

import com.dao.StudentDao;
import com.entity.Student;

/*处理学生个人信息操作*/
public class StudentInfoService {
	public Student getStudentById(String stuId){
		StudentDao stuDao=new StudentDao();
		Student stu=new Student();
		stu=stuDao.getStudentById(stuId);
		return stu;
	}
	public String getSearchInfo(Student stu){
		String info="";
		if(stu==null){
			info="{\"code\":\"0\",\"message\":\"获取个人信息失败!\"}";
		}
		else{
			info="{\"code\":\"1\",\"info\":{"
					+ "\"stuId\":\""+stu.getStuId()+"\""
					+ ",\"stuPassword\":\""+stu.getStuPassword()+"\""
					+ ",\"stuName\":\""+stu.getStuName()+"\""
					+ ",\"stuSex\":\""+stu.getStuSex()+"\""
					+ ",\"stuNation\":\""+stu.getStuNation()+"\""
					+ ",\"stuAge\":\""+stu.getStuAge()+"\""
					+ ",\"stuDepartment\":\""+stu.getStuDepartment()+"\""
					+ ",\"stuClass\":\""+stu.getStuClass()+"\""
					+ ",\"stuTel\":\""+stu.getStuTel()+"\""
					+ ",\"stuMark\":\""+stu.getStuMark()+"\"}}";
		}
		return info;
	}
	public boolean updateSearchInfo(Student stu){
		StudentDao stuDao=new StudentDao();
		return stuDao.updateStudent(stu);
	}
	public String updateReturnMessage(boolean isUpdated){
		if(isUpdated){
			return "{\"code\":\"1\",\"message\":\"个人信息修改成功!\"}";
		}
		else{
			return "{\"code\":\"0\",\"messagae\":\"个人信息修改失败!\"}";
		}
	}
}
