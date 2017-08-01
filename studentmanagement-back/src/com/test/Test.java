package com.test;

import java.sql.Connection;

import com.dao.CourseDao;
import com.dao.S_CDao;
import com.dao.S_T_CDao;
import com.dao.StudentDao;
import com.dao.T_CDao;
import com.dao.TeacherDao;
import com.entity.Course;
import com.entity.S_C;
import com.entity.S_T_C;
import com.entity.Student;
import com.entity.T_C;
import com.entity.Teacher;
import com.util.DBUtil;

public class Test {
	public static void main(String[] args) {
		
		/*数据库连接测试*/
		/*Connection conn=DBUtil.getConnection();
		System.out.println("数据库连接成功:"+conn.toString());*/
		
		/*查找一个指定学号的学生测试*/
		/*Student stu=new Student();
		StudentDao stuDao=new StudentDao();
		stu=stuDao.getStudentById("14427006");
		System.out.println(stu.getStuId()+" "+stu.getStuPassword());*/
		
		/*添加一个学生*/
		/*Student stu=new Student();
		StudentDao stuDao=new StudentDao();
		stu.setStuId("14427008");
		stu.setStuPassword("123456");
		stu.setStuName("zsx");
		stu.setStuSex("女");
		stu.setStuNation("汉");
		stu.setStuAge(18);
		stu.setStuDepartment("软件工程");
		stu.setStuClass("141");
		stu.setStuTel("222222");
		stu.setStuMark("无");
		stuDao.addStudent(stu);
		System.out.println("添加成功!");*/
		
		/*删除一个学生*/
		/*StudentDao stuDao=new StudentDao();
		stuDao.deleteStudentById("14427008");
		System.out.println("删除成功!");*/
		
		/*更新一个学生*/
		/*Student stu=new Student();
		StudentDao stuDao=new StudentDao();
		stu.setStuId("14427008");
		stu.setStuPassword("123456");
		stu.setStuName("zsx");
		stu.setStuSex("男");
		stu.setStuNation("汉");
		stu.setStuAge(18);
		stu.setStuDepartment("计算机科学");
		stu.setStuClass("141");
		stu.setStuTel("222222");
		stu.setStuMark("无");
		stuDao.updateStudent(stu);
		System.out.println("修改成功!");*/
		
		/*根据id查询课程*/
		/*CourseDao courseDao=new CourseDao();
		Course course=courseDao.getCourseById("000000000001");
		System.out.println(course.getCourseId()+" "+course.getCourseName());*/
		
		/*添加课程*/
		/*Course course=new Course();
		CourseDao courseDao=new CourseDao();
		course.setCourseId("000000000001");
		course.setCourseName("数据结构");
		course.setCourseKind("必修");
		course.setCourseSchedule(64);
		course.setCourseCredits(4);
		course.setCourseMark("无");
		courseDao.addCourse(course);
		System.out.println("课程添加成功!");*/
		
		/*修改课程*/
		/*Course course=new Course();
		CourseDao courseDao=new CourseDao();
		course.setCourseId("000000000001");
		course.setCourseName("数据结构2");
		course.setCourseKind("必修");
		course.setCourseSchedule(32);
		course.setCourseCredits(4);
		course.setCourseMark("无--");
		courseDao.updateCourse(course);
		System.out.println("课程修改成功!");*/
		
		/*删除课程*/
		/*CourseDao courseDao=new CourseDao();
		courseDao.deleteCourseById("000000000001");
		System.out.println("课程删除成功!");*/
		
		/*根据id查看教师*/
		/*Teacher tea=new Teacher();
		TeacherDao teaDao=new TeacherDao();
		tea=teaDao.getTeacherById("14422006");
		System.out.println(tea.getTeaId()+" "+tea.getTeaName());*/
		
		
		/*添加教师*/
		/*Teacher tea=new Teacher();
		TeacherDao teaDao=new TeacherDao();
		tea.setTeaId("14422006");
		tea.setTeaPassword("123456");
		tea.setTeaName("tjs");
		tea.setTeaSex("男");
		tea.setTeaNation("汉");
		tea.setTeaAge(34);
		tea.setTeaDepartment("自动化");
		tea.setTeaTel("8987544");
		tea.setTeaMark("无");
		teaDao.addTeacher(tea);
		System.out.println("教师添加成功!");*/
		
		/*删除教师*/
		/*TeacherDao teaDao=new TeacherDao();
		teaDao.deleteTeacherById("14422006");
		System.out.println("教师删除成功!");*/
		
		/*更新教师*/
		/*Teacher tea=new Teacher();
		TeacherDao teaDao=new TeacherDao();
		tea.setTeaId("14422006");
		tea.setTeaPassword("123456");
		tea.setTeaName("tjs");
		tea.setTeaSex("女");
		tea.setTeaNation("保安");
		tea.setTeaAge(34);
		tea.setTeaDepartment("自动化4");
		tea.setTeaTel("8987544");
		tea.setTeaMark("无");
		teaDao.updateTeacher(tea);
		System.out.println("教师更新成功!");*/
		
		/*插入s_c*/
		/*S_C s_c=new S_C();
		S_CDao s_cDao=new S_CDao();
		s_c.setStuId("14427006");
		s_c.setCourseId("000000000001");
		s_c.setScore(96);
		s_cDao.addS_C(s_c);
		System.out.println("s_c插入成功!");*/
		
		/*更新s_c*/
		/*S_C s_c=new S_C();
		S_CDao s_cDao=new S_CDao();
		s_c.setStuId("14427006");
		s_c.setCourseId("000000000001");
		s_c.setScore(92);
		s_cDao.updateS_C(s_c);
		System.out.println("s_c更新成功!");*/
		
		/*删除s_c*/
		/*S_CDao s_cDao=new S_CDao();
		S_C s_c=new S_C();
		s_c.setStuId("14427006");
		s_c.setCourseId("000000000001");
		s_cDao.deleteS_C(s_c);
		System.out.println("s_c删除成功!");*/
		
		/*添加t_c*/
		/*T_C t_c=new T_C();
		T_CDao t_cDao=new T_CDao();
		t_c.setTeaId("14422006");
		t_c.setCourseId("000000000001");
		t_c.setDetail("周五3-4节，新理308");
		t_cDao.addT_C(t_c);
		System.out.println("添加t_c成功!");
		*/
		
		/*更新t_c*/
		/*T_C t_c=new T_C();
		T_CDao t_cDao=new T_CDao();
		t_c.setTeaId("14422006");
		t_c.setCourseId("000000000001");
		t_c.setDetail("周五1-2节，新理408");
		t_cDao.updateT_C(t_c);
		System.out.println("t_c成功!");*/
		
		/*删除t_c*/
		/*T_C t_c=new T_C();
		T_CDao t_cDao=new T_CDao();
		t_c.setTeaId("14422006");
		t_c.setCourseId("000000000001");
		t_cDao.deleteT_C(t_c);
		System.out.println("删除t_c成功!");*/
		
		/*添加s_t_c*/
		/*S_T_C s_t_c=new S_T_C();
		S_T_CDao s_t_cDao=new S_T_CDao();
		s_t_c.setTeaId("14422006");
		s_t_c.setCourseId("000000000001");
		s_t_c.setStuId("14427006");
		s_t_cDao.addS_T_C(s_t_c);
		System.out.println("s_t_c插入成功!");*/
		
	}
}
