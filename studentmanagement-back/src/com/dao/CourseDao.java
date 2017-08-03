package com.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.entity.Course;
import com.util.DBUtil;

/*course操作类*/
public class CourseDao {
	
	/*根据id获取课程*/
	public Course getCourseById(String id){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		String sql="select * from course where courseId='"+id+"'";
		Course course=null;
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				course=new Course();
				course.setCourseId(rs.getString("courseId"));
				course.setCourseName(rs.getString("courseName"));
				course.setCourseKind(rs.getString("courseKind"));
				course.setCourseSchedule(rs.getInt("courseSchedule"));
				course.setCourseCredits(rs.getInt("courseCredits"));
				course.setCourseMark(rs.getString("courseMark"));
			}
			return course;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
	/*根据条件获取课程*/
	public ArrayList<Course> getCourseByCondition(String courseName,String teaName){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		ArrayList<Course> courses=new ArrayList<Course>();
		String sql="";
		if(courseName.equals("undefined")&&teaName.equals("undefined")){
			courses=getAllCourses();
			return courses;
		}
		if(!courseName.equals("undefined")&&teaName.equals("undefined")){
			sql="select * from course where courseName='"+courseName+"'";
		}
		if(courseName.equals("undefined")&&!teaName.equals("undefined")){
			sql="select * from course,teacher,t_c where course.courseId=t_c.courseId "
				+ "and teacher.teaId=t_c.teaId "
				+ "and teaName='"+teaName+"'";
		}
		if(!courseName.equals("undefined")&&!teaName.equals("undefined")){
			sql="select * from course,teacher,t_c where course.courseId=t_c.courseId "
				+ "and teacher.teaId=t_c.teaId "
				+ "and teaName='"+teaName+"' "
				+ "and courseName='"+courseName+"'";
		}
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				Course course=new Course();
				course.setCourseId(rs.getString("courseId"));
				course.setCourseName(rs.getString("courseName"));
				course.setCourseKind(rs.getString("courseKind"));
				course.setCourseSchedule(rs.getInt("courseSchedule"));
				course.setCourseCredits(rs.getInt("courseCredits"));
				courses.add(course);
			}
			return courses;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
	/*添加课程*/
	public boolean addCourse(Course course){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="insert into course values('"+course.getCourseId()+"'"
				+ ",'"+course.getCourseName()+"'"
				+ ",'"+course.getCourseKind()+"'"
				+ ","+course.getCourseSchedule()+""
				+ ","+course.getCourseCredits()+""
				+ ",'"+course.getCourseMark()+"')";
		
		try {
			stmt=conn.createStatement();
			stmt.execute(sql);
			return true;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, null);
		}
		return false;
	}
	
	/*通过id删除课程*/
	public boolean deleteCourseById(String id){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="delete from course where courseId='"+id+"'";
		
		try {
			stmt=conn.createStatement();
			stmt.execute(sql);
			return true;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, null);
		}
		return false;
	}
	
	/*修改课程*/
	public boolean updateCourse(Course course){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="update course set courseId='"+course.getCourseId()+"'"
				+ ",courseName='"+course.getCourseName()+"'"
				+ ",courseKind='"+course.getCourseKind()+"'"
				+ ",courseSchedule="+course.getCourseSchedule()+""
				+ ",courseCredits="+course.getCourseCredits()+""
				+ ",courseMark='"+course.getCourseMark()+"' where courseId='"+course.getCourseId()+"'";
	
		try {
			stmt=conn.createStatement();
			stmt.execute(sql);
			return true;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, null);
		}
		return false;
	}
	
	/*获取所有课程*/
	public ArrayList<Course> getAllCourses(){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		ArrayList<Course> courses=new ArrayList<Course>();
		String sql="select * from course";
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				Course course=new Course();
				course.setCourseId(rs.getString("courseId"));
				course.setCourseName(rs.getString("courseName"));
				course.setCourseKind(rs.getString("courseKind"));
				course.setCourseSchedule(rs.getInt("courseSchedule"));
				course.setCourseCredits(rs.getInt("courseCredits"));
				courses.add(course);
			}
			return courses;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
	public ArrayList<Course> getSelectedCourse(String stuId){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		ArrayList<Course> courses=new ArrayList<Course>();
		String sql="select * from course,s_c where course.courseId=s_c.courseId "
					+ "and stuId='"+stuId+"'";
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				Course course=new Course();
				course.setCourseId(rs.getString("courseId"));
				course.setCourseName(rs.getString("courseName"));
				course.setCourseKind(rs.getString("courseKind"));
				course.setCourseSchedule(rs.getInt("courseSchedule"));
				course.setCourseCredits(rs.getInt("courseCredits"));
				courses.add(course);
			}
			return courses;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
}
