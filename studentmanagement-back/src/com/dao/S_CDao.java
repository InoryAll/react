package com.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import com.entity.S_C;
import com.util.DBUtil;

/*student、course操作类*/
public class S_CDao {
	
	/*添加一个学生、课程关系*/
	public boolean addS_C(S_C s_c){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="insert into s_c values('"+s_c.getStuId()+"'"
				+ ",'"+s_c.getCourseId()+"'"
				+ ","+s_c.getScore()+")";
		
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
	
	/*删除一个学生、课程关系*/
	public boolean deleteS_C(S_C s_c){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="delete from s_c where stuId='"+s_c.getStuId()+"'"
				+ " and courseId='"+s_c.getCourseId()+"'";
		
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
	
	/*更新学生、课程关系*/
	public boolean updateS_C(S_C s_c){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="update s_c set stuId='"+s_c.getStuId()+"'"
				+ ",courseId='"+s_c.getCourseId()+"'"
				+ ",score="+s_c.getScore()+" where stuId='"+s_c.getStuId()+"'"
				+ " and courseId='"+s_c.getCourseId()+"'";
		
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
