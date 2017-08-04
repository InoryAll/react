package com.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.enterprise.inject.New;

import com.entity.Course;
import com.entity.T_C_View;
import com.util.DBUtil;

/*页面显示的视图层操作类*/
public class T_C_ViewDao {
	public ArrayList<T_C_View> getAllCourseView(){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		ArrayList<T_C_View> courseViews=new ArrayList<T_C_View>();
		String sql="select * from course,t_c,teacher where "
					+ "course.courseId=t_c.courseId "
					+ "and teacher.teaId=t_c.teaId";
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				T_C_View view=new T_C_View();
				view.setCourseId(rs.getString("courseId"));
				view.setCourseName(rs.getString("courseName"));
				view.setTeaId(rs.getString("teaId"));
				view.setTeaName(rs.getString("teaName"));
				view.setCourseKind(rs.getString("courseKind"));
				view.setCourseSchedule(rs.getInt("courseSchedule"));
				view.setCourseCredits(rs.getInt("courseCredits"));
				view.setCourseMark(rs.getString("courseMark"));
				courseViews.add(view);
			}
			return courseViews;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
	public ArrayList<T_C_View> getSelectedCourseView(String stuId){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		ArrayList<T_C_View> courseViews=new ArrayList<T_C_View>();
		String sql="select * from teacher,course,t_c,s_c where course.courseId=t_c.courseId  "
					+ "and course.courseId=s_c.courseId "
					+ "and teacher.teaId=t_c.teaId "
					+ "and s_c.stuId='"+stuId+"'";
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				T_C_View view=new T_C_View();
				view.setCourseId(rs.getString("courseId"));
				view.setCourseName(rs.getString("courseName"));
				view.setTeaId(rs.getString("teaId"));
				view.setTeaName(rs.getString("teaName"));
				view.setCourseKind(rs.getString("courseKind"));
				view.setCourseSchedule(rs.getInt("courseSchedule"));
				view.setCourseCredits(rs.getInt("courseCredits"));
				view.setCourseMark(rs.getString("courseMark"));
				courseViews.add(view);
			}
			return courseViews;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
	public ArrayList<T_C_View> getJudgedCourseView(String stuId){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		ArrayList<T_C_View> courseViews=new ArrayList<T_C_View>();
		String sql="select * from course,teacher,s_t_c,t_c where course.courseId=t_c.courseId "
					+ "and course.courseId=s_t_c.courseId "
					+ "and t_c.teaId=teacher.teaId "
					+ "and s_t_c.stuId='"+stuId+"'";
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				T_C_View view=new T_C_View();
				view.setCourseId(rs.getString("courseId"));
				view.setCourseName(rs.getString("courseName"));
				view.setTeaId(rs.getString("teaId"));
				view.setTeaName(rs.getString("teaName"));
				view.setCourseKind(rs.getString("courseKind"));
				view.setCourseSchedule(rs.getInt("courseSchedule"));
				view.setCourseCredits(rs.getInt("courseCredits"));
				view.setCourseMark(rs.getString("courseMark"));
				courseViews.add(view);
			}
			return courseViews;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
}
