package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.entity.Student;
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
		/*out.print("<h1>this is StudentServlet</h1>");*/
		String action=null;
		action=request.getParameter("action");
		if(action==null){
			return;
		}
		String message;
		Student stu=new Student();
		String stuId;
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
		}
	}
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO 自动生成的方法存根
		doPost(request,response);
	}
}
