package com.service;

import java.util.ArrayList;

import com.dao.CourseDao;
import com.entity.Course;

public class TeacherCourseService {
	public String getSearchTable(String teaId){
		CourseDao courseDao=new CourseDao();
		ArrayList<Course> courses=new ArrayList<Course>();
		courses=courseDao.getCourseByTeaId(teaId);
		String courseStr="";
		
		if(courses!=null){
			for(int i=0;i<courses.size();i++){
				if(i==courses.size()-1){
					courseStr+="{\"courseId\":\""+courses.get(i).getCourseId()+"\""
							+ ",\"courseName\":\""+courses.get(i).getCourseName()+"\""
							+ ",\"courseKind\":\""+courses.get(i).getCourseKind()+"\""
							+ ",\"courseSchedule\":\""+courses.get(i).getCourseSchedule()+"\""
							+ ",\"courseCredits\":\""+courses.get(i).getCourseCredits()+"\""
							+ ",\"key\":\""+i+"\"}";
					break;
				}
				courseStr+="{\"courseId\":\""+courses.get(i).getCourseId()+"\""
							+ ",\"courseName\":\""+courses.get(i).getCourseName()+"\""
							+ ",\"courseKind\":\""+courses.get(i).getCourseKind()+"\""
							+ ",\"courseSchedule\":\""+courses.get(i).getCourseSchedule()+"\""
							+ ",\"courseCredits\":\""+courses.get(i).getCourseCredits()+"\""
							+ ",\"key\":\""+i+"\"}"
							+",";
			}
			courseStr="["+courseStr+"]";	
			return "{\"code\":\"1\",\"courses\":"+courseStr+"}";
		}
		return "{\"code\":\"0\",\"message\":\"初始化失败，请重试!\"}";
	}
}
