package com.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.entity.Teacher;
import com.util.DBUtil;

/*teacher操作类*/
public class TeacherDao {
	/*通过id获取教师*/
	public Teacher getTeacherById(String id){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		String sql="select * from teacher where teaId='"+id+"'";
		Teacher tea=null;
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				tea=new Teacher();
				tea.setTeaId(rs.getString("teaId"));
				tea.setTeaPassword(rs.getString("teaPassword"));
				tea.setTeaName(rs.getString("teaName"));
				tea.setTeaSex(rs.getString("teaSex"));
				tea.setTeaNation(rs.getString("teaNation"));
				tea.setTeaAge(rs.getInt("teaAge"));
				tea.setTeaDepartment(rs.getString("teaDepartment"));
				tea.setTeaTel(rs.getString("teaTel"));
				tea.setTeaMark(rs.getString("teaMark"));
			}
			return tea;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
	/*根据条件查找教师*/
	public ArrayList<Teacher> getTeacherByCondition(String condition){
		return null;
	}
	
	/*添加教师*/
	public boolean addTeacher(Teacher tea){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="insert into teacher values('"+tea.getTeaId()+"'"
				+ ",'"+tea.getTeaPassword()+"'"
				+ ",'"+tea.getTeaName()+"'"
				+ ",'"+tea.getTeaSex()+"'"
				+ ",'"+tea.getTeaNation()+"'"
				+ ","+tea.getTeaAge()+""
				+ ",'"+tea.getTeaDepartment()+"'"
				+ ",'"+tea.getTeaTel()+"'"
				+ ",'"+tea.getTeaMark()+"')";
		
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
	
	/*通过id删除教师*/
	public boolean deleteTeacherById(String id){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="delete from teacher where teaId='"+id+"'";
		
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
	
	/*更新教师*/
	public boolean updateTeacher(Teacher tea){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="update teacher set teaId='"+tea.getTeaId()+"'"
				+ ",teaPassword='"+tea.getTeaPassword()+"'"
				+ ",teaName='"+tea.getTeaName()+"'"
				+ ",teaSex='"+tea.getTeaSex()+"'"
				+ ",teaNation='"+tea.getTeaNation()+"'"
				+ ",teaAge="+tea.getTeaAge()+""
				+ ",teaDepartment='"+tea.getTeaDepartment()+"'"
				+ ",teaTel='"+tea.getTeaTel()+"'"
				+ ",teaMark='"+tea.getTeaMark()+"' where teaId='"+tea.getTeaId()+"'";
		
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
}
