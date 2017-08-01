package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.service.teacherLoginService;

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
		switch(action){
			case "login":
				String teaId=request.getParameter("id");
				String teaPassword=request.getParameter("password");
				teacherLoginService teaLoginService=new teacherLoginService();
				boolean canLogin=teaLoginService.validate(teaId, teaPassword);
				String message=teaLoginService.returnMessage(canLogin);
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
