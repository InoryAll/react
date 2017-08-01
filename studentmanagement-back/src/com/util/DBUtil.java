package com.util;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
/*数据库工具类*/
public class DBUtil {
	
	/*静态块加载数据库驱动*/
	static{
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
	}
	
	/*定义静态方法getConnection，获取数据库连接*/
	public static Connection getConnection(){
		String url="jdbc:mysql://localhost:3306/studentmanagement"
				+ "?useUnicode=true&characterEncoding=utf-8&useSSL=false";
		String user="root";
		String password="123456";
		Connection conn=null;
		try {
			conn=DriverManager.getConnection(url, user, password);
			return conn;
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return null;
	}
	
	/*定义静态方法close，用于关闭数据库资源*/
	public static void close(Connection conn,Statement stmt,ResultSet rs){
		if(rs!=null){
			try {
				rs.close();
			} catch (SQLException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
		}
		if(stmt!=null){
			try {
				stmt.close();
			} catch (SQLException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
		}
		if(conn!=null){
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
		}
	}
}
