package com.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import com.entity.T_C;
import com.util.DBUtil;

/*teacher、course操作类*/
public class T_CDao {
	/*添加教师、课程关系*/
	public boolean addT_C(T_C t_c){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="insert into t_c values('"+t_c.getTeaId()+"'"
				+ ",'"+t_c.getCourseId()+"'"
				+ ",'"+t_c.getDetail()+"')";
		
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
		return  false;
	}
	
	/*删除教师、课程关系*/
	public boolean deleteT_C(T_C t_c){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="delete from t_c where teaId='"+t_c.getTeaId()+"'"
				+ " and courseId='"+t_c.getCourseId()+"'";
		
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
	
	/*更新教师、课程关系*/
	public boolean updateT_C(T_C t_c){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="update t_c set teaId='"+t_c.getTeaId()+"'"
				+ ",courseId='"+t_c.getCourseId()+"'"
				+ ",detail='"+t_c.getDetail()+"' where teaId='"+t_c.getTeaId()+"'"
				+ " and courseId='"+t_c.getCourseId()+"'";
		
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
