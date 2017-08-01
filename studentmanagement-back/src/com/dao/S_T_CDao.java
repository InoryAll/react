package com.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.entity.S_T_C;
import com.util.DBUtil;

public class S_T_CDao {
	/*添加学生、课程、教师关系*/
	public boolean addS_T_C(S_T_C s_t_c){
		Connection conn=DBUtil.getConnection();
		Statement stmt=null;
		String sql="insert into s_t_c values('"+s_t_c.getTeaId()+"'"
				+ ",'"+s_t_c.getCourseId()+"'"
				+ ",'"+s_t_c.getStuId()+"'"
				+ ","+s_t_c.getAppearance()+""
				+ ","+s_t_c.getQuality()+""
				+ ","+s_t_c.getAtmosphere()+""
				+ ","+s_t_c.getMethod()+""
				+ ","+s_t_c.getAttitude()+""
				+ ",'"+s_t_c.getOther()+"')";
		
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
