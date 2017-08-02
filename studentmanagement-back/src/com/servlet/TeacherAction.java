package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.entity.Teacher;
import com.service.TeacherInfoService;
import com.service.TeacherLoginService;

public class TeacherAction extends HttpServlet{
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
		String teaId;
		Teacher tea=new Teacher();
		switch(action){
			case "login":
				teaId=request.getParameter("id");
				String teaPassword=request.getParameter("password");
				TeacherLoginService teaLoginService=new TeacherLoginService();
				boolean canLogin=teaLoginService.validate(teaId, teaPassword);
				message=teaLoginService.returnMessage(canLogin);
				out.write(message);
				break;
			case "searchInfo":
				teaId=request.getParameter("id");
				TeacherInfoService teaSearchInfoService=new TeacherInfoService();
				tea=teaSearchInfoService.getTeacherById(teaId);
				message=teaSearchInfoService.getSearchInfo(tea);
				out.write(message);
				break;
			case "updateInfo":
				TeacherInfoService teaUpdateInfoService=new TeacherInfoService();
				tea.setTeaId(request.getParameter("id"));
				tea.setTeaPassword(request.getParameter("password"));
				tea.setTeaName(request.getParameter("name"));
				tea.setTeaSex(request.getParameter("sex"));
				tea.setTeaNation(request.getParameter("nation"));
				tea.setTeaAge(Integer.parseInt(request.getParameter("age")));
				tea.setTeaDepartment(request.getParameter("department"));
				tea.setTeaTel(request.getParameter("tel"));
				boolean isUpdated=teaUpdateInfoService.updateSearchInfo(tea);
				message=teaUpdateInfoService.updateReturnMessage(isUpdated, tea);
				out.write(message);
				break;
		}
	}
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO 自动生成的方法存根
		doPost(request, response);
	}
}
