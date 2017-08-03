package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.entity.Student;
import com.service.StudentCourseService;
import com.service.StudentInfoService;
import com.service.StudentLoginService;
import com.service.StudentRegisterService;

public class StudentAction extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO 自动生成的方法存根
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out=response.getWriter();
		String action=null;
		action=request.getParameter("action");
		if(action==null){
			return;
		}
		String message;
		Student stu=new Student();
		String stuId;
		String courseId;
		switch(action){
			case "login":
				stuId=request.getParameter("id");
				String stuPassword=request.getParameter("password");
				StudentLoginService stuLoginService=new StudentLoginService();
				boolean canLogin = stuLoginService.validate(stuId, stuPassword);
				message=stuLoginService.returnMessage(canLogin);
				out.write(message);
				break;
			case "register":
				stu.setStuId(request.getParameter("id"));
				stu.setStuPassword(request.getParameter("password"));
				stu.setStuName(request.getParameter("name"));
				stu.setStuSex(request.getParameter("sex"));
				stu.setStuNation(request.getParameter("nation"));
				stu.setStuAge(Integer.parseInt(request.getParameter("age")));
				stu.setStuDepartment(request.getParameter("department"));
				stu.setStuClass(request.getParameter("class"));
				stu.setStuTel(request.getParameter("tel"));
				StudentRegisterService stuRegisterService=new StudentRegisterService();
				boolean isExist=stuRegisterService.validate(stu);
				boolean isAdded=stuRegisterService.addStudent(isExist, stu);
				message=stuRegisterService.returnMessage(isExist, isAdded);
				out.write(message);
				break;
			case "searchInfo":
				stuId=request.getParameter("id");
				StudentInfoService stuSearchInfoService=new StudentInfoService();
				stu=stuSearchInfoService.getStudentById(stuId);
				message=stuSearchInfoService.getSearchInfo(stu);
				out.write(message);
				break;
			case "updateInfo":
				StudentInfoService stuUpdateInfoService=new StudentInfoService();
				stu.setStuId(request.getParameter("id"));
				stu.setStuPassword(request.getParameter("password"));
				stu.setStuName(request.getParameter("name"));
				stu.setStuSex(request.getParameter("sex"));
				stu.setStuNation(request.getParameter("nation"));
				stu.setStuAge(Integer.parseInt(request.getParameter("age")));
				stu.setStuDepartment(request.getParameter("department"));
				stu.setStuClass(request.getParameter("class"));
				stu.setStuTel(request.getParameter("tel"));
				boolean isUpdated=stuUpdateInfoService.updateSearchInfo(stu);
				message=stuUpdateInfoService.updateReturnMessage(isUpdated, stu);
				out.write(message);
				break;
			case "initialSearch":
				StudentCourseService stuCourseInitialService=new StudentCourseService();
				message=stuCourseInitialService.getInitialSearch();
				out.write(message);
				break;
			case "initialSearchTable":
				StudentCourseService stuCourseTableInitialService=new StudentCourseService();
				message=stuCourseTableInitialService.getInitialSearchTable();
				out.write(message);
				break;
			case "searchCourse":
				String courseName=request.getParameter("courseName");
				String teaName=request.getParameter("teaName");
				StudentCourseService stuCourseTableSearchService=new StudentCourseService();
				message=stuCourseTableSearchService.getConditionSearchTable(courseName, teaName);
				out.write(message);
				break;
			case "selectCourse":
				stuId=request.getParameter("stuId");
				courseId=request.getParameter("courseId");
				StudentCourseService stuCourseSelectService=new StudentCourseService();		
				boolean isSelected=stuCourseSelectService.selectCourseById(stuId, courseId);
				message=stuCourseSelectService.selectedCourseReturnMessage(isSelected);
				out.write(message);
				break;
			case "selectedCourse":
				stuId=request.getParameter("stuId");
				StudentCourseService stuCourseSelectedService=new StudentCourseService();
				message=stuCourseSelectedService.getSelectedSearchTable(stuId);
				out.write(message);
				break;
			case "deleteCourse":
				stuId=request.getParameter("stuId");
				courseId=request.getParameter("courseId");
				StudentCourseService stuCourseDeletedService=new StudentCourseService();
				boolean isDeleted=stuCourseDeletedService.deleteCourseById(stuId, courseId);
				message=stuCourseDeletedService.deletedCourseReturnMessage(isDeleted);
				out.write(message);
				break;
			case "judgedCourse":
				break;
			case "judgeCourse":
				break;
		}
	}
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO 自动生成的方法存根
		doPost(request,response);
	}
}
