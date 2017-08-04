package com.service;

import java.util.ArrayList;

import com.dao.CourseDao;
import com.dao.S_CDao;
import com.dao.T_C_ViewDao;
import com.dao.TeacherDao;
import com.entity.Course;
import com.entity.S_C;
import com.entity.T_C_View;
import com.entity.Teacher;

/*处理学生课程操作*/
public class StudentCourseService {
	public String getInitialSearch(){
		CourseDao courseDao=new CourseDao();
		TeacherDao teaDao=new TeacherDao();
		ArrayList<Course> courses=new ArrayList<Course>();
		ArrayList<Teacher> teachers=new ArrayList<Teacher>();
		courses=courseDao.getAllCourses();
		teachers=teaDao.getAllTeachers();
		String courseStr="";
		String teacherStr="";
		
		if(courses!=null&&teachers!=null){
			for(int i=0;i<courses.size();i++){
				if(i==courses.size()-1){
					courseStr+="\""+courses.get(i).getCourseName()+"\"";
					break;
				}
				courseStr+="\""+courses.get(i).getCourseName()+"\""+",";
			}
			courseStr="["+courseStr+"]";	
			for(int i=0;i<teachers.size();i++){
				if(i==teachers.size()-1){
					teacherStr+="\""+teachers.get(i).getTeaName()+"\"";
					break;
				}
				teacherStr+="\""+teachers.get(i).getTeaName()+"\""+",";
			}
			teacherStr="["+teacherStr+"]";
			
			return "{\"code\":\"1\",\"courses\":"+courseStr+",\"teachers\":"+teacherStr+"}";
		}
		return "{\"code\":\"0\",\"message\":\"初始化失败，请重试!\"}";
	}
	
	public String getInitialSearchTable(){		
		T_C_ViewDao viewDao=new T_C_ViewDao();
		ArrayList<T_C_View> courses=new ArrayList<T_C_View>();
		courses=viewDao.getAllCourseView();
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
	
	public String getSelectedSearchTable(String stuId){
		T_C_ViewDao viewDao=new T_C_ViewDao();
		ArrayList<T_C_View> courses=new ArrayList<T_C_View>();
		courses=viewDao.getSelectedCourseView(stuId);
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
	
	public String getConditionSearchTable(String courseName,String teaName){
		CourseDao courseDao=new CourseDao();
		ArrayList<Course> courses=new ArrayList<Course>();
		courses=courseDao.getCourseByCondition(courseName, teaName);
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
	
	public boolean selectCourseById(String stuId,String courseId){
		S_C s_c=new S_C();
		S_CDao s_cDao=new S_CDao();
		s_c.setStuId(stuId);
		s_c.setCourseId(courseId);
		return s_cDao.addS_C(s_c);
	}
	
	public String selectedCourseReturnMessage(boolean isSelected){
		if(isSelected){
			return "{\"code\":\"1\",\"message\":\"选课成功!\"}";
		}
		else{
			return "{\"code\":\"0\",\"message\":\"选课失败,请重试!\"}";
		}
	}
	
	public boolean deleteCourseById(String stuId,String courseId){
		S_C s_c=new S_C();
		S_CDao s_cDao=new S_CDao();
		s_c.setStuId(stuId);
		s_c.setCourseId(courseId);
		return s_cDao.deleteS_C(s_c);
	}
	
	public String deletedCourseReturnMessage(boolean isDeleted){
		if(isDeleted){
			return "{\"code\":\"1\",\"message\":\"删除成功!\"}";
		}
		else{
			return "{\"code\":\"0\",\"messge\":\"删除失败，请重试!\"}";
		}
	}
}
