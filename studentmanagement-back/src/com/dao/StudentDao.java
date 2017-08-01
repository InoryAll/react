package com.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.entity.Student;
import com.util.DBUtil;

/*student操作类*/
public class StudentDao {
	
	/*通过id查找student*/
	public Student getStudentById(String id){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		ResultSet rs=null;
		String sql="select * from student where stuId='"+id+"'";
		Student stu=null;
		
		try {
			stmt=conn.createStatement();
			rs=stmt.executeQuery(sql);
			while(rs.next()){
				stu=new Student();
				stu.setStuId(rs.getString("stuId"));
				stu.setStuPassword(rs.getString("stuPassword"));
				stu.setStuName(rs.getString("stuName"));
				stu.setStuSex(rs.getString("stuSex"));
				stu.setStuNation(rs.getString("stuNation"));
				stu.setStuAge(rs.getInt("stuAge"));
				stu.setStuDepartment(rs.getString("stuDepartment"));
				stu.setStuClass(rs.getString("stuClass"));
				stu.setStuTel(rs.getString("stuTel"));
				stu.setStuMark(rs.getString("stuMark"));
			}
			return stu;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			DBUtil.close(conn, stmt, rs);
		}
		return null;
	}
	
	/*根据条件查找学生*/
	public ArrayList<Student> getStudentByCondition(String condition){
		return null;
	}
	
	/*添加一个学生*/
	public boolean addStudent(Student stu){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="insert into student values('"+stu.getStuId()+"'"
				+ ",'"+stu.getStuPassword()+"'"
				+ ",'"+stu.getStuName()+"'"
				+ ",'"+stu.getStuSex()+"'"
				+ ",'"+stu.getStuNation()+"'"
				+ ","+stu.getStuAge()+""
				+ ",'"+stu.getStuDepartment()+"'"
				+ ",'"+stu.getStuClass()+"'"
				+ ",'"+stu.getStuTel()+"'"
				+ ",'"+stu.getStuMark()+"')";
		
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
	
	/*通过id删除一个学生*/
	public boolean deleteStudentById(String id){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="delete from student where stuId='"+id+"'";
		
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
	
	/*更新一个学生*/
	public boolean updateStudent(Student stu){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="update student set stuId='"+stu.getStuId()+"'"
				+ ",stuPassword='"+stu.getStuPassword()+"'"
				+ ",stuSex='"+stu.getStuSex()+"'"
				+ ",stuNation='"+stu.getStuNation()+"'"
				+ ",stuAge="+stu.getStuAge()+""
				+ ",stuDepartment='"+stu.getStuDepartment()+"'"
				+ ",stuClass='"+stu.getStuClass()+"'"
				+ ",stuTel='"+stu.getStuTel()+"'"
				+ ",stuMark='"+stu.getStuMark()+"' where stuId='"+stu.getStuId()+"'";
		
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
