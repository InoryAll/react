package com.service;

import java.util.ArrayList;

import com.dao.CourseDao;
import com.dao.S_T_CDao;
import com.dao.T_C_ViewDao;
import com.entity.Course;
import com.entity.S_T_C;
import com.entity.T_C_View;

public class StudentJudgeService {
	public String getJudgedSearchTable(String stuId){
		T_C_ViewDao viewDao=new T_C_ViewDao();
		ArrayList<T_C_View> courses=new ArrayList<T_C_View>();
		courses=viewDao.getJudgedCourseView(stuId);
		String courseStr="";
		
		if(courses!=null){
			for(int i=0;i<courses.size();i++){
				if(i==courses.size()-1){
					courseStr+="{\"courseId\":\""+courses.get(i).getCourseId()+"\""
							+ ",\"courseName\":\""+courses.get(i).getCourseName()+"\""
							+ ",\"teaId\":\""+courses.get(i).getTeaId()+"\""
							+ ",\"teaName\":\""+courses.get(i).getTeaName()+"\""
							+ ",\"courseKind\":\""+courses.get(i).getCourseKind()+"\""
							+ ",\"courseSchedule\":\""+courses.get(i).getCourseSchedule()+"\""
							+ ",\"courseCredits\":\""+courses.get(i).getCourseCredits()+"\""
							+ ",\"key\":\""+i+"\"}";
					break;
				}
				courseStr+="{\"courseId\":\""+courses.get(i).getCourseId()+"\""
							+ ",\"courseName\":\""+courses.get(i).getCourseName()+"\""
							+ ",\"teaId\":\""+courses.get(i).getTeaId()+"\""
							+ ",\"teaName\":\""+courses.get(i).getTeaName()+"\""
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
	
	public boolean judgeCourseById(S_T_C s_t_c){
		S_T_CDao s_t_cDao=new S_T_CDao();
		return s_t_cDao.addS_T_C(s_t_c);
	}
	
	public String judgeCourseReturnMessage(boolean isJudged){
		if(isJudged){
			return "{\"code\":\"1\",\"message\":\"评价成功!\"}";
		}
		else{
			return "{\"code\":\"0\",\"message\":\"初始化失败,请重试!\"}";
		}
	}
}
